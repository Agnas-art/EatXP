// Food Sources & Production Methods Data
// Educational database focused on how food is grown and sourced

export type ProductionMethod = "Chemical-Free Farming" | "Standard Agriculture" | "Sustainable Practices" | "Local Production" | "Industrial Scale";

export interface FoodSource {
  id: string;
  name: string;
  emoji: string;
  category: string;
  productionMethod: ProductionMethod;
  nutrients: string[];
  funFact: string;
  productionDetails: string;
  environmentalImpact: string;
  healthBenefit: string;
  seasonality: string;
  commonRegions: string[];
  methodColor: string; // gradient color based on production method
  // Complex organic information
  pesticideResidue?: {
    conventional: string; // percentage or amount
    organic: string; // percentage or amount
  };
  certifications?: string[]; // USDA Organic, Fair Trade, etc.
  carbonFootprint?: {
    local: string; // kg CO2 per unit
    imported: string; // kg CO2 per unit
  };
  soilHealth?: {
    microbialActivity: "High" | "Medium" | "Low";
    organicMatter: string; // percentage
    erosionRisk: "Low" | "Medium" | "High";
  };
  pesticideAndFertilizerBreakdown?: {
    synthetic: string[];
    natural: string[];
  };
  waterUsagePattern?: {
    amount: string; // gallons per lb or similar
    recyclingRate?: string; // percentage
    treatmentMethod?: string;
  };
  nutritionalComparison?: {
    organic: Record<string, string>; // nutrient levels
    conventional: Record<string, string>;
  };
  geneticallyModified?: boolean;
  hybridVariety?: boolean;
}

export interface FoodJournalEntry {
  id: string;
  foodId: string;
  date: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  servingSize: string;
  timestamp: number;
}

export interface FoodAchievement {
  id: string;
  name: string;
  emoji: string;
  description: string;
  requirement: number;
  stickerUrl: string;
  title: string;
  badgeColor: string;
}

