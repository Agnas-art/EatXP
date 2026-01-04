import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, X, MessageCircle, Loader2, Send, Type, Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

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

// Enhanced spell checker for food-related terms - moved outside component to avoid re-creation
const FOOD_SPELL_CORRECTIONS: { [key: string]: string } = {
  'receipe': 'recipe',
  'recepie': 'recipe', 
  'recipie': 'recipe',
  'recepy': 'recipe',
  'bannana': 'banana',
  'banna': 'banana',
  'avacado': 'avocado',
  'avocodo': 'avocado',
  'quinao': 'quinoa',
  'qinoa': 'quinoa',
  'tommato': 'tomato',
  'tomatoe': 'tomato',
  'potatoe': 'potato',
  'carrotts': 'carrots',
  'spinich': 'spinach',
  'brocolli': 'broccoli',
  'brocoli': 'broccoli',
  'protien': 'protein',
  'protean': 'protein',
  'vitimins': 'vitamins',
  'vitamine': 'vitamin',
  'nutricious': 'nutritious',
  'nutrious': 'nutritious',
  'healty': 'healthy',
  'helthy': 'healthy',
  'recipies': 'recipes',
  'vegitable': 'vegetable',
  'vegtable': 'vegetable'
};

const VoiceBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [textInput, setTextInput] = useState('');
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [conversationSummary, setConversationSummary] = useState<string>('');
  const [speechSupport, setSpeechSupport] = useState(getSpeechRecognitionSupport());
  const [micPermissionGranted, setMicPermissionGranted] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast(); // Move this to the top before any useCallback that uses it

  // Enhanced text input handler with auto-correction
  const handleTextInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setTextInput(rawValue);
    
    // Auto-correct on space or punctuation
    if (rawValue.endsWith(' ') || /[.,!?]$/.test(rawValue)) {
      // Use FOOD_SPELL_CORRECTIONS directly instead of autoCorrectText to avoid dependencies
      let correctedText = rawValue;
      Object.entries(FOOD_SPELL_CORRECTIONS).forEach(([wrong, correct]) => {
        const regex = new RegExp(`\\b${wrong}\\b`, 'gi');
        correctedText = correctedText.replace(regex, correct);
      });
      
      if (correctedText !== rawValue) {
        setTextInput(correctedText);
        // Optional: Show a brief toast for corrections
        if (correctedText.trim() !== rawValue.trim()) {
          toast({
            description: `Auto-corrected text`,
            duration: 1000
          });
        }
      }
    }
  }, [toast]);

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
  }, [toast]); // Remove checkMicrophonePermission to avoid circular dependency

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

  // AI-powered food menu generator
  const generateFoodMenu = useCallback((requestType: string, originalQuestion: string): string => {
    const request = originalQuestion.toLowerCase();
    
    // Determine menu type based on user request
    const isBreakfast = request.includes('breakfast') || request.includes('morning');
    const isLunch = request.includes('lunch') || request.includes('afternoon');
    const isDinner = request.includes('dinner') || request.includes('evening');
    const isSnack = request.includes('snack') || request.includes('light');
    const isHealthy = request.includes('healthy') || request.includes('diet') || request.includes('nutrition');
    const isVegetarian = request.includes('vegetarian') || request.includes('veg') || request.includes('plant');
    const isProtein = request.includes('protein') || request.includes('muscle') || request.includes('workout');
    const isQuick = request.includes('quick') || request.includes('easy') || request.includes('fast');
    const isTraditional = request.includes('traditional') || request.includes('indian') || request.includes('desi');
    const isWeight = request.includes('weight') || request.includes('loss') || request.includes('diet');
    const isDiabetic = request.includes('diabetic') || request.includes('sugar') || request.includes('low carb');

    let menu = `🍽️ **Personalized Food Menu**\n\n`;

    if (isBreakfast) {
      menu += `**🌅 Healthy Breakfast Options:**\n`;
      if (isHealthy || isWeight) {
        menu += `• **Millet Porridge** (Ragi/Bajra) with nuts and berries\n• **Vegetable Omelet** with spinach and tomatoes\n• **Greek Yogurt Bowl** with chia seeds and seasonal fruits\n• **Oat Upma** with vegetables and curry leaves\n• **Quinoa Khichdi** with moong dal and ghee\n`;
      } else if (isVegetarian) {
        menu += `• **Poha** with peanuts and curry leaves\n• **Idli-Sambhar** with coconut chutney\n• **Stuffed Paratha** (aloo/gobi) with yogurt\n• **Besan Cheela** with green vegetables\n• **Upma** with vegetables and cashews\n`;
      } else {
        menu += `• **Scrambled Eggs** with whole wheat toast\n• **Paneer Sandwich** with vegetables\n• **Smoothie Bowl** with banana and nuts\n• **Masala Dosa** with sambhar\n• **Overnight Oats** with fruits and honey\n`;
      }
    }
    
    if (isLunch) {
      menu += `**☀️ Nutritious Lunch Options:**\n`;
      if (isHealthy || isWeight) {
        menu += `• **Quinoa Salad** with mixed vegetables and chickpeas\n• **Brown Rice Bowl** with dal and seasonal vegetables\n• **Grilled Chicken/Paneer** with steamed broccoli\n• **Millet Khichdi** with ghee and pickle\n• **Vegetable Soup** with whole grain bread\n`;
      } else if (isTraditional) {
        menu += `• **Complete Thali** - Rice, Dal, Sabzi, Roti, Raita\n• **Rajma-Chawal** with onion and pickle\n• **Chole-Bhature** with mint chutney\n• **Sambhar Rice** with papad and pickle\n• **Kadhi-Chawal** with jeera aloo\n`;
      } else {
        menu += `• **Grilled Fish/Chicken** with quinoa\n• **Vegetable Biryani** with raita\n• **Dal-Rice** with sabzi and pickle\n• **Wrap/Roll** with hummus and vegetables\n• **Pasta** with vegetables and olive oil\n`;
      }
    }
    
    if (isDinner) {
      menu += `**🌙 Light Dinner Options:**\n`;
      if (isHealthy || isWeight) {
        menu += `• **Vegetable Soup** with multigrain bread\n• **Grilled Vegetables** with quinoa\n• **Moong Dal Cheela** with mint chutney\n• **Steamed Fish** with lemon and herbs\n• **Millet Kheer** (dessert option)\n`;
      } else if (isDiabetic) {
        menu += `• **Cauliflower Rice** with dal\n• **Grilled Chicken** with salad\n• **Methi Paratha** (small portion) with yogurt\n• **Vegetable Curry** with minimal oil\n• **Nuts and Seeds** mix (small portion)\n`;
      } else {
        menu += `• **Roti-Sabzi** with dal\n• **Khichdi** with ghee and pickle\n• **Grilled Paneer** with vegetables\n• **Soup and Salad** combination\n• **Idli-Sambhar** (light portion)\n`;
      }
    }
    
    if (isSnack || (!isBreakfast && !isLunch && !isDinner)) {
      menu += `**🍿 Healthy Snack Options:**\n`;
      if (isProtein) {
        menu += `• **Mixed Nuts** (almonds, walnuts, cashews)\n• **Boiled Eggs** with black pepper\n• **Greek Yogurt** with berries\n• **Paneer Cubes** with mint chutney\n• **Protein Smoothie** with banana\n`;
      } else if (isHealthy) {
        menu += `• **Fruit Salad** with chat masala\n• **Vegetable Sticks** with hummus\n• **Roasted Chickpeas** (chana)\n• **Coconut Water** with lime\n• **Dates and Nuts** combination\n`;
      } else {
        menu += `• **Masala Peanuts** or mixed namkeen\n• **Fresh Fruits** seasonal variety\n• **Yogurt Lassi** (sweet/salty)\n• **Homemade Trail Mix**\n• **Green Tea** with biscuits\n`;
      }
    }

    // Add nutritional benefits section
    menu += `\n**🌟 Nutritional Benefits:**\n`;
    
    if (isWeight || isHealthy) {
      menu += `• **Millets** (Ragi, Bajra, Jowar): High fiber, low glycemic index, rich in minerals\n• **Quinoa**: Complete protein, gluten-free, high in fiber\n• **Legumes**: Plant protein, folate, iron, heart-healthy\n• **Nuts & Seeds**: Healthy fats, vitamin E, magnesium\n• **Vegetables**: Vitamins, minerals, antioxidants, low calories\n`;
    }
    
    if (isProtein) {
      menu += `• **Eggs**: Complete protein, choline for brain health\n• **Greek Yogurt**: High protein, probiotics for gut health\n• **Paneer**: Quality protein, calcium for bones\n• **Nuts**: Plant protein, healthy fats, vitamin E\n• **Legumes**: Protein + fiber combination\n`;
    }

    // Add cooking tips
    menu += `\n**👨‍🍳 Cooking Tips:**\n`;
    menu += `• Use **minimal oil** - prefer olive, sesame, or mustard oil\n• **Steam/Grill/Bake** instead of deep frying\n• Add **herbs and spices** for flavor and health benefits\n• Include **seasonal vegetables** for variety\n• **Hydrate well** with water, coconut water, or herbal teas\n`;

    // Special dietary considerations
    if (isDiabetic) {
      menu += `\n**🩺 Diabetic-Friendly Notes:**\n• Choose **low glycemic** foods like millets over white rice\n• **Portion control** is key - eat smaller, frequent meals\n• **Combine** proteins with carbs to slow sugar absorption\n• **Avoid** processed and sugary foods\n• **Monitor** blood sugar levels regularly\n`;
    }

    return menu;
  }, []);

  // AI-powered recipe suggestion generator
  const generateRecipeSuggestion = useCallback((requestedDish: string, originalQuestion: string): string => {
    const request = originalQuestion.toLowerCase();
    const dish = requestedDish.toLowerCase();
    
    // Determine recipe type and dietary preferences
    const isVegetarian = request.includes('vegetarian') || request.includes('veg') || request.includes('plant based');
    const isVegan = request.includes('vegan') || request.includes('plant only');
    const isHealthy = request.includes('healthy') || request.includes('nutritious') || request.includes('diet');
    const isQuick = request.includes('quick') || request.includes('easy') || request.includes('fast') || request.includes('simple');
    const isTraditional = request.includes('traditional') || request.includes('authentic') || request.includes('indian') || request.includes('desi');
    const isGlutenFree = request.includes('gluten free') || request.includes('gluten-free');
    const isKeto = request.includes('keto') || request.includes('low carb');
    const isProteinRich = request.includes('protein') || request.includes('muscle') || request.includes('fitness');
    
    // Recipe database with comprehensive coverage
    const recipes = {
      // Fruits recipes
      'apple': {
        title: isHealthy ? 'Baked Cinnamon Apples' : 'Apple Crisp',
        emoji: '🍎',
        time: isQuick ? '15 min' : '35 min',
        difficulty: 'Easy',
        ingredients: isHealthy ? 
          ['2 apples', 'Cinnamon', 'Oats', 'Walnuts', 'Honey', 'Coconut oil'] : 
          ['Apples', 'Brown sugar', 'Flour', 'Butter', 'Oats', 'Cinnamon'],
        steps: isHealthy ? [
          'Core apples and slice',
          'Mix oats, chopped walnuts, cinnamon',
          'Fill apple centers with oat mixture',
          'Drizzle with honey and melted coconut oil',
          'Bake at 375°F for 25 minutes until tender'
        ] : [
          'Slice apples and arrange in baking dish',
          'Mix brown sugar, flour, oats, cinnamon',
          'Cut in butter until mixture resembles crumbs',
          'Sprinkle over apples',
          'Bake at 350°F for 40 minutes until golden'
        ]
      },
      'banana': {
        title: isHealthy ? 'Banana Oat Smoothie' : isVegan ? 'Vegan Banana Bread' : 'Banana Pancakes',
        emoji: '🍌',
        time: isQuick ? '5 min' : '45 min',
        difficulty: 'Easy',
        ingredients: isHealthy ? 
          ['1 banana', 'Oats', 'Almond milk', 'Chia seeds', 'Vanilla', 'Cinnamon'] :
          isVegan ?
          ['Ripe bananas', 'Whole wheat flour', 'Oat milk', 'Coconut oil', 'Maple syrup', 'Baking powder'] :
          ['Bananas', 'Eggs', 'Flour', 'Milk', 'Baking powder', 'Vanilla'],
        steps: isHealthy ? [
          'Add all ingredients to blender',
          'Blend until smooth and creamy',
          'Add ice if desired consistency',
          'Pour into glass and enjoy immediately'
        ] : isVegan ? [
          'Mash bananas until smooth',
          'Mix flour, baking powder in separate bowl',
          'Combine wet and dry ingredients',
          'Pour into greased loaf pan',
          'Bake at 350°F for 45 minutes'
        ] : [
          'Mash bananas in bowl',
          'Beat in eggs, milk, vanilla',
          'Add flour and baking powder',
          'Cook small portions on griddle',
          'Flip when bubbles form'
        ]
      },
      // Vegetables recipes
      'spinach': {
        title: isTraditional ? 'Palak Paneer' : isHealthy ? 'Spinach Quinoa Salad' : 'Creamed Spinach',
        emoji: '🥬',
        time: isQuick ? '15 min' : '30 min',
        difficulty: isTraditional ? 'Medium' : 'Easy',
        ingredients: isTraditional ?
          ['Fresh spinach', 'Paneer', 'Onions', 'Tomatoes', 'Ginger-garlic', 'Garam masala', 'Cream'] :
          isHealthy ?
          ['Baby spinach', 'Cooked quinoa', 'Cherry tomatoes', 'Feta cheese', 'Olive oil', 'Lemon juice'] :
          ['Spinach', 'Heavy cream', 'Butter', 'Garlic', 'Nutmeg', 'Parmesan'],
        steps: isTraditional ? [
          'Blanch spinach and puree',
          'Sauté onions, ginger-garlic',
          'Add tomatoes and spices',
          'Mix in spinach puree and paneer',
          'Simmer and add cream before serving'
        ] : isHealthy ? [
          'Wash and dry baby spinach',
          'Mix with cooked quinoa',
          'Add halved cherry tomatoes',
          'Whisk olive oil with lemon juice',
          'Toss salad and top with feta'
        ] : [
          'Sauté garlic in butter',
          'Add spinach and cook until wilted',
          'Pour in cream and simmer',
          'Season with nutmeg and cheese',
          'Serve hot as side dish'
        ]
      },
      // Grains and millets
      'quinoa': {
        title: isHealthy ? 'Rainbow Quinoa Bowl' : 'Mediterranean Quinoa Salad',
        emoji: '🌾',
        time: '25 min',
        difficulty: 'Easy',
        ingredients: isHealthy ?
          ['Tricolor quinoa', 'Mixed vegetables', 'Chickpeas', 'Avocado', 'Tahini', 'Lemon'] :
          ['Quinoa', 'Cucumber', 'Cherry tomatoes', 'Olives', 'Feta cheese', 'Olive oil'],
        steps: isHealthy ? [
          'Cook quinoa according to package instructions',
          'Roast mixed vegetables with olive oil',
          'Prepare tahini dressing with lemon',
          'Combine quinoa, vegetables, chickpeas',
          'Top with avocado and tahini dressing'
        ] : [
          'Cook quinoa and let cool',
          'Dice cucumber and halve tomatoes',
          'Mix quinoa with vegetables and olives',
          'Add crumbled feta cheese',
          'Dress with olive oil and herbs'
        ]
      },
      'ragi': {
        title: isTraditional ? 'Ragi Mudde' : isHealthy ? 'Ragi Smoothie Bowl' : 'Ragi Cookies',
        emoji: '🌾',
        time: isTraditional ? '45 min' : '15 min',
        difficulty: isTraditional ? 'Medium' : 'Easy',
        ingredients: isTraditional ?
          ['Ragi flour', 'Water', 'Salt', 'Sambar', 'Ghee'] :
          isHealthy ?
          ['Ragi flour', 'Banana', 'Almond milk', 'Dates', 'Nuts', 'Seeds'] :
          ['Ragi flour', 'Jaggery', 'Ghee', 'Cardamom', 'Coconut'],
        steps: isTraditional ? [
          'Boil water with salt',
          'Slowly add ragi flour while stirring',
          'Cook until thick, smooth consistency',
          'Shape into balls with wet hands',
          'Serve hot with sambar and ghee'
        ] : isHealthy ? [
          'Blend ragi flour with almond milk',
          'Add banana and dates for sweetness',
          'Pour into bowl',
          'Top with nuts and seeds',
          'Enjoy as nutritious breakfast'
        ] : [
          'Mix ragi flour with melted jaggery',
          'Add ghee and cardamom',
          'Form small cookies',
          'Bake until golden brown',
          'Cool and store in airtight container'
        ]
      },
      // Nuts and seeds recipes
      'almonds': {
        title: isHealthy ? 'Almond Energy Balls' : 'Almond Butter',
        emoji: '🌰',
        time: isQuick ? '10 min' : '20 min',
        difficulty: 'Easy',
        ingredients: isHealthy ?
          ['Raw almonds', 'Dates', 'Cocoa powder', 'Chia seeds', 'Vanilla', 'Coconut flakes'] :
          ['Raw almonds', 'Pinch of salt', 'Optional: honey'],
        steps: isHealthy ? [
          'Soak dates until soft',
          'Blend almonds until coarse meal',
          'Add dates, cocoa, chia seeds',
          'Roll mixture into small balls',
          'Refrigerate for 30 minutes'
        ] : [
          'Roast almonds lightly',
          'Process in food processor until smooth',
          'Add salt and honey if desired',
          'Store in airtight container',
          'Use within 2 weeks'
        ]
      },
      // Oils recipes (cooking tips)
      'coconut oil': {
        title: 'Golden Turmeric Oil Pulling',
        emoji: '🥥',
        time: '5 min prep',
        difficulty: 'Easy',
        ingredients: ['Virgin coconut oil', 'Turmeric powder', 'Black pepper'],
        steps: [
          'Melt 1 tbsp coconut oil gently',
          'Mix in pinch of turmeric',
          'Add tiny pinch of black pepper',
          'Swish in mouth for 10-20 minutes',
          'Spit out and rinse with warm water'
        ]
      },
      // Generic healthy recipes
      'healthy': {
        title: 'Buddha Bowl',
        emoji: '🥗',
        time: '30 min',
        difficulty: 'Easy',
        ingredients: ['Quinoa', 'Roasted vegetables', 'Chickpeas', 'Avocado', 'Tahini', 'Lemon', 'Spinach'],
        steps: [
          'Cook quinoa according to package',
          'Roast mixed vegetables with olive oil',
          'Prepare tahini dressing',
          'Layer spinach in bowl',
          'Add quinoa, vegetables, chickpeas, avocado',
          'Drizzle with tahini dressing'
        ]
      }
    };
    
    // Find the best recipe match
    let selectedRecipe = null;
    let recipeKey = '';
    
    // Direct matches
    for (const [key, recipe] of Object.entries(recipes)) {
      if (dish.includes(key) || key.includes(dish)) {
        selectedRecipe = recipe;
        recipeKey = key;
        break;
      }
    }
    
    // If no direct match, suggest based on request type
    if (!selectedRecipe) {
      if (isHealthy || isVegetarian) {
        selectedRecipe = recipes['healthy'];
        recipeKey = 'healthy meal';
      } else {
        selectedRecipe = recipes['quinoa'];
        recipeKey = 'nutritious grain';
      }
    }
    
    // Generate the recipe response
    let response = `🍽️ **${selectedRecipe.title}** ${selectedRecipe.emoji}\n\n`;
    response += `⏱️ **Time:** ${selectedRecipe.time}\n`;
    response += `📊 **Difficulty:** ${selectedRecipe.difficulty}\n\n`;
    
    response += `**🛒 Ingredients:**\n`;
    selectedRecipe.ingredients.forEach(ingredient => {
      response += `• ${ingredient}\n`;
    });
    
    response += `\n**👨‍🍳 Instructions:**\n`;
    selectedRecipe.steps.forEach((step, index) => {
      response += `${index + 1}. ${step}\n`;
    });
    
    // Add nutritional benefits
    response += `\n**🌟 Why This Recipe is Great:**\n`;
    if (isHealthy) {
      response += `• **Nutrient-dense** ingredients for optimal health\n• **Balanced** macronutrients for sustained energy\n• **Antioxidants** to fight inflammation\n`;
    }
    if (isVegetarian || isVegan) {
      response += `• **Plant-based** protein and nutrients\n• **Environmentally friendly** food choices\n• **Fiber-rich** for digestive health\n`;
    }
    if (isProteinRich) {
      response += `• **High-quality protein** for muscle building\n• **Complete amino acids** for body repair\n• **Post-workout** nutrition support\n`;
    }
    if (isTraditional) {
      response += `• **Traditional wisdom** in every bite\n• **Cultural heritage** and authentic flavors\n• **Time-tested** nutritional benefits\n`;
    }
    
    // Add cooking tips
    response += `\n**💡 Pro Tips:**\n`;
    if (isQuick) {
      response += `• **Meal prep** - make extra portions for later\n• **Batch cooking** saves time during busy days\n`;
    }
    response += `• **Fresh ingredients** make the biggest difference\n• **Taste as you go** and adjust seasonings\n• **Have fun** and make it your own!\n`;
    
    // Add storage and serving suggestions
    response += `\n**🥄 Serving & Storage:**\n`;
    response += `• **Best served:** Fresh and warm (or chilled for salads)\n`;
    response += `• **Storage:** Refrigerate leftovers for up to 3 days\n`;
    response += `• **Variations:** Feel free to substitute ingredients based on preference!\n`;
    
    return response;
  }, []);

  // Comprehensive nutritional analysis for any food item - STANDALONE FUNCTION
  const analyzeFood = useCallback((food: string) => {
      const f = food.toLowerCase();
      
      // Fruits (comprehensive list)
      if (['apple', 'banana', 'orange', 'grape', 'strawberry', 'cherry', 'peach', 'pear', 'mango', 'pineapple', 'kiwi', 'papaya', 'guava', 'pomegranate', 'blueberry', 'raspberry', 'blackberry', 'watermelon', 'cantaloupe', 'honeydew', 'avocado', 'lemon', 'lime', 'grapefruit', 'plum', 'apricot', 'fig', 'date', 'raisin', 'cranberry', 'coconut', 'passion fruit', 'dragon fruit', 'lychee', 'star fruit', 'durian', 'jackfruit', 'persimmon', 'pomelo', 'tangerine', 'clementine'].some(fruit => f.includes(fruit))) {
        const isAvocado = f.includes('avocado');
        const isCitrus = ['orange', 'lemon', 'lime', 'grapefruit', 'tangerine', 'clementine', 'pomelo'].some(citrus => f.includes(citrus));
        const isBerry = ['strawberry', 'blueberry', 'raspberry', 'blackberry', 'cranberry'].some(berry => f.includes(berry));
        const isTropical = ['mango', 'pineapple', 'papaya', 'passion fruit', 'dragon fruit', 'lychee', 'star fruit', 'durian', 'jackfruit'].some(tropical => f.includes(tropical));
        
        return { 
          category: 'fruit', 
          mainBenefits: isAvocado ? 'healthy fats, fiber, potassium, vitamin K' : isCitrus ? 'vitamin C, folate, flavonoids, immune support' : isBerry ? 'antioxidants, vitamin C, anti-inflammatory compounds' : isTropical ? 'vitamin C, digestive enzymes, exotic nutrients' : 'vitamin C, fiber, antioxidants, natural sugars', 
          calories: isAvocado ? '320 per avocado' : '50-100 per serving',
          protein: isAvocado ? '4g' : '0.5-2g',
          carbs: isAvocado ? '17g' : '15-25g natural sugars',
          fats: isAvocado ? '29g healthy fats' : 'minimal (0.1-0.5g)',
          fiber: isAvocado ? '14g' : '2-4g',
          specialNotes: isAvocado ? 'heart-healthy monounsaturated fats, supports nutrient absorption' : isCitrus ? 'boosts immunity, aids iron absorption, heart-protective' : isBerry ? 'powerful antioxidants, may improve memory and heart health' : isTropical ? 'aids digestion, exotic flavors and nutrients' : 'boosts immunity, supports digestion, provides quick energy',
          keyNutrients: isAvocado ? 'potassium, vitamin K, folate, healthy fats' : isCitrus ? 'vitamin C, folate, flavonoids, pectin' : isBerry ? 'anthocyanins, vitamin C, manganese' : isTropical ? 'vitamin C, bromelain, vitamin A' : 'vitamin C, potassium, folate, antioxidants'
        };
      }
      
      // Vegetables (comprehensive list)
      if (['broccoli', 'spinach', 'carrot', 'tomato', 'cucumber', 'lettuce', 'potato', 'sweet potato', 'bell pepper', 'onion', 'garlic', 'cauliflower', 'cabbage', 'kale', 'beetroot', 'radish', 'celery', 'zucchini', 'eggplant', 'okra', 'asparagus', 'brussels sprouts', 'artichoke', 'turnip', 'parsnip', 'leek', 'fennel', 'bok choy', 'collard greens', 'swiss chard', 'arugula', 'watercress', 'mustard greens', 'green beans', 'peas', 'corn', 'mushroom', 'ginger', 'turmeric', 'beet greens', 'kohlrabi', 'rutabaga', 'jicama', 'daikon', 'napa cabbage', 'endive', 'radicchio', 'chives', 'scallions', 'shallots'].some(veg => f.includes(veg))) {
        const isLeafy = ['spinach', 'kale', 'lettuce', 'arugula', 'watercress', 'collard greens', 'swiss chard', 'mustard greens', 'bok choy', 'endive', 'radicchio'].some(leafy => f.includes(leafy));
        const isCruciferous = ['broccoli', 'cauliflower', 'cabbage', 'brussels sprouts', 'kale', 'bok choy', 'collard greens', 'turnip', 'radish', 'watercress', 'arugula', 'kohlrabi', 'rutabaga'].some(crucifer => f.includes(crucifer));
        const isRoot = ['carrot', 'potato', 'sweet potato', 'beetroot', 'radish', 'turnip', 'parsnip', 'ginger', 'turmeric', 'jicama', 'daikon', 'rutabaga'].some(root => f.includes(root));
        const isAllium = ['onion', 'garlic', 'leek', 'shallots', 'chives', 'scallions'].some(allium => f.includes(allium));
        
        return { 
          category: 'vegetable', 
          mainBenefits: isLeafy ? 'iron, folate, vitamin K, nitrates for circulation' : isCruciferous ? 'vitamin C, vitamin K, sulforaphane, cancer-protective compounds' : isRoot ? 'beta-carotene, potassium, complex carbs, sustained energy' : isAllium ? 'sulfur compounds, antioxidants, immune support' : 'vitamins, minerals, fiber, low calories, phytonutrients', 
          calories: isRoot ? '50-150 per serving' : '20-80 per serving',
          protein: '1-4g',
          carbs: isRoot ? '15-35g complex carbs' : '5-20g complex carbs',
          fats: 'minimal (0.1-0.3g)',
          fiber: isCruciferous ? '3-8g' : isLeafy ? '2-4g' : '2-6g',
          specialNotes: isLeafy ? 'excellent for blood health and energy' : isCruciferous ? 'powerful detox properties, may reduce cancer risk' : isRoot ? 'sustained energy, eye health support' : isAllium ? 'natural antibiotic properties, heart health' : 'essential micronutrients, anti-inflammatory properties',
          keyNutrients: isLeafy ? 'iron, folate, vitamin K, nitrates' : isCruciferous ? 'vitamin C, vitamin K, sulforaphane' : isRoot ? 'beta-carotene, potassium, vitamin A' : isAllium ? 'allicin, quercetin, selenium' : 'vitamin A, vitamin K, folate, iron, magnesium'
        };
      }
      
      // Proteins (meat/fish/poultry - expanded)
      if (['chicken', 'salmon', 'beef', 'turkey', 'tuna', 'fish', 'meat', 'pork', 'lamb', 'shrimp', 'crab', 'lobster', 'cod', 'sardines', 'mackerel', 'duck', 'goose'].some(protein => f.includes(protein))) {
        const isSeafood = ['salmon', 'tuna', 'fish', 'shrimp', 'crab', 'lobster', 'cod', 'sardines', 'mackerel'].some(sea => f.includes(sea));
        return { 
          category: 'animal protein', 
          mainBenefits: 'complete protein, essential amino acids, B vitamins', 
          calories: '150-250 per 100g',
          protein: '20-35g high quality',
          carbs: '0g',
          fats: isSeafood ? '5-15g (omega-3 rich)' : '5-20g',
          fiber: '0g',
          specialNotes: isSeafood ? 'omega-3 fatty acids, heart-healthy' : 'builds muscle, rich in iron',
          keyNutrients: isSeafood ? 'omega-3, vitamin D, selenium' : 'iron, zinc, B12'
        };
      }
      
      // Dairy products (expanded)
      if (['milk', 'cheese', 'yogurt', 'paneer', 'cottage cheese', 'greek yogurt', 'butter', 'ghee', 'cream'].some(dairy => f.includes(dairy))) {
        return { 
          category: 'dairy', 
          mainBenefits: 'protein, calcium, probiotics, vitamin D', 
          calories: '60-300 per serving',
          protein: '3-20g high quality',
          carbs: '4-12g (lactose)',
          fats: '0-25g (varies by type)',
          fiber: '0g',
          specialNotes: 'supports bone health, gut health with probiotics',
          keyNutrients: 'calcium, vitamin D, B12, riboflavin'
        };
      }
      
      // Grains and cereals (comprehensive list including millets)
      if (['rice', 'bread', 'pasta', 'quinoa', 'oats', 'wheat', 'barley', 'millet', 'ragi', 'jowar', 'bajra', 'amaranth', 'buckwheat', 'corn', 'finger millet', 'pearl millet', 'sorghum', 'foxtail millet', 'little millet', 'kodo millet', 'barnyard millet', 'proso millet', 'rye', 'spelt', 'kamut', 'bulgur', 'couscous', 'freekeh', 'teff', 'farro', 'wheat berries', 'brown rice', 'wild rice', 'black rice', 'red rice', 'basmati', 'jasmine rice'].some(grain => f.includes(grain))) {
        const isMillet = ['millet', 'ragi', 'finger millet', 'jowar', 'sorghum', 'bajra', 'pearl millet', 'foxtail millet', 'little millet', 'kodo millet', 'barnyard millet', 'proso millet'].some(m => f.includes(m));
        const isAncientGrain = ['quinoa', 'amaranth', 'buckwheat', 'teff', 'spelt', 'kamut', 'freekeh', 'farro'].some(ancient => f.includes(ancient));
        const isWholeGrain = ['brown rice', 'wild rice', 'black rice', 'red rice', 'oats', 'barley', 'wheat berries'].some(whole => f.includes(whole));
        const isGlutenFree = ['rice', 'quinoa', 'amaranth', 'buckwheat', 'corn', 'millet', 'ragi', 'jowar', 'bajra', 'teff'].some(gf => f.includes(gf)) || isMillet;
        
        return { 
          category: isMillet ? 'ancient grain (millet)' : isAncientGrain ? 'ancient grain' : isWholeGrain ? 'whole grain' : 'grain/cereal', 
          mainBenefits: isMillet ? 'gluten-free, rich in minerals, low glycemic, drought-resistant superfood' : isAncientGrain ? 'complete proteins, ancient nutrition, gluten-free options' : isWholeGrain ? 'fiber, B vitamins, sustained energy, heart health' : 'energy, B vitamins, fiber', 
          calories: isMillet ? '350-380 per 100g' : isAncientGrain ? '300-400 per 100g' : '300-400 per 100g',
          protein: isMillet ? '10-12g' : isAncientGrain ? '12-18g' : isWholeGrain ? '8-15g' : '8-15g',
          carbs: '65-75g complex carbs',
          fats: isMillet ? '3-5g' : isAncientGrain ? '4-8g' : '2-6g',
          fiber: isMillet ? '8-12g' : isAncientGrain ? '10-15g' : isWholeGrain ? '6-12g' : '3-10g',
          specialNotes: isMillet ? 'excellent for diabetics, climate-resilient, traditional Indian superfood' : isAncientGrain ? 'nutrient-dense, often complete proteins' : isWholeGrain ? 'retains bran and germ, maximum nutrition' : isGlutenFree ? 'gluten-free option, safe for celiac' : 'primary energy source',
          keyNutrients: isMillet ? 'iron, calcium, magnesium, phosphorus, B vitamins, zinc' : isAncientGrain ? 'complete amino acids, iron, magnesium, B vitamins' : isWholeGrain ? 'B vitamins, iron, selenium, fiber' : 'B vitamins, iron, selenium'
        };
      }
      
      // Nuts and seeds (comprehensive list)
      if (['almonds', 'walnuts', 'cashews', 'pistachios', 'peanuts', 'hazelnuts', 'pecans', 'brazil nuts', 'macadamia', 'pine nuts', 'chia seeds', 'flax seeds', 'sunflower seeds', 'pumpkin seeds', 'sesame seeds', 'hemp seeds', 'poppy seeds', 'nigella seeds', 'watermelon seeds', 'cucumber seeds', 'til', 'coconut', 'chestnuts', 'acorns'].some(nut => f.includes(nut))) {
        const isOmega3Rich = ['walnuts', 'chia seeds', 'flax seeds', 'hemp seeds'].some(omega => f.includes(omega));
        const isHighMagnesium = ['almonds', 'cashews', 'pumpkin seeds', 'brazil nuts', 'sunflower seeds'].some(mag => f.includes(mag));
        const isHighSelenium = f.includes('brazil nuts');
        const isHighProtein = ['almonds', 'peanuts', 'hemp seeds', 'pumpkin seeds'].some(protein => f.includes(protein));
        
        return { 
          category: 'nuts/seeds', 
          mainBenefits: isOmega3Rich ? 'omega-3 fatty acids, brain health, anti-inflammatory' : isHighSelenium ? 'selenium, antioxidant powerhouse, thyroid support' : isHighMagnesium ? 'magnesium, bone health, muscle function' : isHighProtein ? 'plant protein, healthy fats, sustained energy' : 'healthy fats, protein, vitamin E, minerals', 
          calories: '550-700 per 100g',
          protein: isHighProtein ? '20-30g' : '15-25g',
          carbs: '5-20g',
          fats: isOmega3Rich ? '45-75g (high omega-3)' : '45-75g (mostly unsaturated)',
          fiber: '5-15g',
          specialNotes: isOmega3Rich ? 'excellent for brain health and reducing inflammation' : isHighSelenium ? 'just 2-3 nuts provide daily selenium needs' : isHighMagnesium ? 'supports bone health and prevents muscle cramps' : isHighProtein ? 'complete protein source for vegetarians' : 'heart-healthy, brain food, anti-inflammatory',
          keyNutrients: isOmega3Rich ? 'omega-3 ALA, vitamin E, magnesium' : isHighSelenium ? 'selenium, vitamin E, healthy fats' : isHighMagnesium ? 'magnesium, vitamin E, healthy fats' : isHighProtein ? 'protein, healthy fats, minerals' : 'vitamin E, magnesium, selenium, omega-3 (walnuts/flax)'
        };
      }
      
      // Oils and fats (comprehensive list)
      if (['olive oil', 'coconut oil', 'sunflower oil', 'sesame oil', 'mustard oil', 'groundnut oil', 'avocado oil', 'ghee', 'butter', 'walnut oil', 'flaxseed oil', 'hemp oil', 'pumpkin seed oil', 'safflower oil', 'grapeseed oil', 'rice bran oil', 'canola oil', 'almond oil', 'argan oil', 'macadamia oil', 'til oil', 'desi ghee', 'clarified butter'].some(oil => f.includes(oil))) {
        const isExtraHealthy = ['olive oil', 'avocado oil', 'walnut oil', 'flaxseed oil', 'hemp oil'].some(h => f.includes(h));
        const isTraditional = ['ghee', 'desi ghee', 'mustard oil', 'sesame oil', 'til oil', 'coconut oil'].some(trad => f.includes(trad));
        const isOmega3Rich = ['flaxseed oil', 'walnut oil', 'hemp oil'].some(omega => f.includes(omega));
        const isHighSmokePoint = ['ghee', 'avocado oil', 'rice bran oil', 'safflower oil', 'grapeseed oil'].some(high => f.includes(high));
        
        return { 
          category: 'cooking oil/fat', 
          mainBenefits: isOmega3Rich ? 'omega-3 fatty acids, anti-inflammatory, brain health' : isExtraHealthy ? 'monounsaturated fats, antioxidants, heart protection' : isTraditional ? 'traditional benefits, flavor enhancement, cultural nutrition' : isHighSmokePoint ? 'high-temperature cooking, stable fats' : 'energy, fat-soluble vitamins', 
          calories: '884 per 100g',
          protein: '0g',
          carbs: '0g',
          fats: '100g',
          fiber: '0g',
          specialNotes: isOmega3Rich ? 'use cold, don\'t heat - preserves omega-3s' : isExtraHealthy ? 'excellent for heart health and reducing inflammation' : isTraditional ? 'time-tested in traditional cooking, unique flavor profiles' : isHighSmokePoint ? 'ideal for high-heat cooking methods' : 'use in moderation',
          keyNutrients: isOmega3Rich ? 'omega-3 ALA, vitamin E' : isExtraHealthy ? 'vitamin E, polyphenols, oleic acid' : isTraditional ? 'butyric acid (ghee), MUFA, traditional compounds' : isHighSmokePoint ? 'vitamin E, stable fatty acids' : 'vitamin A, E (if fortified)'
        };
      }
      
      // Legumes and pulses
      if (['lentils', 'chickpeas', 'black beans', 'kidney beans', 'pinto beans', 'navy beans', 'soybeans', 'tofu', 'tempeh', 'dal', 'moong', 'chana', 'rajma', 'masoor'].some(legume => f.includes(legume))) {
        return { 
          category: 'legume/pulse', 
          mainBenefits: 'plant protein, fiber, iron, folate', 
          calories: '300-400 per 100g cooked',
          protein: '15-25g plant-based',
          carbs: '45-60g complex carbs',
          fats: '1-5g',
          fiber: '10-15g',
          specialNotes: 'excellent protein source for vegetarians, heart-healthy',
          keyNutrients: 'iron, folate, potassium, magnesium'
        };
      }
      
      // Avocado (special healthy fat category)
      if (f.includes('avocado')) {
        return { 
          category: 'healthy fat fruit', 
          mainBenefits: 'monounsaturated fats, fiber, potassium', 
          calories: '320 per 100g',
          protein: '4g',
          carbs: '17g (low net carbs)',
          fats: '29g (mostly monounsaturated)',
          fiber: '10g',
          specialNotes: 'supports heart and brain health, nutrient absorption',
          keyNutrients: 'potassium, folate, vitamin K, oleic acid'
        };
      }
      
      // Eggs (complete protein)
      if (f.includes('egg')) {
        return { 
          category: 'complete protein', 
          mainBenefits: 'complete protein, choline, vitamins', 
          calories: '155 per 100g',
          protein: '13g high quality complete',
          carbs: '1g',
          fats: '11g (balanced)',
          fiber: '0g',
          specialNotes: 'brain health, muscle building, eye health',
          keyNutrients: 'choline, vitamin D, B12, lutein, zeaxanthin'
        };
      }
      
      // Generic fallback with nutritional estimation
      return { 
        category: 'food item', 
        mainBenefits: 'various nutrients depending on type', 
        calories: 'varies (50-500 per serving)',
        protein: 'varies (0-30g)',
        carbs: 'varies (0-80g)',
        fats: 'varies (0-50g)',
        fiber: 'varies (0-15g)',
        specialNotes: 'part of a balanced diet, provides energy and nutrients',
        keyNutrients: 'varies by food type'
      };
  }, []);

  const generateFoodComparison = useCallback((food1: string, food2: string, originalQuestion: string): string => {
    // Analyze the question type to provide relevant comparison
    const questionType = originalQuestion.toLowerCase();
    const isCalorieQuestion = questionType.includes('calorie') || questionType.includes('weight') || questionType.includes('diet');
    const isProteinQuestion = questionType.includes('protein') || questionType.includes('muscle') || questionType.includes('fitness');
    const isFatQuestion = questionType.includes('fat') || questionType.includes('heart') || questionType.includes('healthy');
    const isVitaminQuestion = questionType.includes('vitamin') || questionType.includes('nutrient') || questionType.includes('mineral');
    const isFiberQuestion = questionType.includes('fiber') || questionType.includes('digestion');
    const isHealthyQuestion = questionType.includes('healthy') || questionType.includes('better') || questionType.includes('good');

    const food1Analysis = analyzeFood(food1);
    const food2Analysis = analyzeFood(food2);

    // Generate intelligent comparison based on question type and food analysis
    let comparison = `🍽️ **${food1.charAt(0).toUpperCase() + food1.slice(1)} vs ${food2.charAt(0).toUpperCase() + food2.slice(1)} Comparison**\n\n`;
    
    if (isCalorieQuestion) {
      comparison += `**🔥 Calorie Content:**\n• ${food1}: ${food1Analysis.calories}\n• ${food2}: ${food2Analysis.calories}\n\n`;
    }
    
    if (isProteinQuestion) {
      comparison += `**💪 Protein Content:**\n• ${food1}: ${food1Analysis.protein}\n• ${food2}: ${food2Analysis.protein}\n\n`;
    }
    
    if (isFatQuestion) {
      comparison += `**🥑 Fat Content:**\n• ${food1}: ${food1Analysis.fats}\n• ${food2}: ${food2Analysis.fats}\n\n`;
    }
    
    if (isFiberQuestion) {
      comparison += `**🌾 Fiber Content:**\n• ${food1}: ${food1Analysis.fiber}\n• ${food2}: ${food2Analysis.fiber}\n\n`;
    }
    
    if (isVitaminQuestion) {
      comparison += `**🌟 Key Nutrients:**\n• ${food1}: ${food1Analysis.keyNutrients}\n• ${food2}: ${food2Analysis.keyNutrients}\n\n`;
    }

    // Always add comprehensive nutritional overview
    comparison += `**📊 Complete Nutritional Profile:**\n\n`;
    comparison += `**${food1.charAt(0).toUpperCase() + food1.slice(1)} (${food1Analysis.category}):**\n`;
    comparison += `• Calories: ${food1Analysis.calories}\n• Protein: ${food1Analysis.protein}\n• Carbs: ${food1Analysis.carbs}\n• Fats: ${food1Analysis.fats}\n• Fiber: ${food1Analysis.fiber}\n• Benefits: ${food1Analysis.specialNotes}\n\n`;
    
    comparison += `**${food2.charAt(0).toUpperCase() + food2.slice(1)} (${food2Analysis.category}):**\n`;
    comparison += `• Calories: ${food2Analysis.calories}\n• Protein: ${food2Analysis.protein}\n• Carbs: ${food2Analysis.carbs}\n• Fats: ${food2Analysis.fats}\n• Fiber: ${food2Analysis.fiber}\n• Benefits: ${food2Analysis.specialNotes}\n\n`;
    
    // Smart recommendation based on categories
    if (food1Analysis.category === food2Analysis.category) {
      comparison += `**🎯 Recommendation:** Both are ${food1Analysis.category}s with similar nutritional roles. Choose based on your specific goals and taste preferences!`;
    } else {
      comparison += `**🎯 Recommendation:** These serve different nutritional purposes - ${food1} as a ${food1Analysis.category} and ${food2} as a ${food2Analysis.category}. Both can complement each other in a balanced diet!`;
    }

    return comparison;
  }, []);

  // Enhanced local response generator with comprehensive context awareness
  const generateLocalResponse = useCallback(async (userInput: string, messageHistory: Message[], context: ConversationContext): Promise<string> => {
    const input = userInput.toLowerCase().trim();
    
    // Extract information from the context and messages properly
    const allContent = messageHistory.map(m => m.content.toLowerCase()).join(' ');
    
    // Extract user's name if mentioned
    const nameMatch = allContent.match(/my name is (\w+)|i'm (\w+)|call me (\w+)/);
    const userName = nameMatch ? (nameMatch[1] || nameMatch[2] || nameMatch[3]) : '';
    
    // Analyze conversation for interests
    const userPreferences = {
      food: allContent.includes('food') || allContent.includes('cook') || allContent.includes('recipe') || allContent.includes('eat'),
      anime: allContent.includes('anime') || allContent.includes('manga') || allContent.includes('naruto'),
      gaming: allContent.includes('game') || allContent.includes('gaming')
    };
    
    // Extract recent topics from last few messages
    const recentMessages = messageHistory.slice(-5);
    const contextTopics = [];
    recentMessages.forEach(m => {
      const content = m.content.toLowerCase();
      if (content.includes('food') || content.includes('cook')) contextTopics.push('food');
      if (content.includes('anime')) contextTopics.push('anime');
      if (content.includes('game')) contextTopics.push('gaming');
    });
    
    const conversationLength = messageHistory.length;
    const lastMessages = messageHistory.slice(-3);
    const lastInteraction = Date.now();
    
    // Topic change detection - check if current input is about a different topic
    const detectTopicChange = (currentInput: string, recentMessages: Message[]): boolean => {
      if (recentMessages.length === 0) return false;
      
      const currentTopics = extractTopicsFromText(currentInput);
      const recentTopics = recentMessages.slice(-2).map(m => extractTopicsFromText(m.content)).flat();
      
      // If current input has topics and none overlap with recent topics, it's a topic change
      if (currentTopics.length > 0 && recentTopics.length > 0) {
        const hasOverlap = currentTopics.some(topic => recentTopics.includes(topic));
        return !hasOverlap;
      }
      
      return false;
    };
    
    // Extract topics from text for comparison
    const extractTopicsFromText = (text: string): string[] => {
      const lowerText = text.toLowerCase();
      const topics = [];
      
      // Food topics (comprehensive coverage)
      if (lowerText.match(/\b(food|cook|recipe|eat|nutrition|vitamin|protein|calorie|diet|meal|snack|fruit|vegetable|meat|grain|dairy|nuts|seeds|oil|fat|millet|ragi|jowar|bajra|quinoa|oats|rice|wheat|apple|banana|orange|mango|spinach|carrot|broccoli|almonds|walnuts|olive|coconut|ghee|cereal|fiber|mineral|antioxidant|superfood|healthy|organic)\b/)) {
        topics.push('food');
      }
      
      // Anime/Entertainment topics  
      if (lowerText.match(/\b(anime|manga|naruto|tanjiro|deku|character|episode|series|watch|animation)\b/)) {
        topics.push('anime');
      }
      
      // Gaming topics
      if (lowerText.match(/\b(game|gaming|play|level|boss|character|quest|rpg|strategy|puzzle)\b/)) {
        topics.push('gaming');
      }
      
      // Health/Fitness topics
      if (lowerText.match(/\b(health|fitness|exercise|workout|gym|muscle|weight|cardio|strength)\b/)) {
        topics.push('health');
      }
      
      // Technology topics
      if (lowerText.match(/\b(tech|technology|computer|software|app|website|coding|programming|ai|robot)\b/)) {
        topics.push('technology');
      }
      
      // Education topics
      if (lowerText.match(/\b(learn|study|school|education|book|read|knowledge|skill|course|tutorial)\b/)) {
        topics.push('education');
      }
      
      return topics;
    };
    
    const isTopicChange = detectTopicChange(input, lastMessages);
    
    console.log('🔄 TOPIC CHANGE DEBUG:', {
      input,
      isTopicChange,
      currentTopics: extractTopicsFromText(input),
      recentTopics: lastMessages.map(m => extractTopicsFromText(m.content)).flat(),
      shouldIgnorePreviousContext: isTopicChange
    });
    
    // ULTRA-FAST contextual reference detection - minimal processing
    const hasContextualReference = 
      input.includes('these') || input.includes('which one') || input.includes('both') ||
      input.includes('them') || input.includes('it');
    
    // Detect if this is a new nutrition question (not contextual)
    const isNewNutritionQuestion = 
      input.includes('nutrition') || input.includes('nutritional') ||
      (input.includes('what') && (input.includes('value') || input.includes('content'))) ||
      input.includes('how much') || input.includes('tell me about');
    
    // Ignore contextual references if topic has changed OR if it's a new nutrition question
    const shouldUseContext = hasContextualReference && !isTopicChange && !isNewNutritionQuestion;
    
    console.log('📋 CONTEXT CHECK:', {
      hasContextualReference,
      isTopicChange,
      isNewNutritionQuestion,
      shouldUseContext
    });
    
    let referencedItems = [];
    
    if (shouldUseContext && messageHistory.length > 1) {
      // INSTANT processing: Find the last ASSISTANT message (which contains the previous response)
      // We search backwards from the end to find the most recent assistant message
      let lastAssistantMessage = '';
      for (let i = messageHistory.length - 1; i >= 0; i--) {
        if (messageHistory[i].role === 'assistant') {
          lastAssistantMessage = messageHistory[i].content?.toLowerCase() || '';
          break;
        }
      }
      
      console.log('🔍 CONTEXTUAL REFERENCE DEBUG:', {
        hasContextualReference,
        messageHistoryLength: messageHistory.length,
        lastMessage: lastAssistantMessage.substring(0, 100),
        lastMessageExists: !!lastAssistantMessage
      });
      
      // Smart comparison pair extraction: Look for "X vs Y" or "X and Y" patterns in the previous assistant message
      // This captures the actual items being compared, not all mentioned items
      let comparisonMatch = lastAssistantMessage.match(/(?:comparing\s+)?(\w+)\s+(?:vs|vs\.|versus|and)\s+(\w+)/i);
      
      if (comparisonMatch) {
        // Found explicit comparison pattern
        referencedItems = [comparisonMatch[1], comparisonMatch[2]];
      } else {
        // Fallback: Extract food items but limit to first 2 unique ones that are clearly food items
        const foodPatterns = /\b(?:apple|banana|orange|grape|strawberry|mango|pineapple|avocado|spinach|kale|broccoli|carrot|potato|tomato|pasta|rice|quinoa|ragi|jowar|bajra|millet|oats|wheat|chicken|salmon|egg|milk|bread|cheese|yogurt|beef|turkey|tuna|nuts|almonds|walnuts|chia|flax|olive|coconut|ghee|sweet potato|fish|meat|beans|lentils|tofu|squash|cucumber|lettuce|celery|pepper)\w*\b/gi;
        
        const detectedFoods = lastAssistantMessage.match(foodPatterns) || [];
        const uniqueFoods = [...new Set(detectedFoods.map(f => f.toLowerCase()))];
        
        // Only take the first 2 unique food items (likely the comparison pair)
        referencedItems = uniqueFoods.slice(0, 2);
      }
      
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
    
    // Handle repeated or follow-up questions with context (only if context should be used)
    if (shouldUseContext && isRepeatedQuestion && previousAssistantMessages.length > 0 && !isTopicChange) {
      return `${userName ? `${userName}, ` : ''}I think we talked about something similar before. To build on our previous discussion, what specific aspect would you like to explore further?`;
    }
    
    // Handle topic changes gracefully
    if (isTopicChange && messageHistory.length > 1) {
      const currentTopics = extractTopicsFromText(input);
      const topicName = currentTopics[0] || 'new topic';
      return `${userName ? `Great, ${userName}! ` : ''}I see we're switching to ${topicName === 'new topic' ? 'a new topic' : topicName}! ${getTopicResponse(topicName, input, userName)}`;
    }
    
    // Helper function to provide topic-specific responses
    const getTopicResponse = (topic: string, userInput: string, userName: string): string => {
      const name = userName ? `${userName}, ` : '';
      
      switch (topic) {
        case 'food':
          return `${name}I love discussing food and nutrition! What would you like to know about?`;
        case 'anime':
          return `${name}Anime is amazing! Which series are you interested in?`;
        case 'gaming':
          return `${name}Gaming is so much fun! What type of games do you enjoy?`;
        case 'health':
          return `${name}Health and fitness are so important! How can I help you on your wellness journey?`;
        case 'technology':
          return `${name}Technology is fascinating! What tech topic interests you?`;
        case 'education':
          return `${name}Learning is wonderful! What subject are you curious about?`;
        default:
          return `${name}That's interesting! Tell me more about what you'd like to discuss.`;
      }
    };
    
    // Recipe request detection - prioritize over contextual references and general food discussion
    const recipePatterns = [
      /(?:get me|want|give me).*?recip[ei].*?(?:with|on|for|using)\s+(\w+)/i,
      /(?:recip[ei]|cook|make|prepare|how to (?:make|cook|prepare)).*?(?:with|for|using)?\s*(\w+)/i,
      /(\w+).*?(?:recip[ei]|cooking|preparation)/i,
      /show me.*?(\w+).*?(?:recip[ei]|how to make)/i,
      /(?:give me|suggest|recommend).*?(?:recip[ei]|dish)/i,
      /how (?:do|can) i (?:make|cook|prepare).*?(\w+)/i,
      /(?:recip[ei] for|cooking) (\w+)/i,
      /(?:recip[ei] on)\s+(\w+)/i,
      /(?:make|cook) (\w+)/i
    ];
    
    // Check for recipe keywords including misspellings
    const hasRecipeKeyword = /recip[ei]|cook|make|prepare/i.test(input);
    
    console.log('🔍 RECIPE KEYWORD CHECK:', {
      input,
      hasRecipeKeyword
    });
    
    let detectedRecipeRequest = null;
    // Only run pattern matching if we have recipe keywords to improve performance
    if (hasRecipeKeyword) {
      for (const pattern of recipePatterns) {
        const match = input.match(pattern);
        
        if (match) {
          // Extract the food item from the match
          const potentialFood = match[1] ? match[1].toLowerCase() : '';
          
          // Common food items that are likely to have recipes
          const commonFoods = ['apple', 'banana', 'spinach', 'quinoa', 'ragi', 'jowar', 'bajra', 'millet', 'almonds', 'chicken', 'pasta', 'rice', 'bread', 'smoothie', 'salad', 'soup', 'curry', 'dal', 'khichdi', 'orange', 'mango', 'strawberry', 'blueberry', 'broccoli', 'carrot', 'tomato', 'onion', 'garlic', 'egg', 'fish', 'tofu', 'lentil', 'chickpea'];
          
          if (potentialFood && (commonFoods.some(food => potentialFood.includes(food)) || potentialFood.length > 2)) {
            detectedRecipeRequest = {
              food: potentialFood,
              pattern: pattern.source
            };
            break;
          }
          
          // If no specific food detected but clear recipe request
          if (/recip[ei]/i.test(input) && !potentialFood) {
            detectedRecipeRequest = {
              food: 'healthy', // Default to healthy recipe
              pattern: pattern.source
            };
            break;
          }
        }
      }
    }
    
    // Also check for direct recipe requests without patterns (including misspellings)
    if (!detectedRecipeRequest && (/recip[ei]/i.test(input) || (input.includes('cook') && (input.includes('how') || input.includes('make'))))) {
      const words = input.split(' ');
      const commonFoods = ['apple', 'banana', 'spinach', 'quinoa', 'ragi', 'jowar', 'bajra', 'millet', 'almonds', 'chicken', 'pasta', 'rice', 'bread', 'orange', 'mango', 'strawberry', 'blueberry', 'broccoli', 'carrot', 'tomato', 'onion', 'garlic', 'egg', 'fish', 'tofu', 'lentil', 'chickpea'];
      
      for (const word of words) {
        const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
        if (commonFoods.includes(cleanWord)) {
          detectedRecipeRequest = {
            food: cleanWord,
            pattern: 'direct_mention'
          };
          break;
        }
      }
      
      // If still no specific food found but clear recipe request, extract from common patterns
      if (!detectedRecipeRequest && /recip[ei]/i.test(input)) {
        const withMatch = input.match(/(?:with|on|for|using)\s+(\w+)/i);
        const forMatch = input.match(/(?:for|using|of)\s+(\w+)/i);
        const ingredient = withMatch?.[1] || forMatch?.[1];
        
        if (ingredient) {
          detectedRecipeRequest = {
            food: ingredient.toLowerCase(),
            pattern: 'with_pattern'
          };
        } else {
          // Default recipe request without specific ingredient
          detectedRecipeRequest = {
            food: 'healthy',
            pattern: 'general_recipe'
          };
        }
      }
    }
    
    console.log('👨‍🍳 RECIPE REQUEST DEBUG:', {
      input,
      detectedRecipeRequest,
      hasRecipeRequest: !!detectedRecipeRequest
    });
    
    if (detectedRecipeRequest) {
      const { food } = detectedRecipeRequest;
      
      // Generate recipe suggestion
      return generateRecipeSuggestion(food, input);
    }

    // OPTIMIZED: Fast contextual response handling (only if genuine contextual reference)
    if (shouldUseContext && referencedItems.length >= 2) {
      const item1 = referencedItems[0];
      const item2 = referencedItems[1];
      
      console.log(`QUICK RESPONSE: ${item1} vs ${item2}`);
      
      // Fast nutrition comparison responses
      if (input.includes('healthy fat') || input.includes('fat')) {
        if (item1 === 'avocado' || item2 === 'avocado') {
          return `Between ${item1} and ${item2}, avocado has much more healthy fats! 🥑 Avocados contain about 15g of heart-healthy monounsaturated fats, while ${item1 === 'avocado' ? item2 : item1} has minimal fat content.`;
        }
        
        // Provide specific fat content comparisons for other foods
        const getFatContent = (food: string): string => {
          const fatData: { [key: string]: string } = {
            'apple': 'virtually no fat (0.2g)',
            'orange': 'virtually no fat (0.1g)',
            'banana': 'minimal fat (0.3g)',
            'nuts': 'high in healthy fats (14-20g)',
            'almonds': 'rich in healthy fats (14g)',
            'walnuts': 'very high in healthy fats (18g with omega-3)',
            'olive oil': 'pure healthy fat (14g per tablespoon)',
            'coconut oil': 'saturated fat (14g per tablespoon)',
            'salmon': 'rich in omega-3 fats (4-8g)',
            'chicken': 'moderate fat content (3-7g depending on cut)',
            'egg': 'healthy fats (5g with omega-3)',
            'cheese': 'moderate to high fat (6-9g)',
            'yogurt': 'low to moderate fat (0-8g depending on type)'
          };
          return fatData[food.toLowerCase()] || 'variable fat content';
        };
        
        const item1Fat = getFatContent(item1);
        const item2Fat = getFatContent(item2);
        
        return `For healthy fats, comparing ${item1} vs ${item2}: ${item1} has ${item1Fat}, while ${item2} has ${item2Fat}. ${
          (item1.includes('nut') || item1.includes('oil') || item1 === 'salmon') || 
          (item2.includes('nut') || item2.includes('oil') || item2 === 'salmon') ?
          'The one with nuts, oils, or fatty fish would be better for healthy fats!' :
          'Both are quite low in fat - consider adding nuts, seeds, or avocado for healthy fats!'
        }`;
      }
      if (input.includes('protein')) {
        const getProteinContent = (food: string): string => {
          const proteinData: { [key: string]: string } = {
            'apple': 'very low protein (0.5g)',
            'orange': 'low protein (1.2g)',
            'banana': 'low protein (1.3g)',
            'chicken': 'very high protein (25-30g)',
            'salmon': 'high protein (22-25g)',
            'egg': 'good protein (6g)',
            'quinoa': 'complete protein (8g)',
            'almonds': 'moderate protein (6g)',
            'yogurt': 'good protein (10-15g)',
            'milk': 'good protein (8g)',
            'cheese': 'high protein (20-25g)',
            'beans': 'high protein (15g)',
            'lentils': 'high protein (18g)'
          };
          return proteinData[food.toLowerCase()] || 'variable protein content';
        };
        
        const item1Protein = getProteinContent(item1);
        const item2Protein = getProteinContent(item2);
        
        return `Protein comparison: ${item1} has ${item1Protein}, while ${item2} has ${item2Protein}. ${
          item1.includes('chicken') || item1.includes('salmon') || item1.includes('egg') ||
          item2.includes('chicken') || item2.includes('salmon') || item2.includes('egg') ?
          'Animal proteins provide complete amino acid profiles!' :
          'For higher protein, consider adding lean meats, fish, eggs, or legumes!'
        }`;
      }
      if (input.includes('calorie')) {
        const getCalorieContent = (food: string): string => {
          const calorieData: { [key: string]: string } = {
            'apple': 'low calories (80-95 per medium apple)',
            'orange': 'low calories (60-80 per medium orange)',
            'banana': 'moderate calories (105-120 per medium banana)',
            'avocado': 'high calories (320 per avocado)',
            'nuts': 'high calories (160-200 per ounce)',
            'almonds': 'high calories (160 per ounce)',
            'rice': 'moderate calories (200 per cup cooked)',
            'quinoa': 'moderate calories (220 per cup cooked)',
            'chicken': 'moderate calories (165 per 3.5oz)',
            'salmon': 'moderate-high calories (200 per 3.5oz)'
          };
          return calorieData[food.toLowerCase()] || 'variable calorie content';
        };
        
        const item1Calories = getCalorieContent(item1);
        const item2Calories = getCalorieContent(item2);
        
        return `Calorie comparison: ${item1} has ${item1Calories}, while ${item2} has ${item2Calories}. Choose based on your energy needs and goals!`;
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
    
    // Dynamic AI-powered food comparison detection  
    const foodComparisonPatterns = [
      /is (\w+) better than (\w+)/i,
      /(\w+) vs (\w+)/i,
      /(\w+) or (\w+)/i,
      /compare (\w+) (?:and|with) (\w+)/i,
      /(\w+) versus (\w+)/i,
      /difference between (\w+) and (\w+)/i
    ];
    
    let detectedComparison = null;
    for (const pattern of foodComparisonPatterns) {
      const match = input.match(pattern);
      if (match) {
        detectedComparison = {
          food1: match[1].toLowerCase(),
          food2: match[2].toLowerCase(),
          pattern: pattern.source
        };
        break;
      }
    }
    
    console.log('🔍 FOOD COMPARISON DEBUG:', {
      input,
      detectedComparison,
      hasComparison: !!detectedComparison
    });
    
    if (detectedComparison) {
      const { food1, food2 } = detectedComparison;
      
      // AI-powered nutritional comparison generator
      return generateFoodComparison(food1, food2, input);
    }
    
    // PRIORITY: Handle individual food nutrition questions (when shouldUseContext is false)
    if (!shouldUseContext && (input.includes('nutrition') || input.includes('nutritional') || 
        (input.includes('what') && input.includes('value')) || input.includes('how much') || 
        input.includes('tell me about'))) {
      
      // Extract food item from nutrition question
      const extractFood = (text: string): string | null => {
        const foodItems = ['beetroot', 'apple', 'banana', 'orange', 'mango', 'spinach', 'kale', 'broccoli', 
                          'carrot', 'potato', 'tomato', 'quinoa', 'ragi', 'jowar', 'bajra', 'millet', 'oats', 
                          'rice', 'wheat', 'chicken', 'salmon', 'egg', 'almonds', 'walnuts', 'chia', 'flax'];
        
        for (const food of foodItems) {
          if (text.includes(food)) return food;
        }
        
        // Fallback: extract word after "of" or "about"
        const match = text.match(/(?:of|about)\s+(\w+)/i);
        return match ? match[1].toLowerCase() : null;
      };
      
      const foodItem = extractFood(input);
      if (foodItem) {
        console.log(`🥗 ANALYZING INDIVIDUAL FOOD: ${foodItem}`);
        const analysis = analyzeFood(foodItem);
        
        return `Here's the nutritional information for ${foodItem}:\n\n` +
               `🌟 **Key Nutrients**: ${analysis.keyNutrients}\n` +
               `💪 **Health Benefits**: ${analysis.mainBenefits}\n` +
               `📊 **Nutritional Value**: Protein: ${analysis.protein}, Carbs: ${analysis.carbs}, Fats: ${analysis.fats}, Calories: ${analysis.calories}\n` +
               `🍽️ **Best Uses**: ${analysis.specialNotes}\n\n` +
               `✨ **Category**: ${analysis.category}`;
      }
    }

    // Context-aware responses based on conversation flow
    if (input.includes('food') || input.includes('cook') || input.includes('recipe') || input.includes('eat') || 
        input.includes('fruit') || input.includes('vegetable') || input.includes('nuts') || input.includes('oil') || 
        input.includes('millet') || input.includes('grain') || input.includes('cereal') || input.includes('nutrition')) {
      
      // Check for specific food category mentions
      const isFruitMention = input.includes('fruit') || ['apple', 'banana', 'orange', 'mango', 'berry'].some(fruit => input.includes(fruit));
      const isVegetableMention = input.includes('vegetable') || input.includes('veggie') || ['spinach', 'carrot', 'broccoli', 'kale'].some(veg => input.includes(veg));
      const isNutMention = input.includes('nuts') || input.includes('seed') || ['almonds', 'walnuts', 'chia', 'flax'].some(nut => input.includes(nut));
      const isOilMention = input.includes('oil') || input.includes('fat') || ['olive', 'coconut', 'ghee'].some(oil => input.includes(oil));
      const isMilletMention = input.includes('millet') || ['ragi', 'jowar', 'bajra', 'quinoa'].some(millet => input.includes(millet));
      const isCerealMention = input.includes('cereal') || input.includes('grain') || ['rice', 'wheat', 'oats'].some(grain => input.includes(grain));
      
      if (userPreferences.anime && userPreferences.food) {
        return `${userName ? `${userName}, ` : ''}Since we've been talking about both anime and food, have you noticed how beautifully food is portrayed in anime? What's your favorite food scene from an anime?`;
      }
      
      // Category-specific responses
      if (isFruitMention) {
        const responses = [
          `${userName ? `Great question about fruits, ${userName}! ` : ''}Fruits are nature's candy! Which fruits are you curious about - tropical, citrus, or berries?`,
          "Fruits are packed with vitamins, antioxidants, and natural sweetness! Are you looking for ways to include more fruits in your diet?",
          "I love discussing fruits! They're so colorful and nutritious. Would you like to compare different fruits or get recipe suggestions?",
          "Fruits offer amazing variety - from vitamin C powerhouses like oranges to healthy-fat rich avocados! What interests you most?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      }
      
      if (isVegetableMention) {
        const responses = [
          `${userName ? `${userName}, ` : ''}vegetables are nutritional superstars! Are you interested in leafy greens, root vegetables, or cruciferous veggies?`,
          "Vegetables provide essential vitamins, minerals, and fiber! Would you like cooking tips or nutritional comparisons?",
          "From vibrant bell peppers to nutrient-dense kale - vegetables offer incredible variety! What's your favorite way to prepare them?",
          "Vegetables are the foundation of healthy eating! Are you looking for ways to make them more delicious?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      }
      
      if (isNutMention) {
        const responses = [
          `${userName ? `${userName}, ` : ''}nuts and seeds are nutritional powerhouses! Rich in healthy fats, protein, and minerals. Which ones interest you?`,
          "Nuts and seeds are perfect for brain health and sustained energy! Are you curious about almonds, walnuts, or perhaps chia seeds?",
          "From omega-3 rich walnuts to protein-packed almonds - nuts offer amazing benefits! Want to learn about their unique properties?",
          "Nuts and seeds make great snacks and ingredients! Are you looking for ways to include more in your meals?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      }
      
      if (isOilMention) {
        const responses = [
          `${userName ? `${userName}, ` : ''}cooking oils and fats are important for nutrition and flavor! Are you interested in heart-healthy options like olive oil?`,
          "Different oils have unique benefits - from omega-3 rich flaxseed oil to traditional ghee! What would you like to know?",
          "Choosing the right oil makes a big difference in cooking and health! Are you looking for high-heat cooking or finishing oils?",
          "Oils provide essential fatty acids and fat-soluble vitamins! Would you like to compare different types or learn about their uses?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      }
      
      if (isMilletMention) {
        const responses = [
          `${userName ? `Amazing choice, ${userName}! ` : ''}Millets are ancient superfoods - gluten-free, mineral-rich, and perfect for diabetics! Which millet interests you?`,
          "Millets like ragi, jowar, and bajra are nutritional powerhouses! They're drought-resistant and incredibly healthy. Want recipes?",
          "I love how you're interested in millets! They're the future of sustainable nutrition. Are you looking for traditional or modern preparations?",
          "Millets are incredible - low glycemic index, high in minerals, and so versatile! Would you like cooking tips or nutritional benefits?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      }
      
      if (isCerealMention) {
        const responses = [
          `${userName ? `${userName}, ` : ''}grains and cereals provide energy and B vitamins! Are you interested in whole grains, ancient grains, or traditional options?`,
          "From quinoa to brown rice to traditional wheat - grains offer sustained energy! What would you like to explore?",
          "Cereals and grains are staple foods worldwide! Are you looking for gluten-free options or ways to make them more nutritious?",
          "Grains provide complex carbohydrates for steady energy! Would you like comparisons or cooking suggestions?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      }
      
      // General food responses
      const responses = [
        `${userName ? `Great question, ${userName}! ` : ''}That sounds delicious! Based on our chat, what's your favorite cuisine?`,
        "Cooking is such a wonderful skill! Are you looking for recipe suggestions for any particular ingredient?",
        "Food brings people together! What are you in the mood to cook today? I can help with fruits, vegetables, grains, or any ingredient!",
        `${userName ? `${userName}, ` : ''}I'd love to help you with cooking tips! What dish or ingredient are you thinking about?`,
        "There's nothing better than a good meal! Tell me more about what you're craving - I can suggest recipes for any ingredient!",
        "Nutrition is so fascinating! Are you interested in comparing foods, learning about specific ingredients, or getting recipe ideas?"
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
  }, [analyzeFood]);

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
    
    // Create proper ConversationContext for local fallback
    const currentContext: ConversationContext = {
      messages: updatedMessages,
      summary: conversationSummary || `User: ${extractedUserName || 'Guest'}, Topics: ${extractedTopics.join(', ') || 'General conversation'}`,
      lastActiveTime: Date.now()
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
        
        // FIXED: Use complete stored conversation history, not just current session
        const storedContext = JSON.parse(localStorage.getItem('voicebot_conversation') || '{}');
        const fullMessageHistory = storedContext.messages || [];
        const completeHistory = [...fullMessageHistory, ...updatedMessages];
        
        // Create context with complete history for better conversation continuity
        const enhancedContext: ConversationContext = {
          messages: completeHistory,
          summary: storedContext.summary || currentContext.summary,
          lastActiveTime: Date.now()
        };
        
        console.log('💾 COMPLETE HISTORY DEBUG:', {
          storedMessages: fullMessageHistory.length,
          currentSession: updatedMessages.length,
          totalForContext: completeHistory.length,
          lastStoredMessage: fullMessageHistory[fullMessageHistory.length - 1]?.content?.substring(0, 50)
        });
        
        const localResponse = await generateLocalResponse(text, completeHistory, enhancedContext);
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
  }, [messages, conversationSummary, toast]); // Remove generateSummary and speakText to avoid circular dependencies

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
                  
                  // Only process when result is final (speech recognition complete)
                  // Don't process on Android immediately - wait for isFinal
                  if (event.results[current].isFinal) {
                    console.log('Final transcript received, processing:', transcriptText);
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
            
            // Always abort on error to reset state
            try {
              recognitionRef.current?.abort();
            } catch (e) {
              // Ignore abort errors
            }
            
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
                // Auto-retry on no-speech error
                if (retryCount < 3) {
                  console.log('No speech detected, retrying...', retryCount + 1);
                  setRetryCount(prev => prev + 1);
                  setTimeout(() => startListening(), 500);
                } else {
                  toast({
                    title: "No Speech Detected",
                    description: "Please try speaking again. Make sure you're close to the microphone.",
                    variant: "default",
                  });
                  setRetryCount(0);
                }
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
                setRetryCount(0);
                break;
              default:
                toast({
                  title: "Speech Recognition Error",
                  description: `Error: ${event.error}. Please try again.`,
                  variant: "destructive",
                });
                setRetryCount(0);
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
      // Clear previous transcript immediately
      setTranscript('');
      
      // Ensure recognition is not already running
      if (isListening && recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          console.log('Recognition abort failed (expected):', e);
        }
      }
      
      // Start recognition immediately, check permissions in parallel
      if (recognitionRef.current) {
        try {
          console.log('Attempting to start speech recognition...');
          recognitionRef.current.start();
          setIsListening(true);
        } catch (error) {
          console.error('Failed to start recognition:', error);
          setIsListening(false);
          
          // If already started, abort it before retrying
          try {
            recognitionRef.current.abort();
          } catch (e) {
            // Ignore abort errors
          }
          
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
      
      // Check permission asynchronously (non-blocking)
      const permissionStatus = await checkMicrophonePermission();
      
      if (permissionStatus === 'denied') {
        recognitionRef.current?.abort();
        setIsListening(false);
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
          recognitionRef.current?.abort();
          setIsListening(false);
          return; // Permission request failed, error already shown
        }
      }
      
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

  // Handle text input submission
  const handleTextSubmit = useCallback(async () => {
    if (!textInput.trim() || isProcessing) return;

    const message = textInput.trim();
    setTextInput('');
    
    // Process the text message using the same logic as voice input
    await handleSendMessage(message);
  }, [textInput, isProcessing]); // Remove handleSendMessage dependency to avoid circular reference

  // Handle Enter key press in text input
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTextSubmit();
    }
  }, []); // Remove handleTextSubmit dependency to avoid circular reference

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
            <div className="bg-gradient-to-r from-primary to-accent p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    {inputMode === 'voice' ? (
                      <Volume2 className="w-5 h-5 text-primary-foreground" />
                    ) : (
                      <Type className="w-5 h-5 text-primary-foreground" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-foreground text-sm">AI Assistant</h3>
                    <p className="text-xs text-primary-foreground/80">
                      {inputMode === 'voice' ? 'Tap the mic to speak' : 'Type your message'}
                    </p>
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
              
              {/* Input mode toggle */}
              <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1">
                <Button
                  variant={inputMode === 'voice' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => {
                    setInputMode('voice');
                    setTextInput(''); // Clear text input when switching to voice
                  }}
                  className={`flex-1 text-xs h-8 ${
                    inputMode === 'voice' 
                      ? 'bg-white text-primary shadow-sm' 
                      : 'text-primary-foreground hover:bg-white/10'
                  }`}
                >
                  <Mic className="w-3 h-3 mr-1" />
                  Voice
                </Button>
                <Button
                  variant={inputMode === 'text' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => {
                    setInputMode('text');
                    if (isListening) {
                      stopListening(); // Stop listening when switching to text
                    }
                  }}
                  className={`flex-1 text-xs h-8 ${
                    inputMode === 'text' 
                      ? 'bg-white text-primary shadow-sm' 
                      : 'text-primary-foreground hover:bg-white/10'
                  }`}
                >
                  <Keyboard className="w-3 h-3 mr-1" />
                  Text
                </Button>
              </div>
            </div>

            {/* Messages area */}
            <div className="h-64 overflow-y-auto p-4 space-y-3 bg-background">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground text-sm py-8">
                  <p>👋 Hi! I'm your AI assistant.</p>
                  <p className="mt-2">
                    {inputMode === 'voice' 
                      ? 'Tap the microphone and ask me anything!' 
                      : 'Type your message below and I\'ll help you!'
                    }
                  </p>
                  <p className="mt-2 text-xs opacity-70">
                    Switch between voice and text input using the buttons above
                  </p>
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
            <div className="p-4 border-t border-border bg-card">
              {inputMode === 'text' ? (
                /* Text Input Mode */
                <div className="flex items-center gap-2">
                  <Input
                    value={textInput}
                    onChange={handleTextInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    disabled={isProcessing}
                    className="flex-1"
                    spellCheck={true}
                    autoCorrect="on"
                    autoComplete="on"
                    autoCapitalize="sentences"
                  />
                  <Button
                    onClick={handleTextSubmit}
                    disabled={!textInput.trim() || isProcessing}
                    size="icon"
                    className="shrink-0"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              ) : (
                /* Voice Input Mode */
                <div className="flex items-center justify-center gap-4">
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
              )}
              
              {/* Input mode indicator when in text mode */}
              {inputMode === 'text' && (
                <div className="mt-2 text-center">
                  <p className="text-xs text-muted-foreground">
                    Press Enter to send • Switch to voice mode above
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceBot;
