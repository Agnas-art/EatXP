import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChefHat, SkipBack } from "lucide-react";

interface MealMasterySimulatorProps {
  onBack?: () => void;
}

const MACRONUTRIENTS = [
  { name: "Proteins", icon: "🍗", daily: 50, unit: "g" },
  { name: "Carbs", icon: "🍚", daily: 300, unit: "g" },
  { name: "Fats", icon: "🥑", daily: 50, unit: "g" },
  { name: "Fiber", icon: "🥦", daily: 30, unit: "g" },
];

const FOODS = [
  { name: "Grilled Chicken", protein: 35, carbs: 0, fat: 5, fiber: 0, cal: 180 },
  { name: "Brown Rice", protein: 4, carbs: 45, fat: 1, fiber: 3, cal: 215 },
  { name: "Broccoli", protein: 3, carbs: 7, fat: 0, fiber: 2, cal: 34 },
  { name: "Salmon", protein: 25, carbs: 0, fat: 12, fiber: 0, cal: 206 },
  { name: "Sweet Potato", protein: 2, carbs: 24, fat: 0, fiber: 3, cal: 103 },
  { name: "Almonds", protein: 6, carbs: 6, fat: 14, fiber: 3, cal: 164 },
  { name: "Eggs", protein: 6, carbs: 1, fat: 5, fiber: 0, cal: 78 },
  { name: "Spinach", protein: 3, carbs: 3, fat: 0, fiber: 2, cal: 23 },
];

export const MealMasterySimulator = ({ onBack }: MealMasterySimulatorProps) => {
  const { t } = useTranslation();
  const [meal, setMeal] = useState<typeof FOODS>([]);
  const [balance, setBalance] = useState({
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    calories: 0,
  });
  const [score, setScore] = useState(0);

  const addFood = (food: typeof FOODS[0]) => {
    setMeal([...meal, food]);
    const newBalance = {
      protein: balance.protein + food.protein,
      carbs: balance.carbs + food.carbs,
      fat: balance.fat + food.fat,
      fiber: balance.fiber + food.fiber,
      calories: balance.calories + food.cal,
    };
    setBalance(newBalance);
    calculateScore(newBalance);
  };

  const removeFood = (index: number) => {
    const food = meal[index];
    const newMeal = meal.filter((_, i) => i !== index);
    setMeal(newMeal);
    const newBalance = {
      protein: balance.protein - food.protein,
      carbs: balance.carbs - food.carbs,
      fat: balance.fat - food.fat,
      fiber: balance.fiber - food.fiber,
      calories: balance.calories - food.cal,
    };
    setBalance(newBalance);
    calculateScore(newBalance);
  };

  const calculateScore = (bal: typeof balance) => {
    let points = 0;
    if (bal.protein >= 40 && bal.protein <= 60) points += 25;
    if (bal.carbs >= 250 && bal.carbs <= 350) points += 25;
    if (bal.fat >= 40 && bal.fat <= 70) points += 25;
    if (bal.fiber >= 25 && bal.fiber <= 35) points += 25;
    setScore(points);
  };

  const resetMeal = () => {
    setMeal([]);
    setBalance({ protein: 0, carbs: 0, fat: 0, fiber: 0, calories: 0 });
    setScore(0);
  };

  const getMacroPercentage = (value: number, target: number) => {
    return Math.min((value / target) * 100, 150);
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-orange-600 flex items-center gap-2">
          <ChefHat className="w-8 h-8" />
          Meal Mastery Simulator
        </h2>
        <Button onClick={onBack} variant="outline" size="sm">
          <SkipBack className="w-4 h-4" /> Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Food Selection */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="font-bold text-lg mb-3">Available Foods</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {FOODS.map((food, idx) => (
                <Button
                  key={idx}
                  onClick={() => addFood(food)}
                  className="w-full justify-start text-left bg-blue-100 hover:bg-blue-200 text-black"
                >
                  {food.name}
                  <span className="text-xs ml-auto">+{food.cal}cal</span>
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* Macro Tracking */}
        <div className="lg:col-span-2">
          <Card className="p-4 mb-4">
            <h3 className="font-bold text-lg mb-4">Nutrition Balance</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                { key: "protein", icon: "🍗", target: 50 },
                { key: "carbs", icon: "🍚", target: 300 },
                { key: "fat", icon: "🥑", target: 50 },
                { key: "fiber", icon: "🥦", target: 30 },
              ].map(({ key, icon, target }) => {
                const value = balance[key as keyof typeof balance];
                const percent = getMacroPercentage(value, target);
                const isBalanced = value >= target * 0.8 && value <= target * 1.2;

                return (
                  <div key={key} className="p-3 bg-gray-50 rounded-lg">
                    <p className="flex items-center gap-2 font-semibold text-sm">
                      <span className="text-2xl">{icon}</span>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </p>
                    <p className="text-lg font-bold text-gray-800">
                      {Math.round(value)}/{target}{key === "calories" ? "" : "g"}
                    </p>
                    <div className="bg-gray-300 rounded-full h-2 mt-2 overflow-hidden">
                      <motion.div
                        className={`h-full ${
                          isBalanced ? "bg-green-500" : "bg-orange-500"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(percent, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {isBalanced ? "✅ Perfect!" : percent < 80 ? "📉 Need more" : "📈 Too much"}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Score */}
            <Card className={`p-3 text-center mb-4 ${score === 100 ? "bg-green-100" : "bg-yellow-100"}`}>
              <p className="text-sm text-gray-600">Balance Score</p>
              <p className="text-3xl font-bold text-gray-800">{score}/100</p>
            </Card>
          </Card>

          {/* Selected Meal */}
          <Card className="p-4">
            <h3 className="font-bold text-lg mb-3">Your Meal</h3>
            {meal.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Click foods to add to your meal</p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto mb-3">
                {meal.map((food, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex items-center justify-between p-2 bg-blue-50 rounded"
                  >
                    <span className="text-sm font-semibold">{food.name}</span>
                    <Button
                      onClick={() => removeFood(idx)}
                      size="sm"
                      variant="destructive"
                      className="text-xs"
                    >
                      Remove
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}
            {meal.length > 0 && (
              <Button
                onClick={resetMeal}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              >
                Reset Meal
              </Button>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
