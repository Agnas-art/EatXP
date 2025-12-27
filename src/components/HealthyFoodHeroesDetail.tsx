import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Zap, Heart, Leaf, Award, CheckCircle, Play, BookOpen, AlertCircle } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";

interface FoodHero {
  name: string;
  emoji: string;
  scientificName: string;
  category: string;
  seasonality: string[];
  nutrition: {
    calories: number;
    protein: number;
    fiber: number;
    vitamins: string[];
    minerals: string[];
    benefits: string[];
  };
  animeTraits: {
    trait: string;
    power: string;
  };
  funFact: string;
  culturalUses: {
    dishes: string[];
    traditions: string[];
    cookingTips: string[];
  };
  sustainability: string;
  xpReward: number;
  challenge: {
    title: string;
    description: string;
    requirement: number;
    duration: string;
  };
  recipe: {
    title: string;
    emoji: string;
    description: string;
    steps: string[];
  };
  trivia: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

const FOOD_HEROES_DATA: Record<string, FoodHero> = {
  carrot: {
    name: "Carrot",
    emoji: "🥕",
    scientificName: "Daucus carota subsp. sativus",
    category: "Root Vegetable",
    seasonality: ["Summer", "Fall", "Winter"],
    nutrition: {
      calories: 41,
      protein: 0.9,
      fiber: 2.8,
      vitamins: ["Vitamin A", "Vitamin K", "Vitamin C"],
      minerals: ["Potassium", "Manganese"],
      benefits: [
        "Rich in beta-carotene for vision and immunity",
        "Promotes healthy skin and glowing complexion",
        "Supports bone health",
      ],
    },
    animeTraits: {
      trait: "Vision Guardian",
      power: "Ultra Vision - See through darkness and read like a ninja!",
    },
    funFact: "Carrots were originally purple, not orange! Orange carrots were cultivated in the Netherlands in the 1600s.",
    culturalUses: {
      dishes: [
        "Carrot cake (Western)",
        "Gajar ka halwa (Indian sweet)",
        "Stir-fries (Asian)",
        "Carrot soup (European)",
      ],
      traditions: [
        "Thanksgiving staple in North America",
        "Used in Diwali feasts in India",
        "Traditional Easter dishes in Europe",
      ],
      cookingTips: [
        "Steaming keeps more nutrients than boiling",
        "Roasting brings out natural sweetness",
        "Raw carrots are crunchy and great for snacks",
        "Pair with olive oil to boost beta-carotene absorption",
      ],
    },
    sustainability:
      "Carrots are nutritionally dense and available year-round. Eating seasonal carrots reduces transportation impact. Locally grown carrots are fresher and cheaper!",
    xpReward: 50,
    challenge: {
      title: "Carrot Vision Quest",
      description: "Eat carrots twice this week and unlock the 'Vision Guardian' badge!",
      requirement: 2,
      duration: "7 days",
    },
    recipe: {
      title: "Honey Roasted Carrots",
      emoji: "🥕✨",
      description: "Crispy, sweet roasted carrots that are super delicious!",
      steps: [
        "Wash and peel 5 carrots, cut into sticks",
        "Toss with 1 tbsp olive oil and 1 tbsp honey",
        "Sprinkle with cinnamon and salt",
        "Roast at 400°F for 25 minutes until golden",
        "Enjoy while warm with a squeeze of lemon!",
      ],
    },
    trivia: {
      question: "What makes carrots orange?",
      options: ["Chlorophyll", "Beta-carotene", "Iron", "Carotenoids"],
      correct: 1,
      explanation:
        "Beta-carotene is a pigment that your body converts to Vitamin A. It's what gives carrots their orange color and helps you see in the dark!",
    },
  },

  spinach: {
    name: "Spinach",
    emoji: "🥬",
    scientificName: "Spinacia oleracea",
    category: "Leafy Green",
    seasonality: ["Spring", "Fall"],
    nutrition: {
      calories: 23,
      protein: 2.7,
      fiber: 2.2,
      vitamins: ["Vitamin A", "Vitamin K", "Folate", "Vitamin C"],
      minerals: ["Iron", "Manganese", "Magnesium"],
      benefits: [
        "Excellent source of iron for strong muscles",
        "Boosts energy and stamina",
        "Supports brain function and memory",
      ],
    },
    animeTraits: {
      trait: "Muscle Hero",
      power: "Super Strength - Popeye mode activated! Get stronger with every bite!",
    },
    funFact: "Spinach is 91% water! Despite being mostly water, it's loaded with nutrients. The myth about spinach having tons of iron came from a misplaced decimal point in a 1870 study.",
    culturalUses: {
      dishes: [
        "Palak paneer (Indian creamy spinach)",
        "Spinach pasta (Italian)",
        "Saag (Indian spiced spinach)",
        "Creamed spinach (American)",
      ],
      traditions: [
        "Middle Eastern cuisines use spinach in many dishes",
        "Asian stir-fries feature spinach prominently",
        "Mediterranean salads include fresh spinach",
      ],
      cookingTips: [
        "Raw spinach in salads retains the most nutrients",
        "Light cooking (steaming 1-2 min) maintains texture",
        "Pair with Vitamin C foods to absorb more iron",
        "Avoid overcooking which makes it mushy",
      ],
    },
    sustainability:
      "Spinach grows quickly (30 days!) and uses less water than many vegetables. Spring spinach is most sustainable. Buy local when possible!",
    xpReward: 60,
    challenge: {
      title: "Muscle Hero Mission",
      description: "Eat spinach 3 times and become a Super Strength Hero!",
      requirement: 3,
      duration: "10 days",
    },
    recipe: {
      title: "Spinach & Cheese Quesadillas",
      emoji: "🥬🧀",
      description: "Cheesy, green, and absolutely delicious!",
      steps: [
        "Wilt 2 cups spinach in a pan until soft",
        "Mix with 1 cup shredded cheese (cheddar or mozzarella)",
        "Place mixture between 2 whole wheat tortillas",
        "Pan-fry both sides until golden and crispy",
        "Cut into triangles and serve with salsa!",
      ],
    },
    trivia: {
      question: "Spinach is what percentage water?",
      options: ["50%", "70%", "91%", "99%"],
      correct: 2,
      explanation:
        "Spinach is 91% water, but that 9% is packed with iron, vitamins, and minerals. It's like a nutritional powerhouse in liquid form!",
    },
  },

  broccoli: {
    name: "Broccoli",
    emoji: "🥦",
    scientificName: "Brassica oleracea var. italica",
    category: "Cruciferous Vegetable",
    seasonality: ["Fall", "Winter", "Spring"],
    nutrition: {
      calories: 34,
      protein: 2.8,
      fiber: 2.4,
      vitamins: ["Vitamin C", "Vitamin K", "Folate"],
      minerals: ["Potassium", "Manganese"],
      benefits: [
        "Boosts immune system with Vitamin C",
        "Contains sulforaphane (cancer-fighting compound)",
        "Promotes healthy digestion",
      ],
    },
    animeTraits: {
      trait: "Immune Shield Hero",
      power: "Defense Force - Protect your body from getting sick!",
    },
    funFact:
      "Broccoli is a flower! You're eating the unopened flower buds of the broccoli plant. If left alone, they'd bloom into yellow flowers.",
    culturalUses: {
      dishes: [
        "Broccoli & cheese casserole (American)",
        "Broccoli stir-fry (Chinese)",
        "Broccoli pasta (Italian)",
        "Roasted broccoli (Mediterranean)",
      ],
      traditions: [
        "Popular in Asian cuisines for centuries",
        "Part of trendy health food culture",
        "Featured in European holiday meals",
      ],
      cookingTips: [
        "Steam for 3-5 minutes to keep it crispy and green",
        "Roasting with olive oil brings out natural sweetness",
        "Raw broccoli in salads has maximum nutrients",
        "Save the stems - they're delicious when peeled!",
      ],
    },
    sustainability:
      "Broccoli is very nutritious per calorie. Seasonal broccoli (fall/winter) has the smallest environmental footprint. It regenerates after harvesting!",
    xpReward: 55,
    challenge: {
      title: "Immune Shield Challenge",
      description: "Eat broccoli twice and unlock the 'Defense Hero' badge!",
      requirement: 2,
      duration: "7 days",
    },
    recipe: {
      title: "Cheesy Broccoli Bites",
      emoji: "🥦✨",
      description: "Crispy, cheesy broccoli that tastes like appetizers!",
      steps: [
        "Cut 4 cups broccoli into bite-sized florets",
        "Toss with olive oil, salt, and pepper",
        "Sprinkle with parmesan cheese",
        "Roast at 400°F for 20 minutes until crispy",
        "Add a drizzle of honey for sweet and savory!",
      ],
    },
    trivia: {
      question: "Broccoli is actually what part of the plant?",
      options: ["Leaves", "Unopened flower buds", "Roots", "Stem"],
      correct: 1,
      explanation:
        "You're eating the unopened flower buds! If you left broccoli in the garden, the green florets would open into yellow flowers. That's why it's called the 'crown' of the plant.",
    },
  },

  tomato: {
    name: "Tomato",
    emoji: "🍅",
    scientificName: "Solanum lycopersicum",
    category: "Fruit Vegetable",
    seasonality: ["Summer", "Early Fall"],
    nutrition: {
      calories: 18,
      protein: 0.9,
      fiber: 1.5,
      vitamins: ["Vitamin C", "Vitamin A", "Folate"],
      minerals: ["Potassium", "Manganese"],
      benefits: [
        "Rich in lycopene (antioxidant for heart health)",
        "Supports healthy skin and vision",
        "Low calorie, high nutrient density",
      ],
    },
    animeTraits: {
      trait: "Heart Guardian",
      power: "Love Aura - Protect your heart and spread joy!",
    },
    funFact:
      "Tomatoes are botanically fruits but legally vegetables! In 1893, the Supreme Court declared them vegetables for tariff purposes.",
    culturalUses: {
      dishes: [
        "Pasta sauce (Italian)",
        "Salsa (Mexican)",
        "Tom Yum (Thai)",
        "Gazpacho (Spanish)",
      ],
      traditions: [
        "La Tomatina (tomato festival) in Spain",
        "Essential in Mediterranean cuisine",
        "Key ingredient in Indian curries",
      ],
      cookingTips: [
        "Summer tomatoes taste best fresh in salads",
        "Cooking tomatoes releases more lycopene",
        "Store at room temperature to maintain flavor",
        "Heirloom varieties offer unique tastes",
      ],
    },
    sustainability:
      "Summer tomatoes are most sustainable when local. Greenhouse tomatoes in winter have a larger environmental impact. Buy seasonal for best flavor and sustainability!",
    xpReward: 50,
    challenge: {
      title: "Tomato Love Quest",
      description: "Make a fresh tomato dish and earn the 'Garden Fresh' badge!",
      requirement: 1,
      duration: "7 days",
    },
    recipe: {
      title: "Fresh Tomato Salsa",
      emoji: "🍅🌶️",
      description: "Chunky, fresh salsa perfect for chips or tacos!",
      steps: [
        "Dice 3 fresh tomatoes and 1 red onion",
        "Add 1 diced jalapeño (optional for spice)",
        "Mix with cilantro, lime juice, and salt",
        "Let sit for 15 minutes so flavors blend",
        "Serve with tortilla chips - olé!",
      ],
    },
    trivia: {
      question: "Are tomatoes fruits or vegetables?",
      options: ["Fruits", "Vegetables", "Both", "Neither"],
      correct: 2,
      explanation:
        "Tomatoes are botanically fruits (they have seeds inside), but the Supreme Court ruled them vegetables for cooking purposes in 1893! So technically, they're both!",
    },
  },

  banana: {
    name: "Banana",
    emoji: "🍌",
    scientificName: "Musa acuminata",
    category: "Tropical Fruit",
    seasonality: ["Year-round"],
    nutrition: {
      calories: 105,
      protein: 1.3,
      fiber: 2.6,
      vitamins: ["Vitamin B6", "Vitamin C", "Folate"],
      minerals: ["Potassium", "Manganese"],
      benefits: [
        "Rich in potassium for heart health and energy",
        "Natural sugars provide quick energy boost",
        "Contains mood-boosting serotonin precursors",
      ],
    },
    animeTraits: {
      trait: "Energy Champion",
      power: "Vitality Surge - Instant energy boost for adventures!",
    },
    funFact: "Bananas are berries, but strawberries aren't! Also, bananas can float in water due to their low density.",
    culturalUses: {
      dishes: ["Banana splits (American)", "Banana curry (South Asian)", "Pancakes (Global)"],
      traditions: ["Popular in Caribbean cuisine", "Staple in African dishes", "Used in Asian desserts"],
      cookingTips: [
        "Ripe bananas are sweeter and softer",
        "Green bananas have more resistant starch",
        "Blend frozen bananas for nice cream",
      ],
    },
    sustainability:
      "Bananas are available year-round but grown in tropical regions. Fair-trade bananas support farmer livelihoods. Buy organic when possible!",
    xpReward: 40,
    challenge: {
      title: "Energy Quest",
      description: "Eat a banana and feel the energy boost!",
      requirement: 1,
      duration: "7 days",
    },
    recipe: {
      title: "Peanut Butter Banana Toast",
      emoji: "🍌🥜",
      description: "Quick, delicious, and packed with energy!",
      steps: [
        "Toast whole grain bread until golden",
        "Spread 2 tbsp peanut butter on toast",
        "Slice banana and arrange on top",
        "Drizzle with honey and a pinch of cinnamon",
        "Enjoy immediately!",
      ],
    },
    trivia: {
      question: "Which fruit is technically a berry?",
      options: ["Strawberry", "Banana", "Raspberry", "Blackberry"],
      correct: 1,
      explanation:
        "Bananas are berries! Botanically, a berry develops from the ovary of a single flower. Strawberries actually aren't true berries - they're aggregate fruits!",
    },
  },

  apple: {
    name: "Apple",
    emoji: "🍎",
    scientificName: "Malus domestica",
    category: "Pome Fruit",
    seasonality: ["Fall", "Winter", "Early Spring"],
    nutrition: {
      calories: 95,
      protein: 0.5,
      fiber: 4.4,
      vitamins: ["Vitamin C", "Vitamin K"],
      minerals: ["Potassium", "Manganese"],
      benefits: [
        "High in fiber for healthy digestion",
        "Contains quercetin for brain health",
        "Helps maintain healthy teeth",
      ],
    },
    animeTraits: {
      trait: "Health Guardian",
      power: "Wellness Shield - Keep you healthy every day!",
    },
    funFact: "Apples are part of the rose family! It takes about 36 apples to make one gallon of apple juice.",
    culturalUses: {
      dishes: ["Apple pie (American)", "Apple crumble (British)", "Apple salad (Global)"],
      traditions: ["Apple bobbing (Halloween)", "Thanksgiving staple", "Rosh Hashanah symbol"],
      cookingTips: [
        "Different varieties have different tastes",
        "Granny Smith for baking, Fuji for eating",
        "Keep apples in the refrigerator to last longer",
      ],
    },
    sustainability:
      "Apples can be stored long-term without refrigeration. Buy local when in season (fall). Supports local orchards!",
    xpReward: 45,
    challenge: {
      title: "Apple A Day",
      description: "Eat an apple daily for a week to stay healthy!",
      requirement: 7,
      duration: "7 days",
    },
    recipe: {
      title: "Baked Cinnamon Apples",
      emoji: "🍎✨",
      description: "Warm, cozy dessert that's naturally sweet!",
      steps: [
        "Core 2 apples and place in baking dish",
        "Fill with oats, nuts, and cinnamon",
        "Drizzle with honey",
        "Bake at 375°F for 20 minutes",
        "Serve warm with yogurt!",
      ],
    },
    trivia: {
      question: "Apples are part of which plant family?",
      options: ["Citrus", "Stone fruit", "Rose", "Berry"],
      correct: 2,
      explanation: "Apples belong to the Rosaceae family, the same family as roses, pears, and strawberries!",
    },
  },

  cheese: {
    name: "Cheese",
    emoji: "🧀",
    scientificName: "Lactis coagulatum",
    category: "Dairy",
    seasonality: ["Year-round"],
    nutrition: {
      calories: 402,
      protein: 25,
      fiber: 0,
      vitamins: ["Vitamin A", "Vitamin B12", "Vitamin D"],
      minerals: ["Calcium", "Phosphorus", "Zinc"],
      benefits: [
        "Excellent source of calcium for strong bones",
        "High protein for muscle building",
        "Contains probiotics for gut health",
      ],
    },
    animeTraits: {
      trait: "Bone Warrior",
      power: "Calcium Shield - Build unbreakable bones!",
    },
    funFact: "There are over 2,000 varieties of cheese! The oldest known cheese dates back 8,000 years.",
    culturalUses: {
      dishes: ["Pizza (Italian)", "Nachos (Mexican)", "Mac and Cheese (American)"],
      traditions: ["Cheese festivals worldwide", "Traditional cheesemaking in Europe", "Important in Mediterranean diet"],
      cookingTips: [
        "Softer cheeses melt better",
        "Sharp cheddar has more flavor than mild",
        "Store cheese in the cheese drawer of fridge",
      ],
    },
    sustainability:
      "Look for locally-made cheese from small dairies. Organic cheese comes from grass-fed cows. Supports sustainable farming!",
    xpReward: 50,
    challenge: {
      title: "Cheese Challenge",
      description: "Try a new cheese variety and unlock the 'Cheese Explorer' badge!",
      requirement: 1,
      duration: "30 days",
    },
    recipe: {
      title: "Cheesy Veggie Quesadilla",
      emoji: "🧀🥬",
      description: "Melty, cheesy, and packed with veggies!",
      steps: [
        "Heat olive oil in a pan",
        "Place tortilla and add shredded cheese + veggies",
        "Top with another tortilla",
        "Cook until golden and cheese is melted",
        "Cut into triangles and serve!",
      ],
    },
    trivia: {
      question: "How many cheese varieties exist?",
      options: ["About 100", "About 500", "Over 2,000", "About 50"],
      correct: 2,
      explanation:
        "There are over 2,000 varieties of cheese worldwide! Each region has its own specialty cheeses with unique flavors and textures.",
    },
  },

  avocado: {
    name: "Avocado",
    emoji: "🥑",
    scientificName: "Persea americana",
    category: "Fruit",
    seasonality: ["Fall", "Winter", "Spring"],
    nutrition: {
      calories: 160,
      protein: 2,
      fiber: 6.7,
      vitamins: ["Vitamin K", "Vitamin C", "Folate"],
      minerals: ["Potassium", "Copper"],
      benefits: [
        "Rich in healthy monounsaturated fats for brain health",
        "High in potassium, more than bananas",
        "Supports eye health with lutein",
      ],
    },
    animeTraits: {
      trait: "Brain Scholar",
      power: "Intellect Boost - Sharpen your mind for studying!",
    },
    funFact: "Avocados are actually berries! They contain a large seed in the middle and develop from the plant's flower.",
    culturalUses: {
      dishes: ["Guacamole (Mexican)", "Avocado toast (Modern)", "Poke bowls (Hawaiian)"],
      traditions: ["Mexican staple for centuries", "Growing trend in health food", "Symbol of sustainability"],
      cookingTips: [
        "Wait until avocado yields to gentle pressure",
        "Store in paper bag to ripen faster",
        "Use lemon juice to prevent browning",
      ],
    },
    sustainability:
      "Avocados require significant water. Look for sustainably grown options. Support fair-trade farming practices!",
    xpReward: 55,
    challenge: {
      title: "Brain Boost Quest",
      description: "Make avocado toast and fuel your brain!",
      requirement: 1,
      duration: "7 days",
    },
    recipe: {
      title: "Avocado Toast with Egg",
      emoji: "🥑🍳",
      description: "Perfect brunch with healthy fats and protein!",
      steps: [
        "Toast whole grain bread until crispy",
        "Mash ripe avocado with lemon, salt, pepper",
        "Spread on toast generously",
        "Top with a fried or poached egg",
        "Add red pepper flakes and enjoy!",
      ],
    },
    trivia: {
      question: "Avocados are actually what type of fruit?",
      options: ["Vegetables", "Berries", "Drupes", "Aggregate fruits"],
      correct: 1,
      explanation:
        "Avocados are berries! They develop from a single ovary and have a large seed, making them true berries despite their savory use.",
    },
  },

  salmon: {
    name: "Salmon",
    emoji: "🐟",
    scientificName: "Salmo salar",
    category: "Protein/Fish",
    seasonality: ["Spring", "Summer", "Fall"],
    nutrition: {
      calories: 206,
      protein: 20,
      fiber: 0,
      vitamins: ["Vitamin D", "Vitamin B12", "Selenium"],
      minerals: ["Omega-3 fatty acids", "Potassium"],
      benefits: [
        "Rich in omega-3 fatty acids for heart health",
        "Excellent source of lean protein",
        "Supports brain and joint health",
      ],
    },
    animeTraits: {
      trait: "Strength Warrior",
      power: "Muscle Surge - Build lean muscle and power!",
    },
    funFact: "Salmon can jump up to 12 feet high! They swim thousands of miles back to their birthplace to spawn.",
    culturalUses: {
      dishes: ["Sushi (Japanese)", "Salmon fillet (Nordic)", "Fish tacos (Modern)"],
      traditions: ["Native American staple", "Scandinavian cuisine", "Japanese delicacy"],
      cookingTips: [
        "Wild salmon has more omega-3s than farmed",
        "Baking or grilling preserves nutrients better",
        "Skin contains beneficial omega-3s - keep it on",
      ],
    },
    sustainability:
      "Choose wild-caught salmon from sustainable fisheries. Look for MSC certification. Avoid overfished species!",
    xpReward: 65,
    challenge: {
      title: "Protein Power",
      description: "Cook and eat salmon to get the protein warrior badge!",
      requirement: 1,
      duration: "14 days",
    },
    recipe: {
      title: "Honey Garlic Baked Salmon",
      emoji: "🐟✨",
      description: "Flaky, delicious, and super healthy!",
      steps: [
        "Place salmon fillet on parchment paper",
        "Mix honey, garlic, and lemon juice",
        "Brush mixture over salmon",
        "Bake at 400°F for 15 minutes",
        "Serve with roasted vegetables!",
      ],
    },
    trivia: {
      question: "How high can salmon jump?",
      options: ["Up to 6 feet", "Up to 10 feet", "Up to 12 feet", "Up to 15 feet"],
      correct: 2,
      explanation:
        "Salmon can jump up to 12 feet high! This amazing ability helps them swim upstream to their birthplace, a journey that can be thousands of miles long!",
    },
  },

  quinoa: {
    name: "Quinoa",
    emoji: "🌾",
    scientificName: "Chenopodium quinoa",
    category: "Grain",
    seasonality: ["Fall", "Winter"],
    nutrition: {
      calories: 120,
      protein: 4.4,
      fiber: 2.8,
      vitamins: ["Magnesium", "Manganese", "Folate"],
      minerals: ["Phosphorus", "Copper", "Iron"],
      benefits: [
        "Complete protein with all 9 amino acids",
        "High in fiber for digestion",
        "Gluten-free grain",
      ],
    },
    animeTraits: {
      trait: "Ancient Hero",
      power: "Complete Strength - Full body nutrition in every bite!",
    },
    funFact: "Quinoa was called 'the mother grain' by the Incas! It's technically a seed, not a true grain.",
    culturalUses: {
      dishes: ["Quinoa bowls (Modern)", "Peruvian salads", "Grain pilaf (Global)"],
      traditions: ["Andean staple for 5,000 years", "Growing superfood trend", "Vegan protein source"],
      cookingTips: [
        "Rinse quinoa before cooking to remove bitterness",
        "Use 2 cups water to 1 cup quinoa",
        "Fluff with fork after cooking",
      ],
    },
    sustainability:
      "Quinoa is drought-resistant and supports Andean farmers. However, water usage in some regions is high. Choose certified fair-trade!",
    xpReward: 60,
    challenge: {
      title: "Ancient Grain Quest",
      description: "Try quinoa and unlock the ancient grain warrior badge!",
      requirement: 1,
      duration: "14 days",
    },
    recipe: {
      title: "Mediterranean Quinoa Bowl",
      emoji: "🌾🥒",
      description: "Colorful, filling, and packed with nutrients!",
      steps: [
        "Cook 1 cup quinoa in 2 cups water",
        "Add diced cucumber, tomato, red onion",
        "Include chickpeas for extra protein",
        "Drizzle with olive oil and lemon juice",
        "Top with feta cheese and herbs!",
      ],
    },
    trivia: {
      question: "Quinoa is technically what?",
      options: ["A grain", "A seed", "A legume", "A vegetable"],
      correct: 1,
      explanation:
        "Quinoa is technically a seed from a plant related to spinach and beets, not a true grain. But it's used like a grain in cooking!",
    },
  },

  "greek yogurt": {
    name: "Greek Yogurt",
    emoji: "🥛",
    scientificName: "Lactobacillus bulgaricus",
    category: "Dairy",
    seasonality: ["Year-round"],
    nutrition: {
      calories: 130,
      protein: 11,
      fiber: 0,
      vitamins: ["Vitamin B12", "Pantothenic acid"],
      minerals: ["Calcium", "Probiotics"],
      benefits: [
        "Twice the protein of regular yogurt",
        "Contains probiotics for gut health",
        "Supports digestive health and immunity",
      ],
    },
    animeTraits: {
      trait: "Gut Guardian",
      power: "Digestive Shield - Keep your belly happy and strong!",
    },
    funFact: "Greek yogurt is strained multiple times to remove whey, making it thicker and creamier than regular yogurt!",
    culturalUses: {
      dishes: ["Tzatziki sauce (Greek)", "Parfaits (Modern)", "Smoothie bowls (Health food)"],
      traditions: ["Mediterranean diet staple", "Ancient Greek preparation", "Modern health trend"],
      cookingTips: [
        "Check expiration date - fresher is better",
        "Full-fat has more flavor than low-fat",
        "Great substitute for sour cream",
      ],
    },
    sustainability:
      "Look for organic Greek yogurt from grass-fed cows. Support brands with ethical dairy practices!",
    xpReward: 50,
    challenge: {
      title: "Gut Health Quest",
      description: "Eat Greek yogurt daily for 5 days to boost your digestion!",
      requirement: 5,
      duration: "7 days",
    },
    recipe: {
      title: "Berry Greek Yogurt Parfait",
      emoji: "🥛🫐",
      description: "Creamy, delicious, and loaded with probiotics!",
      steps: [
        "Layer Greek yogurt in a bowl",
        "Add granola for crunch",
        "Top with mixed berries (blueberry, strawberry)",
        "Drizzle with honey",
        "Enjoy as breakfast or snack!",
      ],
    },
    trivia: {
      question: "How much more protein does Greek yogurt have than regular yogurt?",
      options: ["25% more", "50% more", "100% more", "150% more"],
      correct: 2,
      explanation:
        "Greek yogurt has twice (100% more) the protein of regular yogurt because it's strained to remove whey, concentrating the protein!",
    },
  },

  "sweet potato": {
    name: "Sweet Potato",
    emoji: "🍠",
    scientificName: "Ipomoea batatas",
    category: "Root Vegetable",
    seasonality: ["Fall", "Winter"],
    nutrition: {
      calories: 103,
      protein: 1.6,
      fiber: 3.3,
      vitamins: ["Vitamin A", "Vitamin C", "Folate"],
      minerals: ["Potassium", "Manganese"],
      benefits: [
        "Excellent source of beta-carotene for vision",
        "High in antioxidants",
        "Supports immune system",
      ],
    },
    animeTraits: {
      trait: "Vision Guardian",
      power: "Golden Sight - See clearly and stay alert!",
    },
    funFact: "Sweet potatoes are not related to regular potatoes! They're from a completely different plant family.",
    culturalUses: {
      dishes: ["Fries (American)", "Curry (Asian)", "Pie (Thanksgiving)"],
      traditions: ["Thanksgiving staple", "Soul food tradition", "Asian cuisine"],
      cookingTips: [
        "Baking brings out natural sweetness",
        "Skin is edible and nutritious",
        "Great substitute for regular potatoes",
      ],
    },
    sustainability:
      "Sweet potatoes are low-impact crops that improve soil health. Buy local when possible!",
    xpReward: 55,
    challenge: {
      title: "Golden Root Quest",
      description: "Roast sweet potatoes and earn the vision hero badge!",
      requirement: 1,
      duration: "7 days",
    },
    recipe: {
      title: "Roasted Sweet Potato Wedges",
      emoji: "🍠✨",
      description: "Crispy outside, soft inside - perfectly golden!",
      steps: [
        "Cut sweet potato into wedges",
        "Toss with olive oil and cinnamon",
        "Spread on baking sheet",
        "Roast at 400°F for 25 minutes",
        "Serve with yogurt dip!",
      ],
    },
    trivia: {
      question: "Are sweet potatoes related to regular potatoes?",
      options: ["Yes, same family", "No, completely different", "Somewhat related", "Only by name"],
      correct: 1,
      explanation:
        "Sweet potatoes and regular potatoes are completely unrelated! Regular potatoes are from the nightshade family, while sweet potatoes are vines from the bindweed family.",
    },
  },

  chicken: {
    name: "Chicken",
    emoji: "🍗",
    scientificName: "Gallus gallus domesticus",
    category: "Protein/Poultry",
    seasonality: ["Year-round"],
    nutrition: {
      calories: 165,
      protein: 31,
      fiber: 0,
      vitamins: ["Vitamin B6", "Niacin", "Selenium"],
      minerals: ["Phosphorus", "Zinc"],
      benefits: [
        "Lean protein for muscle building",
        "Rich in B vitamins for energy",
        "Versatile and affordable",
      ],
    },
    animeTraits: {
      trait: "Power Hero",
      power: "Strength Force - Build muscles and energy!",
    },
    funFact: "Chicken is the most popular meat in the world! A single chicken produces about 3-5 pounds of meat.",
    culturalUses: {
      dishes: ["Fried chicken (American)", "Tikka (Indian)", "Teriyaki (Japanese)"],
      traditions: ["Global staple", "Key in many cuisines", "Popular BBQ ingredient"],
      cookingTips: [
        "Dark meat is more flavorful than white meat",
        "Always cook to internal temperature of 165°F",
        "Marinating adds flavor and tenderness",
      ],
    },
    sustainability:
      "Choose free-range or pasture-raised chicken. Look for certifications. Supports ethical farming!",
    xpReward: 60,
    challenge: {
      title: "Power Meal Quest",
      description: "Cook a chicken dinner and earn the protein hero badge!",
      requirement: 1,
      duration: "14 days",
    },
    recipe: {
      title: "Lemon Herb Grilled Chicken",
      emoji: "🍗🍋",
      description: "Juicy, flavorful, and perfect with veggies!",
      steps: [
        "Mix olive oil, lemon juice, garlic, and herbs",
        "Marinate chicken breasts for 30 minutes",
        "Grill over medium heat for 6-7 minutes per side",
        "Rest for 5 minutes before serving",
        "Serve with roasted veggies!",
      ],
    },
    trivia: {
      question: "What is the most popular meat in the world?",
      options: ["Beef", "Pork", "Chicken", "Fish"],
      correct: 2,
      explanation:
        "Chicken is the most popular meat globally! It's affordable, versatile, and nutritious, making it a staple in cuisines worldwide.",
    },
  },
};

interface HealthyFoodHeroesDetailProps {
  foodKey: string;
  onBack: () => void;
  selectedAge?: string;
}

export default function HealthyFoodHeroesDetail({
  foodKey,
  onBack,
  selectedAge = "kids",
}: HealthyFoodHeroesDetailProps) {
  const food = FOOD_HEROES_DATA[foodKey.toLowerCase()];
  const { preferences, canEatFood } = usePreferences();
  const [completedChallenge, setCompletedChallenge] = useState(false);
  const [unlockedRecipe, setUnlockedRecipe] = useState(false);
  const [showTrivia, setShowTrivia] = useState(false);
  const [triviaAnswered, setTriviaAnswered] = useState(false);
  const [triviaCorrect, setTriviaCorrect] = useState(false);

  if (!food) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Food not found</p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const canEatThisFood = canEatFood(food.name);

  const handleTriviaAnswer = (index: number) => {
    setTriviaAnswered(true);
    setTriviaCorrect(index === food.trivia.correct);
    if (index === food.trivia.correct) {
      setCompletedChallenge(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 overflow-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-amber-200 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-orange-700">
            {food.emoji} {food.name} - Food Hero
          </h1>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Allergen Warning */}
        {!canEatThisFood && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border-2 border-red-500 rounded-xl p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-800">⚠️ Dietary Restriction Alert</h3>
              <p className="text-sm text-red-700 mt-1">
                This food may contain ingredients that don't match your dietary preferences.
                Check with a parent or guardian before consuming.
              </p>
            </div>
          </motion.div>
        )}

        {/* Dietary Info Banner */}
        {preferences.allergies.length > 0 || preferences.dietaryPreference !== 'non-vegetarian' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-4"
          >
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Your Preferences:</span>{" "}
              {preferences.dietaryPreference === 'vegetarian' && '🥬 Vegetarian | '}
              {preferences.dietaryPreference === 'eggtarian' && '🥚 Eggtarian | '}
              {preferences.allergies.length > 0 && `⚠️ Allergic to: ${preferences.allergies.join(', ')}`}
            </p>
          </motion.div>
        )}

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl p-8 text-white shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-4xl font-bold mb-2">{food.name}</h2>
              <p className="text-orange-100 text-sm italic">{food.scientificName}</p>
            </div>
            <div className="text-9xl drop-shadow-lg">{food.emoji}</div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur">
              <p className="text-orange-100 text-sm">Category</p>
              <p className="font-bold">{food.category}</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur">
              <p className="text-orange-100 text-sm">Anime Trait</p>
              <p className="font-bold">{food.animeTraits.trait}</p>
            </div>
          </div>
        </motion.div>

        {/* Basic Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border-2 border-amber-200 shadow-md"
        >
          <h3 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
            <Leaf className="w-6 h-6" /> Seasonality
          </h3>
          <div className="flex flex-wrap gap-2">
            {food.seasonality.map((season) => (
              <span
                key={season}
                className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold"
              >
                {season}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Nutrition Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 border-2 border-amber-200 shadow-md"
        >
          <h3 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
            <Heart className="w-6 h-6" /> Nutrition Facts (per 100g)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-1">Calories</p>
              <p className="text-2xl font-bold text-orange-700">{food.nutrition.calories}</p>
              <p className="text-xs text-gray-600">kcal</p>
            </div>
            <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-1">Protein</p>
              <p className="text-2xl font-bold text-red-700">{food.nutrition.protein}g</p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-1">Fiber</p>
              <p className="text-2xl font-bold text-green-700">{food.nutrition.fiber}g</p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-1">XP Reward</p>
              <p className="text-2xl font-bold text-blue-700">+{food.xpReward}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">🏥 Key Vitamins</h4>
              <ul className="space-y-2">
                {food.nutrition.vitamins.map((vitamin) => (
                  <li key={vitamin} className="text-sm text-gray-700 flex items-center gap-2">
                    <span className="text-lg">✨</span> {vitamin}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">⛏️ Key Minerals</h4>
              <ul className="space-y-2">
                {food.nutrition.minerals.map((mineral) => (
                  <li key={mineral} className="text-sm text-gray-700 flex items-center gap-2">
                    <span className="text-lg">💪</span> {mineral}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border-2 border-green-300">
            <h4 className="font-bold text-green-900 mb-3">💚 Health Benefits</h4>
            <ul className="space-y-2">
              {food.nutrition.benefits.map((benefit, idx) => (
                <li key={idx} className="text-sm text-green-900 flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Anime Twist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border-2 border-purple-300 shadow-md"
        >
          <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
            <Award className="w-6 h-6" /> Anime Character Trait
          </h3>
          <div className="bg-white rounded-lg p-4 mb-3 border-2 border-purple-200">
            <p className="text-sm text-gray-600 mb-1">Hero Type</p>
            <p className="text-2xl font-bold text-purple-700">{food.animeTraits.trait}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border-2 border-purple-200">
            <p className="text-sm text-gray-600 mb-1">Special Power</p>
            <p className="text-lg font-semibold text-purple-900">⚡ {food.animeTraits.power}</p>
          </div>
        </motion.div>

        {/* Fun Fact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-6 border-2 border-yellow-300 shadow-md"
        >
          <h3 className="text-xl font-bold text-yellow-800 mb-3">💡 Did You Know?</h3>
          <p className="text-gray-800">{food.funFact}</p>
        </motion.div>

        {/* Cultural & Culinary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 border-2 border-amber-200 shadow-md"
        >
          <h3 className="text-xl font-bold text-orange-700 mb-4">🌍 Cultural & Culinary Uses</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-800 mb-3">🍽️ Popular Dishes</h4>
              <ul className="space-y-2">
                {food.culturalUses.dishes.map((dish, idx) => (
                  <li key={idx} className="text-sm text-gray-700 p-2 bg-orange-50 rounded">
                    • {dish}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 mb-3">🎉 Traditions & Festivals</h4>
              <ul className="space-y-2">
                {food.culturalUses.traditions.map((tradition, idx) => (
                  <li key={idx} className="text-sm text-gray-700 p-2 bg-green-50 rounded">
                    • {tradition}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-bold text-gray-800 mb-3">👨‍🍳 Cooking Tips</h4>
            <div className="space-y-2">
              {food.culturalUses.cookingTips.map((tip, idx) => (
                <div key={idx} className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <p className="text-sm text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sustainability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-green-100 to-teal-100 rounded-xl p-6 border-2 border-green-300 shadow-md"
        >
          <h3 className="text-xl font-bold text-green-700 mb-3">🌱 Sustainability & Seasonal Value</h3>
          <p className="text-gray-800">{food.sustainability}</p>
        </motion.div>

        {/* Interactive Features */}
        <div className="space-y-4">
          {/* Challenge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className={`rounded-xl p-6 border-2 shadow-md ${
              completedChallenge
                ? "bg-gradient-to-r from-green-100 to-emerald-100 border-green-400"
                : "bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-300"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-blue-700 flex items-center gap-2">
                <Zap className="w-6 h-6" /> Quest Challenge
              </h3>
              {completedChallenge && (
                <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-bold">
                  ✓ Completed
                </span>
              )}
            </div>
            <p className="font-semibold text-gray-800 mb-2">{food.challenge.title}</p>
            <p className="text-sm text-gray-700 mb-3">{food.challenge.description}</p>
            <div className="flex gap-4 text-sm">
              <div className="px-3 py-2 bg-white rounded-lg font-semibold text-blue-700">
                📋 {food.challenge.requirement} times
              </div>
              <div className="px-3 py-2 bg-white rounded-lg font-semibold text-blue-700">
                ⏰ {food.challenge.duration}
              </div>
              <div className="px-3 py-2 bg-white rounded-lg font-semibold text-yellow-700">
                ⭐ +50 XP
              </div>
            </div>
          </motion.div>

          {/* Recipe */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className={`rounded-xl p-6 border-2 shadow-md ${
              unlockedRecipe
                ? "bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-400"
                : "bg-gradient-to-r from-amber-100 to-orange-100 border-amber-300"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-orange-700 flex items-center gap-2">
                <BookOpen className="w-6 h-6" /> Recipe Unlock
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setUnlockedRecipe(true)}
                className={`px-4 py-2 rounded-lg font-bold transition ${
                  unlockedRecipe
                    ? "bg-green-500 text-white"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                {unlockedRecipe ? "✓ Unlocked" : "Unlock Recipe"}
              </motion.button>
            </div>

            <AnimatePresence>
              {unlockedRecipe && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3"
                >
                  <div className="bg-white rounded-lg p-4 border-2 border-orange-300">
                    <p className="text-2xl font-bold text-orange-700 mb-2">
                      {food.recipe.emoji} {food.recipe.title}
                    </p>
                    <p className="text-gray-700 mb-4">{food.recipe.description}</p>
                    <h4 className="font-bold text-gray-800 mb-2">Steps:</h4>
                    <ol className="space-y-2">
                      {food.recipe.steps.map((step, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex gap-3">
                          <span className="font-bold text-orange-600 flex-shrink-0">
                            {idx + 1}.
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Trivia Quiz */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-6 border-2 border-indigo-300 shadow-md"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-indigo-700 flex items-center gap-2">
                <Play className="w-6 h-6" /> Trivia Quiz
              </h3>
              {triviaCorrect && (
                <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-bold">
                  ✓ Correct!
                </span>
              )}
            </div>

            <AnimatePresence>
              {!showTrivia ? (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowTrivia(true)}
                  className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition"
                >
                  Start Trivia Quiz → +25 XP
                </motion.button>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-lg p-6 border-2 border-indigo-300 space-y-4"
                >
                  <p className="text-lg font-semibold text-gray-800">{food.trivia.question}</p>
                  <div className="space-y-3">
                    {food.trivia.options.map((option, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleTriviaAnswer(idx)}
                        disabled={triviaAnswered}
                        className={`w-full p-3 rounded-lg border-2 font-semibold transition text-left ${
                          triviaAnswered
                            ? idx === food.trivia.correct
                              ? "bg-green-100 border-green-400 text-green-800"
                              : "bg-red-100 border-red-300 text-red-700"
                            : "bg-white border-indigo-300 text-gray-800 hover:bg-indigo-50"
                        }`}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>

                  {triviaAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg ${
                        triviaCorrect
                          ? "bg-green-100 border-2 border-green-400"
                          : "bg-blue-100 border-2 border-blue-400"
                      }`}
                    >
                      <p className="font-bold text-gray-800 mb-2">
                        {triviaCorrect ? "🎉 Correct!" : "📚 Learn More"}
                      </p>
                      <p className="text-sm text-gray-700">{food.trivia.explanation}</p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom Spacer */}
        <div className="h-8" />
      </div>
    </div>
  );
}
