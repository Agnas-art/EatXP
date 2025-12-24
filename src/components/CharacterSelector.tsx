import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { ANIME_CHARACTERS } from "../data/animeCharacters";
import Character3D from "./Character3D"; // Character3D is a default export
import { Users } from "lucide-react";

interface CharacterSelectorProps {
  onSelect?: () => void;
}

export const CharacterSelector = ({ onSelect }: CharacterSelectorProps) => {
  const { user, setUserCharacter } = useAuth();
  const currentCharacterId = user?.characterId || "tanjiro";

  const handleCharacterChange = (characterId: string) => {
    setUserCharacter(characterId);
    onSelect?.();
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="font-display text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Users className="w-8 h-8 text-primary" />
          Choose Your Anime Character
        </h2>
        <p className="text-muted-foreground">
          Select your favorite character to display throughout the app!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Object.entries(ANIME_CHARACTERS).map(([characterId, character]) => (
          <motion.div
            key={characterId}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCharacterChange(characterId)}
            className={`cursor-pointer relative overflow-hidden rounded-2xl p-4 transition-all ${
              currentCharacterId === characterId
                ? "ring-2 ring-primary shadow-lg scale-105"
                : "shadow hover:shadow-md"
            }`}
            style={{
              backgroundColor: "hsl(var(--card))",
              border: `3px solid ${character.color}`,
            }}
          >
            {/* Anime Character Image */}
            <div className="mb-4 flex justify-center">
              <div style={{ width: "120px", height: "150px", overflow: "hidden", borderRadius: "8px" }}>
                {character.imageUrl ? (
                  <img 
                    src={character.imageUrl} 
                    alt={character.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center"
                    }}
                    onError={(e) => {
                      // Fallback if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.backgroundColor = character.color;
                      target.style.display = "none";
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: character.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "48px"
                    }}
                  >
                    {character.emoji}
                  </div>
                )}
              </div>
            </div>

            {/* Character Info */}
            <div className="relative z-10 space-y-2 text-center">
              <p className="font-display font-bold text-foreground text-sm line-clamp-1">
                {character.name}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-1">{character.anime}</p>
              <p className="text-xs text-muted-foreground">{character.emoji}</p>

              {currentCharacterId === characterId && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1"
                >
                  <span className="text-xs font-bold">✓</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Character Details */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 p-6 rounded-2xl bg-card border border-border space-y-4"
      >
        {ANIME_CHARACTERS[currentCharacterId] && (
          <div>
            <div className="flex items-start gap-4">
              <div style={{ width: "120px", height: "120px", flexShrink: 0 }}>
                <Character3D
                  character={ANIME_CHARACTERS[currentCharacterId]}
                  size="small"
                  autoRotate={true}
                />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Selected Character</p>
                  <p className="text-2xl font-bold text-foreground">
                    {ANIME_CHARACTERS[currentCharacterId].name}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {ANIME_CHARACTERS[currentCharacterId].anime}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Personality</p>
                  <p className="text-sm text-foreground">
                    {ANIME_CHARACTERS[currentCharacterId].personality}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Description</p>
                  <p className="text-sm text-foreground">
                    {ANIME_CHARACTERS[currentCharacterId].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
