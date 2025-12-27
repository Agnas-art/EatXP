import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, X, MessageCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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

// Platform detection utilities
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

const isAndroid = () => {
  return /Android/i.test(navigator.userAgent);
};

const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

const isChrome = () => {
  return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
};

const isSafari = () => {
  return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
};

const isWindows = () => {
  return /Windows/i.test(navigator.userAgent);
};

const isEdge = () => {
  return /Edg/i.test(navigator.userAgent);
};

const isFirefox = () => {
  return /Firefox/.test(navigator.userAgent);
};

const getSpeechRecognitionSupport = () => {
  const hasAPI = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  const platform = isAndroid() ? 'Android' : isIOS() ? 'iOS' : isWindows() ? 'Windows' : 'Desktop';
  const browser = isChrome() ? 'Chrome' : isEdge() ? 'Edge' : isSafari() ? 'Safari' : isFirefox() ? 'Firefox' : 'Other';
  
  // Enhanced support detection for Windows
  const isWindowsSupported = isWindows() && (isChrome() || isEdge());
  const isAndroidSupported = isAndroid() && isChrome();
  const isDesktopSupported = !isMobile() && !isWindows() && (isChrome() || isSafari());
  
  return {
    hasAPI,
    platform,
    browser,
    isSupported: hasAPI && (isWindowsSupported || isAndroidSupported || isDesktopSupported),
    requiresHTTPS: true
  };
};

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: number;
}

interface ConversationContext {
  messages: Message[];
  summary?: string;
  lastActiveTime: number;
}

const VoiceBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [conversationSummary, setConversationSummary] = useState<string>('');
  const [speechSupport, setSpeechSupport] = useState(getSpeechRecognitionSupport());
  const [micPermissionGranted, setMicPermissionGranted] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();

  // Check microphone permission status
  const checkMicrophonePermission = useCallback(async () => {
    if (!navigator.permissions || !navigator.permissions.query) {
      return 'prompt'; // Unknown, will need to request
    }
    
    try {
      const result = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      return result.state; // 'granted', 'denied', or 'prompt'
    } catch (error) {
      console.log('Permission check failed:', error);
      return 'prompt'; // Fallback to request
    }
  }, []);

  // Request microphone permission explicitly
  const requestMicrophonePermission = useCallback(async () => {
    try {
      console.log('Requesting microphone access...');
      
      // This will trigger the browser popup if permission not granted
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          ...(isAndroid() ? {
            sampleRate: 16000,
            channelCount: 1
          } : {})
        }
      });
      
      // Stop the stream immediately after getting permission
      stream.getTracks().forEach(track => track.stop());
      setMicPermissionGranted(true);
      
      toast({
        title: "Microphone Access Granted",
        description: "Voice features are now available!",
        variant: "default",
      });
      
      return true;
    } catch (error) {
      console.error('Microphone access error:', error);
      setMicPermissionGranted(false);
      
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      if (errorMessage.includes('Permission denied') || errorMessage.includes('NotAllowedError')) {
        toast({
          title: "Microphone Access Denied",
          description: isAndroid() 
            ? "Please enable microphone access in your browser settings, then refresh the page." 
            : "Please allow microphone access to use voice features. Click the microphone icon in your browser's address bar.",
          variant: "destructive",
        });
      } else if (errorMessage.includes('NotFoundError')) {
        toast({
          title: "No Microphone Found",
          description: "Please connect a microphone and try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Microphone Error",
          description: `Could not access microphone: ${errorMessage}`,
          variant: "destructive",
        });
      }
      return false;
    }
  }, [toast]);

  // Storage key for conversation persistence
  const STORAGE_KEY = 'voicebot_conversation';
  const MAX_STORED_MESSAGES = 50;
  const CONTEXT_WINDOW = 8; // Minimal context for maximum speed

  // Load conversation from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const context: ConversationContext = JSON.parse(stored);
        // Load conversation history - removed 24 hour expiry to maintain context better
        // Only skip loading if data is corrupted or very old (7 days)
        const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
        if (!context.lastActiveTime || Date.now() - context.lastActiveTime < maxAge) {
          setMessages(context.messages || []);
          setConversationSummary(context.summary || '');
          console.log('Loaded conversation context:', {
            messageCount: context.messages?.length || 0,
            hasSummary: !!context.summary,
            lastActive: context.lastActiveTime ? new Date(context.lastActiveTime).toLocaleString() : 'unknown'
          });
        } else {
          console.log('Conversation context too old, starting fresh');
        }
      } else {
        console.log('No previous conversation context found');
      }
    } catch (error) {
      console.error('Failed to load conversation history:', error);
    }
  }, []);

  // Check microphone permission on mount
  useEffect(() => {
    const initPermissions = async () => {
      const permissionStatus = await checkMicrophonePermission();
      if (permissionStatus === 'granted') {
        setMicPermissionGranted(true);
      } else if (permissionStatus === 'denied') {
        setMicPermissionGranted(false);
        toast({
          title: "Microphone Access Required",
          description: "Please enable microphone access in browser settings to use voice features.",
          variant: "default",
        });
      }
      // If 'prompt', we'll request when user tries to use voice features
    };
    
    initPermissions();
  }, [checkMicrophonePermission, toast]);

  // Save conversation to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      try {
        const context: ConversationContext = {
          messages: messages.slice(-MAX_STORED_MESSAGES),
          summary: conversationSummary,
          lastActiveTime: Date.now()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(context));
        console.log('Saved conversation context:', {
          messageCount: context.messages.length,
          hasSummary: !!context.summary,
          summaryLength: context.summary?.length || 0
        });
      } catch (error) {
        console.error('Failed to save conversation history:', error);
      }
    }
  }, [messages, conversationSummary]);

  // Enhanced local response generator with comprehensive context awareness
  const generateLocalResponse = useCallback(async (userInput: string, messageHistory: Message[], context: ConversationContext): Promise<string> => {
    const input = userInput.toLowerCase().trim();
    
    // Use the provided context instead of parsing from localStorage
    const {
      userName,
      interests: userPreferences,
      recentTopics: contextTopics,
      conversationLength,
      lastMessages,
      lastInteraction
    } = context;
    
    // ULTRA-FAST contextual reference detection - minimal processing
    const hasContextualReference = 
      input.includes('these') || input.includes('which one') || input.includes('both') ||
      input.includes('them') || input.includes('it');
    
    let referencedItems = [];
    
    if (hasContextualReference && messageHistory.length > 1) {
      // INSTANT processing: Only check the very last message
      const lastMessage = messageHistory[messageHistory.length - 2]?.content?.toLowerCase() || '';
      
      console.log('🔍 CONTEXTUAL REFERENCE DEBUG:', {
        hasContextualReference,
        messageHistoryLength: messageHistory.length,
        lastMessage,
        lastMessageExists: !!lastMessage
      });
      
      // Super simple food detection - no RegEx, just includes check
      const foods = ['avocado', 'pasta', 'rice', 'chicken', 'salmon', 'egg', 'apple', 'banana'];
      referencedItems = foods.filter(food => lastMessage.includes(food));
      
      console.log('🥑 REFERENCED ITEMS:', referencedItems);
    }
    
    // Find previous discussions about similar topics
    const previousUserMessages = messageHistory.filter(m => m.role === 'user').slice(-3);
    const previousAssistantMessages = messageHistory.filter(m => m.role === 'assistant').slice(-3);
    
    // Check for repeated or similar questions
    const isRepeatedQuestion = previousUserMessages.some(m => {
      const similarity = m.content.toLowerCase().includes(input.substring(0, 20));
      return similarity && m.content !== userInput;
    });
    
    // Handle repeated or follow-up questions with context
    if (isRepeatedQuestion && previousAssistantMessages.length > 0) {
      return `${userName ? `${userName}, ` : ''}I think we talked about something similar before. To build on our previous discussion, what specific aspect would you like to explore further?`;
    }
    
    // OPTIMIZED: Fast contextual response handling
    if (hasContextualReference && referencedItems.length >= 2) {
      const item1 = referencedItems[0];
      const item2 = referencedItems[1];
      
      console.log(`QUICK RESPONSE: ${item1} vs ${item2}`);
      
      // Fast nutrition comparison responses
      if (input.includes('healthy fat') || input.includes('fat')) {
        if (item1 === 'avocado' || item2 === 'avocado') {
          return `Between ${item1} and ${item2}, avocado has much more healthy fats! 🥑 Avocados contain about 15g of heart-healthy monounsaturated fats, while ${item1 === 'avocado' ? item2 : item1} has minimal fat content.`;
        }
        return `For healthy fats, comparing ${item1} vs ${item2}...`;
      }
      if (input.includes('protein')) {
        return `Protein comparison: ${item1} vs ${item2}...`;
      }
      if (input.includes('calorie')) {
        return `Calorie content: ${item1} vs ${item2}...`;
      }
      if (input.includes('vitamin') || input.includes('nutrient')) {
        return `Nutritional comparison of ${item1} and ${item2}...`;
      }
      if (input.includes('better') || input.includes('healthier')) {
        return `Between ${item1} and ${item2}, both have benefits. Let me explain...`;
      }
      
      return `Continuing about ${item1} and ${item2}...`;
    }
    // Removed problematic previousContext reference that was undefined
    
    // Direct food comparison detection (for questions like "is avocado better than pasta")
    const foods = ['avocado', 'pasta', 'rice', 'chicken', 'salmon', 'egg', 'apple', 'banana', 'bread', 'cheese', 'milk'];
    const mentionedFoods = foods.filter(food => input.includes(food));
    
    console.log('🔍 FOOD COMPARISON DEBUG:', {
      input,
      mentionedFoods,
      hasEnoughFoods: mentionedFoods.length >= 2,
      hasBetter: input.includes('better'),
      shouldTrigger: mentionedFoods.length >= 2 && (input.includes('better') || input.includes('vs') || input.includes('versus') || input.includes('compare'))
    });
    
    if (mentionedFoods.length >= 2 && (input.includes('better') || input.includes('vs') || input.includes('versus') || input.includes('compare'))) {
      const food1 = mentionedFoods[0];
      const food2 = mentionedFoods[1];
      
      // Specific comparisons
      if ((food1 === 'avocado' || food2 === 'avocado') && (food1 === 'pasta' || food2 === 'pasta')) {
        return `Great question! Avocado and pasta serve different nutritional purposes. 🥑 Avocado is rich in healthy fats, fiber, and vitamins, while pasta provides energy through carbohydrates. For overall nutrition density, avocado wins with its heart-healthy monounsaturated fats and potassium. But pasta is perfect for quick energy! What specific aspect interests you - calories, nutrients, or cooking uses?`;
      }
      
      return `Interesting comparison between ${food1} and ${food2}! Both have unique nutritional benefits. What specific aspect would you like me to focus on - nutrition, taste, or cooking applications?`;
    }
    
    // Context-aware responses based on conversation flow
    if (input.includes('food') || input.includes('cook') || input.includes('recipe') || input.includes('eat')) {
      if (userPreferences.anime && userPreferences.food) {
        return `${userName ? `${userName}, ` : ''}Since we've been talking about both food and anime, have you noticed how beautifully food is portrayed in anime? What's your favorite food scene from an anime?`;
      }
      const responses = [
        `${userName ? `Great question, ${userName}! ` : ''}That sounds delicious! Based on our chat, what's your favorite cuisine?`,
        "Cooking is such a wonderful skill! Are you looking for recipe suggestions?",
        "Food brings people together! What are you in the mood to cook today?",
        `${userName ? `${userName}, ` : ''}I'd love to help you with cooking tips! What dish are you thinking about?`,
        "There's nothing better than a good meal! Tell me more about what you're craving."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Anime related responses with context
    if (input.includes('anime') || input.includes('manga') || input.includes('naruto') || input.includes('tanjiro') || input.includes('deku')) {
      if (userPreferences.food && userPreferences.anime) {
        return `${userName ? `${userName}, ` : ''}I love how we've been discussing both anime and food! Have you ever tried making dishes from your favorite anime series?`;
      }
      const responses = [
        `${userName ? `${userName}, ` : ''}anime is amazing! Which series are you watching right now?`,
        "I love anime too! The storytelling and animation are incredible.",
        "That's a great anime choice! What did you think of the latest episodes?",
        "Anime characters are so inspiring! Who's your favorite character?",
        `${userName ? `Based on our chat, ${userName}, ` : ''}the anime world has so many amazing stories! What genre do you prefer?`
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Gaming related responses with context
    if (input.includes('game') || input.includes('play') || input.includes('gaming')) {
      const responses = [
        `${userName ? `${userName}, ` : ''}games are so much fun! What type of games do you enjoy playing?`,
        "I'd love to hear about your gaming adventures! What's your current favorite?",
        "Gaming is a great way to relax and have fun! Any recommendations for me?",
        "That sounds like an exciting game! How long have you been playing it?",
        "Games can be so immersive! What draws you to that particular game?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Greeting responses with context awareness
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      if (messageHistory.length > 5) {
        return `${userName ? `Hello again, ${userName}! ` : 'Hello again! '}It's great to continue our conversation. What would you like to talk about next?`;
      }
      return `${userName ? `Hello, ${userName}! ` : 'Hello! '}I'm so happy to chat with you today! What would you like to talk about?`;
    }
    
    if (input.includes('how are you') || input.includes('how\'s it going')) {
      return `${userName ? `${userName}, ` : ''}I'm doing great, thank you for asking! I'm really enjoying our conversation. How are you doing today?`;
    }
    
    if (input.includes('thank you') || input.includes('thanks')) {
      return `${userName ? `You're very welcome, ${userName}! ` : 'You\'re very welcome! '}I'm here to help whenever you need it. Is there anything else you'd like to chat about?`;
    }
    
    if (input.includes('help') || input.includes('support')) {
      const topics = [];
      if (userPreferences.food) topics.push('food and cooking');
      if (userPreferences.anime) topics.push('anime');
      if (userPreferences.gaming) topics.push('games');
      
      if (topics.length > 0) {
        return `${userName ? `${userName}, ` : ''}I'm here to help! I see we've been chatting about ${topics.join(', ')}. Feel free to ask me more about these topics or anything else on your mind!`;
      }
      return "I'm here to help! You can ask me about food, cooking, anime, games, or just chat about anything on your mind!";
    }
    
    // Contextual responses based on conversation history
    const recentTopics = messageHistory.slice(-5).map(m => m.content.toLowerCase());
    const hasFood = recentTopics.some(t => t.includes('food') || t.includes('cook'));
    const hasAnime = recentTopics.some(t => t.includes('anime') || t.includes('manga'));
    const hasGaming = recentTopics.some(t => t.includes('game') || t.includes('play'));
    
    if (hasFood && hasAnime) {
      return `${userName ? `${userName}, ` : ''}that's interesting! I love how anime often features amazing food scenes. Have you seen any cooking anime like Shokugeki no Soma?`;
    } else if (hasFood && hasGaming) {
      return `${userName ? `${userName}, ` : ''}I notice you enjoy both food and gaming! Have you played any cooking games or food-themed games?`;
    } else if (hasAnime && hasGaming) {
      return `${userName ? `${userName}, ` : ''}anime and gaming - great combination! Have you played any games based on anime series?`;
    } else if (hasFood) {
      return `${userName ? `${userName}, ` : ''}I love our food conversation! Cooking is such a creative and rewarding activity. What's your next culinary adventure?`;
    } else if (hasAnime) {
      return `${userName ? `${userName}, ` : ''}anime discussions are the best! There are so many incredible series with unique stories and characters.`;
    } else if (hasGaming) {
      return `${userName ? `${userName}, ` : ''}gaming is such an amazing hobby! What draws you to the games you play?`;
    }
    
    // Context-aware generic responses
    const contextualResponses = [
      `${userName ? `${userName}, ` : ''}that's really interesting! Based on our chat, tell me more about that.`,
      `${userName ? `I appreciate you sharing that with me, ${userName}! ` : 'I appreciate you sharing that with me! '}What's your thoughts on it?`,
      "That sounds fascinating! I'd love to hear your perspective.",
      `${userName ? `Thanks for chatting with me, ${userName}! ` : 'Thanks for chatting with me! '}What else is on your mind today?`,
      "That's a great point! I enjoy our conversations so much.",
      `${userName ? `${userName}, ` : ''}I'm here to listen and chat! What would you like to explore next?`
    ];
    
    return contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
  }, []);

  // Generate conversation summary for long conversations with better context
  const generateSummary = useCallback(async (allMessages: Message[]): Promise<string> => {
    if (allMessages.length < 4) return ''; // Lower threshold for faster context building
    
    try {
      // Extract key information from conversation
      const userMessages = allMessages.filter(m => m.role === 'user');
      const assistantMessages = allMessages.filter(m => m.role === 'assistant');
      
      // Find user's name if mentioned
      const nameMatch = allMessages.map(m => m.content.toLowerCase()).join(' ').match(/my name is (\w+)|i'm (\w+)|call me (\w+)/);
      const userName = nameMatch ? (nameMatch[1] || nameMatch[2] || nameMatch[3]) : '';
      
      // Identify main topics discussed
      const allContent = allMessages.map(m => m.content.toLowerCase()).join(' ');
      const topics = [];
      if (allContent.includes('food') || allContent.includes('cook') || allContent.includes('recipe')) topics.push('food/cooking');
      if (allContent.includes('anime') || allContent.includes('manga')) topics.push('anime');
      if (allContent.includes('game') || allContent.includes('play') || allContent.includes('gaming')) topics.push('gaming');
      
      // Create context-rich summary prompt
      let summaryPrompt = `Create a detailed conversation summary for context carryover. This summary will be used in future conversations to maintain continuity. Include:

ESSENTIAL CONTEXT:
1. User's name/identity: ${userName || 'not mentioned yet'}
2. Main topics discussed: ${topics.join(', ') || 'introductory conversation'}
3. User's specific interests, preferences, and goals mentioned
4. Any ongoing projects, questions, or learning objectives
5. Conversational style and personality traits observed
6. Key facts about the user shared during conversation

CONVERSATION FLOW:
- How the conversation started and developed
- Main questions asked and key answers provided
- Any advice given or information shared
- Current conversation state and next logical topics

This summary should help maintain conversation continuity and context across sessions.

Conversation to summarize:\n`;
      
      // Include more context for better summarization
      const contextMessages = [
        ...allMessages.slice(0, 4),  // First few messages for introduction context
        ...allMessages.slice(-8)    // Recent messages for current context
      ];
      
      summaryPrompt += contextMessages.map(m => `${m.role}: ${m.content}`).join('\n');
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/voice-chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            message: summaryPrompt,
            conversationHistory: [],
            isInternalSummary: true
          }),
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log('Generated conversation summary:', data.reply);
        return data.reply || '';
      }
    } catch (error) {
      console.error('Failed to generate summary:', error);
      
      // Create a basic local summary as fallback
      const userMessages = allMessages.filter(m => m.role === 'user');
      const allContent = allMessages.map(m => m.content.toLowerCase()).join(' ');
      const topics = [];
      if (allContent.includes('food') || allContent.includes('cook')) topics.push('food/cooking');
      if (allContent.includes('anime') || allContent.includes('manga')) topics.push('anime');
      if (allContent.includes('game') || allContent.includes('gaming')) topics.push('gaming');
      
      const nameMatch = allContent.match(/my name is (\w+)|i'm (\w+)|call me (\w+)/);
      const userName = nameMatch ? (nameMatch[1] || nameMatch[2] || nameMatch[3]) : '';
      
      return `Conversation with ${userName || 'user'} about ${topics.length > 0 ? topics.join(', ') : 'various topics'}. ${userMessages.length} user messages exchanged.`;
    }
    
    return '';
  }, []);

  const speakText = useCallback((text: string) => {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    
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
  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    console.log('=== VoiceBot Message Handling Debug ===');
    console.log('Input text:', text);
    console.log('Current messages count:', messages.length);

    // Debug: Check configuration
    console.log('=== VoiceBot Configuration Debug ===');
    console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('VITE_SUPABASE_PUBLISHABLE_KEY:', import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ? 'SET' : 'MISSING');

    setIsProcessing(true);
    
    // Update conversation context with new message
    const userMessage: Message = { 
      role: 'user', 
      content: text,
      timestamp: Date.now()
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
    // DISABLED FOR PERFORMANCE: Update context manager
    // const currentContext = ConversationContextManager.updateContext(updatedMessages);
    // Create better context from actual conversation instead of hardcoded values
    const allContent = updatedMessages.map(m => m.content.toLowerCase()).join(' ');
    
    // Extract user's name if mentioned
    const nameMatch = allContent.match(/my name is (\w+)|i'm (\w+)|call me (\w+)/);
    const extractedUserName = nameMatch ? (nameMatch[1] || nameMatch[2] || nameMatch[3]) : '';
    
    // Analyze conversation for interests
    const analyzedInterests = {
      food: allContent.includes('food') || allContent.includes('cook') || allContent.includes('recipe') || allContent.includes('eat'),
      anime: allContent.includes('anime') || allContent.includes('manga') || allContent.includes('naruto') || allContent.includes('tanjiro'),
      gaming: allContent.includes('game') || allContent.includes('play') || allContent.includes('gaming'),
      nutrition: allContent.includes('nutrition') || allContent.includes('healthy') || allContent.includes('vitamin'),
      learning: allContent.includes('learn') || allContent.includes('how to') || allContent.includes('teach')
    };
    
    // Extract recent topics from last few messages
    const recentMessagesForTopics = updatedMessages.slice(-5);
    const extractedTopics = recentMessagesForTopics.map(m => {
      const content = m.content.toLowerCase();
      const topics = [];
      if (content.includes('food') || content.includes('cook')) topics.push('food');
      if (content.includes('anime')) topics.push('anime');
      if (content.includes('game')) topics.push('gaming');
      if (content.includes('healthy') || content.includes('nutrition')) topics.push('health');
      return topics;
    }).flat();
    
    const currentContext = {
      userName: extractedUserName,
      interests: analyzedInterests,
      recentTopics: extractedTopics,
      conversationLength: updatedMessages.length,
      lastInteraction: Date.now(),
      sessionId: 'fast-session',
      lastMessages: updatedMessages.slice(-3),
      preferences: {}
    };
    
    setIsListening(false); // Stop listening while processing
    
    // Get recent messages for context (limit to last N messages) - define outside try/catch
    const recentMessages = updatedMessages.slice(-CONTEXT_WINDOW);
    
    // DISABLED FOR PERFORMANCE: Heavy context summary - define outside try/catch
    // const contextSummary = ConversationContextManager.getConversationSummary();
    const contextSummary = 'Context disabled for performance';
    
    try {
      
      let contextPayload: any = {
        message: text,
        conversationHistory: recentMessages.slice(0, -1), // Exclude current message
        conversationMetadata: {
          messageCount: updatedMessages.length,
          userName: currentContext.userName,
          hasLongHistory: updatedMessages.length > 10,
          sessionId: currentContext.sessionId,
          contextWindow: CONTEXT_WINDOW,
          totalStoredMessages: messages.length,
          interests: currentContext.interests,
          recentTopics: currentContext.recentTopics
        },
        conversationSummary: contextSummary,
        persistentContext: {
          userPreferences: currentContext.interests,
          conversationContinuity: true,
          lastInteractionTime: currentContext.lastInteraction
        }
      };
      
      console.log('=== ENHANCED CONTEXT DEBUG ===');
      console.log('Total messages in conversation:', updatedMessages.length);
      console.log('Recent messages being sent:', recentMessages.length);
      console.log('Context summary:', contextSummary);
      console.log('User interests:', currentContext.interests);
      console.log('Recent topics:', currentContext.recentTopics);
      console.log('Context payload size:', JSON.stringify(contextPayload).length);
      
      // Generate new summary less frequently for better performance  
      if (updatedMessages.length > 0 && updatedMessages.length % 10 === 0) { // Reduced frequency for speed
        console.log('Generating conversation summary at message', updatedMessages.length);
        const newSummary = await generateSummary(updatedMessages);
        if (newSummary) {
          setConversationSummary(newSummary);
          contextPayload.conversationSummary = newSummary;
          console.log('Updated conversation summary:', newSummary);
        }
      }

      // Try Supabase edge function first, fallback to local implementation
      console.log('=== API Call Debug ===');
      console.log('About to call Supabase edge function with payload:', JSON.stringify(contextPayload, null, 2));
      
      let response;
      try {
        // TEMPORARY: Force local fallback for debugging
        throw new Error('FALLBACK_TO_LOCAL');
        // TEMPORARY: Force local fallback for debugging
        throw new Error('FALLBACK_TO_LOCAL');
        response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/voice-chat`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            },
            body: JSON.stringify(contextPayload),
          }
        );

        console.log('API Response Status:', response.status);
        console.log('API Response Headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error Response:', errorText);
          
          // If the error is configuration-related, fall back to local response
          if (response.status === 500 || errorText.includes('LOVABLE_API_KEY')) {
            throw new Error('FALLBACK_TO_LOCAL');
          }
          
          let errorData;
          try {
            errorData = JSON.parse(errorText);
          } catch {
            errorData = { error: errorText };
          }
          
          throw new Error(errorData.error || `Request failed: ${response.status} - ${errorText}`);
        }

        // Success case: process the response
        console.log('API call successful, processing response...');
        const data = await response.json();
        console.log('Response data:', data);
        const assistantMessage: Message = { 
          role: 'assistant', 
          content: data.reply,
          timestamp: Date.now()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setCurrentResponse(data.reply);
        speakText(data.reply);
        console.log('Response processed successfully:', data.reply);
        
      } catch (fetchError) {
        console.error('=== API ERROR DETAILS ===');
        console.error('Error type:', fetchError.constructor.name);
        console.error('Error message:', fetchError.message);
        console.error('Full error:', fetchError);
        console.warn('Supabase edge function not available, using local fallback:', fetchError);
        
        // Show a one-time notification about fallback mode
        if (!localStorage.getItem('voicebot_fallback_notified')) {
          toast({
            title: "Local Mode",
            description: "Using local responses. Configure Supabase for AI-powered chat.",
            variant: "default",
          });
          localStorage.setItem('voicebot_fallback_notified', 'true');
        }
        
        // Enhanced local fallback with comprehensive context
        console.log('Using enhanced local fallback with persistent context');
        console.log('=== ENHANCED LOCAL FALLBACK DEBUG ===');
        console.log('Current context summary:', contextSummary);
        console.log('🔧 ABOUT TO CALL generateLocalResponse with:', { text, recentMessagesLength: recentMessages.length, hasContext: !!currentContext });
        const localResponse = await generateLocalResponse(text, recentMessages, currentContext);
        console.log('Generated enhanced local response:', localResponse);
        
        const assistantMessage: Message = { 
          role: 'assistant', 
          content: localResponse,
          timestamp: Date.now()
        };
        
        // Update context with assistant response too
        const finalMessages = [...updatedMessages, assistantMessage];
        // ConversationContextManager.updateContext(finalMessages); // Disabled for performance
        
        setMessages(finalMessages);
        setCurrentResponse(localResponse);
        speakText(localResponse);
        
        // Generate summary less frequently for better performance
        if (finalMessages.length >= 8 && finalMessages.length % 8 === 0) {
          console.log('Generating context summary for continuity at message', finalMessages.length);
          // const newSummary = ConversationContextManager.getConversationSummary(); // Disabled for performance
          // setConversationSummary(newSummary); // Disabled for performance
        }
        
        setIsProcessing(false);
        return;
      }

    } catch (error) {
      console.error('Voice chat error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get response",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [messages, conversationSummary, generateSummary, speakText, toast]);

  // Initialize speech recognition with platform-specific optimizations
  useEffect(() => {
    const initializeSpeechRecognition = () => {
      const support = getSpeechRecognitionSupport();
      setSpeechSupport(support);
      
      console.log('=== Speech Recognition Support Debug ===');
      console.log('Platform:', support.platform);
      console.log('Browser:', support.browser);
      console.log('Has API:', support.hasAPI);
      console.log('Is Supported:', support.isSupported);
      console.log('Is Mobile:', isMobile());
      console.log('Is Android:', isAndroid());
      console.log('Is Windows:', isWindows());
      console.log('Is Edge:', isEdge());
      console.log('Is HTTPS:', location.protocol === 'https:');
      
      if (!support.hasAPI) {
        console.error('Speech Recognition API not available');
        return;
      }
      
      if (!support.isSupported) {
        console.warn('Speech Recognition not fully supported on this platform/browser');
      }
      
      const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognitionClass) {
        try {
          recognitionRef.current = new SpeechRecognitionClass();
          
          // Platform-specific configuration
          if (isAndroid()) {
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false; // More reliable on Android
          } else if (isWindows() && isEdge()) {
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = true; // Edge on Windows works well with interim results
          } else {
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = true;
          }
          
          recognitionRef.current.lang = 'en-US';
          
          recognitionRef.current.onstart = () => {
            console.log('Speech recognition started');
            setIsListening(true);
            setRetryCount(0);
          };

          recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
            console.log('Speech recognition result:', event);
            
            try {
              const current = event.resultIndex;
              if (event.results && event.results[current] && event.results[current][0]) {
                const result = event.results[current][0];
                const transcriptText = result.transcript?.trim() || '';
                
                console.log('Transcript:', transcriptText, 'Confidence:', result.confidence, 'isFinal:', event.results[current].isFinal);
                
                if (transcriptText) {
                  setTranscript(transcriptText);
                  
                  // On Android, process immediately due to different behavior
                  if (isAndroid() || event.results[current].isFinal) {
                    handleSendMessage(transcriptText);
                  }
                }
              }
            } catch (error) {
              console.error('Error processing speech result:', error);
            }
          };

          recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
            console.error('Speech recognition error:', event.error, event);
            setIsListening(false);
            
            switch (event.error) {
              case 'not-allowed':
                setMicPermissionGranted(false);
                toast({
                  title: "Microphone Access Denied",
                  description: isAndroid() 
                    ? "Please enable microphone access in your browser settings and refresh the page." 
                    : "Please enable microphone access to use voice features.",
                  variant: "destructive",
                });
                break;
              case 'no-speech':
                toast({
                  title: "No Speech Detected",
                  description: "Please try speaking again. Make sure you're close to the microphone.",
                  variant: "default",
                });
                break;
              case 'audio-capture':
                toast({
                  title: "Microphone Error",
                  description: "Could not access microphone. Please check your device settings.",
                  variant: "destructive",
                });
                break;
              case 'network':
                toast({
                  title: "Network Error",
                  description: "Speech recognition requires an internet connection.",
                  variant: "destructive",
                });
                break;
              case 'aborted':
                // Silent - user stopped manually
                break;
              default:
                toast({
                  title: "Speech Recognition Error",
                  description: `Error: ${event.error}. Please try again.`,
                  variant: "destructive",
                });
            }
          };

          recognitionRef.current.onend = () => {
            console.log('Speech recognition ended');
            setIsListening(false);
          };
          
        } catch (error) {
          console.error('Failed to initialize speech recognition:', error);
        }
      }
    };
    
    // Initialize with delay for mobile browsers
    const timeoutId = setTimeout(initializeSpeechRecognition, isMobile() ? 500 : 100);
    
    return () => {
      clearTimeout(timeoutId);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (error) {
          console.error('Error aborting speech recognition:', error);
        }
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  const startListening = useCallback(async () => {
    console.log('=== Starting Speech Recognition ===');
    console.log('Recognition ref:', !!recognitionRef.current);
    console.log('Is listening:', isListening);
    console.log('Speech support:', speechSupport);
    
    if (!speechSupport.hasAPI || !recognitionRef.current) {
      const message = !speechSupport.hasAPI 
        ? `Speech recognition is not supported in ${speechSupport.browser} on ${speechSupport.platform}.`
        : "Speech recognition failed to initialize. Please refresh the page.";
      
      toast({
        title: "Not Supported",
        description: isAndroid() 
          ? "Please use Chrome browser for voice features on Android, or Chrome/Edge on Windows." 
          : message,
        variant: "destructive",
      });
      return;
    }
    
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
      toast({
        title: "HTTPS Required",
        description: "Voice features require a secure connection (HTTPS).",
        variant: "destructive",
      });
      return;
    }

    try {
      // Check permission first, request if needed
      const permissionStatus = await checkMicrophonePermission();
      
      if (permissionStatus === 'denied') {
        toast({
          title: "Microphone Access Denied",
          description: "Please enable microphone access in browser settings to use voice features.",
          variant: "destructive",
        });
        return;
      }
      
      // If permission not granted yet, request it (this will show browser popup)
      if (!micPermissionGranted || permissionStatus === 'prompt') {
        const granted = await requestMicrophonePermission();
        if (!granted) {
          return; // Permission request failed, error already shown
        }
      }
      
      console.log('Microphone permission confirmed, starting recognition...');
      
      // Clear previous transcript
      setTranscript('');
      
      // Ensure recognition is not already running
      if (isListening && recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          console.log('Recognition abort failed (expected):', e);
        }
      }
      
      // Add delay for mobile browsers
      setTimeout(() => {
        if (recognitionRef.current) {
          try {
            console.log('Attempting to start speech recognition...');
            recognitionRef.current.start();
            setIsListening(true);
          } catch (error) {
            console.error('Failed to start recognition:', error);
            setIsListening(false);
            
            if (retryCount < 2) {
              console.log('Retrying speech recognition...', retryCount + 1);
              setRetryCount(prev => prev + 1);
              setTimeout(() => startListening(), 1000);
            } else {
              toast({
                title: "Speech Recognition Error",
                description: "Failed to start voice recognition. Please try again.",
                variant: "destructive",
              });
            }
          }
        }
      }, isAndroid() ? 300 : 100);
      
    } catch (error) {
      console.error('Microphone access error:', error);
      setMicPermissionGranted(false);
      setIsListening(false);
      
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      if (errorMessage.includes('Permission denied') || errorMessage.includes('NotAllowedError')) {
        toast({
          title: "Microphone Access Denied",
          description: isAndroid() 
            ? "Please enable microphone access in your browser settings, then refresh the page." 
            : "Please enable microphone access and try again.",
          variant: "destructive",
        });
      } else if (errorMessage.includes('NotFoundError')) {
        toast({
          title: "No Microphone Found",
          description: "Please connect a microphone and try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Microphone Error",
          description: `Could not access microphone: ${errorMessage}`,
          variant: "destructive",
        });
      }
    }
  }, [toast, speechSupport, isListening, retryCount]);

  const stopListening = useCallback(() => {
    console.log('Stopping speech recognition...');
    
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping recognition:', error);
        try {
          recognitionRef.current.abort();
        } catch (abortError) {
          console.error('Error aborting recognition:', abortError);
        }
      }
    }
    
    setIsListening(false);
    setTranscript('');
  }, [isListening]);



  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform"
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
            className="fixed bottom-24 right-6 z-50 w-80 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-primary-foreground text-sm">AI Voice Assistant</h3>
                  <p className="text-xs text-primary-foreground/80">Tap the mic to speak</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages area */}
            <div className="h-64 overflow-y-auto p-4 space-y-3 bg-background">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground text-sm py-8">
                  <p>👋 Hi! I'm your AI assistant.</p>
                  <p className="mt-2">Tap the microphone and ask me anything!</p>
                  {conversationSummary && (
                    <p className="mt-2 text-xs opacity-70">Continuing our previous conversation...</p>
                  )}
                  {!speechSupport.isSupported && (
                    <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-800 rounded-lg">
                      <p className="text-xs text-yellow-800 dark:text-yellow-200">
                        ⚠️ Voice features work best in Chrome or Edge browser
                        {isAndroid() && " on Android devices"}
                      </p>
                    </div>
                  )}
                  {!micPermissionGranted && speechSupport.hasAPI && (
                    <div className="mt-2 p-3 bg-blue-100 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-800 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-blue-800 dark:text-blue-200 font-medium">
                            🎤 Microphone access required for voice chat
                          </p>
                          <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                            Click to enable voice features
                          </p>
                        </div>
                        <Button
                          onClick={requestMicrophonePermission}
                          size="sm"
                          className="ml-2 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1"
                        >
                          Enable Mic
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {conversationSummary && messages.length > 0 && (
                <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded-lg border-l-2 border-primary/30">
                  <span className="font-medium">Previous context:</span> {conversationSummary.substring(0, 100)}{conversationSummary.length > 100 && '...'}
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
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-muted text-foreground rounded-bl-md'
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
                  <div className="bg-muted px-4 py-2 rounded-2xl rounded-bl-md flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Transcript display */}
            {transcript && (
              <div className="px-4 py-2 bg-muted/50 border-t border-border">
                <p className="text-xs text-muted-foreground">Hearing: "{transcript}"</p>
              </div>
            )}

            {/* Controls */}
            <div className="p-4 border-t border-border bg-card flex items-center justify-center gap-4">
              {isSpeaking && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={stopSpeaking}
                  className="text-xs"
                >
                  Stop Speaking
                </Button>
              )}
              
              <motion.button
                onClick={isListening ? stopListening : startListening}
                disabled={isProcessing || isSpeaking || !speechSupport.hasAPI}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                  !speechSupport.hasAPI
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : isListening
                    ? 'bg-destructive text-destructive-foreground animate-pulse'
                    : isProcessing || isSpeaking
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
                whileHover={!isProcessing && !isSpeaking && speechSupport.hasAPI ? { scale: 1.05 } : {}}
                whileTap={!isProcessing && !isSpeaking && speechSupport.hasAPI ? { scale: 0.95 } : {}}
                title={
                  !speechSupport.hasAPI 
                    ? `Voice not supported in ${speechSupport.browser} on ${speechSupport.platform}` 
                    : isListening 
                    ? "Stop listening" 
                    : "Start voice input"
                }
              >
                {!speechSupport.hasAPI ? (
                  <MicOff className="w-6 h-6" />
                ) : isListening ? (
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
};

export default VoiceBot;
