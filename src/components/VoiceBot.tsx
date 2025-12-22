import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Mic, Volume2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

export function VoiceBot() {
  const { t, i18n } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Initialize speech recognition
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
                        i18n.language === "bn" ? "bn-IN" :
                        i18n.language === "ta" ? "ta-IN" :
                        i18n.language === "te" ? "te-IN" :
                        i18n.language === "mr" ? "mr-IN" : "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript("");
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = "";
        for (let i = event.results.length - 1; i >= 0; --i) {
          if (event.results[i].isFinal) {
            setTranscript(event.results[i][0].transcript);
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

  const handleVoiceInput = async (text: string) => {
    setIsProcessing(true);
    setResponse("Thinking...");
    
    try {
      // Smart AI response using keyword matching and AI model
      const aiResponse = await getAIResponse(text);
      setResponse(aiResponse);
      speakResponse(aiResponse);
    } catch (error) {
      console.error("Error getting response:", error);
      // Fallback to smart responses
      const aiResponse = await getAIResponse(text);
      setResponse(aiResponse);
      speakResponse(aiResponse);
    } finally {
      setIsProcessing(false);
    }
  };

  const getAIResponse = async (question: string): Promise<string> => {
    const lowerQuestion = question.toLowerCase();
    
    // Try using HuggingFace's free inference API with zero authentication
    // Using a pre-built space that doesn't require API key
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/google/flan-t5-base",
        {
          headers: { Authorization: `Bearer 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` },
          method: "POST",
          body: JSON.stringify({ 
            inputs: `Answer briefly about food education for children: ${question}`,
            parameters: { max_length: 100 }
          }),
        }
      );
      
      if (response.ok) {
        const result = await response.json();
        if (Array.isArray(result) && result[0]?.generated_text) {
          return result[0].generated_text.trim();
        }
      }
    } catch (e) {
      console.log("HF API fallback, using local responses");
    }

    // Smart fallback responses based on keywords
    const foodResponses = {
      apple: "Apples are full of fiber and vitamin C! They help keep your teeth healthy and give you energy.",
      banana: "Bananas have potassium which helps your muscles and heart! They're also great for energy.",
      carrot: "Carrots have beta-carotene which is great for your eyes! Orange veggies are super healthy.",
      broccoli: "Broccoli is full of vitamins and minerals! It helps your bones grow strong.",
      spinach: "Spinach is packed with iron and vitamins! It makes you strong like Popeye!",
      milk: "Milk has calcium which builds strong bones and teeth! Great for growing kids.",
      egg: "Eggs have protein and choline which help your brain grow! Perfect for breakfast.",
      fish: "Fish has omega-3s which are great for your brain! It helps you think better.",
      water: "Water is super important! It keeps your body cool and helps everything work right.",
      salad: "Salads have lots of veggies with vitamins and minerals! Eating colorful food is healthy.",
      recipe: "I can teach you delicious recipes! Ask me about pizza, pasta, cookies, or any food you like!",
      cook: "Cooking is fun and helps you learn! What food would you like to cook?",
      healthy: "Eating healthy means lots of fruits, veggies, whole grains, and water! It helps your body grow strong.",
      exercise: "Exercise is fun and keeps your body healthy! You can run, dance, swim, or play!",
      food: "Food gives your body energy and helps you grow! Eat lots of colors - veggies, fruits, proteins!",
      sugar: "Sugar gives quick energy but too much isn't good for teeth! Eat sweets in small amounts.",
      chocolate: "Chocolate has some good stuff but also sugar! Have it as a treat, not every day.",
      pizza: "Pizza can be healthy! Use whole wheat crust and lots of veggie toppings!",
      snack: "Healthy snacks are fruits, nuts, yogurt, or cheese! They give you energy between meals.",
      breakfast: "Breakfast is important! Eat eggs, oatmeal, fruit, or milk in the morning!",
      lunch: "Lunch should have protein, veggies, and carbs! It gives you energy for the afternoon!",
      dinner: "Dinner should be balanced with veggies, protein, and grains! Eat 2-3 hours before bed!",
    };

    // Check for keyword matches
    for (const [keyword, answer] of Object.entries(foodResponses)) {
      if (lowerQuestion.includes(keyword)) {
        return answer;
      }
    }

    // General encouraging responses
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
                     i18n.language === "bn" ? "bn-IN" :
                     i18n.language === "ta" ? "ta-IN" :
                     i18n.language === "te" ? "te-IN" :
                     i18n.language === "mr" ? "mr-IN" : "en-US";
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

  const reset = () => {
    setTranscript("");
    setResponse("");
    setIsListening(false);
  };

  return (
    <Card className="p-6 max-w-md mx-auto bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Volume2 className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-bold text-purple-600">
            {t("voice_bot.title")}
          </h2>
        </div>

        <p className="text-sm text-gray-600">{t("voice_bot.help_text")}</p>

        {/* Display user input */}
        {transcript && (
          <div className="bg-blue-100 p-3 rounded-lg">
            <p className="text-sm font-semibold text-blue-900">
              {t("common.you")}:
            </p>
            <p className="text-sm text-blue-800">{transcript}</p>
          </div>
        )}

        {/* Display bot response */}
        {response && (
          <div className="bg-green-100 p-3 rounded-lg">
            <p className="text-sm font-semibold text-green-900">Bot:</p>
            <p className="text-sm text-green-800">{response}</p>
          </div>
        )}

        {/* Status indicator */}
        {isListening && (
          <div className="text-center text-sm text-orange-600 font-semibold">
            {t("voice_bot.listen")}
          </div>
        )}

        {isProcessing && (
          <div className="text-center text-sm text-blue-600 font-semibold">
            {t("voice_bot.processing")}
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-2 justify-center">
          {!isListening ? (
            <Button
              onClick={startListening}
              className="bg-purple-600 hover:bg-purple-700 text-white"
              size="sm"
            >
              <Mic className="w-4 h-4 mr-2" />
              {t("voice_bot.speak")}
            </Button>
          ) : (
            <Button
              onClick={stopListening}
              className="bg-red-600 hover:bg-red-700 text-white"
              size="sm"
            >
              Stop
            </Button>
          )}

          {(transcript || response) && (
            <Button
              onClick={reset}
              variant="outline"
              size="sm"
              className="text-gray-700"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          )}
        </div>

        <p className="text-xs text-gray-500 text-center">
          Currently speaking: {i18n.language.toUpperCase()}
        </p>
      </div>
    </Card>
  );
}
