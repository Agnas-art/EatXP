// Professional manga-style SVG artwork with authentic comic styling

import React from "react";

const FruitForest = () => (
  <svg viewBox="0 0 300 300" className="w-full h-full">
    <defs>
      <pattern id="leafPattern" patternUnits="userSpaceOnUse" width="20" height="20">
        <path d="M 5 0 Q 10 5 15 10 Q 10 15 5 20 Q 0 15 5 10 Z" fill="#1a8f1a" opacity="0.3" />
      </pattern>
    </defs>
      
      {/* Sky gradient */}
      <rect width="300" height="180" fill="#6BA3D0" />
      
      {/* Ground */}
      <rect y="180" width="300" height="120" fill="#7CB342" />
      
      {/* Far trees (background detail) */}
      <ellipse cx="50" cy="120" rx="40" ry="50" fill="#2E7D32" opacity="0.6" />
      <ellipse cx="250" cy="130" rx="45" ry="55" fill="#2E7D32" opacity="0.6" />
      
      {/* Main tree trunks */}
      <rect x="80" y="110" width="35" height="120" fill="#5D4037" stroke="#000" strokeWidth="2" />
      <rect x="185" y="100" width="35" height="130" fill="#5D4037" stroke="#000" strokeWidth="2" />
      
      {/* Left tree foliage - layered for depth */}
      <path d="M 60 90 Q 75 50 97 60 Q 110 70 97 100 Q 75 110 60 90" fill="#388E3C" stroke="#1B5E20" strokeWidth="2" />
      <path d="M 70 120 Q 85 80 110 95 Q 120 110 100 140 Q 75 145 70 120" fill="#43A047" stroke="#1B5E20" strokeWidth="2" />
      
      {/* Right tree foliage */}
      <path d="M 165 85 Q 180 45 210 65 Q 225 80 210 120 Q 180 130 165 85" fill="#388E3C" stroke="#1B5E20" strokeWidth="2" />
      <path d="M 175 130 Q 195 90 225 110 Q 235 125 215 150 Q 185 150 175 130" fill="#43A047" stroke="#1B5E20" strokeWidth="2" />
      
      {/* Fruits on tree 1 */}
      <circle cx="85" cy="80" r="10" fill="#D32F2F" stroke="#000" strokeWidth="2" />
      <circle cx="105" cy="75" r="9" fill="#E53935" stroke="#000" strokeWidth="2" />
      <circle cx="90" cy="105" r="8" fill="#C62828" stroke="#000" strokeWidth="2" />
      
      {/* Fruits on tree 2 */}
      <circle cx="195" cy="85" r="10" fill="#D32F2F" stroke="#000" strokeWidth="2" />
      <circle cx="215" cy="92" r="9" fill="#E53935" stroke="#000" strokeWidth="2" />
      <circle cx="205" cy="115" r="8" fill="#C62828" stroke="#000" strokeWidth="2" />
      
      {/* Sun with manga rays */}
      <circle cx="250" cy="40" r="18" fill="#FFD54F" stroke="#000" strokeWidth="2" />
      <circle cx="250" cy="40" r="25" fill="none" stroke="#FFD54F" strokeWidth="1" opacity="0.4" />
      <line x1="250" y1="10" x2="250" y2="0" stroke="#FFD54F" strokeWidth="3" />
      <line x1="280" y1="40" x2="295" y2="40" stroke="#FFD54F" strokeWidth="3" />
      <line x1="270" y1="20" x2="280" y2="10" stroke="#FFD54F" strokeWidth="2.5" />
  </svg>
);

