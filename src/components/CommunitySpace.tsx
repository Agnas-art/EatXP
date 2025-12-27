import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, MessageCircle, Share2, Users, Trophy, Utensils, TrendingUp, Plus, Trash2, Award, Flame, Zap, Shield, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { ANIME_CHARACTERS } from "../data/animeCharacters";

interface Friend {
  id: string;
  name: string;
  avatar: string;
  level: number;
  recipesShared: number;
}

interface SharedRecipe {
  id: string;
  authorName: string;
  recipeName: string;
  difficulty: "Easy" | "Medium" | "Hard";
  prepTime: string;
  likes: number;
  timestamp: string;
  country: string;
}

interface Challenge {
  id: string;
  name: string;
  description: string;
  participants: number;
  prize: string;
  daysLeft: number;
  difficulty: string;
  icon: string;
}

interface ForumPost {
  id: string;
  author: string;
  title: string;
  category: "Tips" | "Cultural" | "Nutrition" | "Recipes" | "General";
  replies: number;
  likes: number;
  timestamp: string;
}

const CommunitySpace = ({ onBack }: { onBack: () => void }) => {
  // Content Moderation System
  const ABUSIVE_KEYWORDS = [
    "hate", "stupid", "idiot", "dumb", "trash", "useless", "garbage",
    "pathetic", "loser", "noob", "die", "kill", "racist", "sexist"
  ];

  const IRRELEVANT_KEYWORDS = [
    "crypto", "stocks", "marketing", "casino", "gambling", "forex",
    "bitcoin", "nft", "click here", "buy now", "limited offer"
  ];

  // Content moderation function
  const isContentClean = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    const hasAbusive = ABUSIVE_KEYWORDS.some(keyword => lowerText.includes(keyword));
    const hasIrrelevant = IRRELEVANT_KEYWORDS.some(keyword => lowerText.includes(keyword));
    return !hasAbusive && !hasIrrelevant;
  };

  // Get moderation status
  const getModerationStatus = (text: string): { clean: boolean; reason: string } => {
    const lowerText = text.toLowerCase();
    const abusiveMatch = ABUSIVE_KEYWORDS.find(keyword => lowerText.includes(keyword));
    if (abusiveMatch) return { clean: false, reason: "Abusive language detected" };
    
    const irrelevantMatch = IRRELEVANT_KEYWORDS.find(keyword => lowerText.includes(keyword));
    if (irrelevantMatch) return { clean: false, reason: "Irrelevant spam content detected" };
    
    return { clean: true, reason: "" };
  };

  const [activeTab, setActiveTab] = useState<"social" | "challenges" | "forum">("social");
  const [showModerationFilter, setShowModerationFilter] = useState(true);
  const [friends, setFriends] = useState<Friend[]>([
    { id: "1", name: "Chef Yamada", avatar: "👨‍🍳", level: 15, recipesShared: 8 },
    { id: "2", name: "Sakura123", avatar: "👩‍🍳", level: 12, recipesShared: 5 },
    { id: "3", name: "RamenLover", avatar: "🍜", level: 10, recipesShared: 12 },
  ]);

  const [sharedRecipes, setSharedRecipes] = useState<SharedRecipe[]>([
    {
      id: "1",
      authorName: "Chef Yamada",
      recipeName: "Classic Tonkatsu",
      difficulty: "Medium",
      prepTime: "45 mins",
      likes: 234,
      timestamp: "2 hours ago",
      country: "🇯🇵 Japan",
    },
    {
      id: "2",
      authorName: "Sakura123",
      recipeName: "Vegetable Stir Fry",
      difficulty: "Easy",
      prepTime: "20 mins",
      likes: 156,
      timestamp: "5 hours ago",
      country: "🇨🇳 China",
    },
    {
      id: "3",
      authorName: "RamenLover",
      recipeName: "Spicy Miso Ramen",
      difficulty: "Hard",
      prepTime: "90 mins",
      likes: 412,
      timestamp: "1 day ago",
      country: "🇯🇵 Japan",
    },
  ]);

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "1",
      name: "7-Day Veggie Challenge",
      description: "Eat vegetables in all 3 meals for 7 days",
      participants: 2341,
      prize: "🏆 Golden Badge + 500 XP",
      daysLeft: 3,
      difficulty: "Medium",
      icon: "🥬",
    },
    {
      id: "2",
      name: "Cultural Cook Quest",
      description: "Cook a traditional dish from 3 different cultures",
      participants: 1856,
      prize: "🌍 Global Explorer Badge + 750 XP",
      daysLeft: 7,
      difficulty: "Hard",
      icon: "🌏",
    },
    {
      id: "3",
      name: "Breakfast Championship",
      description: "Create the healthiest breakfast recipe",
      participants: 3421,
      prize: "👑 Champion Crown + 1000 XP",
      daysLeft: 14,
      difficulty: "Medium",
      icon: "🥞",
    },
  ]);

  const [forumPosts, setForumPosts] = useState<ForumPost[]>([
    {
      id: "1",
      author: "NutritionGuru",
      title: "Best Proteins for Growing Teens",
      category: "Nutrition",
      replies: 45,
      likes: 312,
      timestamp: "3 hours ago",
    },
    {
      id: "2",
      author: "CulinaryArtist",
      title: "How to Make Perfect Sushi at Home",
      category: "Recipes",
      replies: 28,
      likes: 187,
      timestamp: "1 day ago",
    },
    {
      id: "3",
      author: "HealthyChoices",
      title: "Easy Meal Prep Tips for Busy Students",
      category: "Tips",
      replies: 67,
      likes: 456,
      timestamp: "2 days ago",
    },
    {
      id: "4",
      author: "CulturalChef",
      title: "Traditional Foods from Southeast Asia",
      category: "Cultural",
      replies: 34,
      likes: 289,
      timestamp: "3 days ago",
    },
  ]);

  const selectedCharacter = ANIME_CHARACTERS[0];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Tips: "bg-amber-500/20 text-amber-700",
      Cultural: "bg-purple-500/20 text-purple-700",
      Nutrition: "bg-green-500/20 text-green-700",
      Recipes: "bg-pink-500/20 text-pink-700",
      General: "bg-blue-500/20 text-blue-700",
    };
    return colors[category] || "bg-gray-500/20 text-gray-700";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600";
      case "Medium":
        return "text-amber-600";
      case "Hard":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-background to-secondary/20"
    >
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-md border-b border-border bg-background/80">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>

            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                🌍 Community Space
              </h1>
              <p className="text-xs text-muted-foreground mt-1">Share • Learn • Compete</p>
            </div>

            <div className="w-10" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 pb-20">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 rounded-lg bg-muted p-1 sticky top-20 z-30">
          {(["social", "challenges", "forum"] as const).map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 rounded-md font-semibold text-sm transition-all ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "social" && <><Users className="w-4 h-4 inline mr-2" />Social</>}
              {tab === "challenges" && <><Trophy className="w-4 h-4 inline mr-2" />Challenges</>}
              {tab === "forum" && <><MessageCircle className="w-4 h-4 inline mr-2" />Forum</>}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* SOCIAL TAB */}
          {activeTab === "social" && (
            <motion.div
              key="social"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Friends Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-lg p-6 border border-border"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    👥 My Friends
                    <span className="text-sm font-normal text-muted-foreground">({friends.length})</span>
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {friends.map((friend, idx) => (
                    <motion.div
                      key={friend.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors border border-border/50 group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-3xl">{friend.avatar}</div>
                        <Award className="w-4 h-4 text-amber-500" />
                      </div>
                      <p className="font-semibold text-sm">{friend.name}</p>
                      <p className="text-xs text-muted-foreground">Level {friend.level}</p>
                      <p className="text-xs text-primary mt-1">📖 {friend.recipesShared} recipes shared</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-2 w-full text-xs bg-primary/20 text-primary py-1 rounded hover:bg-primary/30 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        View Profile
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Shared Recipes Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-lg p-6 border border-border"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    👨‍🍳 Community Recipes
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="space-y-3">
                  {sharedRecipes.map((recipe, idx) => (
                    <motion.div
                      key={recipe.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-4 bg-muted rounded-lg border border-border/50 hover:border-primary/50 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-sm">{recipe.recipeName}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(recipe.difficulty)} opacity-75`}>
                              {recipe.difficulty}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">by {recipe.authorName}</p>
                        </div>
                        <span className="text-xs font-semibold text-primary">{recipe.country}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span>⏱️ {recipe.prepTime}</span>
                        <span>{recipe.timestamp}</span>
                      </div>

                      <div className="flex items-center gap-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center gap-1 text-xs hover:text-red-500 transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                          {recipe.likes}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center gap-1 text-xs hover:text-primary transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                          Share
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center gap-1 text-xs hover:text-blue-500 transition-colors ml-auto"
                        >
                          <Utensils className="w-4 h-4" />
                          Try Recipe
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Community Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3"
              >
                {[
                  { icon: "👥", label: "Members", value: "12.4K", color: "from-blue-500 to-cyan-500" },
                  { icon: "📖", label: "Recipes Shared", value: "3.2K", color: "from-pink-500 to-red-500" },
                  { icon: "💬", label: "Discussions", value: "8.9K", color: "from-purple-500 to-pink-500" },
                  { icon: "🏆", label: "Challenges", value: "142", color: "from-amber-500 to-orange-500" },
                ].map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                    className={`p-4 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-20 border border-opacity-30 border-white text-center`}
                  >
                    <p className="text-2xl mb-1">{stat.icon}</p>
                    <p className="text-lg font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* CHALLENGES TAB */}
          {activeTab === "challenges" && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-r from-primary/30 to-secondary/30 rounded-lg p-4 border border-primary/20 mb-4">
                <p className="text-sm font-semibold">🔥 Complete challenges to earn XP, badges, and bragging rights!</p>
              </div>

              {challenges.map((challenge, idx) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{challenge.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{challenge.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-1">Difficulty</p>
                      <p className={`font-bold ${getDifficultyColor(challenge.difficulty)}`}>{challenge.difficulty}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 pt-4 border-t border-border/50">
                    <div>
                      <p className="text-xs text-muted-foreground">Participants</p>
                      <p className="font-bold text-sm">{challenge.participants.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Time Left</p>
                      <p className="font-bold text-sm flex items-center gap-1">
                        <Flame className="w-3 h-3 text-red-500" />
                        {challenge.daysLeft}d
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-xs text-muted-foreground">Prize</p>
                      <p className="font-bold text-sm">{challenge.prize}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      <Zap className="w-4 h-4 inline mr-2" />
                      Join Challenge
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* FORUM TAB */}
          {activeTab === "forum" && (
            <motion.div
              key="forum"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* Moderation Controls */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-lg bg-blue-500/10 border border-blue-500/30 p-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <p className="text-xs font-semibold text-blue-700">Content Safety</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowModerationFilter(!showModerationFilter)}
                    className={`text-xs font-semibold px-3 py-1 rounded transition-all ${
                      showModerationFilter
                        ? "bg-blue-600 text-white"
                        : "bg-blue-500/20 text-blue-700 border border-blue-500/50"
                    }`}
                  >
                    {showModerationFilter ? "✓ Filter ON" : "⊗ Filter OFF"}
                  </motion.button>
                </div>
                <p className="text-xs text-blue-600 mt-2">
                  Automatically filters abusive language and spam content to keep the community safe for everyone.
                </p>
              </motion.div>

              <div className="flex gap-2 mb-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    className="w-full px-4 py-2 rounded-lg bg-muted border border-border focus:border-primary focus:outline-none"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <Plus className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="space-y-3">
                {forumPosts.map((post, idx) => {
                  const modStatus = getModerationStatus(post.title);
                  const shouldDisplay = showModerationFilter ? modStatus.clean : true;

                  if (showModerationFilter && !shouldDisplay) {
                    return (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-4 bg-card rounded-lg border border-red-500/30 bg-red-500/5"
                      >
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-red-700">Content Flagged</p>
                            <p className="text-xs text-red-600">{modStatus.reason}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-all group cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <h3 className="font-bold text-sm group-hover:text-primary transition-colors truncate">
                              {post.title}
                            </h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${getCategoryColor(post.category)}`}>
                              {post.category}
                            </span>
                            {!modStatus.clean && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-700 font-semibold flex-shrink-0">
                                ⚠️ Review
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            by <span className="font-semibold">{post.author}</span> • {post.timestamp}
                          </p>
                        </div>
                        <div className="flex gap-3 flex-shrink-0">
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">💬</p>
                            <p className="text-sm font-bold">{post.replies}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">❤️</p>
                            <p className="text-sm font-bold">{post.likes}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-xs px-3 py-1 bg-primary/20 text-primary rounded hover:bg-primary/30 transition-colors"
                        >
                          Reply
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-xs px-3 py-1 bg-muted text-muted-foreground rounded hover:bg-muted/80 transition-colors"
                        >
                          Save
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CommunitySpace;
