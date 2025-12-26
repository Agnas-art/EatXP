// Anime character data with real character images
export interface AnimeCharacter {
  id: string;
  name: string;
  description: string;
  anime: string;
  personality: string;
  color: string;
  emoji: string;
  imageUrl?: string; // Real anime character image
  modelUrl?: string;
  position?: { x: number; y: number; z: number };
}

export const ANIME_CHARACTERS: Record<string, AnimeCharacter> = {
  tanjiro: {
    id: "tanjiro",
    name: "Tanjiro Kamado",
    description: "Demon slayer with passionate heart",
    anime: "Demon Slayer",
    personality: "Compassionate, Strong-willed, Brave",
    imageUrl: "https://th.bing.com/th/id/OIP.77HZbV1ATaLoFRz0zQdeeAHaEK?w=331&h=186&c=7&r=0&o=7&cb=ucfimg2&dpr=2.2&pid=1.7&rm=3&ucfimg=1",
  },
  deku: {
    id: "deku",
    name: "Izuku Midoriya",
    description: "Hero-in-training with endless potential",
    anime: "My Hero Academia",
    personality: "Determined, Kind, Analytical",
    color: "#D81828",
    emoji: "💪",
    imageUrl: "https://wallpaperaccess.com/full/1082853.jpg",
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
    imageUrl: "https://th.bing.com/th/id/OIP.6sINk4Z-yOK480J6XO1AswHaDt?w=323&h=175&c=7&r=0&o=7&cb=ucfimg2&dpr=2.2&pid=1.7&rm=3&ucfimg=1",
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
    imageUrl: "https://th.bing.com/th/id/OIP.J3nL3QT6QkfLqhzH-Rw26QHaHZ?w=207&h=206&c=7&r=0&o=7&cb=ucfimg2&dpr=2.2&pid=1.7&rm=3&ucfimg=1",
    position: { x: 0, y: 0, z: 0 },
  },
  ninrir: {
    id: "ninrir",
    name: "Ninrir",
    description: "Outdoor chef with campfire mastery",
    anime: "Campfire Cooking in Another World with My Portable Oven",
    personality: "Adventurous, Warm-hearted, Creative",
    color: "#D2691E",
    emoji: "🔥",
    imageUrl: "https://th.bing.com/th/id/OIP.W_MdzuxjRECUf1pClsh-TgAAAA?w=167&h=180&c=7&r=0&o=7&dpr=2.2&pid=1.7&rm=3",
    position: { x: 0, y: 0, z: 0 },
  },
  yor: {
    id: "yor",
    name: "Yor Forger",
    description: "Elegant assassin with a caring heart",
    anime: "Spy x Family",
    personality: "Compassionate, Graceful, Protective",
    color: "#E91E63",
    emoji: "💜",
    imageUrl: "https://th.bing.com/th/id/OIP.UOnDSCZ_Oj73B82YryVsxAHaE8?w=265&h=180&c=7&r=0&o=7&dpr=2.2&pid=1.7&rm=3",
    position: { x: 0, y: 0, z: 0 },
  },
};

export const DEFAULT_CHARACTER = ANIME_CHARACTERS.tanjiro;
