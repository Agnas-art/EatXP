// Organic Foods Data
// Database of organic and non-organic foods with nutritional info and facts

export interface OrganicFood {
  id: string;
  name: string;
  emoji: string;
  category: string;
  isOrganic: boolean;
  nutrients: string[];
  funFact: string;
  organicBenefit?: string;
  powerLevel: number; // 1-10 scale for visual effects
  glowColor: string; // color class for organic effect
}

export interface FoodJournalEntry {
  id: string;
  foodId: string;
  date: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  quantity: string;
  timestamp: number;
}

export interface OrganicAchievement {
  id: string;
  name: string;
  emoji: string;
  description: string;
  requirement: number; // how many organic items needed
  stickerUrl: string;
  title: string;
  badgeColor: string;
}

export const organicFoods: OrganicFood[] = [
  // Fruits - Organic
  {
    id: "apple_organic",
    name: "Organic Apple",
    emoji: "🍎",
    category: "Fruits",
    isOrganic: true,
    nutrients: ["Vitamin C", "Fiber", "Antioxidants"],
    funFact: "Organic apples have 15% more antioxidants than conventional apples!",
    organicBenefit: "Grown without synthetic pesticides",
    powerLevel: 8,
    glowColor: "from-green-400 to-emerald-500",
  },
  {
    id: "apple_conventional",
    name: "Conventional Apple",
    emoji: "🍎",
    category: "Fruits",
    isOrganic: false,
    nutrients: ["Vitamin C", "Fiber"],
    funFact: "Apples are one of the most pesticide-sprayed fruits.",
    powerLevel: 5,
    glowColor: "from-gray-400 to-gray-500",
  },
  {
    id: "banana_organic",
    name: "Organic Banana",
    emoji: "🍌",
    category: "Fruits",
    isOrganic: true,
    nutrients: ["Potassium", "Vitamin B6", "Vitamin C"],
    funFact: "Organic bananas are ripened naturally without ethylene gas!",
    organicBenefit: "No synthetic ripening agents",
    powerLevel: 9,
    glowColor: "from-yellow-300 to-yellow-500",
  },
  {
    id: "banana_conventional",
    name: "Conventional Banana",
    emoji: "🍌",
    category: "Fruits",
    isOrganic: false,
    nutrients: ["Potassium", "Vitamin B6"],
    funFact: "Conventional bananas are often sprayed with ripening chemicals.",
    powerLevel: 4,
    glowColor: "from-gray-400 to-gray-500",
  },
  {
    id: "strawberry_organic",
    emoji: "🍓",
    name: "Organic Strawberries",
    category: "Fruits",
    isOrganic: true,
    nutrients: ["Vitamin C", "Manganese", "Folate"],
    funFact: "Organic strawberries have twice the antioxidant content!",
    organicBenefit: "Picked fresh without chemical residue",
    powerLevel: 10,
    glowColor: "from-red-400 to-rose-500",
  },
  {
    id: "strawberry_conventional",
    name: "Conventional Strawberries",
    emoji: "🍓",
    category: "Fruits",
    isOrganic: false,
    nutrients: ["Vitamin C", "Manganese"],
    funFact: "Strawberries are ranked #1 for pesticide residue in US.",
    powerLevel: 3,
    glowColor: "from-gray-400 to-gray-500",
  },

  // Vegetables - Organic
  {
    id: "carrot_organic",
    name: "Organic Carrots",
    emoji: "🥕",
    category: "Vegetables",
    isOrganic: true,
    nutrients: ["Beta-carotene", "Fiber", "Potassium"],
    funFact: "Organic carrots have 30% more phenolic compounds!",
    organicBenefit: "Chemical-free, full earth flavor",
    powerLevel: 8,
    glowColor: "from-orange-400 to-orange-500",
  },
  {
    id: "carrot_conventional",
    name: "Conventional Carrots",
    emoji: "🥕",
    category: "Vegetables",
    isOrganic: false,
    nutrients: ["Beta-carotene", "Fiber"],
    funFact: "Conventional carrots are often treated with dyes.",
    powerLevel: 4,
    glowColor: "from-gray-400 to-gray-500",
  },
  {
    id: "spinach_organic",
    name: "Organic Spinach",
    emoji: "🥬",
    category: "Vegetables",
    isOrganic: true,
    nutrients: ["Iron", "Calcium", "Vitamins A & K"],
    funFact: "Organic spinach has higher mineral content than conventional!",
    organicBenefit: "Rich soil nutrients, no pesticides",
    powerLevel: 9,
    glowColor: "from-green-500 to-emerald-600",
  },
  {
    id: "spinach_conventional",
    name: "Conventional Spinach",
    emoji: "🥬",
    category: "Vegetables",
    isOrganic: false,
    nutrients: ["Iron", "Calcium"],
    funFact: "Spinach often has the most pesticide residue of any green.",
    powerLevel: 3,
    glowColor: "from-gray-400 to-gray-500",
  },
  {
    id: "broccoli_organic",
    name: "Organic Broccoli",
    emoji: "🥦",
    category: "Vegetables",
    isOrganic: true,
    nutrients: ["Vitamin C", "Sulforaphane", "Folate"],
    funFact: "Organic broccoli has higher levels of cancer-fighting compounds!",
    organicBenefit: "No pesticides, maximum nutrients",
    powerLevel: 9,
    glowColor: "from-green-400 to-teal-500",
  },
  {
    id: "broccoli_conventional",
    name: "Conventional Broccoli",
    emoji: "🥦",
    category: "Vegetables",
    isOrganic: false,
    nutrients: ["Vitamin C", "Folate"],
    funFact: "Broccoli crowns trap pesticide residue.",
    powerLevel: 4,
    glowColor: "from-gray-400 to-gray-500",
  },

  // Grains - Organic
  {
    id: "rice_organic",
    name: "Organic Brown Rice",
    emoji: "🍚",
    category: "Grains",
    isOrganic: true,
    nutrients: ["B Vitamins", "Fiber", "Manganese"],
    funFact: "Organic rice has no arsenic accumulation like conventional rice!",
    organicBenefit: "Chemical-free, full fiber intact",
    powerLevel: 8,
    glowColor: "from-amber-400 to-yellow-500",
  },
  {
    id: "rice_conventional",
    name: "White Rice",
    emoji: "🍚",
    category: "Grains",
    isOrganic: false,
    nutrients: ["Carbohydrates"],
    funFact: "Conventional rice can absorb heavy metals from soil.",
    powerLevel: 3,
    glowColor: "from-gray-400 to-gray-500",
  },

  // Proteins - Organic
  {
    id: "egg_organic",
    name: "Organic Free-Range Eggs",
    emoji: "🥚",
    category: "Proteins",
    isOrganic: true,
    nutrients: ["Protein", "Choline", "Lutein"],
    funFact: "Organic eggs have 10x more omega-3 fatty acids!",
    organicBenefit: "From happy, chemical-free chickens",
    powerLevel: 9,
    glowColor: "from-yellow-400 to-amber-500",
  },
  {
    id: "egg_conventional",
    name: "Conventional Eggs",
    emoji: "🥚",
    category: "Proteins",
    isOrganic: false,
    nutrients: ["Protein"],
    funFact: "Conventional eggs have lower nutrient density.",
    powerLevel: 4,
    glowColor: "from-gray-400 to-gray-500",
  },
  {
    id: "chicken_organic",
    name: "Organic Chicken",
    emoji: "🐔",
    category: "Proteins",
    isOrganic: true,
    nutrients: ["Protein", "B Vitamins", "Selenium"],
    funFact: "Organic chickens eat organic feed with no antibiotics!",
    organicBenefit: "No hormones or antibiotics",
    powerLevel: 8,
    glowColor: "from-amber-300 to-orange-500",
  },
  {
    id: "chicken_conventional",
    name: "Conventional Chicken",
    emoji: "🐔",
    category: "Proteins",
    isOrganic: false,
    nutrients: ["Protein"],
    funFact: "Conventional chicken may have antibiotic residue.",
    powerLevel: 3,
    glowColor: "from-gray-400 to-gray-500",
  },

  // Dairy - Organic
  {
    id: "milk_organic",
    name: "Organic Milk",
    emoji: "🥛",
    category: "Dairy",
    isOrganic: true,
    nutrients: ["Calcium", "Vitamin D", "Protein"],
    funFact: "Organic milk has higher omega-3s and CLA!",
    organicBenefit: "From grass-fed cows, hormone-free",
    powerLevel: 8,
    glowColor: "from-blue-300 to-cyan-500",
  },
  {
    id: "milk_conventional",
    name: "Conventional Milk",
    emoji: "🥛",
    category: "Dairy",
    isOrganic: false,
    nutrients: ["Calcium", "Protein"],
    funFact: "Conventional milk may contain hormone residue.",
    powerLevel: 3,
    glowColor: "from-gray-400 to-gray-500",
  },
];

