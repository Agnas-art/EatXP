import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, X, MessageCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

// Web Speech API types
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function VoiceBot() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognitionClass) {
      recognitionRef.current = new SpeechRecognitionClass();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = i18n.language === "es" ? "es-ES" : 
                        i18n.language === "fr" ? "fr-FR" :
                        i18n.language === "ja" ? "ja-JP" :
                        i18n.language === "hi" ? "hi-IN" :
                        i18n.language === "ta" ? "ta-IN" :
                        i18n.language === "te" ? "te-IN" : "en-US";

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
        
        if (event.results[current].isFinal) {
          handleSendMessage(transcriptText);
        }
      };

      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      window.speechSynthesis.cancel();
    };
  }, [i18n.language]);

  const startListening = useCallback(async () => {
    if (!recognitionRef.current) {
      console.error('Speech recognition not supported');
      return;
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setTranscript('');
      setIsListening(true);
      recognitionRef.current.start();
    } catch (error) {
      console.error('Microphone access error:', error);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  const speakText = useCallback((text: string) => {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = i18n.language === "es" ? "es-ES" : 
                     i18n.language === "fr" ? "fr-FR" :
                     i18n.language === "ja" ? "ja-JP" :
                     i18n.language === "hi" ? "hi-IN" :
                     i18n.language === "ta" ? "ta-IN" :
                     i18n.language === "te" ? "te-IN" : "en-US";
    
    // Try to use a good voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.name.includes('Google') || v.name.includes('Samantha') || v.lang === 'en-US'
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [i18n.language]);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setTranscript('');
    setIsProcessing(true);
    setCurrentResponse('');

    try {
      // Pass the updated conversation history including the current message
      const response = await getAIResponse(text, updatedMessages.slice(0, -1)); // Exclude current message since it's already in the prompt
      const assistantMessage: Message = { role: 'assistant', content: response };
      
      setMessages(prev => [...prev, assistantMessage]);
      setCurrentResponse(response);
      speakText(response);
    } catch (error) {
      console.error('Voice chat error:', error);
      const fallbackResponse = "I'm having trouble understanding. Could you ask me again?";
      const assistantMessage: Message = { role: 'assistant', content: fallbackResponse };
      setMessages(prev => [...prev, assistantMessage]);
      speakText(fallbackResponse);
    } finally {
      setIsProcessing(false);
    }
  }, [messages, speakText]);

  const getAIResponse = async (question: string, conversationHistory: Message[]): Promise<string> => {
    try {
      // Try Supabase edge function first for better context handling
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
              conversationHistory: conversationHistory.slice(-10), // Keep last 10 messages for context
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.reply) {
            return data.reply;
          }
        } else {
          console.log('Supabase function failed, falling back to OpenAI API');
        }
      }

      // Try ChatGPT with full conversation context
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
                content: "You are a friendly food education assistant for children. Keep responses brief and encouraging. Remember the conversation history to provide contextually relevant answers.",
              },
              ...conversationHistory.slice(-8).map((msg) => ({
                role: msg.role === 'user' ? 'user' : 'assistant',
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

      // Fallback to local responses with simple context awareness
      return getFallbackResponse(question, conversationHistory);
    } catch (error) {
      console.error('AI API error:', error);
      return getFallbackResponse(question, conversationHistory);
    }
  };

  const getFallbackResponse = (question: string, conversationHistory?: Message[]): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Check if we're continuing a conversation about a specific topic
    const recentMessages = conversationHistory?.slice(-3) || [];
    const recentTopics = recentMessages.map(msg => msg.content.toLowerCase()).join(' ');
    
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
      recipe: "I can teach you delicious recipes! Ask me about pizza, pasta, cookies, or any food you like!",
      cook: "Cooking is fun and helps you learn! What food would you like to cook?",
      healthy: "Eating healthy means lots of fruits, veggies, whole grains, and water! It helps your body grow strong.",
      exercise: "Exercise is fun and keeps your body healthy! You can run, dance, swim, or play!",
    };

    // Check current question first
    for (const [keyword, answer] of Object.entries(foodResponses)) {
      if (lowerQuestion.includes(keyword)) {
        return answer;
      }
    }

    // Check recent conversation for context
    for (const [keyword, answer] of Object.entries(foodResponses)) {
      if (recentTopics.includes(keyword)) {
        // Provide follow-up information if we're continuing a topic
        if (lowerQuestion.includes('more') || lowerQuestion.includes('tell') || lowerQuestion.includes('what else')) {
          return `Here's more about ${keyword}: ${answer}`;
        }
      }
    }

    // Context-aware general responses
    if (lowerQuestion.includes('more') || lowerQuestion.includes('tell') || lowerQuestion.includes('what else')) {
      if (recentMessages.length > 0) {
        return "What specific aspect would you like to know more about? I'm happy to share more details!";
      }
    }

    if (lowerQuestion.includes('why') || lowerQuestion.includes('how')) {
      return "Great question! Understanding how food affects our bodies helps us make better choices. What would you like to learn about?";
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

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Voice bot panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{t('voice_bot.title') || 'AI Voice Assistant'}</h3>
                  <p className="text-xs text-white/80">{t('voice_bot.help_text') || 'Tap the mic to speak'}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages area */}
            <div className="h-64 overflow-y-auto p-4 space-y-3 bg-white">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 text-sm py-8">
                  <p>👋 {t('voice_bot.welcome') || "Hi! I'm your AI assistant."}</p>
                  <p className="mt-2">{t('voice_bot.start') || "Tap the microphone and ask me anything!"}</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-blue-500 text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-800 rounded-bl-md'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-bl-md flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-gray-600">{t('voice_bot.processing') || 'Thinking...'}</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Transcript display */}
            {transcript && (
              <div className="px-4 py-2 bg-yellow-50 border-t border-yellow-200">
                <p className="text-xs text-yellow-800">{t('voice_bot.listening') || 'Hearing'}: "{transcript}"</p>
              </div>
            )}

            {/* Controls */}
            <div className="p-4 border-t border-gray-200 bg-white flex items-center justify-center gap-4">
              {isSpeaking && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={stopSpeaking}
                  className="text-xs"
                >
                  {t('voice_bot.stop_speaking') || 'Stop Speaking'}
                </Button>
              )}
              
              <motion.button
                onClick={isListening ? stopListening : startListening}
                disabled={isProcessing || isSpeaking}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : isProcessing || isSpeaking
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
                whileHover={!isProcessing && !isSpeaking ? { scale: 1.05 } : {}}
                whileTap={!isProcessing && !isSpeaking ? { scale: 0.95 } : {}}
              >
                {isListening ? (
                  <MicOff className="w-6 h-6" />
                ) : (
                  <Mic className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
