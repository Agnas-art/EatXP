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
  naruto: {
    id: "naruto",
    name: "Naruto Uzumaki",
    description: "Energetic ninja with orange power",
    anime: "Naruto",
    personality: "Determined, Cheerful, Optimistic",
    color: "#FF6B35",
    emoji: "🧡",
    imageUrl: "https://i.pinimg.com/originals/6c/78/71/6c7871cd43b91e4adfdef74e6c05b3e2.jpg",
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
    imageUrl: "https://cdnb.artstation.com/p/assets/images/images/028/206/797/large/saran-sombat-tanjiro-complete.jpg",
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
    imageUrl: "https://cdnb.artstation.com/p/assets/images/images/019/709/799/large/noctis-cr-izuku.jpg",
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
    imageUrl: "https://cdnb.artstation.com/p/assets/images/images/003/805/822/large/megan-de-jong-eren.jpg",
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
    imageUrl: "https://cdnb.artstation.com/p/assets/images/images/031/739/847/large/rho-aias-yuji-itadori-jjk.jpg",
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
    imageUrl: "https://cdnb.artstation.com/p/assets/images/images/008/631/476/large/sebastian-fischer-goku-01.jpg",
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
    imageUrl: "https://cdnb.artstation.com/p/assets/images/images/009/155/625/large/kimberly-chang-luffy-01-final.jpg",
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
    imageUrl: "https://cdnb.artstation.com/p/assets/images/images/003/701/618/large/ian-wong-kaneki-01.jpg",
    position: { x: 0, y: 0, z: 0 },
  },
  howl: {
    id: "howl",
    name: "Howl Jenkins Pendragon",
    description: "Charming wizard with mystical powers",
    anime: "Howl's Moving Castle",
    personality: "Charismatic, Vain, Protective",
    color: "#FFD700",
    emoji: "✨",
    imageUrl: "https://cdnb.artstation.com/p/assets/images/images/018/256/397/large/marie-cecile-thijs-howl-s-moving-castle-howl.jpg",
    position: { x: 0, y: 0, z: 0 },
  },
};

export const DEFAULT_CHARACTER = ANIME_CHARACTERS.naruto;
