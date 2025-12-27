// Manga-style SVG artwork for different panels

export const MangaArtwork = {
  // Forest scene with fruits
  fruit_forest: () => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#87CEEB", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#E0F6FF", stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="treeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#228B22", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#32CD32", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Sky */}
      <rect width="200" height="200" fill="url(#skyGrad)" />
      
      {/* Sun */}
      <circle cx="170" cy="30" r="20" fill="#FFD700" />
      <line x1="170" y1="5" x2="170" y2="0" stroke="#FFD700" strokeWidth="2" />
      <line x1="170" y1="55" x2="170" y2="60" stroke="#FFD700" strokeWidth="2" />
      <line x1="145" y1="30" x2="140" y2="30" stroke="#FFD700" strokeWidth="2" />
      <line x1="195" y1="30" x2="200" y2="30" stroke="#FFD700" strokeWidth="2" />
      
      {/* Ground */}
      <rect y="140" width="200" height="60" fill="#90EE90" />
      
      {/* Tree trunk */}
      <rect x="80" y="80" width="40" height="60" fill="#8B4513" />
      
      {/* Tree foliage */}
      <circle cx="80" cy="60" r="35" fill="url(#treeGrad)" stroke="#000" strokeWidth="2" />
      <circle cx="120" cy="60" r="35" fill="url(#treeGrad)" stroke="#000" strokeWidth="2" />
      <circle cx="100" cy="30" r="40" fill="url(#treeGrad)" stroke="#000" strokeWidth="2" />
      
      {/* Apples */}
      <circle cx="70" cy="45" r="8" fill="#FF0000" stroke="#000" strokeWidth="1.5" />
      <circle cx="130" cy="50" r="8" fill="#FF6347" stroke="#000" strokeWidth="1.5" />
      <circle cx="100" cy="15" r="7" fill="#DC143C" stroke="#000" strokeWidth="1.5" />
      
      {/* Speed lines (manga effect) */}
      <line x1="30" y1="50" x2="10" y2="50" stroke="#000" strokeWidth="2" />
      <line x1="35" y1="65" x2="15" y2="65" stroke="#000" strokeWidth="2" />
      <line x1="32" y1="80" x2="12" y2="80" stroke="#000" strokeWidth="2" />
    </svg>
  ),

  // Apple character
  apple_character: () => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="appleBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#FF6B6B", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#FF0000", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Background glow */}
      <circle cx="100" cy="100" r="85" fill="#FFE5E5" />
      
      {/* Apple body */}
      <ellipse cx="100" cy="110" rx="50" ry="55" fill="url(#appleBg)" stroke="#000" strokeWidth="3" />
      <ellipse cx="75" cy="95" rx="35" ry="40" fill="#FF8888" stroke="#000" strokeWidth="2" />
      <ellipse cx="125" cy="95" rx="35" ry="40" fill="#DD0000" stroke="#000" strokeWidth="2" />
      
      {/* Stem */}
      <rect x="95" y="50" width="10" height="25" fill="#8B4513" stroke="#000" strokeWidth="1" />
      
      {/* Leaf */}
      <ellipse cx="115" cy="55" rx="15" ry="8" fill="#228B22" stroke="#000" strokeWidth="1" transform="rotate(-30 115 55)" />
      
      {/* Eyes */}
      <circle cx="85" cy="100" r="6" fill="#000" />
      <circle cx="115" cy="100" r="6" fill="#000" />
      <circle cx="87" cy="98" r="2" fill="#fff" />
      <circle cx="117" cy="98" r="2" fill="#fff" />
      
      {/* Smile */}
      <path d="M 85 120 Q 100 130 115 120" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
      
      {/* Sparkle effect */}
      <circle cx="140" cy="70" r="4" fill="#FFD700" />
      <circle cx="60" cy="140" r="3" fill="#FFD700" />
    </svg>
  ),

  // Orange character
  orange_character: () => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <radialGradient id="orangeGrad" cx="40%" cy="40%">
          <stop offset="0%" style={{ stopColor: "#FFA500", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#FF8C00", stopOpacity: 1 }} />
        </radialGradient>
      </defs>
      
      {/* Background */}
      <rect width="200" height="200" fill="#FFEBCD" />
      
      {/* Orange body */}
      <circle cx="100" cy="110" r="60" fill="url(#orangeGrad)" stroke="#000" strokeWidth="3" />
      
      {/* Orange segments (texture) */}
      <line x1="100" y1="50" x2="100" y2="170" stroke="#000" strokeWidth="1" opacity="0.3" />
      <line x1="60" y1="110" x2="140" y2="110" stroke="#000" strokeWidth="1" opacity="0.3" />
      <line x1="75" y1="65" x2="125" y2="155" stroke="#000" strokeWidth="1" opacity="0.3" />
      <line x1="125" y1="65" x2="75" y2="155" stroke="#000" strokeWidth="1" opacity="0.3" />
      
      {/* Leaf on top */}
      <ellipse cx="100" cy="45" rx="12" ry="20" fill="#228B22" stroke="#000" strokeWidth="2" transform="rotate(-20 100 45)" />
      
      {/* Eyes */}
      <circle cx="80" cy="100" r="7" fill="#000" />
      <circle cx="120" cy="100" r="7" fill="#000" />
      <circle cx="82" cy="97" r="2.5" fill="#fff" />
      <circle cx="122" cy="97" r="2.5" fill="#fff" />
      
      {/* Big smile */}
      <path d="M 75 125 Q 100 140 125 125" stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      
      {/* Blush marks */}
      <ellipse cx="50" cy="105" rx="8" ry="6" fill="#FFB6C1" opacity="0.7" />
      <ellipse cx="150" cy="105" rx="8" ry="6" fill="#FFB6C1" opacity="0.7" />
    </svg>
  ),

  // Character transformation panel
  character_happy: () => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <defs>
        <linearGradient id="skinTone" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#F4A460", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#E89860", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Background */}
      <circle cx="100" cy="100" r="95" fill="#FFE4B5" stroke="#000" strokeWidth="2" />
      
      {/* Head */}
      <circle cx="100" cy="70" r="35" fill="url(#skinTone)" stroke="#000" strokeWidth="2" />
      
      {/* Hair */}
      <path d="M 65 50 Q 65 20 100 20 Q 135 20 135 50" fill="#8B4513" stroke="#000" strokeWidth="2" />
      
      {/* Eyes wide and happy */}
      <ellipse cx="80" cy="65" rx="8" ry="12" fill="#000" stroke="#000" strokeWidth="1" />
      <ellipse cx="120" cy="65" rx="8" ry="12" fill="#000" stroke="#000" strokeWidth="1" />
      <ellipse cx="82" cy="62" rx="3" ry="5" fill="#fff" />
      <ellipse cx="122" cy="62" rx="3" ry="5" fill="#fff" />
      
      {/* Big happy smile */}
      <path d="M 80 85 Q 100 100 120 85" stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      
      {/* Body */}
      <ellipse cx="100" cy="140" rx="25" ry="35" fill="#FF6B9D" stroke="#000" strokeWidth="2" />
      
      {/* Arms */}
      <rect x="50" y="130" width="15" height="40" rx="7" fill="url(#skinTone)" stroke="#000" strokeWidth="1.5" />
      <rect x="135" y="130" width="15" height="40" rx="7" fill="url(#skinTone)" stroke="#000" strokeWidth="1.5" />
      
      {/* Heart effect */}
      <path d="M 160 50 L 165 45 L 170 50 L 170 60 Q 165 65 160 60 Q 155 65 150 60 L 150 50 L 155 45 Z" fill="#FFB6C1" stroke="#FF1493" strokeWidth="1" />
      <path d="M 40 50 L 45 45 L 50 50 L 50 60 Q 45 65 40 60 Q 35 65 30 60 L 30 50 L 35 45 Z" fill="#FFB6C1" stroke="#FF1493" strokeWidth="1" />
    </svg>
  ),

  // Nutrition/Power effect
  nutrition_power: () => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Aura/energy effect */}
      <circle cx="100" cy="100" r="85" fill="none" stroke="#FFD700" strokeWidth="3" opacity="0.6" />
      <circle cx="100" cy="100" r="70" fill="none" stroke="#FF6B00" strokeWidth="2" opacity="0.4" />
      <circle cx="100" cy="100" r="55" fill="none" stroke="#FFD700" strokeWidth="2" opacity="0.3" />
      
      {/* Center glow */}
      <circle cx="100" cy="100" r="40" fill="#FFFF00" opacity="0.2" />
      
      {/* Lightning bolts (power effect) */}
      <path d="M 100 50 L 95 75 L 105 75 L 100 100 Z" fill="#FFD700" stroke="#FF8C00" strokeWidth="2" />
      <path d="M 150 85 L 140 100 L 155 105 L 145 120 Z" fill="#FFD700" stroke="#FF8C00" strokeWidth="2" />
      <path d="M 50 85 L 60 100 L 45 105 L 55 120 Z" fill="#FFD700" stroke="#FF8C00" strokeWidth="2" />
      
      {/* Stars */}
      <circle cx="130" cy="60" r="5" fill="#FFD700" />
      <circle cx="70" cy="60" r="5" fill="#FFD700" />
      <circle cx="150" cy="130" r="4" fill="#FFD700" />
      <circle cx="50" cy="130" r="4" fill="#FFD700" />
      
      {/* Center text effect area */}
      <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fill="#FF6B00" stroke="#000" strokeWidth="0.5" fontSize="32" fontWeight="bold">
        ⚡
      </text>
    </svg>
  ),

  // Battle scene
  battle_scene: () => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Background explosion effect */}
      <circle cx="100" cy="100" r="60" fill="#FFD700" opacity="0.6" />
      <circle cx="85" cy="85" r="50" fill="#FF8C00" opacity="0.7" />
      <circle cx="115" cy="115" r="45" fill="#FFA500" opacity="0.6" />
      
      {/* Explosion clouds */}
      <path d="M 50 80 Q 40 70 50 60 Q 60 65 70 60 Q 80 75 70 85 Q 60 90 50 80" fill="#FF6347" opacity="0.8" />
      <path d="M 130 80 Q 140 70 150 60 Q 160 65 170 60 Q 180 75 170 85 Q 160 90 150 80" fill="#FF6347" opacity="0.8" />
      
      {/* Action lines (manga effect) */}
      <line x1="30" y1="40" x2="10" y2="20" stroke="#000" strokeWidth="2" />
      <line x1="50" y1="30" x2="25" y2="10" stroke="#000" strokeWidth="2" />
      <line x1="170" y1="40" x2="190" y2="20" stroke="#000" strokeWidth="2" />
      <line x1="150" y1="30" x2="175" y2="10" stroke="#000" strokeWidth="2" />
      
      {/* Impact effect */}
      <g transform="translate(100, 100)">
        <polygon points="0,-30 8,-8 30,0 8,8 0,30 -8,8 -30,0 -8,-8" fill="#FFF" stroke="#000" strokeWidth="2" />
      </g>
    </svg>
  ),
};

interface MangaPanelArtProps {
  panelIndex: number;
  image: string;
}

export const MangaPanelArt: React.FC<MangaPanelArtProps> = ({ panelIndex, image }) => {
  // Map emoji to manga artwork
  const getArtwork = () => {
    if (image === "🌳" || image === "🌲") {
      return MangaArtwork.fruit_forest();
    } else if (image === "🍎") {
      return MangaArtwork.apple_character();
    } else if (image === "🍊") {
      return MangaArtwork.orange_character();
    } else if (image === "😋" || image === "😍" || image.includes("happy")) {
      return MangaArtwork.character_happy();
    } else if (image === "⚡" || image === "💪" || image === "🚀") {
      return MangaArtwork.nutrition_power();
    } else if (image === "⚔️" || image.includes("battle")) {
      return MangaArtwork.battle_scene();
    }
    
    // Fallback to simple emoji with manga frame
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <rect width="200" height="200" fill="#FFF9E6" stroke="#000" strokeWidth="2" rx="10" />
        <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fontSize="80">
          {image}
        </text>
      </svg>
    );
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-white rounded-lg overflow-hidden">
      {getArtwork()}
    </div>
  );
};
