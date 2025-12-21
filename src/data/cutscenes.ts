// Anime Cutscenes - Short educational animation clips

export interface CutsceneFrame {
  character: string; // Anime character emoji or name
  dialogue: string;
  action?: string; // Animation description
  duration: number; // Milliseconds
}

export interface AnimeCutscene {
  id: string;
  title: string;
  description: string;
  character: string;
  emoji: string;
  duration: number; // Total duration in seconds
  unlockedAt: string; // Chapter ID that unlocks this
  topic: string; // Nutrition topic
  frames: CutsceneFrame[];
  lesson: {
    title: string;
    key_points: string[];
  };
}

export const ANIME_CUTSCENES: Record<string, AnimeCutscene> = {
  vitamin_power: {
    id: "vitamin_power",
    title: "The Power of Vitamins",
    description: "Naruto discovers how vitamins give super strength!",
    character: "naruto",
    emoji: "💪",
    duration: 45,
    unlockedAt: "chapter_2",
    topic: "Vitamins",
    frames: [
      {
        character: "🍎",
        dialogue: "Hey Naruto! Eat me to get superpowers!",
        action: "Apple bounces excitedly",
        duration: 3000,
      },
      {
        character: "naruto",
        dialogue:
          "What kind of superpowers? Show me! *pulls out kunai*",
        action: "Naruto grins and prepares for action",
        duration: 3000,
      },
      {
        character: "🌟",
        dialogue:
          "Vitamins boost your eyesight, skin, and immune system!",
        action: "Sparkles swirl around the apple",
        duration: 4000,
      },
      {
        character: "naruto",
        dialogue: "Believe it! If vitamins help my eyes, I'll see enemies before they see me!",
        action: "Naruto glows with determination",
        duration: 4000,
      },
      {
        character: "🍊🥬🥕",
        dialogue:
          "Different colored foods have different vitamin powers!",
        action: "Fruits and veggies arrange in rainbow pattern",
        duration: 4000,
      },
      {
        character: "naruto",
        dialogue: "I need ALL the vitamins! Eat everything!",
        action: "Naruto eats colorful fruits enthusiastically",
        duration: 3000,
      },
    ],
    lesson: {
      title: "Vitamins are Nutritional Ninjas!",
      key_points: [
        "Vitamins are nutrients that keep your body working perfectly",
        "Different vitamins do different jobs - A for eyes, C for immunity, D for bones",
        "Colorful fruits and vegetables have different vitamins",
        "Your body can't make most vitamins, so you must eat them",
      ],
    },
  },

  mineral_magic: {
    id: "mineral_magic",
    title: "The Magic of Minerals",
    description: "Tanjiro learns about minerals that build strength!",
    character: "tanjiro",
    emoji: "⚔️",
    duration: 45,
    unlockedAt: "chapter_3",
    topic: "Minerals",
    frames: [
      {
        character: "tanjiro",
        dialogue: "To be the greatest demon slayer, I need strong bones!",
        action: "Tanjiro practices sword swings",
        duration: 3000,
      },
      {
        character: "🥛",
        dialogue: "I'm calcium - I build super strong bones!",
        action: "Milk glows with white power",
        duration: 3000,
      },
      {
        character: "tanjiro",
        dialogue: "Strong bones? I'll drink you every day!",
        action: "Tanjiro drinks milk confidently",
        duration: 3000,
      },
      {
        character: "🧂🍌",
        dialogue:
          "We're sodium and potassium - we power your muscles!",
        action: "Salt and banana flash with electric energy",
        duration: 4000,
      },
      {
        character: "tanjiro",
        dialogue:
          "Minerals make me stronger and faster. The perfect warrior food!",
        action: "Tanjiro's eyes glow red with determination",
        duration: 3000,
      },
      {
        character: "🌟",
        dialogue: "Eat mineral-rich foods daily to unleash your power!",
        action: "Screen flashes with encouraging light",
        duration: 3000,
      },
    ],
    lesson: {
      title: "Minerals Build Your Warrior Body",
      key_points: [
        "Minerals are elements your body needs to function",
        "Calcium makes bones strong and hard",
        "Iron carries oxygen through your blood",
        "Potassium and sodium help your muscles contract",
        "Different foods provide different minerals",
      ],
    },
  },

  protein_plus: {
    id: "protein_plus",
    title: "Plus Ultra Protein!",
    description: "Deku learns about protein for unstoppable power!",
    character: "deku",
    emoji: "🚀",
    duration: 50,
    unlockedAt: "chapter_4",
    topic: "Protein",
    frames: [
      {
        character: "deku",
        dialogue: "I'm so small and weak... I need to get stronger!",
        action: "Deku looks determined despite being small",
        duration: 3000,
      },
      {
        character: "🍗",
        dialogue:
          "I'm protein - I build and repair your muscles!",
        action: "Chicken glows with golden strength",
        duration: 3000,
      },
      {
        character: "deku",
        dialogue: "Really? Eating you will make my muscles grow?",
        action: "Deku eyes light up with hope",
        duration: 3000,
      },
      {
        character: "🥚🐟🫘",
        dialogue: "We all have protein - eggs, fish, beans too!",
        action: "Protein sources dance and combine",
        duration: 4000,
      },
      {
        character: "deku",
        dialogue:
          "With enough protein, I can train harder and get stronger every day!",
        action: "Deku does intense training poses",
        duration: 4000,
      },
      {
        character: "deku",
        dialogue: "PLUS ULTRA! I will eat protein and reach my dreams!",
        action: "Green power swirls around Deku",
        duration: 3000,
      },
    ],
    lesson: {
      title: "Protein - The Building Blocks of Strength",
      key_points: [
        "Protein is made of amino acids - the building blocks of muscles",
        "Your body uses protein to build and repair muscles",
        "Protein comes from meat, fish, eggs, beans, and dairy",
        "You need protein every day to stay strong",
        "Combined with exercise, protein helps you grow stronger",
      ],
    },
  },

  carb_energy: {
    id: "carb_energy",
    title: "Carbohydrate Combustion",
    description: "Goku discovers carbs are fuel for adventure!",
    character: "goku",
    emoji: "⚡",
    duration: 45,
    unlockedAt: "chapter_5",
    topic: "Carbohydrates",
    frames: [
      {
        character: "goku",
        dialogue: "I'm so hungry! I need FOOD! *stomach growls loudly*",
        action: "Goku looks ravenous and energized",
        duration: 3000,
      },
      {
        character: "🍚",
        dialogue: "I'm a carbohydrate - I give you instant energy!",
        action: "Rice bowl glows with bright yellow energy",
        duration: 3000,
      },
      {
        character: "goku",
        dialogue: "YOSH! Give me all the carbs! I feel the power!",
        action: "Goku starts glowing with golden energy",
        duration: 3000,
      },
      {
        character: "🍞🥔🍌",
        dialogue: "Bread, potatoes, and bananas - all carbs!",
        action: "Foods arrange in an energy circle",
        duration: 4000,
      },
      {
        character: "goku",
        dialogue:
          "With carbs fueling me, I can train all day and never get tired!",
        action: "Goku powers up with visible strength",
        duration: 4000,
      },
      {
        character: "goku",
        dialogue: "Carbs = Energy! Let's GO ON AN ADVENTURE!",
        action: "Energy explosion fills the screen",
        duration: 3000,
      },
    ],
    lesson: {
      title: "Carbs - Your Energy Super Fuel",
      key_points: [
        "Carbohydrates are your body's primary energy source",
        "Simple carbs (fruits, honey) give quick energy",
        "Complex carbs (whole grains, beans) give lasting energy",
        "Your brain especially needs carbs to think and focus",
        "Whole grain carbs are better than refined carbs",
      ],
    },
  },

  balance_meal: {
    id: "balance_meal",
    title: "The Perfect Balanced Meal",
    description: "All nutrition heroes work together for the perfect meal!",
    character: "all_characters",
    emoji: "🍽️",
    duration: 60,
    unlockedAt: "chapter_6",
    topic: "Nutrition Balance",
    frames: [
      {
        character: "naruto",
        dialogue: "A true ninja needs the best nutrition!",
        action: "Naruto strikes a heroic pose",
        duration: 3000,
      },
      {
        character: "tanjiro",
        dialogue: "Every food plays a role - like teamwork!",
        action: "Tanjiro nods wisely",
        duration: 3000,
      },
      {
        character: "deku",
        dialogue: "Protein for muscles, carbs for energy, vegetables for health!",
        action: "Deku points to each food group",
        duration: 4000,
      },
      {
        character: "goku",
        dialogue: "A balanced plate makes a balanced body!",
        action: "Goku creates a plate with all food groups",
        duration: 4000,
      },
      {
        character: "🥗🍗🍚",
        dialogue:
          "Together we make the perfect meal: veggies, protein, and grains!",
        action: "Foods organize into a healthy plate",
        duration: 5000,
      },
      {
        character: "all_characters",
        dialogue:
          "Eating a rainbow of colors ensures you get all nutrients!",
        action: "Screen fills with colorful nutritious foods",
        duration: 4000,
      },
      {
        character: "naruto",
        dialogue: "With balanced nutrition, we can achieve ANYTHING!",
        action: "All characters glow together in team spirit",
        duration: 3000,
      },
    ],
    lesson: {
      title: "Balance - The Key to Nutrition Success",
      key_points: [
        "A balanced meal includes protein, carbs, vegetables, and fruits",
        "Different food groups provide different nutrients",
        "Eating variety ensures you get all nutrients you need",
        "Portion control matters - balance quantity too",
        "A rainbow of colors means balanced nutrition",
      ],
    },
  },
};

export const getUnlockedCutscenes = (
  completedChapters: string[]
): Record<string, AnimeCutscene> => {
  const unlocked: Record<string, AnimeCutscene> = {};

  Object.entries(ANIME_CUTSCENES).forEach(([key, cutscene]) => {
    if (completedChapters.includes(cutscene.unlockedAt)) {
      unlocked[key] = cutscene;
    }
  });

  return unlocked;
};

export const getAllCutscenes = (): AnimeCutscene[] => {
  return Object.values(ANIME_CUTSCENES);
};