export const achievements: OrganicAchievement[] = [
  {
    id: "organic_starter",
    name: "Organic Sprout",
    emoji: "🌱",
    description: "Log your first organic food!",
    requirement: 1,
    stickerUrl: "organic_sprout.png",
    title: "You planted the seed!",
    badgeColor: "from-green-100 to-emerald-100",
  },
  {
    id: "organic_warrior_5",
    name: "Organic Warrior",
    emoji: "⚔️",
    description: "Log 5 organic foods!",
    requirement: 5,
    stickerUrl: "organic_warrior.png",
    title: "You're an Organic Warrior!",
    badgeColor: "from-yellow-100 to-amber-100",
  },
  {
    id: "farm_fresh_hero_10",
    name: "Farm Fresh Hero",
    emoji: "🌾",
    description: "Log 10 organic foods!",
    requirement: 10,
    stickerUrl: "farm_fresh_hero.png",
    title: "You're a Farm Fresh Hero!",
    badgeColor: "from-orange-100 to-red-100",
  },
  {
    id: "green_guardian_25",
    name: "Green Guardian",
    emoji: "🛡️",
    description: "Log 25 organic foods!",
    requirement: 25,
    stickerUrl: "green_guardian.png",
    title: "Guardian of Green Foods!",
    badgeColor: "from-teal-100 to-green-100",
  },
  {
    id: "nature_master_50",
    name: "Nature Master",
    emoji: "👑",
    description: "Log 50 organic foods!",
    requirement: 50,
    stickerUrl: "nature_master.png",
    title: "Master of Nature's Bounty!",
    badgeColor: "from-purple-100 to-pink-100",
  },
  {
    id: "organic_legend_100",
    name: "Organic Legend",
    emoji: "🌟",
    description: "Log 100 organic foods!",
    requirement: 100,
    stickerUrl: "organic_legend.png",
    title: "You're an Organic Legend!",
    badgeColor: "from-yellow-100 to-yellow-200",
  },
];

