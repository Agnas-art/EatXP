// Food Kingdom Map - Explore regions and unlock food knowledge

export interface FoodRegion {
  id: string;
  name: string;
  emoji: string;
  icon: string;
  description: string;
  color: string;
  recipes: { id: string; name: string; emoji: string }[];
  unlockedAt?: string; // Chapter ID that unlocks this region
  position: { x: number; y: number }; // Map position
  facts: string[];
}

export const FOOD_REGIONS: Record<string, FoodRegion> = {
  fruit_forest: {
    id: "fruit_forest",
    name: "Fruit Forest 🍎",
    emoji: "🌳",
    icon: "🍓",
    description:
      "A lush forest full of colorful fruits bursting with vitamins and natural sweetness! Explore trees laden with apples, berries, tropical fruits, and more.",
    color: "from-pink-400 to-red-500",
    recipes: [
      { id: "fruit_smoothie", name: "Energy Smoothie", emoji: "🧃" },
      { id: "fruit_salad", name: "Rainbow Salad", emoji: "🥗" },
      { id: "berry_bowl", name: "Berry Power Bowl", emoji: "🫐" },
    ],
    unlockedAt: "chapter_2",
    position: { x: 20, y: 30 },
    facts: [
      "Fruits are 90% water - stay hydrated!",
      "Different colored fruits have different superpowers",
      "Bananas are berries, but strawberries aren't!",
      "Apples keep doctors away with their fiber content",
    ],
  },

  veggie_valley: {
    id: "veggie_valley",
    name: "Veggie Valley 🥕",
    emoji: "🌾",
    icon: "🥬",
    description:
      "A bountiful valley filled with vibrant vegetables in every shade of green, orange, and purple! Discover the crunchy treasures that build strong bones and muscles.",
    color: "from-green-400 to-emerald-600",
    recipes: [
      { id: "veggie_stir_fry", name: "Superhero Stir-Fry", emoji: "🍳" },
      { id: "veggie_wrap", name: "Power Wrap", emoji: "🌯" },
      { id: "veggie_soup", name: "Magic Veggie Soup", emoji: "🍲" },
    ],
    unlockedAt: "chapter_3",
    position: { x: 60, y: 40 },
    facts: [
      "Spinach has iron that builds muscle power",
      "Carrots improve night vision",
      "Broccoli looks like tiny trees and builds strong bones",
      "Peppers have more vitamin C than oranges!",
    ],
  },

  protein_peaks: {
    id: "protein_peaks",
    name: "Protein Peaks 🏔️",
    emoji: "⛰️",
    icon: "🍗",
    description:
      "Majestic mountains where protein-rich foods stand tall and strong! From eggs to fish to beans, discover the builders of muscle and strength.",
    color: "from-orange-400 to-amber-600",
    recipes: [
      { id: "egg_omelette", name: "Power Omelette", emoji: "🍳" },
      { id: "chicken_rice", name: "Champion's Bowl", emoji: "🍚" },
      { id: "bean_salad", name: "Protein Power Salad", emoji: "🥗" },
    ],
    unlockedAt: "chapter_4",
    position: { x: 80, y: 60 },
    facts: [
      "Eggs have all amino acids your body needs",
      "Fish has omega-3s for brain power",
      "Beans are plant-based protein powerhouses",
      "Protein helps build and repair muscles after activity",
    ],
  },

  dairy_dome: {
    id: "dairy_dome",
    name: "Dairy Dome 🏛️",
    emoji: "🏰",
    icon: "🥛",
    description:
      "A magnificent dome dedicated to all things dairy! Explore creamy, dreamy foods packed with calcium for strong bones and teeth.",
    color: "from-blue-300 to-cyan-400",
    recipes: [
      { id: "yogurt_parfait", name: "Yogurt Parfait", emoji: "🍨" },
      { id: "cheese_snack", name: "Cheesy Delight", emoji: "🧀" },
      { id: "milk_smoothie", name: "Milky Way Smoothie", emoji: "🥤" },
    ],
    unlockedAt: "chapter_5",
    position: { x: 40, y: 70 },
    facts: [
      "Milk builds strong bones with calcium",
      "Cheese is concentrated milk nutrition",
      "Yogurt has good bacteria for digestion",
      "Dairy helps your teeth shine bright",
    ],
  },

  grain_gardens: {
    id: "grain_gardens",
    name: "Grain Gardens 🌾",
    emoji: "🌾",
    icon: "🍞",
    description:
      "Golden fields of grains stretching to the horizon! These energy-giving foods fuel your adventure with sustained power.",
    color: "from-yellow-400 to-amber-500",
    recipes: [
      { id: "oatmeal_bowl", name: "Adventure Oatmeal", emoji: "🥣" },
      { id: "whole_bread", name: "Whole Wheat Wonder", emoji: "🍞" },
      { id: "grain_bowl", name: "Energy Bowl", emoji: "🍚" },
    ],
    unlockedAt: "chapter_5",
    position: { x: 30, y: 55 },
    facts: [
      "Whole grains give lasting energy",
      "Brown rice is more nutritious than white rice",
      "Oats help keep your heart healthy",
      "Whole grain bread fills you up longer",
    ],
  },
};

export const getUnlockedRegions = (
  completedChapters: string[]
): Record<string, FoodRegion> => {
  const unlocked: Record<string, FoodRegion> = {};

  Object.entries(FOOD_REGIONS).forEach(([key, region]) => {
    if (!region.unlockedAt || completedChapters.includes(region.unlockedAt)) {
      unlocked[key] = region;
    }
  });

  return unlocked;
};

export const getAllRegions = (): FoodRegion[] => {
  return Object.values(FOOD_REGIONS);
};
