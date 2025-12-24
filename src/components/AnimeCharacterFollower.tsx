import { useEffect, useRef, useState } from "react";
import { ANIME_CHARACTERS } from "@/data/animeCharacters";
import Character3D from "./Character3D";
import { motion } from "framer-motion";

interface AnimeCharacterFollowerProps {
  characterId?: string;
  enabled?: boolean;
}

export function AnimeCharacterFollower({
  characterId = "tanjiro",
  enabled = true,
}: AnimeCharacterFollowerProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const followerRef = useRef<HTMLDivElement>(null);
  const character = ANIME_CHARACTERS[characterId] || ANIME_CHARACTERS.tanjiro;

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Show follower when moving, hide after inactivity
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    // Hide when mouse stops moving
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(hideTimer);
    };
  }, [enabled, isVisible]);

  if (!enabled) return null;

  return (
    <motion.div
      ref={followerRef}
      className="fixed pointer-events-none z-20 hidden lg:block"
      animate={{
        x: mousePos.x - 60,
        y: mousePos.y - 60,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: "tween",
        duration: 0.1,
        ease: "easeOut",
      }}
    >
      {/* 3D Character Container */}
      <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-white drop-shadow-xl"
        style={{ borderColor: character.color }}>
        <Character3D
          character={character}
          size="small"
          autoRotate={true}
        />

        {/* Character name tooltip */}
        <div
          className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full text-white text-xs font-semibold shadow-lg pointer-events-none"
          style={{ backgroundColor: character.color }}
        >
          {character.name}
        </div>

        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full opacity-30 animate-pulse"
          style={{ backgroundColor: character.color }}
        />
      </div>
    </motion.div>
  );
}

export default AnimeCharacterFollower;
