// Classic comic book style SVG artwork - vintage Marvel aesthetic

import React from "react";

const FruitForest = () => (
  <svg viewBox="0 0 400 500" className="w-full h-full">
    {/* Yellow vintage comic background */}
    <rect width="400" height="500" fill="#FFF9C4" />
    
    {/* Sky */}
    <rect width="400" height="200" fill="#87CEEB" />
    <circle cx="350" cy="50" r="40" fill="#FFD700" />
    
    {/* Trees with thick outlines */}
    <g>
      {/* Left tree */}
      <ellipse cx="100" cy="150" rx="50" ry="80" fill="#228B22" stroke="#000" strokeWidth="3" />
      <rect x="75" y="200" width="50" height="80" fill="#8B4513" stroke="#000" strokeWidth="3" />
      
      {/* Right tree */}
      <ellipse cx="300" cy="140" rx="55" ry="85" fill="#32CD32" stroke="#000" strokeWidth="3" />
      <rect x="270" y="210" width="60" height="70" fill="#654321" stroke="#000" strokeWidth="3" />
    </g>
    
    {/* Apples on trees with bold outlines */}
    <g>
      <circle cx="85" cy="110" r="15" fill="#FF0000" stroke="#000" strokeWidth="2" />
      <circle cx="115" cy="100" r="12" fill="#DC143C" stroke="#000" strokeWidth="2" />
      <circle cx="100" cy="130" r="10" fill="#FF6347" stroke="#000" strokeWidth="2" />
      
      <circle cx="280" cy="95" r="16" fill="#FF1111" stroke="#000" strokeWidth="2" />
      <circle cx="320" cy="105" r="13" fill="#E00000" stroke="#000" strokeWidth="2" />
      <circle cx="300" cy="135" r="11" fill="#FF4444" stroke="#000" strokeWidth="2" />
    </g>
    
    {/* Ground */}
    <rect y="280" width="400" height="220" fill="#90EE90" />
    
    {/* Character - hero standing confidently */}
    <g transform="translate(200, 250)">
      {/* Head */}
      <circle cx="0" cy="-80" r="25" fill="#F4A460" stroke="#000" strokeWidth="2.5" />
      {/* Hair */}
      <path d="M -25 -100 Q -25 -120 0 -125 Q 25 -120 25 -100" fill="#2C1810" stroke="#000" strokeWidth="2" />
      {/* Eyes - big and heroic */}
      <circle cx="-12" cy="-85" r="8" fill="#fff" stroke="#000" strokeWidth="1.5" />
      <circle cx="12" cy="-85" r="8" fill="#fff" stroke="#000" strokeWidth="1.5" />
      <circle cx="-12" cy="-85" r="4" fill="#000" />
      <circle cx="12" cy="-85" r="4" fill="#000" />
      {/* Smile */}
      <path d="M -15 -70 Q 0 -60 15 -70" stroke="#000" strokeWidth="2" fill="none" />
      
      {/* Body - muscular */}
      <ellipse cx="0" cy="-30" rx="30" ry="45" fill="#FF6B9D" stroke="#000" strokeWidth="2.5" />
      {/* Arms - dynamic pose */}
      <ellipse cx="-40" cy="-35" rx="15" ry="50" fill="#F4A460" stroke="#000" strokeWidth="2" transform="rotate(-30 -40 -35)" />
      <ellipse cx="40" cy="-35" rx="15" ry="50" fill="#F4A460" stroke="#000" strokeWidth="2" transform="rotate(30 40 -35)" />
      {/* Legs */}
      <ellipse cx="-15" cy="30" rx="12" ry="40" fill="#1E90FF" stroke="#000" strokeWidth="2" />
      <ellipse cx="15" cy="30" rx="12" ry="40" fill="#1E90FF" stroke="#000" strokeWidth="2" />
    </g>
    
    {/* Comic book action lines */}
    <line x1="50" y1="250" x2="10" y2="240" stroke="#000" strokeWidth="2" />
    <line x1="60" y1="280" x2="15" y2="290" stroke="#000" strokeWidth="2" />
    <line x1="350" y1="260" x2="390" y2="250" stroke="#000" strokeWidth="2" />
    
    {/* Speech bubble */}
    <g transform="translate(50, 80)">
      <rect x="0" y="0" width="140" height="60" rx="10" fill="#fff" stroke="#000" strokeWidth="2" />
      <polygon points="90,60 110,85 100,65" fill="#fff" stroke="#000" strokeWidth="2" />
      <text x="70" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#000">Welcome to Fruit</text>
      <text x="70" y="40" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#000">Forest!</text>
    </g>
  </svg>
);

