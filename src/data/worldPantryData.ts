// World Pantry - Country Staple Foods Data
// Global cuisine and traditional foods from different countries

export interface StapleFood {
  name: string;
  emoji: string;
  country: string;
  description: string;
  category: string;
  nutrients: string[];
  recipe?: string;
  culturalSignificance: string;
}

export interface CountryCuisine {
  country: string;
  flag: string;
  stapleFood: string;
  emoji: string;
  traditionalMeals: string[];
  healthBenefits: string[];
  stapleIngredients: StapleFood[];
}

export const worldPantryData: CountryCuisine[] = [
  {
    country: "Japan",
    flag: "🇯🇵",
    stapleFood: "Rice",
    emoji: "🍚",
    traditionalMeals: ["Sushi", "Ramen", "Tempura", "Miso Soup", "Teriyaki"],
    healthBenefits: ["Energy", "B vitamins", "Fiber from whole grain", "Low fat"],
    stapleIngredients: [
      {
        name: "Rice",
        emoji: "🍚",
        country: "Japan",
        description: "Short-grain white or brown rice, staple carbohydrate",
        category: "Grains",
        nutrients: ["Carbohydrates", "B vitamins", "Manganese"],
        culturalSignificance: "Center of every meal, symbol of sustenance",
      },
      {
        name: "Soy Sauce",
        emoji: "🫙",
        country: "Japan",
        description: "Fermented soy and wheat sauce for flavoring",
        category: "Condiments",
        nutrients: ["Amino acids", "Probiotics", "Minerals"],
        culturalSignificance: "Essential seasoning in Japanese cooking",
      },
      {
        name: "Nori (Seaweed)",
        emoji: "🟢",
        country: "Japan",
        description: "Dried seaweed used in sushi and snacks",
        category: "Vegetables",
        nutrients: ["Iodine", "Iron", "Calcium", "Vitamins"],
        culturalSignificance: "Essential for sushi, rich ocean nutrition",
      },
      {
        name: "Miso",
        emoji: "🥣",
        country: "Japan",
        description: "Fermented soybean paste for soups and marinades",
        category: "Protein",
        nutrients: ["Probiotics", "Amino acids", "Minerals"],
        culturalSignificance: "Ancient fermented food with health benefits",
      },
    ],
  },
  {
    country: "India",
    flag: "🇮🇳",
    stapleFood: "Rice & Lentils",
    emoji: "🍛",
    traditionalMeals: ["Dal", "Biryani", "Curry", "Naan", "Samosa"],
    healthBenefits: ["Protein from lentils", "Spices have anti-inflammatory properties", "Whole grains"],
    stapleIngredients: [
      {
        name: "Lentils (Dal)",
        emoji: "🟡",
        country: "India",
        description: "Dried lentils providing plant-based protein",
        category: "Protein",
        nutrients: ["Protein", "Fiber", "Iron", "Folate"],
        culturalSignificance: "Protein staple for vegetarian diet, nutritious and affordable",
      },
      {
        name: "Turmeric",
        emoji: "✨",
        country: "India",
        description: "Golden spice with curcumin for health",
        category: "Spices",
        nutrients: ["Curcumin", "Anti-inflammatory", "Antioxidants"],
        culturalSignificance: "Sacred spice, used in medicine and cooking",
      },
      {
        name: "Basmati Rice",
        emoji: "🍚",
        country: "India",
        description: "Long-grain aromatic rice staple",
        category: "Grains",
        nutrients: ["Carbohydrates", "B vitamins"],
        culturalSignificance: "Premium rice used in special dishes",
      },
      {
        name: "Cumin",
        emoji: "🌰",
        country: "India",
        description: "Warming spice used in cooking and medicine",
        category: "Spices",
        nutrients: ["Iron", "Manganese", "Digestive aids"],
        culturalSignificance: "Essential spice in Indian cooking",
      },
    ],
  },
  {
    country: "Mexico",
    flag: "🇲🇽",
    stapleFood: "Corn",
    emoji: "🌽",
    traditionalMeals: ["Tacos", "Tamales", "Pozole", "Mole", "Enchiladas"],
    healthBenefits: ["Whole grains", "Fiber", "Corn nutrients", "Fresh vegetables"],
    stapleIngredients: [
      {
        name: "Corn (Maiz)",
        emoji: "🌽",
        country: "Mexico",
        description: "Foundation grain for tortillas and corn dishes",
        category: "Grains",
        nutrients: ["Carbohydrates", "Lutein", "Fiber"],
        culturalSignificance: "Sacred crop in Aztec culture, foundation of diet",
      },
      {
        name: "Beans",
        emoji: "🫘",
        country: "Mexico",
        description: "Black, pinto, and refried beans for protein",
        category: "Protein",
        nutrients: ["Protein", "Fiber", "Iron", "Magnesium"],
        culturalSignificance: "Complete protein paired with corn",
      },
      {
        name: "Avocado",
        emoji: "🥑",
        country: "Mexico",
        description: "Creamy fruit rich in healthy fats",
        category: "Fruits",
        nutrients: ["Healthy fats", "Potassium", "Vitamins"],
        culturalSignificance: "Aztec superfood, nutritional powerhouse",
      },
      {
        name: "Chili Peppers",
        emoji: "🌶️",
        country: "Mexico",
        description: "Hot peppers for flavor and metabolism boost",
        category: "Vegetables",
        nutrients: ["Vitamin C", "Capsaicin", "Antioxidants"],
        culturalSignificance: "Heart of Mexican cuisine for thousands of years",
      },
    ],
  },
  {
    country: "Italy",
    flag: "🇮🇹",
    stapleFood: "Pasta",
    emoji: "🍝",
    traditionalMeals: ["Spaghetti", "Risotto", "Pizza", "Lasagna", "Carbonara"],
    healthBenefits: ["Whole grain pasta options", "Olive oil health", "Fresh vegetables"],
    stapleIngredients: [
      {
        name: "Pasta (Durum Wheat)",
        emoji: "🍝",
        country: "Italy",
        description: "Hard wheat pasta, foundation of Italian meals",
        category: "Grains",
        nutrients: ["Carbohydrates", "Protein", "B vitamins"],
        culturalSignificance: "Cultural identity, brought to the world from Italy",
      },
      {
        name: "Olive Oil",
        emoji: "🫒",
        country: "Italy",
        description: "Liquid gold - extra virgin olive oil",
        category: "Oils",
        nutrients: ["Monounsaturated fats", "Polyphenols", "Heart health"],
        culturalSignificance: "Ancient Mediterranean superfood, health symbol",
      },
      {
        name: "Tomato",
        emoji: "🍅",
        country: "Italy",
        description: "San Marzano tomatoes for sauces",
        category: "Vegetables",
        nutrients: ["Lycopene", "Vitamin C", "Potassium"],
        culturalSignificance: "Though from Americas, now Italian identity",
      },
      {
        name: "Garlic",
        emoji: "🧄",
        country: "Italy",
        description: "Pungent flavor base for Italian cooking",
        category: "Vegetables",
        nutrients: ["Allicin", "Immune support", "Antioxidants"],
        culturalSignificance: "Essential flavor in Italian cuisine",
      },
    ],
  },
  {
    country: "Thailand",
    flag: "🇹🇭",
    stapleFood: "Jasmine Rice",
    emoji: "🍚",
    traditionalMeals: ["Pad Thai", "Green Curry", "Tom Yum", "Spring Rolls", "Satay"],
    healthBenefits: ["Fragrant rice", "Fresh herbs", "Spicy metabolism boost", "Fresh vegetables"],
    stapleIngredients: [
      {
        name: "Jasmine Rice",
        emoji: "🍚",
        country: "Thailand",
        description: "Fragrant white rice, Thai staple",
        category: "Grains",
        nutrients: ["Carbohydrates", "B vitamins"],
        culturalSignificance: "National staple, eaten with every meal",
      },
      {
        name: "Lemongrass",
        emoji: "🌾",
        country: "Thailand",
        description: "Citrusy herb for soups and curries",
        category: "Herbs",
        nutrients: ["Vitamin C", "Antioxidants", "Digestive aids"],
        culturalSignificance: "Signature flavor of Thai cuisine",
      },
      {
        name: "Coconut Milk",
        emoji: "🥥",
        country: "Thailand",
        description: "Rich cream from coconuts for curries",
        category: "Dairy Alternative",
        nutrients: ["Healthy fats", "Minerals", "Medium-chain triglycerides"],
        culturalSignificance: "Essential ingredient in Thai cooking",
      },
      {
        name: "Thai Fish Sauce",
        emoji: "🫙",
        country: "Thailand",
        description: "Fermented fish sauce for umami flavor",
        category: "Condiments",
        nutrients: ["Amino acids", "Minerals", "Probiotics"],
        culturalSignificance: "Soul of Thai cuisine flavor",
      },
    ],
  },
  {
    country: "Nigeria",
    flag: "🇳🇬",
    stapleFood: "Cassava & Yam",
    emoji: "🍠",
    traditionalMeals: ["Jollof Rice", "Fufu", "Pounded Yam", "Egusi Soup", "Akamu"],
    healthBenefits: ["Root vegetables", "Fiber", "Complex carbohydrates", "Leafy greens"],
    stapleIngredients: [
      {
        name: "Yam",
        emoji: "🍠",
        country: "Nigeria",
        description: "Starchy tuber, nutritious carbohydrate",
        category: "Root Vegetables",
        nutrients: ["Carbohydrates", "Fiber", "Potassium", "Vitamin C"],
        culturalSignificance: "Festival food, celebrated crop",
      },
      {
        name: "Cassava",
        emoji: "🥔",
        country: "Nigeria",
        description: "Versatile root vegetable for flour and chips",
        category: "Root Vegetables",
        nutrients: ["Carbohydrates", "Manganese", "Vitamin C"],
        culturalSignificance: "Affordable staple for families",
      },
      {
        name: "Palm Oil",
        emoji: "🫒",
        country: "Nigeria",
        description: "Red palm oil for cooking and flavor",
        category: "Oils",
        nutrients: ["Beta-carotene", "Vitamin E", "Heart-healthy fats"],
        culturalSignificance: "Traditional cooking fat, rich color and flavor",
      },
      {
        name: "Egusi Seeds",
        emoji: "🌰",
        country: "Nigeria",
        description: "Melon seeds for soup and dishes",
        category: "Protein",
        nutrients: ["Protein", "Healthy fats", "Iron"],
        culturalSignificance: "Protein source in traditional soups",
      },
    ],
  },
  {
    country: "Peru",
    flag: "🇵🇪",
    stapleFood: "Potatoes",
    emoji: "🥔",
    traditionalMeals: ["Ceviche", "Causa", "Quinoa Bowl", "Caldo de Papa", "Lomo Saltado"],
    healthBenefits: ["Diverse potatoes", "Quinoa superfood", "Fresh seafood", "Native grains"],
    stapleIngredients: [
      {
        name: "Potato",
        emoji: "🥔",
        country: "Peru",
        description: "Hundreds of varieties of nutritious potatoes",
        category: "Root Vegetables",
        nutrients: ["Potassium", "Vitamin C", "B vitamins", "Resistant starch"],
        culturalSignificance: "Domesticated in Andes, thousands of varieties",
      },
      {
        name: "Quinoa",
        emoji: "✨",
        country: "Peru",
        description: "Ancient complete protein grain",
        category: "Grains",
        nutrients: ["Complete protein", "Fiber", "Magnesium", "Manganese"],
        culturalSignificance: "Inca superfood, sacred grain",
      },
      {
        name: "Aji Peppers",
        emoji: "🌶️",
        country: "Peru",
        description: "Andean chili peppers for heat and flavor",
        category: "Vegetables",
        nutrients: ["Vitamin C", "Capsaicin", "Antioxidants"],
        culturalSignificance: "Foundation of Peruvian cuisine",
      },
      {
        name: "Lima Beans",
        emoji: "🫘",
        country: "Peru",
        description: "Large nutritious beans native to Peru",
        category: "Protein",
        nutrients: ["Protein", "Fiber", "Iron", "Magnesium"],
        culturalSignificance: "Ancient legume from Peru",
      },
    ],
  },
  {
    country: "Greece",
    flag: "🇬🇷",
    stapleFood: "Olive Oil & Feta",
    emoji: "🫒",
    traditionalMeals: ["Greek Salad", "Falafel", "Moussaka", "Souvlaki", "Tzatziki"],
    healthBenefits: ["Mediterranean diet", "Healthy fats", "Fresh vegetables", "Probiotics"],
    stapleIngredients: [
      {
        name: "Olive Oil",
        emoji: "🫒",
        country: "Greece",
        description: "Extra virgin olive oil, liquid gold",
        category: "Oils",
        nutrients: ["Monounsaturated fats", "Polyphenols", "Antioxidants"],
        culturalSignificance: "Heart of Mediterranean diet",
      },
      {
        name: "Feta Cheese",
        emoji: "🧀",
        country: "Greece",
        description: "Tangy white cheese from goat milk",
        category: "Dairy",
        nutrients: ["Calcium", "Protein", "Probiotics"],
        culturalSignificance: "National cheese, on every table",
      },
      {
        name: "Chickpeas",
        emoji: "🫘",
        country: "Greece",
        description: "Ancient legume for hummus and dishes",
        category: "Protein",
        nutrients: ["Protein", "Fiber", "Iron", "Manganese"],
        culturalSignificance: "Mediterranean protein staple",
      },
      {
        name: "Oregano",
        emoji: "🌿",
        country: "Greece",
        description: "Fragrant Mediterranean herb",
        category: "Herbs",
        nutrients: ["Antioxidants", "Antibacterial", "Anti-inflammatory"],
        culturalSignificance: "Essential seasoning in Greek cooking",
      },
    ],
  },
  {
    country: "South Korea",
    flag: "🇰🇷",
    stapleFood: "Kimchi & Rice",
    emoji: "🌶️",
    traditionalMeals: ["Bibimbap", "Kimchi Jjigae", "Korean BBQ", "Kimbap", "Tteokbokki"],
    healthBenefits: ["Fermented probiotics", "Spicy metabolism", "Balanced meals", "Root vegetables"],
    stapleIngredients: [
      {
        name: "Kimchi",
        emoji: "🌶️",
        country: "South Korea",
        description: "Fermented cabbage with spices and health benefits",
        category: "Vegetables",
        nutrients: ["Probiotics", "Vitamin K", "Capsaicin", "Antioxidants"],
        culturalSignificance: "National dish, fermented for thousands of years",
      },
      {
        name: "Gochugaru (Red Pepper Powder)",
        emoji: "🌶️",
        country: "South Korea",
        description: "Spicy red chili pepper powder",
        category: "Spices",
        nutrients: ["Capsaicin", "Vitamin C", "Metabolism boost"],
        culturalSignificance: "Foundation of Korean spicy cuisine",
      },
      {
        name: "Sesame Seeds",
        emoji: "🌰",
        country: "South Korea",
        description: "Nutty seeds for flavor and nutrition",
        category: "Seeds",
        nutrients: ["Healthy oils", "Calcium", "Magnesium"],
        culturalSignificance: "Essential seasoning in Korean cuisine",
      },
      {
        name: "Soy Sauce",
        emoji: "🫙",
        country: "South Korea",
        description: "Fermented soy for umami flavor",
        category: "Condiments",
        nutrients: ["Amino acids", "Probiotics", "Minerals"],
        culturalSignificance: "Essential seasoning across East Asia",
      },
    ],
  },
];

// Function to search for staple foods by country
export const getCountryCuisine = (country: string): CountryCuisine | undefined => {
  return worldPantryData.find(
    (cuisine) => cuisine.country.toLowerCase() === country.toLowerCase()
  );
};

// Function to get all staple foods
export const getAllStapleFoods = (): StapleFood[] => {
  return worldPantryData.flatMap((cuisine) => cuisine.stapleIngredients);
};

// Function to search staple foods by nutrient
export const getStaplesByNutrient = (nutrient: string): StapleFood[] => {
  return getAllStapleFoods().filter((food) =>
    food.nutrients.some((n) => n.toLowerCase().includes(nutrient.toLowerCase()))
  );
};

// Function to get all countries
export const getAllCountries = (): string[] => {
  return worldPantryData.map((cuisine) => cuisine.country);
};
