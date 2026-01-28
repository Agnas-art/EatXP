import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import { organicFoods, foodCategories } from "@/data/organicFoodsData";

interface FoodLoggerProps {
  onAddFood: (foodId: string, mealType: string) => void;
  onClose: () => void;
}

type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export const FoodLogger = ({ onAddFood, onClose }: FoodLoggerProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Fruits");
  const [selectedMealType, setSelectedMealType] = useState<MealType>("breakfast");
  const [searchTerm, setSearchTerm] = useState("");

  const categoryFoods = organicFoods.filter(
    (food) =>
      food.category === selectedCategory &&
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const mealEmojis = {
    breakfast: "🌅",
    lunch: "☀️",
    dinner: "🌙",
    snack: "🍿",
  };

  const handleAddFood = (foodId: string) => {
    onAddFood(foodId, selectedMealType);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            📓 Log Your Food
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-background rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-6">
          {/* Meal Type Selection */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              What meal is this?
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(["breakfast", "lunch", "dinner", "snack"] as MealType[]).map(
                (mealType) => (
                  <motion.button
                    key={mealType}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedMealType(mealType)}
                    className={`p-3 rounded-lg font-semibold transition-all capitalize
                      ${
                        selectedMealType === mealType
                          ? "bg-primary text-primary-foreground scale-105 shadow-lg"
                          : "bg-background text-foreground hover:bg-secondary/10"
                      }`}
                  >
                    <span className="text-xl block">{mealEmojis[mealType]}</span>
                    {mealType}
                  </motion.button>
                )
              )}
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Choose Category
            </label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {foodCategories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`p-2 rounded-lg text-sm font-semibold transition-all
                    ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-background text-foreground hover:bg-secondary/10"
                    }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Search foods..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Foods Grid */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Available Foods
            </h3>
            <AnimatePresence>
              {categoryFoods.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {categoryFoods.map((food, idx) => (
                    <motion.button
                      key={food.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddFood(food.id)}
                      className={`p-3 rounded-lg border-2 transition-all
                        ${
                          food.isOrganic
                            ? "border-green-500 bg-gradient-to-br from-green-500/10 to-emerald-500/10 hover:border-green-400"
                            : "border-gray-400 bg-gray-500/5 hover:border-gray-300"
                        }`}
                    >
                      <div className="text-3xl mb-1">{food.emoji}</div>
                      <p className="text-xs font-semibold text-foreground">
                        {food.name}
                      </p>
                      {food.isOrganic && (
                        <p className="text-xs text-green-600 font-bold">🌱 Organic</p>
                      )}
                    </motion.button>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No foods found in this category
                </p>
              )}
            </AnimatePresence>
          </div>

          {/* Fun Fact */}
          {categoryFoods.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4"
            >
              <p className="text-sm font-semibold text-foreground mb-2">💡 Did you know?</p>
              <p className="text-xs text-muted-foreground">
                {categoryFoods[0]?.funFact}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FoodLogger;
