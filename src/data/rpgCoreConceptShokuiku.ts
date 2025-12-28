/**
 * Shokuiku Saga RPGCore Concept
 * Complete framework for the anime-inspired food education RPG
 */

// ============================================================================
// SETTING & CORE CONCEPT
// ============================================================================

export interface RPGCoreSetting {
  name: string;
  description: string;
  regions: string[];
  theme: string;
}

export const RPG_CORE_SETTING: RPGCoreSetting = {
  name: "The Food Kingdom",
  description:
    "A vibrant anime-inspired world where each region represents a food group. Players embark on quests to restore balance to the kingdom by learning about nutrition, cooking, and mindful eating.",
  regions: [
    "Grain Plains",
    "Veggie Forest",
    "Protein Peaks",
    "Dairy Valley",
    "Fruit Isles",
  ],
  theme: "Anime-inspired with modern My Hero Academia or Naruto vibes—energetic, colorful, slightly edgy",
};

// ============================================================================
// GAME MECHANICS
// ============================================================================

export interface GameMechanic {
  name: string;
  description: string;
  examples: string[];
}

export const GAME_MECHANICS: GameMechanic[] = [
  {
    name: "Classic RPG Progression",
    description:
      "Traditional leveling system with skills and items combined with food education",
    examples: [
      "EatXP points for leveling",
      "Skill tree unlocking cooking techniques",
      "Food-based inventory system",
    ],
  },
  {
    name: "Education Challenges",
    description: "Interactive learning disguised as gameplay",
    examples: [
      "Nutrition quizzes",
      "Cooking mini-games",
      "Ingredient collection quests",
    ],
  },
  {
    name: "Battle System",
    description: "Turn-based combat where moves are food-based",
    examples: [
      "Veggie Shield (defense boost)",
      "Protein Punch (attack power)",
      "Hydration Heal (restore stamina)",
    ],
  },
  {
    name: "Mini-Games",
    description: "Interactive challenges that reinforce learning",
    examples: [
      "Bento box crafting",
      "Smoothie mixing",
      "Spot the Balanced Meal challenges",
    ],
  },
];

// ============================================================================
// STORYLINE ARC - COMPLETE NARRATIVE
// ============================================================================

export interface StorylineArc {
  name: string;
  description: string;
  objective: string;
  teachingFocus?: string;
  boss?: string;
  bossDescription?: string;
  rewards?: string[];
}