export const foodSources: FoodSource[] = [
  // Fruits - Chemical-Free
  {
    id: "apple_1",
    name: "Apple",
    emoji: "🍎",
    category: "Fruits",
    productionMethod: "Chemical-Free Farming",
    nutrients: ["Vitamin C", "Fiber", "Antioxidants"],
    funFact: "Apples contain over 30 different phenolic compounds that protect your cells.",
    productionDetails: "Grown using crop rotation, companion planting, and natural pest management without synthetic pesticides or fertilizers.",
    environmentalImpact: "Regenerates soil health and supports pollinator populations through habitat preservation.",
    healthBenefit: "Rich in pectin fiber which feeds beneficial gut bacteria and improves digestive health.",
    seasonality: "Peak ripeness: August-October in Northern regions",
    commonRegions: ["Washington", "New York", "Michigan", "Vermont"],
    methodColor: "from-emerald-400 to-green-500",
    pesticideResidue: {
      conventional: "15-20 pesticide residues (avg. 2.5 ppb)",
      organic: "<1 pesticide residues (naturally occurring)",
    },
    certifications: ["USDA Organic", "Non-GMO Project Verified"],
    carbonFootprint: {
      local: "0.12 kg CO2",
      imported: "0.45 kg CO2",
    },
    soilHealth: {
      microbialActivity: "High",
      organicMatter: "6-8%",
      erosionRisk: "Low",
    },
    pesticideAndFertilizerBreakdown: {
      synthetic: [],
      natural: ["Neem oil", "Sulfur dust", "Compost", "Bone meal"],
    },
    waterUsagePattern: {
      amount: "1,230 gallons per season",
      recyclingRate: "40%",
      treatmentMethod: "Natural runoff filtration through vegetation buffers",
    },
    nutritionalComparison: {
      organic: {
        "Polyphenols": "196 mg/100g",
        "Fiber": "2.4g/100g",
        "Vitamin C": "5.7mg/100g",
      },
      conventional: {
        "Polyphenols": "158 mg/100g",
        "Fiber": "2.4g/100g",
        "Vitamin C": "5.2mg/100g",
      },
    },
    geneticallyModified: false,
    hybridVariety: true,
  },
  {
    id: "apple_2",
    name: "Apple",
    emoji: "🍎",
    category: "Fruits",
    productionMethod: "Standard Agriculture",
    nutrients: ["Vitamin C", "Fiber"],
    funFact: "Apples are the second most consumed fruit globally, with over 7,500 varieties grown worldwide.",
    productionDetails: "Cultivated using conventional farming methods with approved pesticides and fertilizers for consistent yield and appearance.",
    environmentalImpact: "Optimized for large-scale production; soil fertility maintained through synthetic inputs.",
    healthBenefit: "Excellent source of fiber and vitamin C for immune support and digestive health.",
    seasonality: "Available year-round through storage and imports",
    commonRegions: ["Washington", "China", "Turkey", "Poland"],
    methodColor: "from-blue-400 to-cyan-500",
  },
  {
    id: "banana_1",
    name: "Banana",
    emoji: "🍌",
    category: "Fruits",
    productionMethod: "Chemical-Free Farming",
    nutrients: ["Potassium", "Vitamin B6", "Vitamin C"],
    funFact: "Chemical-free bananas ripen naturally, developing more complex sugars and deeper flavor profiles.",
    productionDetails: "Harvested at optimal ripeness using natural ripening methods, avoiding synthetic ethylene gas treatments.",
    environmentalImpact: "Supports rainforest preservation and protects soil microbiomes from chemical disruption.",
    healthBenefit: "Natural potassium content supports heart health, muscle function, and blood pressure regulation.",
    seasonality: "Year-round availability; peak quality in summer months",
    commonRegions: ["Ecuador", "Costa Rica", "Colombia", "Peru"],
    methodColor: "from-emerald-400 to-green-500",
  },
  {
    id: "banana_2",
    name: "Banana",
    emoji: "🍌",
    category: "Fruits",
    productionMethod: "Industrial Scale",
    nutrients: ["Potassium", "Vitamin B6"],
    funFact: "A typical banana plant produces about 90 pounds of fruit in its lifetime.",
    productionDetails: "Grown in large monoculture plantations using efficient pest management and synthetic fertilizers for consistent supply.",
    environmentalImpact: "Large-scale operations reduce biodiversity but achieve high efficiency and affordability.",
    healthBenefit: "Convenient source of potassium and natural sugars for quick energy and athletic recovery.",
    seasonality: "Available year-round from global production",
    commonRegions: ["Philippines", "Ecuador", "India", "China"],
    methodColor: "from-blue-400 to-cyan-500",
  },
  {
    id: "strawberry_1",
    name: "Strawberry",
    emoji: "🍓",
    category: "Fruits",
    productionMethod: "Chemical-Free Farming",
    nutrients: ["Vitamin C", "Manganese", "Folate"],
    funFact: "Strawberries have seeds on the outside—botanically, the 'fruit' is actually the receptacle, and those tiny 'seeds' are the true fruits!",
    productionDetails: "Hand-harvested at peak ripeness from fields treated with compost, beneficial insects, and natural disease prevention methods.",
    environmentalImpact: "Preserves soil structure and supports biodiversity through reduced chemical inputs.",
    healthBenefit: "Exceptional vitamin C content boosts immune system and collagen production for healthy skin.",
    seasonality: "Peak season: April-June in Northern Hemisphere",
    commonRegions: ["California", "Spain", "Italy", "Japan"],
    methodColor: "from-emerald-400 to-green-500",
    pesticideResidue: {
      conventional: "22 pesticide residues detected (avg. methoxychlor 12 ppb)",
      organic: "Naturally occurring compounds only, no synthetic residues",
    },
    certifications: ["USDA Organic", "Fair Trade Certified", "Rainforest Alliance"],
    carbonFootprint: {
      local: "0.08 kg CO2 (seasonal, local)",
      imported: "0.65 kg CO2 (air freight required for freshness)",
    },
    soilHealth: {
      microbialActivity: "High",
      organicMatter: "7-9%",
      erosionRisk: "Low",
    },
    pesticideAndFertilizerBreakdown: {
      synthetic: [],
      natural: ["Bacillus thuringiensis", "Spinosad", "Kelp extract", "Fish emulsion", "Beneficial parasitic wasps"],
    },
    waterUsagePattern: {
      amount: "3,456 gallons per ton",
      recyclingRate: "60%",
      treatmentMethod: "Drip irrigation with on-site water recycling and infiltration ponds",
    },
    nutritionalComparison: {
      organic: {
        "Vitamin C": "59mg/100g",
        "Folate": "25 mcg/100g",
        "Anthocyanins": "28mg/100g",
        "Phenolic compounds": "145 mg/100g",
      },
      conventional: {
        "Vitamin C": "52mg/100g",
        "Folate": "18 mcg/100g",
        "Anthocyanins": "20mg/100g",
        "Phenolic compounds": "108 mg/100g",
      },
    },
    geneticallyModified: false,
    hybridVariety: true,
  },
  {
    id: "strawberry_2",
    name: "Strawberry",
    emoji: "🍓",
    category: "Fruits",
    productionMethod: "Standard Agriculture",
    nutrients: ["Vitamin C", "Manganese"],
    funFact: "Strawberries are 91% water, making them incredibly hydrating while being low in calories.",
    productionDetails: "Grown in controlled environments with approved fungicides and pesticides to ensure uniform size and extended shelf life.",
    environmentalImpact: "Optimized supply chain reduces waste through consistent quality and efficient distribution.",
    healthBenefit: "Low-calorie fruit rich in antioxidants and vitamin C for skin health and disease prevention.",
    seasonality: "Available year-round from greenhouse production",
    commonRegions: ["USA", "Mexico", "Spain", "Turkey"],
    methodColor: "from-blue-400 to-cyan-500",
  },

  // Vegetables - Chemical-Free
  {
    id: "carrot_1",
    name: "Carrot",
    emoji: "🥕",
    category: "Vegetables",
    productionMethod: "Chemical-Free Farming",
    nutrients: ["Beta-carotene", "Fiber", "Potassium"],
    funFact: "Carrots weren't always orange! Originally, they were purple, white, and red before Dutch growers cultivated orange varieties.",
    productionDetails: "Grown in mineral-rich soil using cover crops and crop rotation to naturally suppress root pests and diseases.",
    environmentalImpact: "Deep root systems improve soil structure and prevent erosion without chemical inputs.",
    healthBenefit: "Beta-carotene converts to vitamin A in your body, supporting eye health and night vision.",
    seasonality: "Peak freshness: August-October; storage keeps them fresh through winter",
    commonRegions: ["Netherlands", "France", "Germany", "California"],
    methodColor: "from-emerald-400 to-green-500",
    pesticideResidue: {
      conventional: "6-8 pesticide residues (herbicides, fungicides avg. 1.2 ppb)",
      organic: "No detected synthetic residues, <0.1 ppb",
    },
    certifications: ["USDA Organic", "Non-GMO Project Verified", "EU Organic Certification"],
    carbonFootprint: {
      local: "0.14 kg CO2 (cold storage included)",
      imported: "0.38 kg CO2 (lower than strawberries, hardy crop)",
    },
    soilHealth: {
      microbialActivity: "High",
      organicMatter: "5-6%",
      erosionRisk: "Very Low",
    },
    pesticideAndFertilizerBreakdown: {
      synthetic: [],
      natural: ["Cover crop nitrogen fixation", "Compost", "Rock dust", "Seaweed meal", "Crop rotation with legumes"],
    },
    waterUsagePattern: {
      amount: "490 gallons per pound",
      recyclingRate: "35%",
      treatmentMethod: "Mulch-based moisture retention reduces irrigation needs",
    },
    nutritionalComparison: {
      organic: {
        "Beta-carotene": "1.89mg/100g",
        "Alpha-carotene": "0.66mg/100g",
        "Lutein": "1.5mg/100g",
        "Fiber": "2.8g/100g",
      },
      conventional: {
        "Beta-carotene": "1.65mg/100g",
        "Alpha-carotene": "0.52mg/100g",
        "Lutein": "1.1mg/100g",
        "Fiber": "2.8g/100g",
      },
    },
    geneticallyModified: false,
    hybridVariety: true,
  },
  {
    id: "carrot_2",
    name: "Carrot",
    emoji: "🥕",
    category: "Vegetables",
    productionMethod: "Standard Agriculture",
    nutrients: ["Beta-carotene", "Fiber"],
    funFact: "You'd need to eat about 2 kg of carrots to get a toxic dose of beta-carotene—they're completely safe to eat regularly!",
    productionDetails: "Cultivated using modern agricultural techniques with selective herbicides and pesticides to achieve consistent orange color and size.",
    environmentalImpact: "Large-scale production with optimized machinery reduces labor costs and increases yield.",
    healthBenefit: "Excellent eye health support through naturally high vitamin A content.",
    seasonality: "Available year-round through storage and imports",
    commonRegions: ["China", "USA", "Russia", "Japan"],
    methodColor: "from-blue-400 to-cyan-500",
  },
  {
    id: "spinach_1",
    name: "Spinach",
    emoji: "🥬",
    category: "Vegetables",
    productionMethod: "Chemical-Free Farming",
    nutrients: ["Iron", "Calcium", "Vitamins A & K"],
    funFact: "Spinach contains oxalic acid which slightly reduces calcium absorption, but still provides significant nutritional value.",
    productionDetails: "Grown in nutrient-dense compost using natural nitrogen fixation from legume cover crops and without synthetic herbicides.",
    environmentalImpact: "Intensive nutrient cycling prevents runoff pollution and rebuilds soil health.",
    healthBenefit: "High in lutein and zeaxanthin—powerful antioxidants that protect eye health and support cognitive function.",
    seasonality: "Spring (March-May) and fall (September-November) harvests",
    commonRegions: ["Denmark", "France", "Netherlands", "California"],
    methodColor: "from-emerald-400 to-green-500",
  },
  {
    id: "spinach_2",
    name: "Spinach",
    emoji: "🥬",
    category: "Vegetables",
    productionMethod: "Standard Agriculture",
    nutrients: ["Iron", "Calcium"],
    funFact: "Popeye the sailor popularized spinach in the 1930s, though the iron content was actually miscalculated by early researchers.",
    productionDetails: "Mechanically harvested from large fields using integrated pest management and approved crop protection products.",
    environmentalImpact: "Efficient harvesting and processing maximizes food availability and minimizes per-unit environmental cost.",
    healthBenefit: "Nutrient-dense leafy green supporting bone health, immune function, and energy production.",
    seasonality: "Available year-round from diverse growing regions",
    commonRegions: ["USA", "China", "Japan", "India"],
    methodColor: "from-blue-400 to-cyan-500",
  },
  {
    id: "tomato_1",
    name: "Tomato",
    emoji: "🍅",
    category: "Vegetables",
    productionMethod: "Chemical-Free Farming",
    nutrients: ["Lycopene", "Vitamin C", "Potassium"],
    funFact: "Lycopene, tomato's red pigment, is more bioavailable when tomatoes are cooked or processed.",
    productionDetails: "Cultivated on heirloom varieties using drip irrigation, companion planting with basil to repel pests, and compost-based fertility.",
    environmentalImpact: "Water-efficient irrigation and natural pest control reduce chemical and water waste.",
    healthBenefit: "Lycopene is a powerful antioxidant linked to reduced heart disease risk and cancer prevention.",
    seasonality: "Peak ripeness: June-September; summer tomatoes have superior flavor and nutrition",
    commonRegions: ["Italy", "Spain", "Greece", "California"],
    methodColor: "from-emerald-400 to-green-500",
  },
  {
    id: "tomato_2",
    name: "Tomato",
    emoji: "🍅",
    category: "Vegetables",
    productionMethod: "Industrial Scale",
    nutrients: ["Lycopene", "Vitamin C"],
    funFact: "Tomatoes are technically fruits (botanically), not vegetables, though legally classified as vegetables for tariff purposes in the US.",
    productionDetails: "Grown in climate-controlled greenhouses with hydroponic systems, artificial lighting, and optimized nutrient delivery.",
    environmentalImpact: "Controlled environments reduce seasonal variations but require significant energy input.",
    healthBenefit: "Consistent year-round access to lycopene and vitamin C for cardiovascular and immune health.",
    seasonality: "Available consistently throughout the year",
    commonRegions: ["China", "USA", "Turkey", "Mexico"],
    methodColor: "from-blue-400 to-cyan-500",
  },

  // Grains
  {
    id: "rice_1",
    name: "Rice",
    emoji: "🍚",
    category: "Grains",
    productionMethod: "Chemical-Free Farming",
    nutrients: ["Carbohydrates", "Manganese", "Magnesium"],
    funFact: "Rice is the primary staple food for over 3 billion people worldwide.",
    productionDetails: "Grown using traditional flood-farming methods with natural pest management, alternating crops with legumes for soil nitrogen.",
    environmentalImpact: "Rice paddies create unique ecosystems that support fish, birds, and amphibians while sequestering carbon.",
    healthBenefit: "Complex carbohydrates provide sustained energy; magnesium supports nerve function and muscle relaxation.",
    seasonality: "Annual harvest after monsoon season",
    commonRegions: ["Vietnam", "Thailand", "Indonesia", "Philippines"],
    methodColor: "from-emerald-400 to-green-500",
  },
  {
    id: "rice_2",
    name: "Rice",
    emoji: "🍚",
    category: "Grains",
    productionMethod: "Standard Agriculture",
    nutrients: ["Carbohydrates", "Manganese"],
    funFact: "Brown rice contains all three parts of the grain: bran, germ, and endosperm, while white rice has the bran and germ removed.",
    productionDetails: "Large-scale cultivation with selective herbicides and fungicides; mechanized harvesting and milling for uniform products.",
    environmentalImpact: "Optimized for maximum yield feeding billions; modern irrigation reduces dependence on rainfall.",
    healthBenefit: "Efficient carbohydrate source for energy; enriched white rice includes added vitamins and minerals.",
    seasonality: "Available year-round through global supply chains",
    commonRegions: ["China", "India", "Bangladesh", "Myanmar"],
    methodColor: "from-blue-400 to-cyan-500",
  },
  {
    id: "wheat_1",
    name: "Wheat",
    emoji: "🌾",
    category: "Grains",
    productionMethod: "Chemical-Free Farming",
    nutrients: ["Protein", "Fiber", "B Vitamins"],
    funFact: "Wheat has been cultivated for over 10,000 years and is one of humanity's most important crops.",
    productionDetails: "Grown using diverse crop rotation, cover crops for soil health, and biological pest control without synthetic inputs.",
    environmentalImpact: "Diverse farming practices support soil carbon sequestration and prevent erosion.",
    healthBenefit: "Whole grain wheat provides complex carbohydrates, protein, and B vitamins for sustained energy and brain health.",
    seasonality: "Harvested in late summer; storage maintains availability",
    commonRegions: ["France", "Germany", "Australia", "Canada"],
    methodColor: "from-emerald-400 to-green-500",
  },
  {
    id: "wheat_2",
    name: "Wheat",
    emoji: "🌾",
    category: "Grains",
    productionMethod: "Standard Agriculture",
    nutrients: ["Protein", "Carbohydrates"],
    funFact: "Wheat is the world's most widely used cereal crop, accounting for about 20% of all human calories.",
    productionDetails: "Cultivated using modern hybrid seeds, chemical fertilizers, and herbicides optimized for maximum grain yield.",
    environmentalImpact: "High-yield agriculture efficiently feeds large populations; monoculture reduces agricultural diversity.",
    healthBenefit: "Versatile grain providing protein, carbohydrates, and B vitamins in bread, pasta, and cereals.",
    seasonality: "Year-round availability through global trading systems",
    commonRegions: ["China", "India", "Russia", "USA"],
    methodColor: "from-blue-400 to-cyan-500",
  },

  // Proteins
  {
    id: "lentil_1",
    name: "Lentil",
    emoji: "🫘",
    category: "Proteins",
    productionMethod: "Chemical-Free Farming",
    nutrients: ["Protein", "Fiber", "Iron"],
    funFact: "Lentils have been cultivated for over 13,000 years and are a staple protein in Mediterranean and Middle Eastern cuisines.",
    productionDetails: "Grown using crop rotation where lentils naturally fix nitrogen in soil, reducing need for external fertilizers.",
    environmentalImpact: "Regenerative agriculture practice that improves soil health and reduces chemical dependency.",
    healthBenefit: "Complete plant protein containing all 9 essential amino acids; high fiber supports digestive health and blood sugar stability.",
    seasonality: "Harvested in late summer; dried lentils store indefinitely",
    commonRegions: ["Canada", "Turkey", "USA", "Nepal"],
    methodColor: "from-emerald-400 to-green-500",
  },
  {
    id: "lentil_2",
    name: "Lentil",
    emoji: "🫘",
    category: "Proteins",
    productionMethod: "Standard Agriculture",
    nutrients: ["Protein", "Fiber"],
    funFact: "Lentils are drought-resistant crops that can thrive in marginal lands unsuitable for other crops.",
    productionDetails: "Cultivated using conventional farming methods with approved fertilizers and pesticides for consistent yields.",
    environmentalImpact: "Efficient production at scale meets growing global protein demand affordably.",
    healthBenefit: "Affordable, shelf-stable protein source supporting plant-based diets and food security.",
    seasonality: "Available year-round in dried form",
    commonRegions: ["India", "Turkey", "Australia", "USA"],
    methodColor: "from-blue-400 to-cyan-500",
  },
  {
    id: "egg_1",
    name: "Egg",
    emoji: "🥚",
    category: "Proteins",
    productionMethod: "Chemical-Free Farming",
    nutrients: ["Protein", "Choline", "Selenium"],
    funFact: "Eggs contain lutein and zeaxanthin, carotenoids that protect your eyes from age-related macular degeneration.",
    productionDetails: "From pasture-raised hens with access to open fields, natural diet including insects and plants, no antibiotics.",
    environmentalImpact: "Small-scale operations integrate with farm ecosystems; minimal processing maintains nutritional integrity.",
    healthBenefit: "Complete protein with all 9 essential amino acids; choline supports brain development and memory function.",
    seasonality: "Available year-round; highest quality in spring and early summer",
    commonRegions: ["Small farms", "Europe", "USA"],
    methodColor: "from-emerald-400 to-green-500",
  },
  {
    id: "egg_2",
    name: "Egg",
    emoji: "🥚",
    category: "Proteins",
    productionMethod: "Industrial Scale",
    nutrients: ["Protein", "Choline"],
    funFact: "A single egg contains about 6 grams of high-quality protein and just 70 calories.",
    productionDetails: "From commercial layer hen operations with optimized feeding, climate control, and disease prevention protocols.",
    environmentalImpact: "Large-scale efficient production provides affordable protein to billions; housing systems maximize production.",
    healthBenefit: "Excellent, affordable source of complete protein for muscle building and overall nutrition.",
    seasonality: "Available consistently year-round",
    commonRegions: ["China\", \"USA\", \"India\", \"Japan"],
    methodColor: "from-blue-400 to-cyan-500",
  },

  // Dairy
  {
    id: "milk_1",
    name: "Milk",
    emoji: "🥛",
    category: "Dairy",
    productionMethod: "Chemical-Free Farming",
    nutrients: ["Calcium", "Protein", "Vitamin D"],
    funFact: "Grass-fed cow milk naturally contains higher levels of omega-3 fatty acids and conjugated linoleic acid (CLA).",
    productionDetails: "From pasture-grazing cows fed on chemical-free grass and hay, minimal antibiotics, produced on small-medium dairies.",
    environmentalImpact: "Rotational grazing improves pasture health and supports soil carbon sequestration.",
    healthBenefit: "Higher micronutrient density supports bone health, immunity, and cardiovascular function.",
    seasonality: "Peak quality spring/early summer when cows graze fresh pastures",
    commonRegions: ["Vermont\", \"New Zealand\", \"Ireland\", \"Denmark"],
    methodColor: "from-emerald-400 to-green-500",
  },
  {
    id: "milk_2",
    name: "Milk",
    emoji: "🥛",
    category: "Dairy",
    productionMethod: "Standard Agriculture",
    nutrients: ["Calcium", "Protein"],
    funFact: "Milk is the most commonly consumed animal product globally, consumed fresh or as cheese, yogurt, and butter.",
    productionDetails: "From commercial dairy operations with controlled feeding, veterinary care, and pasteurization for food safety.",
    environmentalImpact: "Large-scale efficient production meets global calcium and protein demands affordably.",
    healthBenefit: "Fortified milk provides essential calcium and vitamin D for bone health and nutrient absorption.",
    seasonality: "Available consistently year-round",
    commonRegions: ["Germany\", \"USA\", \"France\", \"Russia"],
    methodColor: "from-blue-400 to-cyan-500",
  },
];

