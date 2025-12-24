import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ANIME_CHARACTERS } from "@/data/animeCharacters";
import { useThemeStore } from "@/hooks/useThemeStore";

interface AnimeCharacterBackgroundProps {
  characterId?: string;
  opacity?: number;
  scale?: number;
  position?: "left" | "center" | "right";
  animate?: boolean;
}

export const AnimeCharacterBackground = ({
  characterId = "tanjiro",
  opacity = 0.3,
  scale = 1.2,
  position = "right",
  animate = true,
}: AnimeCharacterBackgroundProps) => {
  const [character, setCharacter] = useState(ANIME_CHARACTERS[characterId] || ANIME_CHARACTERS.tanjiro);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { currentTheme } = useThemeStore();

  useEffect(() => {
    if (characterId && ANIME_CHARACTERS[characterId]) {
      setCharacter(ANIME_CHARACTERS[characterId]);
      setImageLoaded(false);
    }
  }, [characterId]);

  if (!character.imageUrl) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 bottom-0 left-0 right-0 pointer-events-none overflow-hidden`}
      style={{
        zIndex: 1,
        width: "100vw",
        height: "100vh",
        background: `linear-gradient(135deg, ${character.color}20 0%, ${character.color}40 50%, transparent 100%)`,
      }}
    >
      {/* Animated character image */}
      {character.imageUrl && (
        <motion.img
          src={character.imageUrl}
          alt={character.name}
          animate={
            animate
              ? { y: [0, -15, 0] }
              : {}
          }
          transition={
            animate
              ? { duration: 6, repeat: Infinity, repeatType: "loop" as const }
              : {}
          }
          className="w-full h-full object-cover object-bottom"
          style={{
            opacity: imageLoaded ? opacity : 0,
            filter: `drop-shadow(0 10px 30px hsla(${currentTheme.colors.primary}, 0.4))`,
            transform: `scale(${scale})`,
            transformOrigin: "bottom center",
          }}
          loading="eager"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            console.error(`Failed to load image for ${character.name}:`, character.imageUrl, e);
            setImageLoaded(false);
          }}
        />
      )}

      {/* Gradient fade overlay - ensures content is readable */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to left, 
            ${`hsla(${currentTheme.colors.background}, 1)`} 0%,
            ${`hsla(${currentTheme.colors.background}, 0.8)`} 30%,
            ${`hsla(${currentTheme.colors.background}, 0.5)`} 60%,
            transparent 100%)`,
          pointerEvents: "none",
        }}
      />
    </motion.div>
  );
};

export default AnimeCharacterBackground;
