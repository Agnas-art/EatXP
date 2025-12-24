import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory } = await req.json();
    
    console.log("Received message:", message);
    console.log("Conversation history length:", conversationHistory?.length || 0);
    
    // Try OpenAI first with full conversation context
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (OPENAI_API_KEY) {
      const messages = [
        { 
          role: "system", 
          content: "You are a friendly food education assistant for children. Keep your responses concise and conversational since they will be spoken aloud. Be warm, engaging, and helpful. Remember the conversation history to provide contextually relevant answers. Limit responses to 2-3 sentences when possible." 
        },
        // Include conversation history for context
        ...(conversationHistory || []).slice(-8).map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        })),
        { role: "user", content: message }
      ];

      console.log("Calling OpenAI API with context...");
      console.log("Messages being sent:", JSON.stringify(messages, null, 2));
      
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages,
          max_tokens: 150,
          temperature: 0.8, // Add some personality while keeping responses focused
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
        
        console.log("OpenAI response:", reply);

        return new Response(JSON.stringify({ reply }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } else {
        console.error("OpenAI API error:", response.status, await response.text());
      }
    }

    // Enhanced fallback responses with context awareness
    const getFallbackResponse = (question: string, history: any[] = []): string => {
      const lowerQuestion = question.toLowerCase();
      
      // Check if we're continuing a conversation about a specific topic
      const recentMessages = history.slice(-3) || [];
      const recentTopics = recentMessages.map((msg: any) => msg.content?.toLowerCase() || '').join(' ');
      
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

      // Check current question first
      for (const [keyword, answer] of Object.entries(foodResponses)) {
        if (lowerQuestion.includes(keyword)) {
          return answer;
        }
      }

      // Context-aware responses for follow-up questions
      if (lowerQuestion.includes('more') || lowerQuestion.includes('tell') || lowerQuestion.includes('what else')) {
        for (const [keyword, answer] of Object.entries(foodResponses)) {
          if (recentTopics.includes(keyword)) {
            return `Here's more about ${keyword}: ${answer}`;
          }
        }
        return "What specific aspect would you like to know more about? I'm happy to share more details!";
      }

      if (lowerQuestion.includes('why') || lowerQuestion.includes('how')) {
        return "Great question! Understanding how food affects our bodies helps us make better choices. What would you like to learn about?";
      }

      // Context-aware general responses
      const generalResponses = [
        "That's a great question about food! Keep learning about healthy eating!",
        "I like your interest in food and nutrition! Ask me about specific foods or recipes!",
        "Good question! Eating well helps your body grow strong and your brain work better!",
        "That's interesting! Learning about food is a great way to be healthy!",
        "Keep asking questions about food! The more you know, the healthier you can be!",
      ];

      return generalResponses[Math.floor(Math.random() * generalResponses.length)];
    };

    const reply = getFallbackResponse(message, conversationHistory || []);
    console.log("Fallback response:", reply);

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Voice chat error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});