export const STORYLINE_ARCS: Record<string, StorylineArc> = {
  prologue: {
    name: "Prologue - The Broken Plate / Diet Myths Invasion",
    description:
      "The Food Kingdom's sacred plate shatters, causing imbalance in nutrition across the land. The kingdom is invaded by 'Diet Myths' spreading confusion among teens.",
    objective: "The player is chosen as the 'Food Guardian' to restore harmony",
    teachingFocus: "Introduction to balanced nutrition",
  },
  chapter_1: {
    name: "Chapter 1 - Grain Plains",
    description:
      "Learn about the importance of carbohydrates and whole grains. Quest theme: Energy for Exams (carbs & balanced meals)",
    objective: "Master carbohydrate nutrition and whole grain benefits",
    teachingFocus:
      "Carbohydrates, energy production, difference between refined and whole grains",
    boss: "Refined Carb Phantom",
    bossDescription: "A phantom who drains energy by promoting refined carbs",
    rewards: [
      "Grain Plains Access",
      "Carbohydrate Knowledge Badge",
      "EatXP Multiplier +1.2x",
    ],
  },
  chapter_2: {
    name: "Chapter 2 - Veggie Forest",
    description:
      "Discover vitamins, minerals, and fiber. Quest theme: Glow-Up Quest (fruits & veggies for skin/strength)",
    objective: "Understand vegetable nutrition and overcome junk food temptation",
    teachingFocus: "Vitamins, minerals, fiber, micronutrients",
    boss: "Junk Goblin",
    bossDescription:
      "A goblin who tempts villagers with fried snacks and unhealthy processed foods",
    rewards: [
      "Veggie Forest Access",
      "Vegetable Knowledge Badge",
      "Recipe Unlock: Rainbow Salad",
    ],
  },
  chapter_3: {
    name: "Chapter 3 - Protein Peaks",
    description:
      "Balance plant vs. animal proteins. Quest theme: Sports Power-Up (proteins & hydration)",
    objective: "Learn the balance between plant and animal proteins",
    teachingFocus:
      "Protein types, amino acids, balanced protein consumption, muscle building",
    boss: "Overload Ogre",
    bossDescription:
      "An ogre representing excess consumption and protein overconsumption",
    rewards: [
      "Protein Peaks Access",
      "Protein Knowledge Badge",
      "Strength Boost +25%",
    ],
  },
  chapter_4a: {
    name: "Chapter 4a - Dairy Valley",
    description:
      "Explore calcium, probiotics, and dairy alternatives. Includes boss battle against unhealthy dairy temptations.",
    objective: "Master dairy nutrition and healthy dairy choices",
    teachingFocus: "Calcium, probiotics, lactose tolerance, dairy alternatives",
    boss: "Lactose Leviathan",
    bossDescription:
      "A monster representing lactose intolerance and dairy-related health myths",
    rewards: ["Dairy Valley Access", "Dairy Knowledge Badge"],
  },
  chapter_4b: {
    name: "Chapter 4b - Fruit Isles",
    description:
      "Discover natural sugars, vitamins, and hydration from fruits.",
    objective: "Understand fruit nutrition and natural sugar management",
    teachingFocus: "Natural sugars, fruit nutrients, portion control",
    boss: "Sugar Siren",
    bossDescription:
      "A siren who tempts with energy drinks and excessive sugar consumption",
    rewards: ["Fruit Isles Access", "Fruit Knowledge Badge"],
  },
  chapter_5: {
    name: "Final Chapter - The Balanced Feast",
    description:
      "Reforge the sacred plate by combining all food groups. Battle represents overcoming all temptations.",
    objective:
      "Master balanced nutrition and defeat the forces of dietary misinformation",
    teachingFocus: "Holistic nutrition, balanced meals, healthy lifestyle",
    boss: "Chaos Diet Dragon",
    bossDescription:
      "The final boss symbolizing fad diets, body image pressures, and misinformation—something teens face daily",
    rewards: [
      "Sacred Plate Restored",
      "Food Guardian Title",
      "Ultimate Recipe Collection",
      "Lifetime EatXP Boost",
    ],
  },
};

// ============================================================================
// CHARACTERS & PERSONALITIES
// ============================================================================

export interface RPGCharacter {
  id: string;
  name: string;
  role: "hero" | "mentor" | "ally" | "villain";
  description: string;
  relatedTo?: string; // Food group or concept
  personality?: string[];
  specialAbilities?: string[];
  dialogue?: string[];
}

