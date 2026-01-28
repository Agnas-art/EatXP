import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trash2, Calendar, TrendingUp } from "lucide-react";
import {
  foodSources,
  FoodJournalEntry,
  getTotalFoodsLogged,
  getFoodsLoggedByMethod,
  getFoodSourceById,
  getUnlockedAchievements,
  getNextAchievement,
} from "@/data/foodSourcesData";
import { FoodLogger } from "./FoodLogger";
import { AnimeMascotFeedback } from "./AnimeMascotFeedback";
import { AchievementSticker } from "./AchievementSticker";

interface FoodJournalProps {
  onBack: () => void;
}

export const FoodJournal = ({ onBack }: FoodJournalProps) => {
  const [entries, setEntries] = useState<FoodJournalEntry[]>(() => {
    const saved = localStorage.getItem("food_journal");
    return saved ? JSON.parse(saved) : [];
  });

  const [showFoodLogger, setShowFoodLogger] = useState(false);
  const [feedbackFood, setFeedbackFood] = useState<{
    foodId: string;
    foodName: string;
  } | null>(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    localStorage.setItem("food_journal", JSON.stringify(entries));
  }, [entries]);

  const totalLogged = getTotalFoodsLogged(entries);
  const unlockedAchievements = getUnlockedAchievements(totalLogged);
  const nextAchievement = getNextAchievement(totalLogged);

  const todayEntries = entries.filter((entry) => entry.date === selectedDate);
  const chemicalFreeFoods = todayEntries.filter((entry) => {
    const food = getFoodSourceById(entry.foodId);
    return food?.productionMethod === "Chemical-Free Farming";
  });

  const handleAddFood = (foodId: string, mealType: string) => {
    const food = getFoodSourceById(foodId);
    if (!food) return;

    const newEntry: FoodJournalEntry = {
      id: Date.now().toString(),
      foodId,
      date: selectedDate,
      mealType: mealType as "breakfast" | "lunch" | "dinner" | "snack",
      servingSize: "1 serving",
      timestamp: Date.now(),
    };

    setEntries([...entries, newEntry]);
    setFeedbackFood({
      foodId,
      foodName: food.name,
    });
    setShowFoodLogger(false);

    setTimeout(() => setFeedbackFood(null), 3000);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const mealEmojis = {
    breakfast: "🌅",
    lunch: "☀️",
    dinner: "🌙",
    snack: "🍿",
  };

  const methodEmojis: Record<string, string> = {
    "Chemical-Free Farming": "🌱",
    "Standard Agriculture": "🌾",
    "Sustainable Practices": "🌍",
    "Local Production": "🏡",
    "Industrial Scale": "🏭",
  };

  const getProgressPercentage = () => {
    if (!nextAchievement) return 100;
    const prevRequired =
      unlockedAchievements[unlockedAchievements.length - 1]?.requirement || 0;
    const nextRequired = nextAchievement.requirement;
    const progress = ((totalLogged - prevRequired) / (nextRequired - prevRequired)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const uniqueFoodsLogged = Array.from(
    new Set(entries.map((e) => getFoodSourceById(e.foodId)?.name)).values()
  );

  const methodBreakdown = {
    "Chemical-Free Farming": getFoodsLoggedByMethod(entries, "Chemical-Free Farming"),
    "Standard Agriculture": getFoodsLoggedByMethod(entries, "Standard Agriculture"),
    "Industrial Scale": getFoodsLoggedByMethod(entries, "Industrial Scale"),
    "Sustainable Practices": getFoodsLoggedByMethod(entries, "Sustainable Practices"),
    "Local Production": getFoodsLoggedByMethod(entries, "Local Production"),
  };

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 p-4 pb-20"
      >
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, 20, 0], rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, -20, 0], rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pt-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors bg-white/5 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back</span>
            </motion.button>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 flex items-center gap-3"
            >
              🍽️ Food Explorer
            </motion.h1>
            <div className="w-32" />
          </div>

          {/* Feedback Animation */}
          <AnimatePresence>
            {feedbackFood && (
              <AnimeMascotFeedback
                isOrganic={true}
                foodName={feedbackFood.foodName}
                foodEmoji={getFoodSourceById(feedbackFood.foodId)?.emoji || "🍎"}
              />
            )}
          </AnimatePresence>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            {/* Total Foods Card */}
            <motion.div
              whileHover={{ scale: 1.05, translateY: -5 }}
              className="relative overflow-hidden rounded-2xl p-6 backdrop-blur-xl border border-white/20"
              style={{
                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)",
              }}
            >
              <div className="absolute inset-0 opacity-20">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity }} className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl" />
              </div>
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-4xl">📊</span>
                  <span className="text-xs font-bold text-blue-300 bg-blue-500/30 px-3 py-1 rounded-full">Total</span>
                </div>
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-1">
                  {totalLogged}
                </div>
                <p className="text-sm text-white/70 font-semibold">Foods Logged</p>
                <p className="text-xs text-white/50 mt-1">{uniqueFoodsLogged.length} unique items</p>
              </div>
            </motion.div>

            {/* Today's Foods Card */}
            <motion.div
              whileHover={{ scale: 1.05, translateY: -5 }}
              className="relative overflow-hidden rounded-2xl p-6 backdrop-blur-xl border border-white/20"
              style={{
                background: "linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)",
              }}
            >
              <div className="absolute inset-0 opacity-20">
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 35, repeat: Infinity }} className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500 rounded-full blur-3xl" />
              </div>
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-4xl">🎯</span>
                  <span className="text-xs font-bold text-pink-300 bg-pink-500/30 px-3 py-1 rounded-full">Today</span>
                </div>
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300 mb-1">
                  {todayEntries.length}
                </div>
                <p className="text-sm text-white/70 font-semibold">Foods Logged</p>
                <p className="text-xs text-white/50 mt-1">{new Date(selectedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
              </div>
            </motion.div>

            {/* Achievements Card */}
            <motion.div
              whileHover={{ scale: 1.05, translateY: -5 }}
              className="relative overflow-hidden rounded-2xl p-6 backdrop-blur-xl border border-white/20"
              style={{
                background: "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)",
              }}
            >
              <div className="absolute inset-0 opacity-20">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity }} className="absolute -top-20 -left-20 w-40 h-40 bg-green-500 rounded-full blur-3xl" />
              </div>
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-4xl">🏆</span>
                  <span className="text-xs font-bold text-green-300 bg-green-500/30 px-3 py-1 rounded-full">Badges</span>
                </div>
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 mb-1">
                  {unlockedAchievements.length}
                </div>
                <p className="text-sm text-white/70 font-semibold">Achievements</p>
                <p className="text-xs text-white/50 mt-1">Keep exploring!</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Progress Bar */}
          {nextAchievement && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-2xl p-6 mb-8 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✨</span>
                  <p className="text-sm font-bold text-white">
                    Progress to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">{nextAchievement.name}</span>
                  </p>
                </div>
                <p className="text-xs font-bold text-white/60">
                  {totalLogged}/{nextAchievement.requirement}
                </p>
              </div>
              <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden border border-white/20">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgressPercentage()}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 shadow-lg shadow-purple-500/50"
                />
              </div>
            </motion.div>
          )}

          {/* Production Method Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/40 rounded-2xl p-6 mb-8 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity }} className="text-2xl">
                📈
              </motion.div>
              <h2 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300">
                Production Method Breakdown
              </h2>
            </div>
            <div className="space-y-4">
              {Object.entries(methodBreakdown).map(([method, count]) => (
                count > 0 && (
                  <motion.div
                    key={method}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{methodEmojis[method]}</span>
                        <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">
                          {method}
                        </span>
                      </div>
                      <motion.span
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        className="text-xs font-black text-cyan-300 bg-white/20 px-3 py-1 rounded-full"
                      >
                        {count}
                      </motion.span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden border border-white/20 group-hover:border-teal-400/50 transition-all">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(count / totalLogged) * 100}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 shadow-lg shadow-teal-500/50"
                      />
                    </div>
                  </motion.div>
                )
              ))}
              {totalLogged === 0 && (
                <p className="text-sm text-white/50 italic text-center py-4">Log foods to see production method insights</p>
              )}
            </div>
          </motion.div>

          {/* Date Selector */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
            <label className="block text-sm font-bold text-white/70 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent backdrop-blur-sm transition-all"
            />
          </motion.div>

          {/* Food Logger Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 197, 94, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFoodLogger(true)}
            className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-black py-4 rounded-2xl mb-8 hover:shadow-xl transition-shadow text-lg flex items-center justify-center gap-3 relative overflow-hidden group"
          >
            <motion.span animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }} className="text-2xl">
              ➕
            </motion.span>
            <span>Log a Food</span>
            <motion.div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </motion.button>

          {/* Today's Entries */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-2xl">
                🌟
              </motion.span>
              <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Today's Foods ({todayEntries.length})
              </h2>
            </div>

            {todayEntries.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border-2 border-dashed border-white/20 backdrop-blur-sm"
              >
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-5xl mb-4">
                  🍽️
                </motion.div>
                <p className="text-white/60 text-lg font-semibold mb-2">No foods logged yet</p>
                <p className="text-white/40 text-sm">Click "Log a Food" to start exploring different production methods!</p>
              </motion.div>
            ) : (
              <div className="space-y-3">
                {todayEntries.map((entry, idx) => {
                  const food = getFoodSourceById(entry.foodId);
                  if (!food) return null;

                  const mealEmoji = mealEmojis[entry.mealType];
                  const methodEmoji = methodEmojis[food.productionMethod];

                  return (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.02, translateX: 5 }}
                      className="group relative rounded-xl p-4 backdrop-blur-xl border border-white/20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-4xl">
                            {food.emoji}
                          </motion.span>
                          <div>
                            <p className="font-bold text-white text-lg">{food.name}</p>
                            <div className="flex items-center gap-3 text-xs text-white/60 mt-1">
                              <span className="bg-white/10 px-2 py-1 rounded-full">{mealEmoji} {entry.mealType}</span>
                              <span>•</span>
                              <span className="bg-white/10 px-2 py-1 rounded-full">{methodEmoji} {food.productionMethod}</span>
                            </div>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.2, rotate: 90 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Achievements */}
          {unlockedAchievements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <AchievementSticker unlockedAchievements={unlockedAchievements} organicCount={totalLogged} />
            </motion.div>
          )}

          {/* Fun Fact */}
          {todayEntries.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/40 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity }} className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500 rounded-full blur-2xl" />
              </div>
              <div className="relative">
                <div className="flex items-start gap-4">
                  <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-3xl flex-shrink-0">
                    💡
                  </motion.span>
                  <div>
                    <p className="text-sm font-black text-amber-200 mb-2 uppercase tracking-wider">Food Sourcing Insight</p>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Different production methods have unique environmental impacts and nutritional benefits. By understanding how your food is grown, you can make informed choices that align with your values and health goals!
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Food Logger Modal */}
          <AnimatePresence>
            {showFoodLogger && (
              <FoodLogger
                onAddFood={handleAddFood}
                onClose={() => setShowFoodLogger(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default FoodJournal;
