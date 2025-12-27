import { motion } from "framer-motion";
import { Heart, Star, Clock, AlertCircle } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";

interface FoodCardProps {
  name: string;
  emoji: string;
  category: string;
  benefits: string[];
  funFact?: string;
  color: string;
  onClick?: () => void;
}

const FoodCard = ({ name, emoji, category, benefits, funFact, color, onClick }: FoodCardProps) => {
  const { canEatFood } = usePreferences();
  const canEat = canEatFood(name);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`bg-card rounded-3xl shadow-card overflow-hidden cursor-pointer ${
        !canEat ? "opacity-60 relative" : ""
      }`}
    >
      {/* Allergen Badge */}
      {!canEat && (
        <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 z-10">
          <AlertCircle className="w-4 h-4" />
        </div>
      )}

      <div className={`${color} p-4 flex items-center justify-center`}>
        <motion.span
          className="text-5xl"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {emoji}
        </motion.span>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-display font-bold text-foreground">{name}</h4>
          <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded-full font-semibold">
            {category}
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          {benefits.slice(0, 2).map((benefit, i) => (
            <span
              key={i}
              className="text-xs bg-kawaii-mint/30 text-foreground px-2 py-0.5 rounded-full"
            >
              {benefit}
            </span>
          ))}
        </div>
        {funFact && (
          <p className="text-xs text-muted-foreground italic">
            💡 {funFact}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default FoodCard;