export const RPG_CHARACTERS: Record<string, RPGCharacter> = {
  // HERO - Based on selected anime character
  food_guardian: {
    id: "food_guardian",
    name: "Food Guardian (Player Avatar)",
    role: "hero",
    description:
      "A customizable teen avatar chosen from anime characters. Represents the player in their journey to restore the Food Kingdom.",
    personality: [
      "Determined",
      "Curious",
      "Compassionate",
      "Strong-willed",
    ],
    specialAbilities: [
      "Food Combination",
      "Nutritional Analysis",
      "Balanced Feast Creation",
    ],
    dialogue: [
      "I'll restore balance to the Food Kingdom!",
      "Food is not just fuel—it's power!",
      "Together, we can overcome these diet myths!",
    ],
  },

  // MENTOR
  chef_sensei: {
    id: "chef_sensei",
    name: "Chef Sensei",
    role: "mentor",
    description:
      "Wise but quirky mentor who guides the Food Guardian with Shokuiku principles. Teaches mindfulness and balanced eating.",
    personality: ["Wise", "Quirky", "Patient", "Experienced"],
    specialAbilities: [
      "Recipe Crafting",
      "Nutritional Wisdom",
      "Meditation Guidance",
    ],
    dialogue: [
      "Young Guardian, food is a journey, not a destination.",
      "Mindful eating is the true power!",
      "Every meal tells a story of balance.",
    ],
  },

  // ALLIES
  snack_ninja: {
    id: "snack_ninja",
    name: "Snack Ninja",
    role: "ally",
    description: "Teaches portion control in a fun way. Master of balanced snacking.",
    relatedTo: "Portion Control",
    personality: ["Playful", "Disciplined", "Clever"],
    specialAbilities: ["Portion Sense", "Snack Balancing", "Appetite Control"],
    dialogue: [
      "Small portions, big flavor!",
      "Snacking is an art form!",
      "Control, not elimination!",
    ],
  },

  smoothie_mage: {
    id: "smoothie_mage",
    name: "Smoothie Mage",
    role: "ally",
    description:
      "Magical mixer of fruit and vegetable powers. Creates powerful smoothies that boost abilities.",
    relatedTo: "Fruits & Vegetables",
    personality: ["Magical", "Creative", "Energetic"],
    specialAbilities: ["Fruit Power Blending", "Veggie Infusion", "Energy Mixing"],
    dialogue: [
      "Mix, blend, and transform!",
      "Fruits and veggies in perfect harmony!",
      "Power in every sip!",
    ],
  },

  farmer_guide: {
    id: "farmer_guide",
    name: "Farmer Guide",
    role: "ally",
    description: "Traditional farmer representing food cultivation and farm-to-table wisdom.",
    relatedTo: "Sustainable Food",
    personality: ["Hardworking", "Traditional", "Knowledgeable"],
    specialAbilities: ["Crop Knowledge", "Seasonal Wisdom", "Growth Mastery"],
    dialogue: [
      "From farm to table with love!",
      "Nature provides all we need.",
      "Patience yields the sweetest rewards.",
    ],
  },

  baker_companion: {
    id: "baker_companion",
    name: "Baker Companion",
    role: "ally",
    description: "Represents grain and bread traditions. Teaches the joy of whole grain baking.",
    relatedTo: "Grains & Breads",
    personality: ["Warm", "Nurturing", "Skilled"],
    specialAbilities: ["Grain Expertise", "Bread Crafting", "Nutrition Balance"],
    dialogue: [
      "Good food brings people together.",
      "Whole grains are the foundation!",
      "Every loaf tells a story.",
    ],
  },

  healer_herbalist: {
    id: "healer_herbalist",
    name: "Healer Herbalist",
    role: "ally",
    description:
      "Uses herbs and natural remedies. Represents holistic health and wellness.",
    relatedTo: "Health & Wellness",
    personality: ["Wise", "Calm", "Spiritual"],
    specialAbilities: ["Herbal Healing", "Immunity Boost", "Wellness Insight"],
    dialogue: [
      "Nature heals what excess harms.",
      "Balance is the path to wellness.",
      "Listen to your body's needs.",
    ],
  },

  // VILLAINS - Manifestations of Unhealthy Habits
  sugar_siren: {
    id: "sugar_siren",
    name: "Sugar Siren",
    role: "villain",
    description:
      "Tempts with energy drinks, sugary snacks, and excessive sweets. Boss of Fruit Isles.",
    relatedTo: "Excessive Sugar",
    personality: ["Seductive", "Addictive", "Deceptive"],
    specialAbilities: ["Sugar Rush", "Addiction Curse", "Energy Drain"],
    dialogue: [
      "Just one more sip... one more bite...",
      "I'm what you really crave!",
      "Sweet temptation is irresistible!",
    ],
  },

  fast_food_fiend: {
    id: "fast_food_fiend",
    name: "Fast-Food Fiend",
    role: "villain",
    description:
      "Lures with greasy burgers and quick meals. Represents convenience over health.",
    relatedTo: "Processed Foods",
    personality: ["Cunning", "Lazy", "Tempting"],
    specialAbilities: ["Grease Cloak", "Quick Satisfaction", "Health Drain"],
    dialogue: [
      "Fast, easy, and oh-so-tasty!",
      "Who has time for healthy eating?",
      "I'm the easy way out!",
    ],
  },

  salt_shadow: {
    id: "salt_shadow",
    name: "Salt Shadow",
    role: "villain",
    description:
      "Represents hidden sodium in snacks and processed foods. Causes health issues in darkness.",
    relatedTo: "Hidden Sodium",
    personality: ["Sneaky", "Hidden", "Damaging"],
    specialAbilities: ["Sodium Invisibility", "Pressure Curse", "Health Decay"],
    dialogue: [
      "I hide in everything tasty!",
      "You don't even know I'm here!",
      "Slow poison is still poison.",
    ],
  },

  refined_carb_phantom: {
    id: "refined_carb_phantom",
    name: "Refined Carb Phantom",
    role: "villain",
    description:
      "Drains energy by promoting refined carbs over whole grains. Boss of Grain Plains.",
    relatedTo: "Refined Carbohydrates",
    personality: ["Energy-Draining", "Deceptive", "Weakening"],
    specialAbilities: ["Energy Drain", "Focus Loss", "Crash Curse"],
    dialogue: [
      "Energy is temporary, crashes are forever!",
      "Refined tastes better, but feels worse.",
      "I leave you exhausted.",
    ],
  },

  junk_goblin: {
    id: "junk_goblin",
    name: "Junk Goblin",
    role: "villain",
    description:
      "Tempts villagers with fried snacks and junk food. Boss of Veggie Forest.",
    relatedTo: "Junk Food",
    personality: ["Mischievous", "Tempting", "Corrupting"],
    specialAbilities: ["Fried Temptation", "Veggie Repulsion", "Cravings Curse"],
    dialogue: [
      "Fried, salty, and crunchy—who can resist?",
      "Veggies are boring, right?",
      "Join the junk food party!",
    ],
  },

  overload_ogre: {
    id: "overload_ogre",
    name: "Overload Ogre",
    role: "villain",
    description:
      "Represents excess consumption and protein overconsumption. Boss of Protein Peaks.",
    relatedTo: "Excess Consumption",
    personality: ["Gluttonous", "Unbalanced", "Domineering"],
    specialAbilities: ["Overload Curse", "Digestion Disruption", "Excess Strength"],
    dialogue: [
      "More is always better!",
      "Why balance when you can overload?",
      "Excess is my greatest strength!",
    ],
  },

  lactose_leviathan: {
    id: "lactose_leviathan",
    name: "Lactose Leviathan",
    role: "villain",
    description:
      "A monster representing lactose intolerance and dairy-related health myths. Boss of Dairy Valley.",
    relatedTo: "Dairy Myths",
    personality: ["Destructive", "Mythical", "Uncomfortable"],
    specialAbilities: ["Lactose Curse", "Digestive Chaos", "Myth Spreading"],
    dialogue: [
      "Dairy is the enemy!",
      "Not everyone can tolerate dairy.",
      "I spread confusion about dairy!",
    ],
  },

  chaos_diet_dragon: {
    id: "chaos_diet_dragon",
    name: "Chaos Diet Dragon",
    role: "villain",
    description:
      "The ultimate final boss symbolizing fad diets, body image pressures, and misinformation. What teens face daily.",
    relatedTo: "Dietary Misinformation",
    personality: [
      "Powerful",
      "Confusing",
      "Destructive",
      "Multi-faceted",
    ],
    specialAbilities: [
      "Myth Generation",
      "Body Image Distortion",
      "Dietary Chaos",
      "Information Corruption",
    ],
    dialogue: [
      "I am every diet myth you've ever heard!",
      "Confusion is my greatest power!",
      "I feed on insecurity and misinformation!",
      "You'll never escape dietary chaos!",
    ],
  },
};

