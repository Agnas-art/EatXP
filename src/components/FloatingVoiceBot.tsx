import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Mic, Volume2, RotateCcw, X, Minimize2, Maximize2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ANIME_CHARACTERS } from "@/data/animeCharacters";

interface Message {
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

export function FloatingVoiceBot({ characterId = "tanjiro" }: { characterId?: string }) {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiSource, setAiSource] = useState<"chatgpt" | "copilot">("chatgpt");
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const character = ANIME_CHARACTERS[characterId] || ANIME_CHARACTERS.tanjiro;

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = i18n.language === "es" ? "es-ES" : 
                        i18n.language === "fr" ? "fr-FR" :
                        i18n.language === "ja" ? "ja-JP" :
                        i18n.language === "hi" ? "hi-IN" :
                        i18n.language === "ta" ? "ta-IN" :
                        i18n.language === "te" ? "te-IN" : "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        setCurrentTranscript("");
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = "";
        for (let i = event.results.length - 1; i >= 0; --i) {
          if (event.results[i].isFinal) {
            setCurrentTranscript(event.results[i][0].transcript);
            handleVoiceInput(event.results[i][0].transcript);
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [i18n.language]);

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleVoiceInput = async (text: string) => {
    // Add user message to conversation
    const userMessage: Message = {
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setCurrentTranscript("");
    setIsProcessing(true);

    try {
      const response = await getAIResponse(text, messages);
      const botMessage: Message = {
        role: "bot",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      speakResponse(response);
    } catch (error) {
      console.error("Error getting response:", error);
      const fallbackResponse = "I'm having trouble understanding. Could you ask me again?";
      const botMessage: Message = {
        role: "bot",
        content: fallbackResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      speakResponse(fallbackResponse);
    } finally {
      setIsProcessing(false);
    }
  };

  const getAIResponse = async (question: string, conversationHistory: Message[]): Promise<string> => {
    try {
      // Try Supabase edge function first
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      
      if (supabaseUrl && supabaseKey) {
        const response = await fetch(
          `${supabaseUrl}/functions/v1/voice-chat`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${supabaseKey}`,
            },
            body: JSON.stringify({
              message: question,
              conversationHistory: conversationHistory.slice(-10),
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.reply) {
            return data.reply;
          }
        }
      }

      // Build context from conversation history
      let conversationContext = "Previous conversation:\n";
      conversationHistory.slice(-6).forEach((msg) => {
        conversationContext += `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}\n`;
      });

      const prompt = `You are a friendly food education assistant helping children learn about nutrition and healthy eating. 
${conversationContext}
User: ${question}

Provide a helpful, encouraging response about food and nutrition for children. Keep it brief and age-appropriate.`;

      // Try ChatGPT via OpenAI API
      if (aiSource === "chatgpt") {
        const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;
        if (openaiKey) {
          const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${openaiKey}`,
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "system",
                  content: "You are a friendly food education assistant for children.",
                },
                ...conversationHistory.map((msg) => ({
                  role: msg.role,
                  content: msg.content,
                })),
                { role: "user", content: question },
              ],
              max_tokens: 150,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.choices?.[0]?.message?.content) {
              return data.choices[0].message.content.trim();
            }
          }
        }
      }

      // Try Copilot via Azure OpenAI API
      if (aiSource === "copilot") {
        const azureKey = import.meta.env.VITE_AZURE_OPENAI_KEY;
        const azureEndpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT;
        if (azureKey && azureEndpoint) {
          const response = await fetch(
            `${azureEndpoint}/openai/deployments/gpt-35-turbo/chat/completions?api-version=2023-05-15`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "api-key": azureKey,
              },
              body: JSON.stringify({
                messages: [
                  {
                    role: "system",
                    content: "You are a friendly food education assistant for children.",
                  },
                  ...conversationHistory.map((msg) => ({
                    role: msg.role,
                    content: msg.content,
                  })),
                  { role: "user", content: question },
                ],
                max_tokens: 150,
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            if (data.choices?.[0]?.message?.content) {
              return data.choices[0].message.content.trim();
            }
          }
        }
      }

      // Fallback to local responses
      return getFallbackResponse(question);
    } catch (error) {
      console.error("AI API error:", error);
      return getFallbackResponse(question);
    }
  };