const AppleCharacter = () => (
  <svg viewBox="0 0 280 320" className="w-full h-full">
      <defs>
        <linearGradient id="appleShade" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#FF5555", stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: "#DD2222", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#BB0000", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Shine on apple body */}
      <ellipse cx="140" cy="140" rx="65" ry="70" fill="url(#appleShade)" stroke="#000" strokeWidth="3" />
      <ellipse cx="120" cy="110" rx="25" ry="30" fill="#FF9999" stroke="none" opacity="0.5" />
      
      {/* Stem */}
      <rect x="130" y="50" width="20" height="50" fill="#6D4C41" stroke="#000" strokeWidth="2" />
      
      {/* Leaf - detailed manga style */}
      <ellipse cx="165" cy="70" rx="28" ry="15" fill="#4CAF50" stroke="#000" strokeWidth="2" transform="rotate(-35 165 70)" />
      <path d="M 145 75 Q 165 70 185 75" stroke="#2E7D32" strokeWidth="1" fill="none" />
      
      {/* Face - anime style */}
      {/* Left eye (large, expressive) */}
      <ellipse cx="105" cy="130" rx="16" ry="24" fill="#000" stroke="#000" strokeWidth="2" />
      <ellipse cx="108" cy="125" rx="8" ry="12" fill="#fff" />
      <circle cx="110" cy="130" r="4" fill="#4A90E2" />
      <circle cx="111" cy="128" r="2" fill="#fff" />
      
      {/* Right eye */}
      <ellipse cx="175" cy="130" rx="16" ry="24" fill="#000" stroke="#000" strokeWidth="2" />
      <ellipse cx="172" cy="125" rx="8" ry="12" fill="#fff" />
      <circle cx="170" cy="130" r="4" fill="#4A90E2" />
      <circle cx="169" cy="128" r="2" fill="#fff" />
      
      {/* Rosy cheeks - manga style */}
      <ellipse cx="70" cy="145" rx="15" ry="12" fill="#FFB6D9" opacity="0.7" />
      <ellipse cx="210" cy="145" rx="15" ry="12" fill="#FFB6D9" opacity="0.7" />
      
      {/* Happy smile */}
      <path d="M 105 165 Q 140 185 175 165" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 105 168 Q 140 180 175 168" stroke="#fff" strokeWidth="1" fill="none" opacity="0.5" />
      
      {/* Shine effects */}
      <circle cx="220" cy="100" r="8" fill="#FFE082" />
      <circle cx="60" cy="200" r="6" fill="#FFE082" opacity="0.6" />
  </svg>
);

const CharacterHappy = () => (
  <svg viewBox="0 0 280 360" className="w-full h-full">
      <defs>
        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#F7B563", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#E8A040", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Head */}
      <circle cx="140" cy="80" r="48" fill="url(#skinGrad)" stroke="#000" strokeWidth="3" />
      
      {/* Hair - dynamic manga style */}
      <path d="M 92 65 Q 75 50 75 30 Q 75 20 92 15 L 140 10 L 188 15 Q 205 20 205 30 Q 205 50 168 65 Z" fill="#2C1810" stroke="#000" strokeWidth="2.5" />
      
      {/* Hair shine */}
      <path d="M 110 30 Q 130 20 150 25" stroke="#3D2817" strokeWidth="2" fill="none" />
      
      {/* Eyes - large, expressive anime eyes */}
      <ellipse cx="110" cy="75" rx="14" ry="22" fill="#000" stroke="#000" strokeWidth="2" />
      <ellipse cx="170" cy="75" rx="14" ry="22" fill="#000" stroke="#000" strokeWidth="2" />
      
      {/* Eye shine */}
      <ellipse cx="113" cy="68" rx="7" ry="11" fill="#fff" />
      <ellipse cx="173" cy="68" rx="7" ry="11" fill="#fff" />
      
      {/* Pupils */}
      <circle cx="110" cy="80" r="5" fill="#8B4513" />
      <circle cx="170" cy="80" r="5" fill="#8B4513" />
      
      {/* Eyelashes - manga detail */}
      <line x1="95" y1="75" x2="85" y2="70" stroke="#000" strokeWidth="1.5" />
      <line x1="97" y1="82" x2="87" y2="85" stroke="#000" strokeWidth="1.5" />
      <line x1="185" y1="75" x2="195" y2="70" stroke="#000" strokeWidth="1.5" />
      <line x1="183" y1="82" x2="193" y2="85" stroke="#000" strokeWidth="1.5" />
      
      {/* Blush marks */}
      <ellipse cx="60" cy="95" rx="12" ry="10" fill="#FF89B0" opacity="0.6" />
      <ellipse cx="220" cy="95" rx="12" ry="10" fill="#FF89B0" opacity="0.6" />
      
      {/* Big excited smile */}
      <path d="M 100 105 Q 140 125 180 105" stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      
      {/* Open mouth shine */}
      <path d="M 105 110 Q 140 118 175 110" stroke="#fff" strokeWidth="1" fill="none" opacity="0.4" />
      
      {/* Neck */}
      <rect x="120" y="125" width="40" height="20" fill="url(#skinGrad)" stroke="#000" strokeWidth="2" />
      
      {/* Body - excited pose */}
      <ellipse cx="140" cy="210" rx="55" ry="65" fill="#FF6B9D" stroke="#000" strokeWidth="3" />
      
      {/* Arms - raised in celebration */}
      <g transform="translate(80, 180) rotate(-25)">
        <ellipse cx="0" cy="0" rx="18" ry="45" fill="url(#skinGrad)" stroke="#000" strokeWidth="2.5" />
        <circle cx="0" cy="-50" r="16" fill="url(#skinGrad)" stroke="#000" strokeWidth="2" />
      </g>
      
      <g transform="translate(200, 180) rotate(25)">
        <ellipse cx="0" cy="0" rx="18" ry="45" fill="url(#skinGrad)" stroke="#000" strokeWidth="2.5" />
        <circle cx="0" cy="-50" r="16" fill="url(#skinGrad)" stroke="#000" strokeWidth="2" />
      </g>
      
      {/* Heart effects around character */}
      <path d="M 40 60 L 43 57 L 46 60 L 46 68 Q 43 71 40 68 Q 37 71 34 68 L 34 60 L 37 57 Z" fill="#FFB6D9" stroke="#FF1493" strokeWidth="1" />
      <path d="M 240 80 L 243 77 L 246 80 L 246 88 Q 243 91 240 88 Q 237 91 234 88 L 234 80 L 237 77 Z" fill="#FFB6D9" stroke="#FF1493" strokeWidth="1" />
      <path d="M 260 150 L 263 147 L 266 150 L 266 158 Q 263 161 260 158 Q 257 161 254 158 L 254 150 L 257 147 Z" fill="#FFB6D9" stroke="#FF1493" strokeWidth="1" />
    </svg>
  );

