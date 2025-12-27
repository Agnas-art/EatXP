import { motion } from "framer-motion";
import { Clock, ChefHat, Star, Users, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePreferences } from "@/context/PreferencesContext";

interface RecipeCardProps {
  title: string;
  i18nKey?: string;
  emoji: string;
  time: string;
  difficulty: "easy" | "medium" | "challenging";
  servings: number;
  ageGroup: string;
  image?: string;
  ingredients?: string[];
  onClick?: () => void;
}

const difficultyConfig = (t: any) => ({
  easy: { label: t("recipes_section.difficulty_easy"), stars: 1, color: "text-secondary" },
  medium: { label: t("recipes_section.difficulty_medium"), stars: 2, color: "text-kawaii-yellow" },
  challenging: { label: t("recipes_section.difficulty_hard"), stars: 3, color: "text-primary" },
});

const RecipeCard = ({
  title,
  i18nKey,
  emoji,
  time,
  difficulty,
  servings,
  ageGroup,
  ingredients = [],
  onClick,
}: RecipeCardProps) => {
  const { t } = useTranslation();
  const { canEat } = usePreferences();
  const config = difficultyConfig(t)[difficulty];
  
  const canEatRecipe = canEat(ingredients);
  const displayTitle = i18nKey ? t(i18nKey) : title;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`bg-card rounded-3xl shadow-card overflow-hidden cursor-pointer ${
        !canEatRecipe ? "opacity-60 relative" : ""
      }`}
    >
      {/* Allergen Badge */}
      {!canEatRecipe && (
        <div className="absolute top-2 left-2 bg-red-500 text-white rounded-full p-1 z-10">
          <AlertCircle className="w-4 h-4" />
        </div>
      )}

      <div className="bg-gradient-to-br from-kawaii-yellow/40 to-primary/30 p-6 flex items-center justify-center relative">
        <motion.span
          className="text-6xl"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {emoji}
        </motion.span>
        <span className="absolute top-2 right-2 text-xs bg-card/90 backdrop-blur px-2 py-1 rounded-full font-semibold text-foreground">
          {ageGroup}
        </span>
      </div>
      
      <div className="p-4 space-y-3">
        <h4 className="font-display font-bold text-lg text-foreground leading-tight">
          {displayTitle}
        </h4>
        
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{servings}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < config.stars
                    ? `${config.color} fill-current`
                    : "text-muted"
                }`}
              />
            ))}
          </div>
          <span className={`text-xs font-semibold ${config.color}`}>
            {config.label}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;