const AppleCharacter = () => (
  <svg viewBox="0 0 400 500" className="w-full h-full">
    {/* Comic book yellow background */}
    <rect width="400" height="500" fill="#FFFACD" />
    
    {/* Shadow/background effect */}
    <ellipse cx="200" cy="400" rx="150" ry="30" fill="rgba(0,0,0,0.1)" />
    
    {/* Large apple character - center stage */}
    <g transform="translate(200, 200)">
      {/* Apple body - detailed shading */}
      <circle cx="0" cy="0" r="90" fill="#FF2222" stroke="#000" strokeWidth="4" />
      <ellipse cx="-40" cy="-30" rx="50" ry="60" fill="#FF5555" stroke="none" />
      <ellipse cx="40" cy="-20" rx="40" ry="50" fill="#DD0000" stroke="none" />
      
      {/* Stem */}
      <rect x="-8" y="-110" width="16" height="40" fill="#6D4C41" stroke="#000" strokeWidth="2" />
      {/* Leaf */}
      <ellipse cx="25" cy="-80" rx="30" ry="18" fill="#4CAF50" stroke="#000" strokeWidth="2" transform="rotate(-40 25 -80)" />
      
      {/* Face - expressive and happy */}
      {/* Left eye */}
      <ellipse cx="-40" cy="-10" rx="20" ry="28" fill="#000" stroke="#000" strokeWidth="2" />
      <ellipse cx="-40" cy="-15" rx="10" ry="14" fill="#fff" />
      <circle cx="-38" cy="-10" r="6" fill="#4A90E2" />
      {/* Right eye */}
      <ellipse cx="40" cy="-10" rx="20" ry="28" fill="#000" stroke="#000" strokeWidth="2" />
      <ellipse cx="40" cy="-15" rx="10" ry="14" fill="#fff" />
      <circle cx="42" cy="-10" r="6" fill="#4A90E2" />
      
      {/* Cheeks - rosy blush */}
      <ellipse cx="-65" cy="15" rx="18" ry="14" fill="#FFB6D9" opacity="0.8" />
      <ellipse cx="65" cy="15" rx="18" ry="14" fill="#FFB6D9" opacity="0.8" />
      
      {/* Big happy smile */}
      <path d="M -35 35 Q 0 55 35 35" stroke="#000" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M -33 38 Q 0 52 33 38" stroke="#fff" strokeWidth="1" fill="none" opacity="0.6" />
    </g>
    
    {/* Shine effect */}
    <circle cx="280" cy="120" r="30" fill="#FFE082" opacity="0.6" />
    <circle cx="80" cy="280" r="25" fill="#FFE082" opacity="0.4" />
    
    {/* Speech bubble - excited */}
    <g transform="translate(280, 80)">
      <path d="M 10 0 L 110 0 Q 120 0 120 10 L 120 70 Q 120 80 110 80 L 20 80 Q 10 80 10 70 L 10 30 L -15 50 L 10 35 Z" 
            fill="#fff" stroke="#000" strokeWidth="2" />
      <text x="65" y="25" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#000">I'm loaded</text>
      <text x="65" y="45" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#000">with vitamins!</text>
    </g>
    
    {/* Action lines around character */}
    <line x1="80" y1="150" x2="40" y2="130" stroke="#000" strokeWidth="2" />
    <line x1="90" y1="200" x2="50" y2="210" stroke="#000" strokeWidth="2" />
    <line x1="320" y1="160" x2="360" y2="140" stroke="#000" strokeWidth="2" />
    <line x1="310" y1="220" x2="350" y2="230" stroke="#000" strokeWidth="2" />
  </svg>
);