// ============================================================================
// GAMEPLAY FEATURES & SYSTEMS
// ============================================================================

export interface GameplayFeature {
  name: string;
  description: string;
  mechanics: string[];
  rewards?: string[];
}

export const GAMEPLAY_FEATURES: Record<string, GameplayFeature> = {
  quest_system: {
    name: "Quest System",
    description: "Main progression system with varied objective types",
    mechanics: [
      "Ingredient Collection - Gather foods from different regions",
      "Cooking Challenges - Prepare dishes following recipes",
      "Nutrition Puzzles - Solve educational challenges",
      "Boss Battles - Defeat villain manifestations of unhealthy habits",
    ],
    rewards: ["EatXP", "Recipes", "Skills", "Badges"],
  },

  battle_system: {
    name: "Food-Based Battle System",
    description: "Turn-based combat using food as weapons and abilities",
    mechanics: [
      "Veggie Shield - Defense boost (consume vegetables)",
      "Protein Punch - Attack power (consume proteins)",
      "Hydration Heal - Restore stamina (drink water/healthy fluids)",
      "Grain Ground - Create stability (whole grain energy)",
      "Fruit Force - Elemental attacks (various fruit powers)",
    ],
    rewards: ["Victory XP", "Loot Drops", "Stat Increases"],
  },

  skill_tree: {
    name: "Skill Tree System",
    description: "Progressive unlocking of abilities and knowledge",
    mechanics: [
      "Cooking Techniques - Learn recipes and food preparation",
      "Mindfulness Practices - Meditation and focused eating",
      "Food Knowledge - Nutrition facts and health benefits",
      "Combat Skills - Food-based attack and defense abilities",
      "Social Abilities - Leadership and co-op features",
    ],
    rewards: ["Increased Efficiency", "New Abilities", "Social Recognition"],
  },

  mini_games: {
    name: "Mini-Game Collection",
    description: "Interactive challenges that reinforce learning",
    mechanics: [
      "Bento Box Crafting - Arrange ingredients for balanced meals",
      "Smoothie Mixing - Combine fruits and vegetables for health boosts",
      "Spot the Balanced Meal - Identify nutritious meal compositions",
      "Ingredient Memory - Match foods to their health benefits",
      "Cooking Simulation - Follow recipe steps correctly",
    ],
    rewards: ["Bonus XP", "Special Items", "Achievements"],
  },

  reward_system: {
    name: "EatXP & Progression",
    description: "Earn EatXP points to level up and unlock content",
    mechanics: [
      "EatXP Points - Earned from quests, battles, and mini-games",
      "Level Progression - Unlock new regions and story chapters",
      "Recipe Unlocks - Earn real-life recipes from the game",
      "Cosmetic Upgrades - Anime-style character customizations",
      "Badge Collection - Achievements and milestones",
    ],
    rewards: ["Character Growth", "New Content", "Real Recipes"],
  },

  social_features: {
    name: "Social & Multiplayer",
    description: "Connect and compete with other players",
    mechanics: [
      "Leaderboards - Rank by EatXP or quest completion",
      "Co-op Quests - Team up for challenging missions",
      "Bento Box Sharing - Design and share custom meal layouts",
      "Friend Challenges - Compete in friendly mini-games",
      "Community Events - Time-limited seasonal challenges",
    ],
    rewards: ["Social Recognition", "Unique Items", "Team Bonuses"],
  },
};

