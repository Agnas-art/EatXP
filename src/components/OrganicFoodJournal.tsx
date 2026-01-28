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
        className="min-h-screen bg-gradient-to-br from-background via-background to-green-500/5 p-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            🍽️ Food Production Journal
          </h1>
          <div className="w-12" />
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
          className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6 mb-6"
        >
          <div className="grid grid-cols-3 gap-4">
            {/* Total Foods */}
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-1">
                {totalLogged}
              </div>
              <p className="text-sm font-semibold text-foreground">
                Foods Logged
              </p>
              <p className="text-xs text-muted-foreground">{uniqueFoodsLogged.length} unique</p>
            </div>

            {/* Today's Foods */}
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-1">
                {todayEntries.length}
              </div>
              <p className="text-sm font-semibold text-foreground">
                Today's Foods
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(selectedDate).toLocaleDateString()}
              </p>
            </div>

            {/* Achievements */}
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600 mb-1">
                {unlockedAchievements.length}
              </div>
              <p className="text-sm font-semibold text-foreground">
                Achievements
              </p>
              <p className="text-xs text-muted-foreground">Unlocked</p>
            </div>
          </div>

          {/* Progress Bar */}
          {nextAchievement && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-foreground">
                  Progress to {nextAchievement.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {totalLogged}/{nextAchievement.requirement}
                </p>
              </div>
              <div className="w-full bg-gray-300/30 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgressPercentage()}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-500"
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Production Method Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            <h2 className="text-lg font-bold text-foreground">Production Method Insights</h2>
          </div>
          <div className="space-y-3">
            {Object.entries(methodBreakdown).map(([method, count]) => (
              count > 0 && (
                <div key={method}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-foreground">
                      {methodEmojis[method]} {method}
                    </span>
                    <span className="text-xs font-bold text-muted-foreground">{count}</span>
                  </div>
                  <div className="w-full bg-gray-300/30 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / totalLogged) * 100}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-teal-400 to-cyan-500"
                    />
                  </div>
                </div>
              )
            ))}
            {totalLogged === 0 && (
              <p className="text-sm text-muted-foreground italic">Log foods to see production method breakdown</p>
            )}
          </div>
        </motion.div>

        {/* Date Selector */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Food Logger Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowFoodLogger(true)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 rounded-lg mb-6 hover:shadow-lg transition-shadow text-lg flex items-center justify-center gap-2"
        >
          <span className="text-2xl">➕</span>
          Log a Food
        </motion.button>

        {/* Today's Entries */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Today's Foods ({todayEntries.length})
          </h2>

          {todayEntries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-card rounded-lg border-2 border-dashed border-border"
            >
              <p className="text-muted-foreground text-lg mb-4">
                No foods logged yet for this day
              </p>
              <p className="text-sm text-muted-foreground">
                Start by clicking "Log a Food" above!
              </p>
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
                    transition={{ delay: idx * 0.1 }}
                    className={`p-4 rounded-lg border-2 flex items-center justify-between group bg-gradient-to-r ${food.methodColor} bg-opacity-5 border-opacity-30`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-3xl">{food.emoji}</span>
                      <div>
                        <p className="font-bold text-foreground">{food.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{mealEmoji} {entry.mealType}</span>
                          <span>•</span>
                          <span>{methodEmoji} {food.productionMethod}</span>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Achievements */}
        {unlockedAchievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <AchievementSticker
              unlockedAchievements={unlockedAchievements}
              organicCount={totalLogged}
            />
          </motion.div>
        )}

        {/* Fun Fact */}
        {todayEntries.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-lg p-4"
          >
            <p className="text-sm font-semibold text-foreground mb-2">💡 Food Sourcing Insight:</p>
            <p className="text-sm text-muted-foreground">
              Different production methods have different environmental impacts. By understanding how your food is grown, you can make informed choices that align with your values!
            </p>
          </motion.div>
        )}
      </motion.div>

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
  );
};

export default FoodJournal;
