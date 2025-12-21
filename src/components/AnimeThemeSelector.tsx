import { motion } from "framer-motion";
import { useThemeStore } from "@/hooks/useThemeStore";
import { ANIME_THEMES } from "@/data/animeThemes";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface ThemeSelectorProps {
  onSelect?: () => void;
}

export const AnimeThemeSelector = ({ onSelect }: ThemeSelectorProps) => {
  const { currentTheme, setTheme } = useThemeStore();

  const handleThemeChange = (themeId: string) => {
    setTheme(themeId);
    onSelect?.();
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          Choose Your Anime Theme
        </h2>
        <p className="text-muted-foreground">
          Pick your favorite anime aesthetic to personalize your learning experience!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries(ANIME_THEMES).map(([themeId, theme]) => (
          <motion.button
            key={themeId}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleThemeChange(themeId)}
            className={`relative overflow-hidden rounded-2xl p-4 transition-all ${
              currentTheme.id === themeId
                ? "ring-2 ring-primary shadow-lg scale-105"
                : "shadow hover:shadow-md"
            }`}
            style={{
              backgroundColor: `hsl(${theme.colors.background})`,
              border: `2px solid hsl(${theme.colors.primary})`,
            }}
          >
            {/* Theme preview gradient */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: theme.gradients.main,
              }}
            />

            {/* Content */}
            <div className="relative z-10 space-y-2">
              <div className="flex gap-1 mb-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: `hsl(${theme.colors.primary})` }}
                />
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: `hsl(${theme.colors.secondary})` }}
                />
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: `hsl(${theme.colors.accent})` }}
                />
              </div>

              <p className="font-display font-bold text-foreground text-sm line-clamp-1">
                {theme.name}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {theme.description}
              </p>

              {currentTheme.id === themeId && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1"
                >
                  <span className="text-xs font-bold">✓</span>
                </motion.div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Current theme info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 p-6 rounded-2xl bg-card border border-border space-y-4"
      >
        <div>
          <p className="text-sm text-muted-foreground">
            Current Theme: <span className="font-bold text-foreground text-lg">{currentTheme.name}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">{currentTheme.description}</p>
          <div className="mt-2 inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
            {currentTheme.category}
          </div>
        </div>

        {/* Theme features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Border Style</p>
            <p className="text-sm font-bold text-foreground capitalize">{currentTheme.borderStyle}</p>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Effects</p>
            <p className="text-sm">
              {[
                currentTheme.effects.glow && "✨ Glow",
                currentTheme.effects.glitch && "⚡ Glitch",
                currentTheme.effects.blur && "🌫️ Blur",
              ]
                .filter(Boolean)
                .join(", ") || "None"}
            </p>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Text Effect</p>
            <p className="text-sm font-bold text-foreground capitalize">{currentTheme.typography.textEffect}</p>
          </div>
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-xs font-semibold text-muted-foreground mb-1">Font</p>
            <p className="text-sm font-bold text-foreground">{currentTheme.typography.fontFamily?.split(",")[0]}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