// ============================================================================
// ANIME AESTHETIC & VISUAL DESIGN
// ============================================================================

export interface AnimeAesthetic {
  artStyle: string;
  characterDesign: string;
  storytelling: string;
  colorPalette: string[];
}

export const ANIME_AESTHETIC: AnimeAesthetic = {
  artStyle:
    "Vibrant anime art style with exaggerated food designs, dynamic action poses, and expressive character emotions",
  characterDesign:
    "Anime-inspired character models with distinctive silhouettes, expressive eyes, and colorful fashion representing food themes",
  storytelling:
    "Episodic storytelling like an anime season with cliffhangers, character development, and emotional arcs. Villagers struggling with unhealthy habits, redeemed through food wisdom.",
  colorPalette: [
    "#FF6B9D",
    "#FFA502",
    "#4ECDC4",
    "#44AF69",
    "#F7B801",
    "#6C5CE7",
    "#A29BFE",
  ],
};

// ============================================================================
// TONE & STYLE
// ============================================================================

export interface GameTone {
  primaryStyle: string;
  tone: string[];
  humor: string[];
  inspirations: string[];
}

export const GAME_TONE: GameTone = {
  primaryStyle:
    "Anime-inspired but modern: Think My Hero Academia or Naruto vibes—energetic, colorful, slightly edgy.",
  tone: [
    "Inspirational - Players feel empowered to make healthy choices",
    "Relatable - Characters and situations resonate with teen audiences",
    "Fun - Gameplay is engaging and entertaining",
    "Educational - Learning feels natural and integrated",
  ],
  humor: [
    "Characters crack jokes about 'snack attacks' when eating junk food",
    "Running gag about 'energy drain' when consuming unhealthy meals",
    "Witty dialogue about food chemistry and nutritional science",
    "Lighthearted commentary on diet myths and health trends",
  ],
  inspirations: [
    "My Hero Academia - Character growth and superpowers",
    "Naruto - Journey and perseverance themes",
    "Demon Slayer - High-stakes battles and emotional storytelling",
    "Pokemon - Collecting, leveling, and trainer bonds",
    "Persona 5 - Stylish aesthetic and social links",
  ],
};

// ============================================================================
// EDUCATIONAL FRAMEWORK
// ============================================================================

export interface EducationalElement {
  topic: string;
  gameFraming: string;
  learningOutcome: string;
  reinforcement: string[];
}