const NutritionPower = () => (
  <svg viewBox="0 0 300 300" className="w-full h-full">
      {/* Energy aura rings */}
      <circle cx="150" cy="150" r="100" fill="none" stroke="#FFD700" strokeWidth="4" opacity="0.8" />
      <circle cx="150" cy="150" r="85" fill="none" stroke="#FFA500" strokeWidth="3" opacity="0.6" />
      <circle cx="150" cy="150" r="70" fill="none" stroke="#FFD700" strokeWidth="2" opacity="0.4" />
      
      {/* Center glow */}
      <circle cx="150" cy="150" r="50" fill="#FFFF99" opacity="0.3" />
      
      {/* Power lines (manga speed effects) */}
      <line x1="150" y1="50" x2="150" y2="20" stroke="#000" strokeWidth="3" />
      <line x1="200" y1="100" x2="230" y2="70" stroke="#000" strokeWidth="2.5" />
      <line x1="200" y1="200" x2="230" y2="230" stroke="#000" strokeWidth="2.5" />
      <line x1="100" y1="100" x2="70" y2="70" stroke="#000" strokeWidth="2.5" />
      <line x1="100" y1="200" x2="70" y2="230" stroke="#000" strokeWidth="2.5" />
      
      {/* Lightning bolts - dramatic */}
      <path d="M 150 60 L 145 100 L 155 105 L 140 150 Z" fill="#FFD700" stroke="#000" strokeWidth="2" />
      <path d="M 200 110 L 185 130 L 200 135 L 175 165 Z" fill="#FFD700" stroke="#000" strokeWidth="2" />
      <path d="M 100 110 L 115 130 L 100 135 L 125 165 Z" fill="#FFD700" stroke="#000" strokeWidth="2" />
      
      {/* Radiating impact lines */}
      <line x1="150" y1="150" x2="150" y2="250" stroke="#FFD700" strokeWidth="2" opacity="0.6" />
      <line x1="220" y1="150" x2="280" y2="150" stroke="#FFD700" strokeWidth="2" opacity="0.6" />
      <line x1="80" y1="150" x2="20" y2="150" stroke="#FFD700" strokeWidth="2" opacity="0.6" />
      <line x1="210" y1="210" x2="260" y2="260" stroke="#FFD700" strokeWidth="1.5" opacity="0.5" />
      
      {/* Central impact shape */}
      <g transform="translate(150, 150)">
        <polygon points="0,-30 12,-12 30,-8 15,8 20,30 0,18 -20,30 -15,8 -30,-8 -12,-12" fill="#FFF" stroke="#000" strokeWidth="2" />
      </g>
      
      {/* Explosion clouds */}
      <circle cx="120" cy="120" r="25" fill="#FFA500" opacity="0.5" />
      <circle cx="180" cy="130" r="20" fill="#FF8C00" opacity="0.5" />
  </svg>
);

