// Manga Panels - Unlockable comic strips with food adventures

export interface MangaPanel {
  id: string;
  image: string; // Emoji representation
  dialogue: string;
  emotion?: string; // Expression of character
}

export interface MangaStrip {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlockedAt: string; // Chapter ID that unlocks this
  author: string; // Anime character
  theme: string; // Story theme
  panels: MangaPanel[];
  lesson?: string; // Educational takeaway
}

export const MANGA_PANELS: Record<string, MangaStrip> = {
  fruit_forest_adventure: {
    id: "fruit_forest_adventure",
    title: "The Quest for Fruit Forest's Treasures",
    description:
      "Join our hero in the magical Fruit Forest! Discover colorful fruits, vibrant nutrition facts, and unlock XP rewards. Manga-style adventure with bold art, dynamic panels, and educational food lessons!",
    emoji: "🍎",
    unlockedAt: "chapter_1",
    author: "Yor Forger",
    theme: "Vitamin Adventure",
    lesson: "Learn about Vitamin A and C benefits for health and vision",
    panels: [
      {
        id: "panel_1",
        image: "🌳",
        dialogue: "✨ WHOOSH! Welcome to the Legendary Fruit Forest! I'm your nutrition guide!",
        emotion: "excited",
      },
      {
        id: "panel_2",
        image: "🍎",
        dialogue: "🔴 RED APPLE POWER! Vitamin A: +50 Vision Boost! 📊 Rich in antioxidants!",
        emotion: "proud",
      },
      {
        id: "panel_3",
        image: "🍊",
        dialogue: "🧡 ORANGE BURST! Vitamin C: +40 Immunity! 💪 Boosts your defense!",
        emotion: "determined",
      },
      {
        id: "panel_4",
        image: "🍌",
        dialogue: "💛 GOLDEN BANANA! Potassium: +30 Energy! ⚡ Quick energy source!",
        emotion: "cheerful",
      },
      {
        id: "panel_5",
        image: "🎖️",
        dialogue: "You earned 🏆 XP 150! QUEST COMPLETE! Next: Seasonal Vegetables! →",
        emotion: "triumphant",
      },
    ],
  },
  seasonal_vegetables_spring: {
    id: "seasonal_vegetables_spring",
    title: "Spring's Green Guardians - Spinach & Asparagus Adventure",
    description:
      "Spring arrives with fresh green vegetables! Follow the hero through vibrant fields of spinach and asparagus. Dynamic manga panels showcase nutrient diagrams, close-ups of vegetables, and gameplay elements with glowing effects!",
    emoji: "🥬",
    unlockedAt: "chapter_1",
    author: "Yor Forger",
    theme: "Spring Vegetables",
    lesson: "Iron, Fiber, and Folate - Nature's spring gifts for strong bodies",
    panels: [
      {
        id: "panel_1",
        image: "🌸",
        dialogue: "🌱 SPRING AWAKENING! Green fields stretch before us! Time to explore!",
        emotion: "excited",
      },
      {
        id: "panel_2",
        image: "🥬",
        dialogue: "🟢 SPINACH POWER-UP! Iron: +60 Strength! 💚 Dark leafy green magic!",
        emotion: "determined",
      },
      {
        id: "panel_3",
        image: "📊",
        dialogue: "📈 NUTRITION FACT: Folate helps new cells grow! Essential for growth! 🧬",
        emotion: "amazed",
      },
      {
        id: "panel_4",
        image: "🥦",
        dialogue: "💚 ASPARAGUS ALLY! Fiber: +45! Digestive Health Boost! 🔥",
        emotion: "cheerful",
      },
      {
        id: "panel_5",
        image: "🎖️",
        dialogue: "⭐ YOU DID IT! Earned 🏆 XP 200! Spring Guardian Status: UNLOCKED!",
        emotion: "triumphant",
      },
    ],
  },
  summer_colors_carrot_tomato: {
    id: "summer_colors_carrot_tomato",
    title: "Summer Sunburst - The Carrot & Tomato Chronicles",
    description:
      "Brilliant summer arrives with orange carrots and red tomatoes! Experience vibrant manga art with dynamic action sequences, close-up vegetable illustrations, and interactive nutrition cards integrated into the story!",
    emoji: "🥕",
    unlockedAt: "chapter_2",
    author: "Yor Forger",
    theme: "Summer Vegetables",
    lesson: "Beta-Carotene and Lycopene - Nature's colorful defenders",
    panels: [
      {
        id: "panel_1",
        image: "☀️",
        dialogue: "🌞 SUMMER EXPLOSION! Golden fields of vegetables shine bright!",
        emotion: "excited",
      },
      {
        id: "panel_2",
        image: "🥕",
        dialogue: "🟠 CARROT BLAST! Beta-Carotene: +70 Vision! Perfect for sunlight! 👀",
        emotion: "determined",
      },
      {
        id: "panel_3",
        image: "🍅",
        dialogue: "🔴 TOMATO TIME! Lycopene: +55 Antioxidant! Heart-healthy power! ❤️",
        emotion: "proud",
      },
      {
        id: "panel_4",
        image: "💥",
        dialogue: "🎯 COMBO ATTACK! Carrot + Tomato = Ultimate Summer Salad! SYNERGY +30!",
        emotion: "amazed",
      },
      {
        id: "panel_5",
        image: "🎖️",
        dialogue: "🏆 XP 250 EARNED! Summer Champion Unlocked! Health Level: RISING! 📈",
        emotion: "triumphant",
      },
    ],
  },
  autumn_harvest_sweet_potato: {
    id: "autumn_harvest_sweet_potato",
    title: "Autumn's Golden Treasure - The Sweet Potato Quest",
    description:
      "Golden autumn brings the sweet potato! Manga-style quest with warm color palettes, manga screentones, dynamic action poses, educational chalkboard sequences, and XP progress tracking visually integrated into panels!",
    emoji: "🍠",
    unlockedAt: "chapter_3",
    author: "Yor Forger",
    theme: "Autumn Vegetables",
    lesson: "Complex Carbs and Vitamin E - Sustained energy for active adventurers",
    panels: [
      {
        id: "panel_1",
        image: "🍂",
        dialogue: "🍁 AUTUMN ARRIVES! Harvest season glows with warm golden light!",
        emotion: "excited",
      },
      {
        id: "panel_2",
        image: "🍠",
        dialogue: "🟠 SWEET POTATO SURGE! Complex Carbs: +80 Sustained Energy! ⚡",
        emotion: "determined",
      },
      {
        id: "panel_3",
        image: "📊",
        dialogue: "🎓 NUTRITION LESSON: Fiber aids digestion! Vitamin E protects cells! 🛡️",
        emotion: "amazed",
      },
      {
        id: "panel_4",
        image: "🔥",
        dialogue: "🌡️ WARMING POWER! Perfect for fall activities! Boosts metabolism! 🔥",
        emotion: "cheerful",
      },
      {
        id: "panel_5",
        image: "🎖️",
        dialogue: "⭐ XP 280 EARNED! Autumn Harvester Rank UP! Ready for Winter? 🎯",
        emotion: "triumphant",
      },
    ],
  },
  winter_wellness_broccoli: {
    id: "winter_wellness_broccoli",
    title: "Winter Wellness - The Broccoli Guardian Emerges",
    description:
      "Winter's most powerful vegetable! Dynamic manga panels with cool blue color schemes, expressive character emotions, vitamin diagram sequences, and gamified health progress bars integrated into the visual narrative!",
    emoji: "🥦",
    unlockedAt: "chapter_3",
    author: "Yor Forger",
    theme: "Winter Vegetables",
    lesson: "Vitamin C and Sulforaphane - Immune system superpowers",
    panels: [
      {
        id: "panel_1",
        image: "❄️",
        dialogue: "❄️ WINTER AWAKENS! Crisp cold air brings new challenges and power!",
        emotion: "determined",
      },
      {
        id: "panel_2",
        image: "🥦",
        dialogue: "💚 BROCCOLI GUARDIAN! Vitamin C: +90 Immunity Shield! 🛡️",
        emotion: "brave",
      },
      {
        id: "panel_3",
        image: "🧬",
        dialogue: "⚗️ SULFORAPHANE SCIENCE! Detox power! Anti-disease warrior! 🔬",
        emotion: "amazed",
      },
      {
        id: "panel_4",
        image: "💪",
        dialogue: "🌟 ULTIMATE HEALTH! Broccoli is your winter armor! Stay strong! 💪",
        emotion: "triumphant",
      },
      {
        id: "panel_5",
        image: "🎖️",
        dialogue: "🏆 XP 300 EARNED! Winter Champion! Season Master: COMPLETE! 🌟",
        emotion: "triumphant",
      },
    ],
  },
  balanced_meal_comic: {
    id: "balanced_meal_comic",
    title: "The Perfect Plate - Balanced Nutrition Quest",
    description:
      "Learn the art of balanced eating! Manga adventure featuring dynamic character poses, a beautiful illustrated plate diagram, nutrition pyramids, and interactive food categories with glowing highlights and manga-style action lines!",
    emoji: "🍽️",
    unlockedAt: "chapter_4",
    author: "Yor Forger",
    theme: "Nutrition Education",
    lesson: "Create balanced meals with proteins, vegetables, grains, and fruits",
    panels: [
      {
        id: "panel_1",
        image: "👨‍🍳",
        dialogue: "🎯 MASTER CHEF MODE! Time to learn the perfect plate composition!",
        emotion: "determined",
      },
      {
        id: "panel_2",
        image: "🥕",
        dialogue: "🥬 VEGETABLES: 1/4 Plate! Fiber + Vitamins + Minerals! The foundation!",
        emotion: "instructive",
      },
      {
        id: "panel_3",
        image: "🍗",
        dialogue: "💪 PROTEIN: 1/4 Plate! Chicken, Fish, Beans! Muscle building power!",
        emotion: "strong",
      },
      {
        id: "panel_4",
        image: "🍚",
        dialogue: "⚡ GRAINS: 1/4 Plate! Brown rice, whole wheat! Sustained energy!",
        emotion: "energetic",
      },
      {
        id: "panel_5",
        image: "🎖️",
        dialogue: "🏆 XP 320 EARNED! Balanced Diet Master! Health Level: MAXIMUM! 📊",
        emotion: "triumphant",
      },
    ],
  },
};

export const getUnlockedMangaPanels = (
  completedChapters: string[]
): Record<string, MangaStrip> => {
  const unlocked: Record<string, MangaStrip> = {};

  Object.entries(MANGA_PANELS).forEach(([key, strip]) => {
    // First manga is always unlocked
    if (strip.id === "fruit_forest_adventure" || completedChapters.includes(strip.unlockedAt)) {
      unlocked[key] = strip;
    }
  });

  return unlocked;
};

export const getAllMangaPanels = (): MangaStrip[] => {
  return Object.values(MANGA_PANELS);
};