export const EDUCATIONAL_ELEMENTS: EducationalElement[] = [
  {
    topic: "Carbohydrates & Whole Grains",
    gameFraming: "Energy for your adventures - Grain Plains region",
    learningOutcome:
      "Understand difference between refined and whole grains, energy production",
    reinforcement: [
      "Grain Plains Chapter",
      "Energy for Exams quest",
      "Carbohydrate quiz mini-game",
    ],
  },
  {
    topic: "Vitamins, Minerals & Fiber",
    gameFraming: "Superpowers from nature - Veggie Forest region",
    learningOutcome:
      "Learn about micronutrients and their health benefits",
    reinforcement: [
      "Veggie Forest Chapter",
      "Glow-Up quest",
      "Vegetable identification game",
    ],
  },
  {
    topic: "Proteins (Plant & Animal)",
    gameFraming: "Muscle and power building - Protein Peaks region",
    learningOutcome: "Balance different protein sources",
    reinforcement: [
      "Protein Peaks Chapter",
      "Sports Power-Up quest",
      "Protein source matching game",
    ],
  },
  {
    topic: "Dairy & Calcium",
    gameFraming: "Strong bones foundation - Dairy Valley region",
    learningOutcome: "Understand calcium sources and dairy alternatives",
    reinforcement: [
      "Dairy Valley Chapter",
      "Strength quest",
      "Calcium sources quiz",
    ],
  },
  {
    topic: "Fruits & Natural Sugars",
    gameFraming: "Nature's candy - Fruit Isles region",
    learningOutcome:
      "Understand natural vs. added sugars, fruit health benefits",
    reinforcement: [
      "Fruit Isles Chapter",
      "Glow-Up quest",
      "Sugar identification game",
    ],
  },
  {
    topic: "Portion Control",
    gameFraming: "The Snack Ninja way - Portion Sense skill",
    learningOutcome: "Learn appropriate serving sizes and mindful eating",
    reinforcement: [
      "Snack Ninja mentor",
      "Bento box crafting mini-game",
      "Portion matching challenges",
    ],
  },
  {
    topic: "Mindful Eating",
    gameFraming: "Focus Mode ability - Meditation practice",
    learningOutcome:
      "Develop awareness and appreciation for food, slow down eating pace",
    reinforcement: [
      "Chef Sensei teachings",
      "Meditation mini-quests",
      "Mindful eating challenges",
    ],
  },
  {
    topic: "Balanced Nutrition",
    gameFraming: "The Sacred Plate - Final Chapter quest",
    learningOutcome:
      "Understand complete balanced nutrition across all food groups",
    reinforcement: [
      "Multi-region exploration",
      "Balanced meal challenges",
      "Sacred Plate reconstruction",
    ],
  },
  {
    topic: "Food Myths & Misinformation",
    gameFraming: "Defeating the Chaos Diet Dragon - Final Boss",
    learningOutcome:
      "Critical thinking about health claims, recognize fad diets and false information",
    reinforcement: [
      "Myth-busting quests",
      "Fact vs. fiction mini-games",
      "Dragon battle educational phases",
    ],
  },
  {
    topic: "Sustainable & Healthy Eating",
    gameFraming: "Farm-to-table wisdom - Farmer Guide ally",
    learningOutcome: "Appreciate sustainable food practices and real ingredients",
    reinforcement: [
      "Farming quests",
      "Ingredient sourcing challenges",
      "Seasonal recipe unlocks",
    ],
  },
];

// ============================================================================
// INTEGRATION WITH ANIME CHARACTER SYSTEM
// ============================================================================

export interface CharacterAsHero {
  animeCharacterId: string;
  heroStats: {
    startingClass: string;
    specialAbility: string;
    alignedSkillTree: string;
  };
  storyAdaptation: {
    narrative: string;
    personalQuest: string;
  };
}

export const CHARACTER_HERO_ADAPTATIONS: Record<
  string,
  CharacterAsHero