const BattleScene = () => (
  <svg viewBox="0 0 300 300" className="w-full h-full">
      {/* Background explosion bloom */}
      <circle cx="150" cy="150" r="80" fill="#FFE082" opacity="0.4" />
      <circle cx="140" cy="130" r="60" fill="#FFA500" opacity="0.5" />
      <circle cx="160" cy="160" r="55" fill="#FF8C00" opacity="0.5" />
      
      {/* Explosion clouds - organic shapes */}
      <path d="M 80 120 Q 70 100 90 90 Q 110 85 120 105 Q 115 125 95 130 Z" fill="#FF6347" opacity="0.7" stroke="#000" strokeWidth="1.5" />
      <path d="M 210 140 Q 230 120 245 135 Q 250 155 230 165 Q 210 160 210 140 Z" fill="#FF4500" opacity="0.8" stroke="#000" strokeWidth="1.5" />
      <path d="M 150 220 Q 140 240 160 250 Q 180 245 185 230 Q 175 215 150 220 Z" fill="#FF5722" opacity="0.7" stroke="#000" strokeWidth="1.5" />
      
      {/* Manga action lines radiating from center */}
      <line x1="150" y1="0" x2="150" y2="30" stroke="#000" strokeWidth="3" />
      <line x1="150" y1="270" x2="150" y2="300" stroke="#000" strokeWidth="3" />
      <line x1="30" y1="150" x2="0" y2="150" stroke="#000" strokeWidth="3" />
      <line x1="270" y1="150" x2="300" y2="150" stroke="#000" strokeWidth="3" />
      
      {/* Diagonal action lines */}
      <line x1="50" y1="50" x2="20" y2="20" stroke="#000" strokeWidth="2.5" />
      <line x1="250" y1="50" x2="280" y2="20" stroke="#000" strokeWidth="2.5" />
      <line x1="50" y1="250" x2="20" y2="280" stroke="#000" strokeWidth="2.5" />
      <line x1="250" y1="250" x2="280" y2="280" stroke="#000" strokeWidth="2.5" />
      
      {/* Central impact cross */}
      <line x1="130" y1="150" x2="170" y2="150" stroke="#fff" strokeWidth="3" opacity="0.8" />
      <line x1="150" y1="130" x2="150" y2="170" stroke="#fff" strokeWidth="3" opacity="0.8" />
      
      {/* Impact star shape */}
      <polygon points="150,100 160,130 190,130 165,150 175,180 150,160 125,180 135,150 110,130 140,130" fill="#FFF" stroke="#000" strokeWidth="2" />
  </svg>
);

interface MangaPanelArtProps {
  panelIndex: number;
  image: string;
}

export const MangaPanelArt: React.FC<MangaPanelArtProps> = ({ panelIndex, image }) => {
  // Map emoji to manga artwork
  const getArtwork = () => {
    if (image === "🌳" || image === "🌲") {
      return <FruitForest />;
    } else if (image === "🍎") {
      return <AppleCharacter />;
    } else if (image === "😋" || image === "😍" || image.includes("happy")) {
      return <CharacterHappy />;
    } else if (image === "⚡" || image === "💪" || image === "🚀") {
      return <NutritionPower />;
    } else if (image === "⚔️" || image.includes("battle")) {
      return <BattleScene />;
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