export const foodCategories = ["Fruits", "Vegetables", "Grains", "Proteins", "Dairy"];

// Helper functions
export const getFoodSourceById = (id: string): FoodSource | undefined => {
  return foodSources.find((food) => food.id === id);
};

export const getAllFoodSources = (): FoodSource[] => {
  return foodSources;
};

export const getFoodsByCategory = (category: string): FoodSource[] => {
  return foodSources.filter((food) => food.category === category);
};

export const getFoodsByMethod = (method: ProductionMethod): FoodSource[] => {
  return foodSources.filter((food) => food.productionMethod === method);
};

export const getTotalFoodsLogged = (entries: FoodJournalEntry[]): number => {
  return entries.length;
};

export const getFoodsLoggedByMethod = (
  entries: FoodJournalEntry[],
  method: ProductionMethod
): number => {
  return entries.filter((entry) => {
    const food = getFoodSourceById(entry.foodId);
    return food?.productionMethod === method;
  }).length;
};

export const getUnlockedAchievements = (totalLogged: number): FoodAchievement[] => {
  const achievements: FoodAchievement[] = [
    {
      id: "sprout",
      name: "Food Explorer",
      emoji: "🌱",
      description: "Log your first food",
      requirement: 1,
      stickerUrl: "sprout",
      title: "Explorer",
      badgeColor: "from-green-300 to-emerald-400",
    },
    {
      id: "sapling",
      name: "Curious Eater",
      emoji: "🌿",
      description: "Log 5 different foods",
      requirement: 5,
      stickerUrl: "sapling",
      title: "Curious",
      badgeColor: "from-emerald-400 to-teal-500",
    },
    {
      id: "tree",
      name: "Food Enthusiast",
      emoji: "🌳",
      description: "Log 10 different foods",
      requirement: 10,
      stickerUrl: "tree",
      title: "Enthusiast",
      badgeColor: "from-teal-500 to-cyan-500",
    },
    {
      id: "forest",
      name: "Nutrition Scholar",
      emoji: "🌲",
      description: "Log 20 different foods",
      requirement: 20,
      stickerUrl: "forest",
      title: "Scholar",
      badgeColor: "from-cyan-500 to-blue-500",
    },
    {
      id: "jungle",
      name: "Production Master",
      emoji: "🌴",
      description: "Log 30 different foods",
      requirement: 30,
      stickerUrl: "jungle",
      title: "Master",
      badgeColor: "from-blue-500 to-indigo-500",
    },
    {
      id: "earth",
      name: "Global Food Citizen",
      emoji: "🌍",
      description: "Log 50 different foods",
      requirement: 50,
      stickerUrl: "earth",
      title: "Global Citizen",
      badgeColor: "from-indigo-500 to-purple-600",
    },
  ];

  return achievements.filter((achievement) => totalLogged >= achievement.requirement);
};