const CharacterHappy = () => (
  <svg viewBox="0 0 400 500" className="w-full h-full">
    {/* Comic background - yellow */}
    <rect width="400" height="500" fill="#FFF8DC" />
    
    {/* Big dramatic character transformation */}
    <g transform="translate(200, 220)">
      {/* Head - large and expressive */}
      <circle cx="0" cy="-70" r="50" fill="#F7B563" stroke="#000" strokeWidth="3" />
      
      {/* Hair - spiky/dynamic */}
      <path d="M -50 -110 Q -60 -130 -40 -140 Q -20 -145 0 -150 Q 20 -145 40 -140 Q 60 -130 50 -110" 
            fill="#2C1810" stroke="#000" strokeWidth="2.5" />
      
      {/* Eyes - HUGE and happy */}
      <ellipse cx="-25" cy="-75" rx="18" ry="30" fill="#000" stroke="#000" strokeWidth="2" />
      <ellipse cx="25" cy="-75" rx="18" ry="30" fill="#000" stroke="#000" strokeWidth="2" />
      
      {/* Eye shine - big and shiny */}
      <ellipse cx="-20" cy="-85" rx="10" ry="16" fill="#fff" />
      <ellipse cx="30" cy="-85" rx="10" ry="16" fill="#fff" />
      <circle cx="-18" cy="-80" r="4" fill="#8B4513" />
      <circle cx="32" cy="-80" r="4" fill="#8B4513" />
      
      {/* Huge happy smile */}
      <path d="M -30 -40 Q 0 -15 30 -40" stroke="#000" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M -30 -35 Q 0 -20 30 -35" stroke="#fff" strokeWidth="2" fill="none" opacity="0.5" />
      
      {/* Blush marks - big and visible */}
      <ellipse cx="-55" cy="-55" rx="20" ry="15" fill="#FF89B0" opacity="0.7" />
      <ellipse cx="55" cy="-55" rx="20" ry="15" fill="#FF89B0" opacity="0.7" />
      
      {/* Neck */}
      <rect x="-20" y="-10" width="40" height="25" fill="#F7B563" stroke="#000" strokeWidth="2" />
      
      {/* Body - excited pose */}
      <ellipse cx="0" cy="50" rx="60" ry="75" fill="#FF6B9D" stroke="#000" strokeWidth="3" />
      
      {/* Arms - raised in victory */}
      <g transform="translate(-65, 20) rotate(-40)">
        <ellipse cx="0" cy="0" rx="18" ry="55" fill="#F7B563" stroke="#000" strokeWidth="2.5" />
        <circle cx="0" cy="-60" r="20" fill="#F7B563" stroke="#000" strokeWidth="2" />
      </g>
      
      <g transform="translate(65, 20) rotate(40)">
        <ellipse cx="0" cy="0" rx="18" ry="55" fill="#F7B563" stroke="#000" strokeWidth="2.5" />
        <circle cx="0" cy="-60" r="20" fill="#F7B563" stroke="#000" strokeWidth="2" />
      </g>
    </g>
    
    {/* Big impact/excitement effect */}
    <g transform="translate(80, 100)">
      <polygon points="0,-30 10,-8 30,-5 15,8 18,30 0,15 -18,30 -15,8 -30,-5 -10,-8" 
               fill="#FFD700" stroke="#000" strokeWidth="2" />
    </g>
    
    <g transform="translate(320, 120)">
      <polygon points="0,-25 8,-7 25,-3 12,10 15,28 0,14 -15,28 -12,10 -25,-3 -8,-7" 
               fill="#FFD700" stroke="#000" strokeWidth="2" />
    </g>
    
    {/* Speech bubble - enthusiastic */}
    <g transform="translate(50, 280)">
      <path d="M 10 0 L 140 0 Q 150 0 150 10 L 150 90 Q 150 100 140 100 L 30 100 L 10 125 L 20 105 L 10 100 Q 0 100 0 90 L 0 10 Q 0 0 10 0" 
            fill="#fff" stroke="#000" strokeWidth="2.5" />
      <text x="75" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#000">Nutrition</text>
      <text x="75" y="50" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#000">powers me</text>
      <text x="75" y="70" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#000">up!</text>
    </g>
  </svg>
);

