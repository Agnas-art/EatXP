// Premium Membership System for EatXP

export interface PremiumBenefit {
  id: string;
  icon: string;
  title: string;
  description: string;
  category: "content" | "progression" | "features" | "exclusive";
}

export interface MembershipTier {
  id: string;
  name: string;
  emoji: string;
  price: number;
  billing: "monthly" | "yearly";
  description: string;
  benefits: PremiumBenefit[];
  badge: string;
  color: string;
}

export const PREMIUM_BENEFITS: Record<string, PremiumBenefit> = {
  // Content Access
  early_chapters: {
    id: "early_chapters",
    icon: "📖",
    title: "Early Access to Chapters",
    description: "Unlock new story chapters 2 weeks before free players",
    category: "content",
  },
  exclusive_bosses: {
    id: "exclusive_bosses",
    icon: "👹",
    title: "Exclusive Boss Battles",
    description: "Battle unique premium-only bosses with rare rewards",
    category: "content",
  },
  premium_quests: {
    id: "premium_quests",
    icon: "🎯",
    title: "Premium Quests",
    description: "Advanced nutrition challenges and cultural food journeys",
    category: "content",
  },
  special_cutscenes: {
    id: "special_cutscenes",
    icon: "🎬",
    title: "Exclusive Cutscenes",
    description: "Premium anime cutscenes and manga panels",
    category: "content",
  },
  anime_themes: {
    id: "anime_themes",
    icon: "🎌",
    title: "Premium Anime Themes",
    description: "Exclusive anime character themes and cosmetics",
    category: "content",
  },

  // Progression
  double_xp: {
    id: "double_xp",
    icon: "⚡",
    title: "Double EatXP Gain",
    description: "Earn 2x EatXP from all battles and quests",
    category: "progression",
  },
  faster_unlocks: {
    id: "faster_unlocks",
    icon: "🚀",
    title: "Faster Unlocks",
    description: "50% faster recipe and skill tree unlocks",
    category: "progression",
  },
  companion_boost: {
    id: "companion_boost",
    icon: "👥",
    title: "Companion Boost",
    description: "Rare companion drop rate increased by 50%",
    category: "progression",
  },

  // Features
  ad_free: {
    id: "ad_free",
    icon: "🚫",
    title: "Ad-Free Experience",
    description: "Play without any advertisements",
    category: "features",
  },
  offline_mode: {
    id: "offline_mode",
    icon: "📱",
    title: "Offline Mode",
    description: "Play story chapters offline, sync when online",
    category: "features",
  },
  cloud_sync: {
    id: "cloud_sync",
    icon: "☁️",
    title: "Cloud Save Backup",
    description: "Automatic cloud backup of your progress",
    category: "features",
  },
  priority_support: {
    id: "priority_support",
    icon: "💬",
    title: "Priority Support",
    description: "Get support responses within 24 hours",
    category: "features",
  },

  // Exclusive
  battle_pass: {
    id: "battle_pass",
    icon: "🎖️",
    title: "Seasonal Battle Pass",
    description: "Exclusive seasonal rewards and cosmetics",
    category: "exclusive",
  },
  cosmetic_pack: {
    id: "cosmetic_pack",
    icon: "💎",
    title: "Monthly Cosmetic Pack",
    description: "New character skins and theme colors every month",
    category: "exclusive",
  },
  vip_leaderboard: {
    id: "vip_leaderboard",
    icon: "🏆",
    title: "VIP Leaderboard Rank",
    description: "Exclusive VIP leaderboard with premium badges",
    category: "exclusive",
  },
};

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: "premium_monthly",
    name: "Premium Monthly",
    emoji: "⭐",
    price: 4.99,
    billing: "monthly",
    description: "Perfect for trying premium features",
    color: "from-blue-400 to-blue-600",
    badge: "Premium",
    benefits: [
      PREMIUM_BENEFITS.double_xp,
      PREMIUM_BENEFITS.faster_unlocks,
      PREMIUM_BENEFITS.companion_boost,
      PREMIUM_BENEFITS.ad_free,
      PREMIUM_BENEFITS.early_chapters,
      PREMIUM_BENEFITS.premium_quests,
    ],
  },
  {
    id: "premium_yearly",
    name: "Premium Yearly",
    emoji: "💎",
    price: 39.99,
    billing: "yearly",
    description: "Best value - save 33%",
    color: "from-purple-400 to-pink-600",
    badge: "Premium Plus",
    benefits: [
      PREMIUM_BENEFITS.double_xp,
      PREMIUM_BENEFITS.faster_unlocks,
      PREMIUM_BENEFITS.companion_boost,
      PREMIUM_BENEFITS.ad_free,
      PREMIUM_BENEFITS.early_chapters,
      PREMIUM_BENEFITS.exclusive_bosses,
      PREMIUM_BENEFITS.premium_quests,
      PREMIUM_BENEFITS.special_cutscenes,
      PREMIUM_BENEFITS.anime_themes,
      PREMIUM_BENEFITS.offline_mode,
      PREMIUM_BENEFITS.cloud_sync,
      PREMIUM_BENEFITS.priority_support,
      PREMIUM_BENEFITS.battle_pass,
      PREMIUM_BENEFITS.cosmetic_pack,
      PREMIUM_BENEFITS.vip_leaderboard,
    ],
  },
  {
    id: "vip",
    name: "VIP Elite",
    emoji: "👑",
    price: 99.99,
    billing: "yearly",
    description: "Ultimate experience - all current and future premium content",
    color: "from-yellow-400 to-red-500",
    badge: "VIP Elite",
    benefits: [
      PREMIUM_BENEFITS.double_xp,
      PREMIUM_BENEFITS.faster_unlocks,
      PREMIUM_BENEFITS.companion_boost,
      PREMIUM_BENEFITS.ad_free,
      PREMIUM_BENEFITS.early_chapters,
      PREMIUM_BENEFITS.exclusive_bosses,
      PREMIUM_BENEFITS.premium_quests,
      PREMIUM_BENEFITS.special_cutscenes,
      PREMIUM_BENEFITS.anime_themes,
      PREMIUM_BENEFITS.offline_mode,
      PREMIUM_BENEFITS.cloud_sync,
      PREMIUM_BENEFITS.priority_support,
      PREMIUM_BENEFITS.battle_pass,
      PREMIUM_BENEFITS.cosmetic_pack,
      PREMIUM_BENEFITS.vip_leaderboard,
    ],
  },
];