export const getNextAchievement = (totalLogged: number): FoodAchievement | null => {
  const achievements: FoodAchievement[] = [
    {
      id: "sprout",
      name: "Food Explorer",
      emoji: "🌱",
      description: "Log your first food",
      requirement: 1,
      stickerUrl: "sprout",
      title: "Explorer",
      badgeColor: "from-green-300 to-emerald-400",
    },
    {
      id: "sapling",
      name: "Curious Eater",
      emoji: "🌿",
      description: "Log 5 different foods",
      requirement: 5,
      stickerUrl: "sapling",
      title: "Curious",
      badgeColor: "from-emerald-400 to-teal-500",
    },
    {
      id: "tree",
      name: "Food Enthusiast",
      emoji: "🌳",
      description: "Log 10 different foods",
      requirement: 10,
      stickerUrl: "tree",
      title: "Enthusiast",
      badgeColor: "from-teal-500 to-cyan-500",
    },
    {
      id: "forest",
      name: "Nutrition Scholar",
      emoji: "🌲",
      description: "Log 20 different foods",
      requirement: 20,
      stickerUrl: "forest",
      title: "Scholar",
      badgeColor: "from-cyan-500 to-blue-500",
    },
    {
      id: "jungle",
      name: "Production Master",
      emoji: "🌴",
      description: "Log 30 different foods",
      requirement: 30,
      stickerUrl: "jungle",
      title: "Master",
      badgeColor: "from-blue-500 to-indigo-500",
    },
    {
      id: "earth",
      name: "Global Food Citizen",
      emoji: "🌍",
      description: "Log 50 different foods",
      requirement: 50,
      stickerUrl: "earth",
      title: "Global Citizen",
      badgeColor: "from-indigo-500 to-purple-600",
    },
  ];

  const nextAchievement = achievements.find((achievement) => totalLogged < achievement.requirement);
  return nextAchievement || null;
};