> = {
  tanjiro_hero: {
    animeCharacterId: "tanjiro",
    heroStats: {
      startingClass: "The Compassionate Guardian",
      specialAbility:
        "Demon Sense → Food Sense (detect nutritional needs of allies)",
      alignedSkillTree: "Empathy Eating - Eating mindfully with others in mind",
    },
    storyAdaptation: {
      narrative:
        "Like Tanjiro protects his sister, you'll protect the Food Kingdom's balance.",
      personalQuest:
        "Restore the spirit of food through understanding and compassion",
    },
  },

  deku_hero: {
    animeCharacterId: "deku",
    heroStats: {
      startingClass: "The Determined Hero",
      specialAbility:
        "All Might Analysis → Nutritional Analysis (understand food superpowers)",
      alignedSkillTree: "Growth Through Nutrition - Level up faster with balanced meals",
    },
    storyAdaptation: {
      narrative:
        "Like Deku's journey to become a hero, you'll master nutrition knowledge.",
      personalQuest:
        "Become the ultimate Food Guardian through determination and learning",
    },
  },

  eren_hero: {
    animeCharacterId: "eren",
    heroStats: {
      startingClass: "The Strategic Fighter",
      specialAbility:
        "Titan Hardening → Nutritional Armor (defense based on food balance)",
      alignedSkillTree: "Tactical Nutrition - Strategic meal planning for advantages",
    },
    storyAdaptation: {
      narrative:
        "Like Eren strategizes against titans, you'll strategize against diet myths.",
      personalQuest:
        "Free the Food Kingdom from the chains of dietary misinformation",
    },
  },

  yuji_hero: {
    animeCharacterId: "yuji",
    heroStats: {
      startingClass: "The Mystical Eater",
      specialAbility:
        "Jujutsu Energy → Food Energy (absorb nutrition from any food)",
      alignedSkillTree:
        "Cursed Energy Cuisine - Convert challenges into strength",
    },
    storyAdaptation: {
      narrative:
        "Like Yuji balances power within, you'll balance nutrition within yourself.",
      personalQuest:
        "Transform dietary challenges into sources of personal power",
    },
  },

  goku_hero: {
    animeCharacterId: "goku",
    heroStats: {
      startingClass: "The Appetite Champion",
      specialAbility:
        "Saiyan Appetite → Nutritional Awareness (maximize food benefits)",
      alignedSkillTree:
        "Power Through Nutrition - Strength grows with balanced eating",
    },
    storyAdaptation: {
      narrative:
        "Like Goku loves eating and fighting, you'll love eating and helping others.",
      personalQuest:
        "Achieve mastery through endless exploration of food wisdom",
    },
  },

  luffy_hero: {
    animeCharacterId: "luffy",
    heroStats: {
      startingClass: "The Freedom Seeker",
      specialAbility:
        "Rubber Body → Flexible Nutrition (adapt to different dietary needs)",
      alignedSkillTree:
        "Adventure Eating - Discover new foods and build community",
    },
    storyAdaptation: {
      narrative:
        "Like Luffy gathers a crew, you'll gather allies to restore the kingdom.",
      personalQuest:
        "Free the Food Kingdom's people from diet myths and unhealthy patterns",
    },
  },
};

// ============================================================================
// PROGRESSION MILESTONES & ACHIEVEMENTS
// ============================================================================

export interface Milestone {
  id: string;
  name: string;
  description: string;
  unlocks: string[];
  relatedChapter?: string;
}

export const PROGRESSION_MILESTONES: Milestone[] = [
  {
    id: "chosen_guardian",
    name: "Chosen Guardian",
    description: "Complete the Prologue and become the Food Guardian",
    unlocks: [
      "Grain Plains access",
      "Chef Sensei as mentor",
      "First skill tree unlock",
    ],
    relatedChapter: "prologue",
  },
  {
    id: "grain_master",
    name: "Grain Master",
    description: "Complete Chapter 1 and defeat the Refined Carb Phantom",
    unlocks: [
      "Whole Grain recipes",
      "Carbohydrate Expertise skill",
      "Energy Efficiency +25%",
    ],
    relatedChapter: "chapter_1",
  },
  {
    id: "veggie_warrior",
    name: "Veggie Warrior",
    description: "Complete Chapter 2 and defeat the Junk Goblin",
    unlocks: [
      "Vegetable recipes",
      "Nutritional Awareness skill",
      "Vegetable Garden mini-game",
    ],
    relatedChapter: "chapter_2",
  },
  {
    id: "protein_champion",
    name: "Protein Champion",
    description: "Complete Chapter 3 and defeat the Overload Ogre",
    unlocks: [
      "Protein recipes",
      "Balanced Protein skill",
      "Strength +25%",
    ],
    relatedChapter: "chapter_3",
  },
  {
    id: "dairy_specialist",
    name: "Dairy Specialist",
    description: "Complete Chapter 4a and defeat the Lactose Leviathan",
    unlocks: [
      "Dairy & Alternative recipes",
      "Calcium Expertise skill",
    ],
    relatedChapter: "chapter_4a",
  },
  {
    id: "fruit_bearer",
    name: "Fruit Bearer",
    description: "Complete Chapter 4b and defeat the Sugar Siren",
    unlocks: [
      "Fruit recipes",
      "Natural Sugar Awareness skill",
    ],
    relatedChapter: "chapter_4b",
  },
  {
    id: "food_kingdom_guardian",
    name: "Food Kingdom Guardian",
    description: "Complete Final Chapter and defeat the Chaos Diet Dragon",
    unlocks: [
      "Ultimate recipes",
      "Mastery of all food groups",
      "Special cosmetics and titles",
      "Endgame content",
    ],
    relatedChapter: "chapter_5",
  },
];