const NutritionPower = () => (
  <svg viewBox="0 0 400 500" className="w-full h-full">
    {/* Yellow comic background */}
    <rect width="400" height="500" fill="#FFFF99" />
    
    {/* Dramatic explosion effect */}
    <g transform="translate(200, 220)">
      {/* Multiple explosion clouds */}
      <circle cx="-80" cy="-40" r="50" fill="#FFA500" stroke="#000" strokeWidth="2" />
      <circle cx="-60" cy="0" r="45" fill="#FF8C00" stroke="#000" strokeWidth="2" />
      <circle cx="80" cy="-50" r="55" fill="#FFB347" stroke="#000" strokeWidth="2" />
      <circle cx="70" cy="10" r="48" fill="#FFA500" stroke="#000" strokeWidth="2" />
      <circle cx="0" cy="60" r="50" fill="#FF8C00" stroke="#000" strokeWidth="2" />
      
      {/* Central impact burst */}
      <polygon points="0,-60 15,-20 50,-10 20,15 25,55 0,30 -25,55 -20,15 -50,-10 -15,-20" 
               fill="#FFF" stroke="#000" strokeWidth="3" />
      
      {/* Lightning bolts */}
      <path d="M 0 -80 L -15 -40 L 5 -35 L -10 0 L 10 5 L -5 50 Z" fill="#FFD700" stroke="#000" strokeWidth="2" />
      <path d="M 60 -60 L 45 -20 L 65 -15 L 50 20 Z" fill="#FFD700" stroke="#000" strokeWidth="1.5" />
      <path d="M -70 -50 L -85 -10 L -65 -5 L -80 30 Z" fill="#FFD700" stroke="#000" strokeWidth="1.5" />
    </g>
    
    {/* Radiating impact lines */}
    <line x1="200" y1="50" x2="200" y2="10" stroke="#000" strokeWidth="3" />
    <line x1="200" y1="430" x2="200" y2="470" stroke="#000" strokeWidth="3" />
    <line x1="50" y1="220" x2="10" y2="220" stroke="#000" strokeWidth="3" />
    <line x1="350" y1="220" x2="390" y2="220" stroke="#000" strokeWidth="3" />
    
    {/* Diagonal lines */}
    <line x1="80" y1="80" x2="40" y2="40" stroke="#000" strokeWidth="2.5" />
    <line x1="320" y1="80" x2="360" y2="40" stroke="#000" strokeWidth="2.5" />
    
    {/* Impact star burst center */}
    <g transform="translate(200, 220)">
      <text x="0" y="15" textAnchor="middle" fontSize="48" fontWeight="bold" fill="#FF0000">POW!</text>
    </g>
    
    {/* Comic book sound effect */}
    <g transform="translate(300, 100)">
      <path d="M 20 10 L 80 10 Q 90 10 90 20 L 90 70 Q 90 80 80 80 L 20 80 Q 10 80 10 70 L 10 20 Q 10 10 20 10" 
            fill="#FF0000" stroke="#000" strokeWidth="2" />
      <text x="50" y="50" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#FFF" fontStyle="italic">ZAP!</text>
    </g>
  </svg>
);

