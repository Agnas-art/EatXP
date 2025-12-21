// Anime character data with 3D model references
export interface AnimeCharacter {
  id: string;
  name: string;
  description: string;
  anime: string;
  personality: string;
  color: string;
  emoji: string;
  modelUrl?: string;
  position?: { x: number; y: number; z: number };
}

export const ANIME_CHARACTERS: Record<string, AnimeCharacter> = {
  naruto: {
    id: "naruto",
    name: "Naruto Uzumaki",
    description: "Energetic ninja with orange power",
    anime: "Naruto",
    personality: "Determined, Cheerful, Optimistic",
    color: "#FF6B35",
    emoji: "🧡",
    position: { x: 0, y: 0, z: 0 },
  },
  tanjiro: {
    id: "tanjiro",
    name: "Tanjiro Kamado",
    description: "Demon slayer with passionate heart",
    anime: "Demon Slayer",
    personality: "Compassionate, Strong-willed, Brave",
    color: "#C41E3A",
    emoji: "❤️",
    position: { x: 0, y: 0, z: 0 },
  },
  deku: {
    id: "deku",
    name: "Izuku Midoriya",
    description: "Hero-in-training with endless potential",
    anime: "My Hero Academia",
    personality: "Determined, Kind, Analytical",
    color: "#D81828",
    emoji: "💪",
    position: { x: 0, y: 0, z: 0 },
  },
  eren: {
    id: "eren",
    name: "Eren Yeager",
    description: "Tactical fighter with tactical mind",
    anime: "Attack on Titan",
    personality: "Strategic, Brave, Determined",
    color: "#2D5016",
    emoji: "⚔️",
    position: { x: 0, y: 0, z: 0 },
  },
  yuji: {
    id: "yuji",
    name: "Yuji Itadori",
    description: "Sorcerer with mystical powers",
    anime: "Jujutsu Kaisen",
    personality: "Confident, Powerful, Determined",
    color: "#8B3A8B",
    emoji: "✨",
    position: { x: 0, y: 0, z: 0 },
  },
  goku: {
    id: "goku",
    name: "Goku",
    description: "Adventure-seeking warrior with legendary strength",
    anime: "Dragon Ball",
    personality: "Adventurous, Strong, Playful",
    color: "#FF6600",
    emoji: "⚡",
    position: { x: 0, y: 0, z: 0 },
  },
  luffy: {
    id: "luffy",
    name: "Luffy",
    description: "Pirate captain with big dreams",
    anime: "One Piece",
    personality: "Adventurous, Loyal, Courageous",
    color: "#FF0000",
    emoji: "🏴‍☠️",
    position: { x: 0, y: 0, z: 0 },
  },
  kaneki: {
    id: "kaneki",
    name: "Ken Kaneki",
    description: "Urban fighter with dark aesthetic",
    anime: "Tokyo Ghoul",
    personality: "Strong, Mysterious, Determined",
    color: "#660000",
    emoji: "🌙",
    position: { x: 0, y: 0, z: 0 },
  },
};

export const DEFAULT_CHARACTER = ANIME_CHARACTERS.naruto;