// Helper functions
export const getOrganicStatus = (foodId: string): boolean => {
  const food = organicFoods.find((f) => f.id === foodId);
  return food?.isOrganic || false;
};

export const getFoodById = (foodId: string): OrganicFood | undefined => {
  return organicFoods.find((f) => f.id === foodId);
};

export const getOrganicCount = (entries: FoodJournalEntry[]): number => {
  return entries.filter((entry) => getOrganicStatus(entry.foodId)).length;
};

export const getNextAchievement = (organicCount: number): OrganicAchievement | null => {
  const nextAchievement = achievements.find(
    (ach) => ach.requirement > organicCount
  );
  return nextAchievement || null;
};

export const getUnlockedAchievements = (organicCount: number): OrganicAchievement[] => {
  return achievements.filter((ach) => ach.requirement <= organicCount);
};

export const foodCategories = [
  "Fruits",
  "Vegetables",
  "Grains",
  "Proteins",
  "Dairy",
];

export const getOrganicFoodsByCategory = (category: string): OrganicFood[] => {
  return organicFoods.filter(
    (food) => food.category === category && food.isOrganic
  );
};

export const getConventionalFoodsByCategory = (category: string): OrganicFood[] => {
  return organicFoods.filter(
    (food) => food.category === category && !food.isOrganic
  );
};