// ============================================================================
// REAL-WORLD INTEGRATION
// ============================================================================

export interface RealWorldFeature {
  name: string;
  description: string;
  gameConnection: string;
  realLifeImpact: string;
}

export const REAL_WORLD_INTEGRATION: RealWorldFeature[] = [
  {
    name: "Recipe Unlocking",
    description: "Unlock real recipes as you progress through the game",
    gameConnection: "Earn cooking materials and complete quests",
    realLifeImpact:
      "Players can cook the recipes they unlock, reinforcing learning through practice",
  },
  {
    name: "Dietary Tracking",
    description: "Connect with real dietary data to earn game bonuses",
    gameConnection: "Log real meals to earn extra EatXP",
    realLifeImpact:
      "Gamifies healthy eating by rewarding mindful food choices",
  },
  {
    name: "Achievement Badges",
    description: "Physical or digital badges for real-life milestones",
    gameConnection: "Share achievements in-game and earn cosmetics",
    realLifeImpact: "Recognizes real dietary and health achievements",
  },
  {
    name: "Family Co-op Mode",
    description: "Play multiplayer quests with family members",
    gameConnection: "Bonus XP for family-based challenges",
    realLifeImpact:
      "Promotes family conversations about nutrition and healthy eating together",
  },
  {
    name: "School Integration",
    description: "Teachers can create class-specific quests and events",
    gameConnection: "School-specific leaderboards and challenges",
    realLifeImpact:
      "Integrates nutrition education into school curriculum in an engaging way",
  },
];

// ============================================================================
// DEVELOPER NOTES
// ============================================================================

export const DEVELOPER_NOTES = `
SHOKUIKU SAGA RPG CORE CONCEPT - IMPLEMENTATION GUIDELINES

Hero Character Selection:
- Players choose their hero from the available anime characters
- Each character has unique storyline adaptations and special abilities
- The character's personality and background influence their Food Guardian narrative
- Character animations and voice lines are tailored to food-related contexts

Tone & Messaging:
- Keep language energetic and age-appropriate for teen audience
- Use humor to make nutrition concepts relatable and fun
- Create "a-ha!" moments when game mechanics align with real nutrition facts
- Avoid preachy tone; education should feel natural within gameplay

Accessibility Considerations:
- Ensure mini-games have difficulty settings
- Provide skip options for younger/less skilled players
- Include colorblind-friendly palette options
- Support multiple languages through existing i18n system

Difficulty Balancing:
- Early chapters (1-2): Introduction to mechanics and concepts
- Mid chapters (3-4): Increased complexity and strategic depth
- Final chapter: Challenging but fair difficulty spike
- Provide alternative quest routes for different skill levels

Content Updates & Events:
- Seasonal events tied to real food seasons/holidays
- Limited-time collaborations with other anime properties
- Community challenges that reward active players
- Regular balance updates to mini-games and battles

Monetization:
- Game should be free-to-play with optional cosmetics
- Never lock educational content behind paywalls
- Avoid aggressive ads; focus on user experience
- Consider premium pass for optional cosmetic battle pass

Analytics & Learning:
- Track which educational concepts players struggle with
- Use data to improve teaching moments
- Monitor quest difficulty balance
- Gather feedback on character designs and story elements
`;