export const PREMIUM_EXCLUSIVE_CHAPTERS = [8, 9, 10]; // Chapters only available to premium members
export const PREMIUM_EXCLUSIVE_BOSSES = [
  "iron_chef_master",
  "nutrition_oracle",
  "flavor_emperor",
];
export const PREMIUM_EXCLUSIVE_QUESTS = {
  cultural_food_journey: {
    id: "cultural_food_journey",
    name: "Cultural Food Journeys",
    description: "Explore cuisines from around the world",
    difficulty: "Hard",
    xpReward: 500,
  },
  advanced_nutrition: {
    id: "advanced_nutrition",
    name: "Advanced Nutrition Challenges",
    description: "Deep dive into nutritional science",
    difficulty: "Hard",
    xpReward: 450,
  },
  molecular_gastronomy: {
    id: "molecular_gastronomy",
    name: "Molecular Gastronomy",
    description: "The science of cooking and food chemistry",
    difficulty: "Challenging",
    xpReward: 600,
  },
};

export interface PremiumUser {
  membershipTier: "free" | "premium_monthly" | "premium_yearly" | "vip";
  membershipStartDate: number;
  membershipEndDate: number;
  xpMultiplier: number;
  unlockSpeedBoost: number;
  companionDropBoost: number;
  isPremium: boolean;
  features: {
    adFree: boolean;
    offlineMode: boolean;
    cloudSync: boolean;
    prioritySupport: boolean;
    battlePass: boolean;
    vipLeaderboard: boolean;
  };
}

export const DEFAULT_FREE_USER: PremiumUser = {
  membershipTier: "free",
  membershipStartDate: 0,
  membershipEndDate: 0,
  xpMultiplier: 1,
  unlockSpeedBoost: 1,
  companionDropBoost: 1,
  isPremium: false,
  features: {
    adFree: false,
    offlineMode: false,
    cloudSync: false,
    prioritySupport: false,
    battlePass: false,
    vipLeaderboard: false,
  },
};

export const PREMIUM_MONTHLY_USER: PremiumUser = {
  membershipTier: "premium_monthly",
  membershipStartDate: Date.now(),
  membershipEndDate: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
  xpMultiplier: 2,
  unlockSpeedBoost: 1.5,
  companionDropBoost: 1.5,
  isPremium: true,
  features: {
    adFree: true,
    offlineMode: false,
    cloudSync: false,
    prioritySupport: false,
    battlePass: false,
    vipLeaderboard: false,
  },
};

export const PREMIUM_YEARLY_USER: PremiumUser = {
  membershipTier: "premium_yearly",
  membershipStartDate: Date.now(),
  membershipEndDate: Date.now() + 365 * 24 * 60 * 60 * 1000, // 365 days
  xpMultiplier: 2,
  unlockSpeedBoost: 1.5,
  companionDropBoost: 1.5,
  isPremium: true,
  features: {
    adFree: true,
    offlineMode: true,
    cloudSync: true,
    prioritySupport: true,
    battlePass: true,
    vipLeaderboard: false,
  },
};

export const VIP_ELITE_USER: PremiumUser = {
  membershipTier: "vip",
  membershipStartDate: Date.now(),
  membershipEndDate: Date.now() + 365 * 24 * 60 * 60 * 1000, // 365 days
  xpMultiplier: 2.5,
  unlockSpeedBoost: 2,
  companionDropBoost: 2,
  isPremium: true,
  features: {
    adFree: true,
    offlineMode: true,
    cloudSync: true,
    prioritySupport: true,
    battlePass: true,
    vipLeaderboard: true,
  },
};