const BattleScene = () => (
  <svg viewBox="0 0 400 500" className="w-full h-full">
    {/* Yellow comic background */}
    <rect width="400" height="500" fill="#FFFACD" />
    
    {/* Two characters facing off */}
    <g transform="translate(150, 200)">
      {/* Left character - hero */}
      <circle cx="-40" cy="-50" r="30" fill="#F4A460" stroke="#000" strokeWidth="2.5" />
      <path d="M -70 -65 Q -75 -85 -50 -90" fill="#8B4513" stroke="#000" strokeWidth="2" />
      <rect x="-60" y="-20" width="40" height="50" fill="#4169E1" stroke="#000" strokeWidth="2.5" />
      <ellipse cx="-55" cy="40" rx="10" ry="35" fill="#F4A460" stroke="#000" strokeWidth="2" />
      <ellipse cx="-25" cy="40" rx="10" ry="35" fill="#F4A460" stroke="#000" strokeWidth="2" />
      
      {/* Right character - evil/junk food */}
      <circle cx="40" cy="-50" r="30" fill="#8B0000" stroke="#000" strokeWidth="2.5" />
      <path d="M 10 -70 Q 5 -90 35 -95" fill="#660000" stroke="#000" strokeWidth="2" />
      <rect x="20" y="-20" width="40" height="50" fill="#FF8C00" stroke="#000" strokeWidth="2.5" />
      <ellipse cx="25" cy="40" rx="10" ry="35" fill="#8B0000" stroke="#000" strokeWidth="2" />
      <ellipse cx="55" cy="40" rx="10" ry="35" fill="#8B0000" stroke="#000" strokeWidth="2" />
      
      {/* Energy clash between them */}
      <circle cx="0" cy="-30" r="25" fill="#FFD700" stroke="#000" strokeWidth="2" />
      <circle cx="0" cy="-30" r="35" fill="none" stroke="#FFD700" strokeWidth="2" opacity="0.5" />
    </g>
    
    {/* Explosion effect between them */}
    <g transform="translate(200, 200)">
      <path d="M -30 -30 L -15 -45 L 0 -35 L 15 -50 L 30 -30 L 20 -10 L 35 0 L 15 10 L 20 30 L 0 20 L -20 30 L -15 10 L -35 0 L -20 -10 Z" 
            fill="#FF6347" stroke="#000" strokeWidth="2" />
    </g>
    
    {/* Impact lines radiating */}
    <line x1="100" y1="150" x2="60" y2="120" stroke="#000" strokeWidth="2.5" />
    <line x1="120" y1="100" x2="90" y2="50" stroke="#000" strokeWidth="2.5" />
    <line x1="280" y1="150" x2="320" y2="120" stroke="#000" strokeWidth="2.5" />
    <line x1="300" y1="100" x2="330" y2="50" stroke="#000" strokeWidth="2.5" />
    
    {/* Comic book sound effects */}
    <g transform="translate(50, 80)">
      <path d="M 15 5 L 55 5 Q 65 5 65 15 L 65 50 Q 65 60 55 60 L 15 60 Q 5 60 5 50 L 5 15 Q 5 5 15 5" 
            fill="#FFD700" stroke="#000" strokeWidth="2" />
      <text x="35" y="40" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#FF0000" fontStyle="italic">CRASH!</text>
    </g>
    
    {/* Speech bubbles */}
    <g transform="translate(280, 320)">
      <path d="M 10 0 L 90 0 Q 100 0 100 10 L 100 55 Q 100 65 90 65 L 15 65 L 0 80 L 10 65 L 10 10 Q 10 0 10 0" 
            fill="#fff" stroke="#000" strokeWidth="2" />
      <text x="50" y="22" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#000">Balanced</text>
      <text x="50" y="40" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#000">nutrition</text>
      <text x="50" y="58" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#000">wins!</text>
    </g>
  </svg>
);

interface MangaPanelArtProps {
  panelIndex: number;
  image: string;
}

export const MangaPanelArt: React.FC<MangaPanelArtProps> = ({ panelIndex, image }) => {
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
    
    // Fallback
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <rect width="200" height="200" fill="#FFF9E6" stroke="#000" strokeWidth="2" />
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
