// Anime Story Mode - Chapters with lessons, characters, and recipe unlocking

export interface StoryLesson {
  id: string;
  title: string;
  content: string;
  emoji: string;
  duration: string;
}

export interface UnlockedRecipe {
  id: string;
  title: string;
  emoji: string;
}

export interface StoryChapter {
  id: string;
  number: number;
  title: string;
  narrative: string;
  characterGuide: "tanjiro" | "deku" | "eren" | "yuji" | "goku" | "luffy" | "ninrir";
  lesson: StoryLesson;
  unlocksRecipes: UnlockedRecipe[];
  comicPanels: {
    emoji: string;
    dialogue: string;
    position: "left" | "right";
  }[];
  rewards: {
    xp: number;
    badge?: string;
  };
}

export const STORY_CHAPTERS: Record<string, StoryChapter> = {
  chapter_1: {
    id: "chapter_1",
    number: 1,
    title: "The Culinary Adventure Begins",
    narrative:
      "Welcome to Anime Eats Academy! Your food journey starts here. Learn how different foods give your body superpowers!",
    characterGuide: "tanjiro",
    lesson: {
      id: "lesson_nutrition_basics",
      title: "Nutrition Basics",
      content:
        "Every food has special powers! Proteins build muscles 💪, Carbs give energy ⚡, Fats help your brain 🧠, Vitamins keep you healthy 🌟",
      emoji: "📚",
      duration: "5 mins",
    },
    unlocksRecipes: [
      { id: "simple_salad", title: "Rainbow Salad", emoji: "🥗" },
      { id: "fruit_bowl", title: "Magic Fruit Bowl", emoji: "🍓" },
    ],
    comicPanels: [
      {
        emoji: "🍎",
        dialogue: "Hey there! I'm your nutrition buddy! Let's learn about healthy eating together!",
        position: "left",
      },
      {
        emoji: "💪",
        dialogue: "Did you know? Eating healthy foods makes you stronger and faster!",
        position: "right",
      },
      {
        emoji: "🎉",
        dialogue: "Let's start with understanding what different foods do for our bodies!",
        position: "left",
      },
    ],
    rewards: { xp: 100, badge: "Novice Chef" },
  },

  chapter_2: {
    id: "chapter_2",
    number: 2,
    title: "Fruits: Nature's Candy",
    narrative:
      "Discover the magical world of fruits! Packed with vitamins and natural sweetness, fruits are the hero of healthy snacking.",
    characterGuide: "tanjiro",
    lesson: {
      id: "lesson_fruits",
      title: "Fruits & Vitamins",
      content:
        "Fruits are packed with Vitamin C (immunity), Potassium (heart), and Fiber (digestion). Each color has different benefits! 🌈",
      emoji: "🍊",
      duration: "6 mins",
    },
    unlocksRecipes: [
      { id: "fruit_smoothie", title: "Energy Smoothie", emoji: "🧃" },
      { id: "fruit_skewers", title: "Rainbow Skewers", emoji: "🍢" },
    ],
    comicPanels: [
      {
        emoji: "🍓",
        dialogue: "Strawberries are sweet and red - full of Vitamin C for strong immunity!",
        position: "left",
      },
      {
        emoji: "🍌",
        dialogue: "Bananas have potassium - the superpower mineral for your heart! 💛",
        position: "right",
      },
      {
        emoji: "🍇",
        dialogue: "Purple grapes have antioxidants to keep you young and healthy! Time to blend!",
        position: "left",
      },
    ],
    rewards: { xp: 150, badge: "Fruit Wizard" },
  },

  chapter_3: {
    id: "chapter_3",
    number: 3,
    title: "Veggies: Green Power",
    narrative:
      "Veggies are the real superheroes! They strengthen your body, improve your vision, and boost your immune system. Let's discover them!",
    characterGuide: "deku",
    lesson: {
      id: "lesson_veggies",
      title: "Vegetables & Superpowers",
      content:
        "Vegetables build muscle 🥬 (spinach), improve vision 👁️ (carrots), strengthen bones 🦴 (broccoli). Different veggies = different powers!",
      emoji: "🥦",
      duration: "7 mins",
    },
    unlocksRecipes: [
      { id: "veggie_stir_fry", title: "Superhero Stir-Fry", emoji: "🍳" },
      { id: "veggie_wrap", title: "Power Wrap", emoji: "🌯" },
    ],
    comicPanels: [
      {
        emoji: "🥕",
        dialogue: "Carrots are orange and give you super vision! See in the dark like a ninja!",
        position: "left",
      },
      {
        emoji: "🥬",
        dialogue: "Spinach makes you strong! It has iron that builds muscle power!",
        position: "right",
      },
      {
        emoji: "🥦",
        dialogue: "Broccoli looks like a tiny tree, but it's a bone-building fortress!",
        position: "left",
      },
    ],
    rewards: { xp: 150, badge: "Green Guardian" },
  },

  chapter_4: {
    id: "chapter_4",
    number: 4,
    title: "Proteins: The Muscle Builders",
    narrative:
      "Proteins are essential for building strong muscles and supporting your growth. Meet the protein champions and cook with them!",
    characterGuide: "goku",
    lesson: {
      id: "lesson_proteins",
      title: "Proteins & Muscle Power",
      content:
        "Proteins build and repair muscles 💪. Get them from eggs 🥚, chicken 🍗, fish 🐟, beans 🫘, or dairy 🥛. Variety is the spice!",
      emoji: "🍗",
      duration: "8 mins",
    },
    unlocksRecipes: [
      { id: "egg_omelette", title: "Power Omelette", emoji: "🍳" },
      { id: "chicken_rice", title: "Champion's Chicken & Rice", emoji: "🍚" },
    ],
    comicPanels: [
      {
        emoji: "🥚",
        dialogue: "Eggs have all amino acids - the building blocks of super strength!",
        position: "left",
      },
      {
        emoji: "🐟",
        dialogue: "Fish has omega-3s that make your brain super smart!",
        position: "right",
      },
      {
        emoji: "🫘",
        dialogue: "Beans and lentils give plant-based protein - perfect for muscle growth!",
        position: "left",
      },
    ],
    rewards: { xp: 150, badge: "Protein Master" },
  },

  chapter_5: {
    id: "chapter_5",
    number: 5,
    title: "Grains: Energy for Adventures",
    narrative:
      "Grains are your body's fuel source! They give you energy to play, study, and go on adventures. Learn about healthy carbs!",
    characterGuide: "luffy",
    lesson: {
      id: "lesson_grains",
      title: "Grains & Energy",
      content:
        "Whole grains like brown rice 🍚, oats 🥣, and whole wheat bread 🍞 give long-lasting energy without sugar crashes. Fuel up!",
      emoji: "🌾",
      duration: "6 mins",
    },
    unlocksRecipes: [
      { id: "oatmeal_bowl", title: "Adventure Oatmeal", emoji: "🥣" },
      { id: "brown_rice", title: "Energy Bowl", emoji: "🍚" },
    ],
    comicPanels: [
      {
        emoji: "🥣",
        dialogue: "Oats are whole grains packed with fiber - steady energy all day!",
        position: "left",
      },
      {
        emoji: "🍞",
        dialogue: "Whole wheat bread is better than white bread - gives real fuel!",
        position: "right",
      },
      {
        emoji: "🍚",
        dialogue: "Brown rice over white rice - more nutrients, more adventure time!",
        position: "left",
      },
    ],
    rewards: { xp: 150, badge: "Energy Champion" },
  },

  chapter_6: {
    id: "chapter_6",
    number: 6,
    title: "The Great Cooking Challenge",
    narrative:
      "Time to put it all together! Create a balanced meal with every food group. You're ready to become a true Anime Eats Master!",
    characterGuide: "luffy",
    lesson: {
      id: "lesson_balanced_meals",
      title: "Creating Balanced Meals",
      content:
        "A balanced meal has 4 elements: 🥬 Veggies (half plate), 🍗 Protein (quarter plate), 🌾 Grains (quarter plate), 🥛 Dairy (on the side)!",
      emoji: "🍽️",
      duration: "10 mins",
    },
    unlocksRecipes: [
      { id: "balanced_plate", title: "Perfect Balance Plate", emoji: "🍽️" },
      { id: "bento_box", title: "Master's Bento Box", emoji: "🍱" },
    ],
    comicPanels: [
      {
        emoji: "🍽️",
        dialogue: "Half your plate should be colorful veggies! Different colors = different nutrients!",
        position: "left",
      },
      {
        emoji: "🍗",
        dialogue: "A quarter for protein - this builds your strength and keeps you powerful!",
        position: "right",
      },
      {
        emoji: "🌾",
        dialogue: "A quarter for grains - your fuel for all-day adventures!",
        position: "left",
      },
      {
        emoji: "🎓",
        dialogue: "And remember water and dairy! You're now a Nutrition Master! 🎉",
        position: "right",
      },
    ],
    rewards: { xp: 200, badge: "Anime Eats Master" },
  },
};

export const getChapter = (chapterId: string): StoryChapter | undefined => {
  return STORY_CHAPTERS[chapterId];
};

export const getAllChapters = (): StoryChapter[] => {
  return Object.values(STORY_CHAPTERS).sort((a, b) => a.number - b.number);
};
