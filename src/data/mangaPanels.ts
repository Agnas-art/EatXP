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
      "An exciting adventure through the magical Fruit Forest with color-changing fruits!",
    emoji: "🍎",
    unlockedAt: "chapter_1",
    author: "Naruto",
    theme: "Vitamin Adventure",
    panels: [
      {
        id: "panel_1",
        image: "🧑",
        dialogue: "Whoa! Welcome to Fruit Forest! I'm your guide!",
        emotion: "excited",
      },
      {
        id: "panel_2",
        image: "🍎",
        dialogue: "Pick me! I'm bursting with Vitamin A for sharp eyes!",
        emotion: "proud",
      },
      {
        id: "panel_3",
        image: "🍊",
        dialogue: "And I'm packed with Vitamin C to keep you from getting sick!",
        emotion: "cheerful",
      },
      {
        id: "panel_4",
        image: "🫐",
        dialogue: "Don't forget me! My blueberries boost your brain power!",
        emotion: "magical",
      },
      {
        id: "panel_5",
        image: "😋",
        dialogue: "Together we make the perfect vitamin squad!",
        emotion: "determined",
      },
      {
        id: "panel_6",
        image: "🌟",
        dialogue: "Quest complete! You've unlocked Fruit Forest's power!",
        emotion: "triumphant",
      },
    ],
    lesson:
      "Different fruits provide different vitamins that work together to keep you healthy!",
  },

  mighty_mineral_saga: {
    id: "mighty_mineral_saga",
    title: "The Mighty Mineral Saga",
    description:
      "An epic tale of minerals battling weakness and building strength!",
    emoji: "💪",
    unlockedAt: "chapter_3",
    author: "Tanjiro",
    theme: "Mineral Power",
    panels: [
      {
        id: "panel_1",
        image: "🦴",
        dialogue: "My bones are weak! How can I become strong?",
        emotion: "worried",
      },
      {
        id: "panel_2",
        image: "🥛",
        dialogue: "Fear not! I am Calcium, the bone builder!",
        emotion: "heroic",
      },
      {
        id: "panel_3",
        image: "🧂",
        dialogue: "And I'm Sodium, powering your muscles!",
        emotion: "energetic",
      },
      {
        id: "panel_4",
        image: "🍌",
        dialogue: "I'm Potassium, keeping your heart beating strong!",
        emotion: "vital",
      },
      {
        id: "panel_5",
        image: "🧑",
        dialogue: "Together! Your bones harden, muscles grow stronger!",
        emotion: "amazed",
      },
      {
        id: "panel_6",
        image: "⚔️",
        dialogue: "Now I'm ready for any challenge! Minerals power my body!",
        emotion: "confident",
      },
    ],
    lesson:
      "Minerals work together to build strong bones, power muscles, and keep your body running!",
  },

  protein_power_ups: {
    id: "protein_power_ups",
    title: "Protein Power-Ups!",
    description:
      "Watch as a weak student transforms with the power of protein!",
    emoji: "🚀",
    unlockedAt: "chapter_4",
    author: "Deku",
    theme: "Muscle Building",
    panels: [
      {
        id: "panel_1",
        image: "😭",
        dialogue: "I'm too skinny... I'll never be strong enough...",
        emotion: "sad",
      },
      {
        id: "panel_2",
        image: "🍗",
        dialogue: "Try me! I'm chicken - pure protein power!",
        emotion: "encouraging",
      },
      {
        id: "panel_3",
        image: "🥚",
        dialogue: "And eggs! Complete amino acid profile!",
        emotion: "helpful",
      },
      {
        id: "panel_4",
        image: "🫘",
        dialogue: "Don't forget beans - plant-based protein!",
        emotion: "supportive",
      },
      {
        id: "panel_5",
        image: "💪",
        dialogue: "Wow! My muscles are growing! I feel stronger!",
        emotion: "amazed",
      },
      {
        id: "panel_6",
        image: "🌟",
        dialogue: "Protein + Training = Unstoppable Power!",
        emotion: "triumphant",
      },
    ],
    lesson:
      "Protein builds muscle tissue. Eat protein and exercise to get stronger every day!",
  },

  carb_quest: {
    id: "carb_quest",
    title: "The Carb Quest: Energy Unlimited",
    description: "A high-energy adventure fueled by carbohydrates!",
    emoji: "⚡",
    unlockedAt: "chapter_5",
    author: "Goku",
    theme: "Energy Adventure",
    panels: [
      {
        id: "panel_1",
        image: "🥵",
        dialogue: "I'm exhausted... running out of energy... can't continue...",
        emotion: "tired",
      },
      {
        id: "panel_2",
        image: "🍚",
        dialogue: "Quick! Eat rice! Instant carbohydrate energy!",
        emotion: "urgent",
      },
      {
        id: "panel_3",
        image: "🍞",
        dialogue: "Whole grain bread for lasting energy!",
        emotion: "helpful",
      },
      {
        id: "panel_4",
        image: "🍌",
        dialogue: "Bananas are portable carb power!",
        emotion: "enthusiastic",
      },
      {
        id: "panel_5",
        image: "⚡",
        dialogue: "YES! Energy surging through me! I can keep going!",
        emotion: "energized",
      },
      {
        id: "panel_6",
        image: "🚀",
        dialogue: "Carbs fuel my adventure! Infinite energy!",
        emotion: "unstoppable",
      },
    ],
    lesson:
      "Carbohydrates are your body's main fuel. Eat them before activities for sustained energy!",
  },

  balanced_battle: {
    id: "balanced_battle",
    title: "The Balanced Battle Victory",
    description:
      "Four nutrition heroes combine forces for the ultimate balanced meal!",
    emoji: "🍽️",
    unlockedAt: "chapter_6",
    author: "Team Eats",
    theme: "Nutrition Mastery",
    panels: [
      {
        id: "panel_1",
        image: "👹",
        dialogue: "I'm Junk Food! I'll make you weak and sick!",
        emotion: "evil",
      },
      {
        id: "panel_2",
        image: "💪",
        dialogue: "Not if we work together! I'm Protein!",
        emotion: "brave",
      },
      {
        id: "panel_3",
        image: "🥗",
        dialogue: "And I'm Vegetables - full of vitamins and minerals!",
        emotion: "strong",
      },
      {
        id: "panel_4",
        image: "🍚",
        dialogue: "With Carbs for energy, we're unstoppable!",
        emotion: "powerful",
      },
      {
        id: "panel_5",
        image: "🌈",
        dialogue:
          "Together - balanced, colorful, nutritious - we defeat weakness!",
        emotion: "victorious",
      },
      {
        id: "panel_6",
        image: "🎉",
        dialogue:
          "A balanced plate makes a balanced hero! You've mastered nutrition!",
        emotion: "triumphant",
      },
    ],
    lesson:
      "The secret to optimal health is eating a variety of foods in balanced portions!",
  },

  secret_snack_story: {
    id: "secret_snack_story",
    title: "The Secret Snack Story",
    description: "Discover healthy snacks that taste amazing and boost energy!",
    emoji: "🍿",
    unlockedAt: "chapter_2",
    author: "Naruto",
    theme: "Healthy Snacking",
    panels: [
      {
        id: "panel_1",
        image: "🧒",
        dialogue: "I'm hungry but only have junk food options!",
        emotion: "frustrated",
      },
      {
        id: "panel_2",
        image: "🍎",
        dialogue: "Try an apple! Crunchy, sweet, and full of fiber!",
        emotion: "helpful",
      },
      {
        id: "panel_3",
        image: "🥜",
        dialogue: "Almonds give protein AND healthy fats for your brain!",
        emotion: "informative",
      },
      {
        id: "panel_4",
        image: "🍯",
        dialogue: "Honey with whole grain toast - energy and nutrition!",
        emotion: "delicious",
      },
      {
        id: "panel_5",
        image: "😋",
        dialogue: "These snacks taste AMAZING and make me stronger!",
        emotion: "happy",
      },
      {
        id: "panel_6",
        image: "✨",
        dialogue: "Healthy snacking = sustained energy all day!",
        emotion: "inspired",
      },
    ],
    lesson: "Smart snack choices keep your energy up and body healthy!",
  },

  cooking_class_adventure: {
    id: "cooking_class_adventure",
    title: "Cooking Class Adventure",
    description: "Learn how to prepare nutritious meals step by step!",
    emoji: "👨‍🍳",
    unlockedAt: "chapter_4",
    author: "Tanjiro",
    theme: "Cooking Skills",
    panels: [
      {
        id: "panel_1",
        image: "🧂",
        dialogue: "Today we're making a stir-fry! First, prep your veggies!",
        emotion: "teaching",
      },
      {
        id: "panel_2",
        image: "🍳",
        dialogue: "Heat the pan and use just a little oil!",
        emotion: "instructive",
      },
      {
        id: "panel_3",
        image: "🥘",
        dialogue: "Add colorful vegetables - each brings unique nutrition!",
        emotion: "enthusiastic",
      },
      {
        id: "panel_4",
        image: "🍗",
        dialogue: "Protein cooks quickly - don't overcook it!",
        emotion: "experienced",
      },
      {
        id: "panel_5",
        image: "🍚",
        dialogue: "Serve with brown rice for complete nutrition!",
        emotion: "masterful",
      },
      {
        id: "panel_6",
        image: "😍",
        dialogue: "Delicious, nutritious, and homemade! Cook with love!",
        emotion: "proud",
      },
    ],
    lesson:
      "Learning to cook means you control nutrition. Cook simple, eat healthy!",
  },
};

export const getUnlockedMangaPanels = (
  completedChapters: string[]
): Record<string, MangaStrip> => {
  const unlocked: Record<string, MangaStrip> = {};

  Object.entries(MANGA_PANELS).forEach(([key, strip]) => {
    if (completedChapters.includes(strip.unlockedAt)) {
      unlocked[key] = strip;
    }
  });

  return unlocked;
};

export const getAllMangaPanels = (): MangaStrip[] => {
  return Object.values(MANGA_PANELS);
};
