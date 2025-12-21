export interface AnimeTheme {
  name: string;
  id: string;
  description: string;
  category: string; // e.g., "action", "supernatural", "adventure", "dark"
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    card: string;
    muted: string;
  };
  gradients: {
    main: string;
    accent: string;
  };
  shadow: string;
  // New anime-specific elements
  borderStyle: "solid" | "dashed" | "double" | "rounded" | "sharp";
  patterns: {
    background?: string;
    overlay?: string;
  };
  effects: {
    glow?: boolean;
    glitch?: boolean;
    blur?: boolean;
  };
  typography: {
    fontFamily?: string;
    textEffect?: "shadow" | "outline" | "none";
  };
}

export const ANIME_THEMES: Record<string, AnimeTheme> = {
  naruto: {
    name: "Naruto",
    id: "naruto",
    category: "action",
    description: "Vibrant orange and blue with ninja energy",
    colors: {
      primary: "12 85% 55%", // Orange
      secondary: "200 85% 50%", // Blue
      accent: "50 95% 60%", // Yellow
      background: "35 100% 98%",
      foreground: "25 30% 20%",
      card: "0 0% 100%",
      muted: "35 30% 92%",
    },
    gradients: {
      main: "linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)",
      accent: "linear-gradient(135deg, #004E89 0%, #0081CF 100%)",
    },
    shadow: "0 8px 30px -5px rgba(255, 107, 53, 0.3)",
    borderStyle: "rounded",
    patterns: {
      background: "radial-gradient(circle at 20% 50%, rgba(255, 107, 53, 0.1) 0%, transparent 50%)",
      overlay: "none",
    },
    effects: {
      glow: true,
      glitch: false,
      blur: false,
    },
    typography: {
      fontFamily: "'Segoe UI', sans-serif",
      textEffect: "shadow",
    },
  },
  demonSlayer: {
    name: "Demon Slayer",
    id: "demonSlayer",
    category: "dark",
    description: "Deep reds and blacks with dark fantasy vibes",
    colors: {
      primary: "0 80% 55%", // Deep Red
      secondary: "260 70% 45%", // Purple
      accent: "40 95% 65%", // Golden
      background: "35 100% 98%",
      foreground: "25 30% 20%",
      card: "0 0% 100%",
      muted: "35 30% 92%",
    },
    gradients: {
      main: "linear-gradient(135deg, #C41E3A 0%, #8B0000 100%)",
      accent: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    },
    shadow: "0 8px 30px -5px rgba(196, 30, 58, 0.3)",
    borderStyle: "sharp",
    patterns: {
      background: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(196, 30, 58, 0.05) 2px, rgba(196, 30, 58, 0.05) 4px)",
      overlay: "rgba(0, 0, 0, 0.03)",
    },
    effects: {
      glow: false,
      glitch: true,
      blur: false,
    },
    typography: {
      fontFamily: "'Segoe UI', sans-serif",
      textEffect: "outline",
    },
  },
  myHeroAcademia: {
    name: "My Hero Academia",
    id: "myHeroAcademia",
    category: "action",
    description: "Energetic red, white and hero vibes",
    colors: {
      primary: "354 100% 50%", // Hero Red
      secondary: "200 90% 50%", // Sky Blue
      accent: "45 100% 55%", // Gold
      background: "35 100% 98%",
      foreground: "25 30% 20%",
      card: "0 0% 100%",
      muted: "35 30% 92%",
    },
    gradients: {
      main: "linear-gradient(135deg, #D81828 0%, #FF0000 100%)",
      accent: "linear-gradient(135deg, #00A8FF 0%, #0080FF 100%)",
    },
    shadow: "0 8px 30px -5px rgba(216, 24, 40, 0.3)",
    borderStyle: "solid",
    patterns: {
      background: "linear-gradient(90deg, rgba(216, 24, 40, 0.05) 1px, transparent 1px), linear-gradient(rgba(216, 24, 40, 0.05) 1px, transparent 1px)",
      overlay: "none",
    },
    effects: {
      glow: true,
      glitch: false,
      blur: false,
    },
    typography: {
      fontFamily: "'Arial', sans-serif",
      textEffect: "shadow",
    },
  },
  attackOnTitan: {
    name: "Attack on Titan",
    id: "attackOnTitan",
    category: "dark",
    description: "Dark grays, greens, and tactical themes",
    colors: {
      primary: "120 40% 40%", // Dark Green
      secondary: "30 30% 40%", // Brown
      accent: "50 90% 60%", // Bright Gold
      background: "35 100% 98%",
      foreground: "25 30% 20%",
      card: "0 0% 100%",
      muted: "35 30% 92%",
    },
    gradients: {
      main: "linear-gradient(135deg, #2D5016 0%, #4A7023 100%)",
      accent: "linear-gradient(135deg, #3A3A3A 0%, #5A5A5A 100%)",
    },
    shadow: "0 8px 30px -5px rgba(45, 80, 22, 0.3)",
    borderStyle: "double",
    patterns: {
      background: "repeating-conic-gradient(from 45deg at 20% 50%, transparent 0deg 90deg, rgba(45, 80, 22, 0.05) 90deg 180deg)",
      overlay: "rgba(0, 0, 0, 0.02)",
    },
    effects: {
      glow: false,
      glitch: false,
      blur: false,
    },
    typography: {
      fontFamily: "'Courier New', monospace",
      textEffect: "none",
    },
  },
  jujutsuKaisen: {
    name: "Jujutsu Kaisen",
    id: "jujutsuKaisen",
    category: "supernatural",
    description: "Mystical purple and pink with supernatural feel",
    colors: {
      primary: "270 70% 45%", // Deep Purple
      secondary: "340 85% 55%", // Magenta
      accent: "50 95% 65%", // Bright Yellow
      background: "35 100% 98%",
      foreground: "25 30% 20%",
      card: "0 0% 100%",
      muted: "35 30% 92%",
    },
    gradients: {
      main: "linear-gradient(135deg, #8B3A8B 0%, #C946EF 100%)",
      accent: "linear-gradient(135deg, #1a0033 0%, #2d004d 100%)",
    },
    shadow: "0 8px 30px -5px rgba(201, 70, 239, 0.3)",
    borderStyle: "dashed",
    patterns: {
      background: "repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(201, 70, 239, 0.08) 35px, rgba(201, 70, 239, 0.08) 70px)",
      overlay: "radial-gradient(circle at 50% 50%, rgba(201, 70, 239, 0.05) 0%, transparent 70%)",
    },
    effects: {
      glow: true,
      glitch: true,
      blur: false,
    },
    typography: {
      fontFamily: "'Georgia', serif",
      textEffect: "shadow",
    },
  },
  dragonBall: {
    name: "Dragon Ball",
    id: "dragonBall",
    category: "adventure",
    description: "Bright orange, blue with classic adventure feel",
    colors: {
      primary: "25 95% 55%", // Orange
      secondary: "200 100% 50%", // Blue
      accent: "60 100% 50%", // Lime Green
      background: "35 100% 98%",
      foreground: "25 30% 20%",
      card: "0 0% 100%",
      muted: "35 30% 92%",
    },
    gradients: {
      main: "linear-gradient(135deg, #FF6600 0%, #FFAA00 100%)",
      accent: "linear-gradient(135deg, #0066FF 0%, #00CCFF 100%)",
    },
    shadow: "0 8px 30px -5px rgba(255, 102, 0, 0.3)",
    borderStyle: "rounded",
    patterns: {
      background: "radial-gradient(circle at 30% 30%, rgba(255, 102, 0, 0.12) 0%, transparent 40%), radial-gradient(circle at 70% 70%, rgba(0, 102, 255, 0.12) 0%, transparent 40%)",
      overlay: "none",
    },
    effects: {
      glow: true,
      glitch: false,
      blur: false,
    },
    typography: {
      fontFamily: "'Comic Sans MS', cursive",
      textEffect: "shadow",
    },
  },
  onepiece: {
    name: "One Piece",
    id: "onepiece",
    category: "adventure",
    description: "Bold reds and blues with pirate adventure energy",
    colors: {
      primary: "0 100% 55%", // Bright Red
      secondary: "210 100% 50%", // Navy Blue
      accent: "50 100% 50%", // Bright Yellow
      background: "35 100% 98%",
      foreground: "25 30% 20%",
      card: "0 0% 100%",
      muted: "35 30% 92%",
    },
    gradients: {
      main: "linear-gradient(135deg, #FF0000 0%, #FF4444 100%)",
      accent: "linear-gradient(135deg, #0033AA 0%, #004488 100%)",
    },
    shadow: "0 8px 30px -5px rgba(255, 0, 0, 0.3)",
    borderStyle: "solid",
    patterns: {
      background: "repeating-linear-gradient(45deg, #FFFAF0 0px, #FFFAF0 10px, rgba(255, 0, 0, 0.08) 10px, rgba(255, 0, 0, 0.08) 20px)",
      overlay: "none",
    },
    effects: {
      glow: false,
      glitch: false,
      blur: false,
    },
    typography: {
      fontFamily: "'Arial Black', sans-serif",
      textEffect: "shadow",
    },
  },
  tokyoGhoul: {
    name: "Tokyo Ghoul",
    id: "tokyoGhoul",
    category: "dark",
    description: "Dark reds and blacks with dark urban aesthetic",
    colors: {
      primary: "0 90% 35%", // Dark Red
      secondary: "0 0% 20%", // Black
      accent: "0 100% 50%", // Bright Red
      background: "35 100% 98%",
      foreground: "25 30% 20%",
      card: "0 0% 100%",
      muted: "35 30% 92%",
    },
    gradients: {
      main: "linear-gradient(135deg, #660000 0%, #990000 100%)",
      accent: "linear-gradient(135deg, #1a1a1a 0%, #333333 100%)",
    },
    shadow: "0 8px 30px -5px rgba(102, 0, 0, 0.3)",
    borderStyle: "sharp",
    patterns: {
      background: "repeating-linear-gradient(0deg, rgba(102, 0, 0, 0.08) 0px, rgba(102, 0, 0, 0.08) 2px, transparent 2px, transparent 4px)",
      overlay: "rgba(0, 0, 0, 0.08)",
    },
    effects: {
      glow: false,
      glitch: true,
      blur: true,
    },
    typography: {
      fontFamily: "'Impact', sans-serif",
      textEffect: "outline",
    },
  },
};

export const DEFAULT_THEME = ANIME_THEMES.naruto;