  const getFallbackResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    const foodResponses: Record<string, string> = {
      apple: "Apples are full of fiber and vitamin C! They help keep your teeth healthy and give you energy.",
      banana: "Bananas have potassium which helps your muscles and heart! They're also great for energy.",
      carrot: "Carrots have beta-carotene which is great for your eyes! Orange veggies are super healthy.",
      broccoli: "Broccoli is full of vitamins and minerals! It helps your bones grow strong.",
      spinach: "Spinach is packed with iron and vitamins! It makes you strong!",
      milk: "Milk has calcium which builds strong bones and teeth! Great for growing kids.",
      egg: "Eggs have protein and choline which help your brain grow! Perfect for breakfast.",
      fish: "Fish has omega-3s which are great for your brain! It helps you think better.",
      water: "Water is super important! It keeps your body cool and helps everything work right.",
      salad: "Salads have lots of veggies with vitamins and minerals! Eating colorful food is healthy.",
      recipe: "I can teach you delicious recipes! Ask me about any food you like!",
      cook: "Cooking is fun and helps you learn! What food would you like to cook?",
      healthy: "Eating healthy means lots of fruits, veggies, whole grains, and water!",
      exercise: "Exercise is fun and keeps your body healthy! You can run, dance, swim, or play!",
    };

    for (const [keyword, answer] of Object.entries(foodResponses)) {
      if (lowerQuestion.includes(keyword)) {
        return answer;
      }
    }

    const generalResponses = [
      "That's a great question about food! Keep learning about healthy eating!",
      "I like your interest in food and nutrition! Ask me about specific foods or recipes!",
      "Good question! Eating well helps your body grow strong and your brain work better!",
      "That's interesting! Learning about food is a great way to be healthy!",
      "Keep asking questions about food! The more you know, the healthier you can be!",
    ];

    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

  const speakResponse = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = i18n.language === "es" ? "es-ES" : 
                     i18n.language === "fr" ? "fr-FR" :
                     i18n.language === "ja" ? "ja-JP" :
                     i18n.language === "hi" ? "hi-IN" :
                     i18n.language === "ta" ? "ta-IN" :
                     i18n.language === "te" ? "te-IN" : "en-US";
    utterance.rate = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const clearHistory = () => {
    setMessages([]);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center z-40 hover:shadow-xl transition-shadow"
          style={{ backgroundColor: character.color }}
        >
          <MessageCircle className="w-8 h-8" />
        </motion.button>
      )}

      {/* Floating Voice Bot Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed bottom-24 right-6 w-96 max-h-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col border-2"
            style={{ borderColor: character.color }}
          >
            {/* Header */}
            <div 
              className="p-4 text-white rounded-t-xl flex items-center justify-between"
              style={{ backgroundColor: character.color }}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{character.emoji}</span>
                <div>
                  <h3 className="font-bold">{character.name} Bot</h3>
                  <p className="text-xs opacity-90">{aiSource.toUpperCase()} Powered</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="hover:bg-white hover:bg-opacity-20 p-2 rounded"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white hover:bg-opacity-20 p-2 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-white">
                  {messages.length === 0 && (
                    <div className="text-center text-gray-400 text-sm py-4">
                      <p>Start a conversation with {character.name}!</p>
                      <p className="text-xs mt-1">Click the mic to speak or use text.</p>
                    </div>
                  )}
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                          msg.role === "user"
                            ? "bg-blue-500 text-white rounded-br-none"
                            : `text-gray-800 rounded-bl-none`
                        }`}
                        style={
                          msg.role === "bot"
                            ? { backgroundColor: character.color + "20", color: character.color }
                            : {}
                        }
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {isProcessing && (
                    <div className="flex justify-start">
                      <div className="bg-gray-200 px-4 py-2 rounded-lg text-sm">
                        {character.name} is typing...
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Current Transcript */}
                {currentTranscript && (
                  <div className="px-4 py-2 bg-yellow-50 border-t border-yellow-200 text-sm text-yellow-800">
                    Listening: {currentTranscript}
                  </div>
                )}

                {/* Controls */}
                <div className="p-4 border-t space-y-2">
                  <div className="flex gap-2">
                    {!isListening ? (
                      <Button
                        onClick={startListening}
                        className="flex-1 text-white"
                        style={{ backgroundColor: character.color }}
                      >
                        <Mic className="w-4 h-4 mr-2" />
                        Speak
                      </Button>
                    ) : (
                      <Button
                        onClick={stopListening}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                      >
                        Stop
                      </Button>
                    )}
                  </div>

                  {/* AI Source Toggle */}
                  <div className="flex gap-2 text-xs">
                    <button
                      onClick={() => setAiSource("chatgpt")}
                      className={`flex-1 py-1 px-2 rounded transition-colors ${
                        aiSource === "chatgpt"
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      ChatGPT
                    </button>
                    <button
                      onClick={() => setAiSource("copilot")}
                      className={`flex-1 py-1 px-2 rounded transition-colors ${
                        aiSource === "copilot"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      Copilot
                    </button>
                  </div>

                  {messages.length > 0 && (
                    <Button
                      onClick={clearHistory}
                      variant="outline"
                      className="w-full text-xs"
                    >
                      <RotateCcw className="w-3 h-3 mr-2" />
                      Clear Chat
                    </Button>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
