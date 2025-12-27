// Modern anime/manga style - mature teen aesthetic

import React from "react";

const FruitForest = () => (
  <svg viewBox="0 0 400 500" className="w-full h-full">
    {/* Gradient background - cool modern anime style */}
    <defs>
      <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{stopColor: "#1a1a2e", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "#16213e", stopOpacity: 1}} />
      </linearGradient>
      <linearGradient id="groundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{stopColor: "#2d5016", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "#1a3a0a", stopOpacity: 1}} />
      </linearGradient>
    </defs>
    
    {/* Sky */}
    <rect width="400" height="280" fill="url(#skyGrad)" />
    
    {/* Moon */}
    <circle cx="350" cy="50" r="35" fill="#e8e8e8" opacity="0.8" />
    <circle cx="365" cy="40" r="35" fill="#1a1a2e" />
    
    {/* Trees - detailed and moody */}
    <g>
      {/* Left tree */}
      <path d="M 60 200 Q 50 150 70 120 Q 80 90 100 80 Q 80 85 70 120 Q 50 150 60 200" 
            fill="#0d2410" stroke="#000" strokeWidth="1.5" />
      <rect x="55" y="200" width="20" height="100" fill="#3d2817" stroke="#000" strokeWidth="1.5" />
      
      {/* Right tree */}
      <path d="M 340 200 Q 330 140 360 100 Q 375 70 390 55 Q 370 75 350 110 Q 330 150 340 200" 
            fill="#1a4d2e" stroke="#000" strokeWidth="1.5" />
      <rect x="330" y="200" width="25" height="95" fill="#3d2817" stroke="#000" strokeWidth="1.5" />
    </g>
    
    {/* Apples - realistic, not cartoonish */}
    <g>
      <circle cx="75" cy="110" r="12" fill="#c41e3a" stroke="#000" strokeWidth="1" />
      <circle cx="105" cy="95" r="10" fill="#d32f2f" stroke="#000" strokeWidth="1" />
      <circle cx="90" cy="130" r="9" fill="#b71c1c" stroke="#000" strokeWidth="1" />
      <ellipse cx="77" cy="105" rx="5" ry="4" fill="#ff6b6b" opacity="0.5" />
      
      <circle cx="355" cy="85" r="13" fill="#c41e3a" stroke="#000" strokeWidth="1" />
      <circle cx="375" cy="100" r="11" fill="#d32f2f" stroke="#000" strokeWidth="1" />
      <ellipse cx="358" cy="82" rx="5" ry="5" fill="#ff6b6b" opacity="0.5" />
    </g>
    
    {/* Ground */}
    <rect y="280" width="400" height="220" fill="url(#groundGrad)" />
    
    {/* Teenage hero character - realistic proportions */}
    <g transform="translate(200, 240)">
      {/* Head - proportional */}
      <circle cx="0" cy="-70" r="22" fill="#d4a574" stroke="#000" strokeWidth="1.5" />
      
      {/* Hair - modern style, not childish */}
      <path d="M -22 -85 Q -20 -100 0 -105 Q 20 -100 22 -85 L 20 -70 Q 0 -65 -20 -70 Z" 
            fill="#2c1810" stroke="#000" strokeWidth="1" />
      
      {/* Eyes - mature, focused */}
      <ellipse cx="-9" cy="-75" rx="5" ry="7" fill="#000" />
      <ellipse cx="9" cy="-75" rx="5" ry="7" fill="#000" />
      <ellipse cx="-7" cy="-77" rx="2.5" ry="3" fill="#fff" />
      <ellipse cx="11" cy="-77" rx="2.5" ry="3" fill="#fff" />
      
      {/* Mouth - neutral, serious expression */}
      <path d="M -8 -55 Q 0 -50 8 -55" stroke="#000" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      {/* Neck */}
      <rect x="-10" y="-48" width="20" height="15" fill="#d4a574" />
      
      {/* Body - athletic build */}
      <path d="M -25 -30 L -30 30 L 30 30 L 25 -30 Q 0 -35 -25 -30" 
            fill="#2c3e50" stroke="#000" strokeWidth="1.5" />
      
      {/* Arms - natural dynamic pose */}
      <ellipse cx="-35" cy="-10" rx="10" ry="40" fill="#d4a574" stroke="#000" strokeWidth="1.5" transform="rotate(-25 -35 -10)" />
      <ellipse cx="35" cy="-10" rx="10" ry="40" fill="#d4a574" stroke="#000" strokeWidth="1.5" transform="rotate(25 35 -10)" />
      
      {/* Legs */}
      <ellipse cx="-12" cy="50" rx="8" ry="35" fill="#1a1a1a" stroke="#000" strokeWidth="1.5" />
      <ellipse cx="12" cy="50" rx="8" ry="35" fill="#1a1a1a" stroke="#000" strokeWidth="1.5" />
    </g>
    
    {/* Manga-style speech bubble - angular */}
    <g transform="translate(280, 80)">
      <path d="M 0 8 L 0 60 Q 0 70 10 70 L 90 70 Q 100 70 100 60 L 100 8 Q 100 0 90 0 L 10 0 Q 0 0 0 8 M 15 70 L 5 85 L 20 72 Z" 
            fill="#2c3e50" stroke="#000" strokeWidth="1.5" />
      <text x="50" y="25" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#e8e8e8">Nutrients</text>
      <text x="50" y="45" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#e8e8e8">fuel growth</text>
    </g>
  </svg>
);

const AppleCharacter = () => (
  <svg viewBox="0 0 400 500" className="w-full h-full">
    {/* Dark modern background with gradient */}
    <defs>
      <radialGradient id="appleBg" cx="50%" cy="30%">
        <stop offset="0%" style={{stopColor: "#2d3e50", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "#1a1a2e", stopOpacity: 1}} />
      </radialGradient>
      <linearGradient id="appleShine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: "#ff6b6b", stopOpacity: 1}} />
        <stop offset="50%" style={{stopColor: "#c41e3a", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "#8b0000", stopOpacity: 1}} />
      </linearGradient>
    </defs>
    
    {/* Background */}
    <rect width="400" height="500" fill="url(#appleBg)" />
    
    {/* Realistic apple - main character */}
    <g transform="translate(200, 200)">
      {/* Apple body with realistic shading */}
      <circle cx="0" cy="0" r="80" fill="url(#appleShine)" stroke="#000" strokeWidth="2" />
      
      {/* Subtle shadow effect for depth */}
      <ellipse cx="-30" cy="-20" rx="45" ry="55" fill="#ff9999" opacity="0.4" />
      <ellipse cx="35" cy="25" rx="40" ry="50" fill="#660000" opacity="0.3" />
      
      {/* Stem - detailed */}
      <rect x="-6" y="-95" width="12" height="45" fill="#6b4423" stroke="#000" strokeWidth="1.5" rx="3" />
      
      {/* Leaf - realistic shape */}
      <path d="M 20 -75 Q 50 -70 55 -45 Q 50 -50 30 -55 Z" 
            fill="#3d7e3d" stroke="#000" strokeWidth="1" />
      <path d="M 25 -70 Q 45 -68 48 -50" stroke="#2d5d2d" strokeWidth="0.8" fill="none" />
      
      {/* Eye - anime style but mature */}
      <ellipse cx="-35" cy="-15" rx="18" ry="25" fill="#000" stroke="#000" strokeWidth="1" />
      <ellipse cx="-35" cy="-20" rx="8" ry="12" fill="#fff" />
      <circle cx="-32" cy="-18" r="4" fill="#4a90e2" />
      
      {/* Smart, determined expression */}
      <path d="M -50 15 Q -40 25 -25 20" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
    
    {/* Subtle energy glow - not flashy */}
    <circle cx="200" cy="200" r="95" fill="none" stroke="#4a90e2" strokeWidth="1" opacity="0.3" />
    
    {/* Modern speech bubble */}
    <g transform="translate(260, 80)">
      <path d="M 5 5 L 95 5 Q 105 5 105 15 L 105 70 Q 105 80 95 80 L 15 80 L 0 95 L 15 80 L 15 15 Q 15 5 5 5" 
            fill="#2d3e50" stroke="#000" strokeWidth="1.5" />
      <text x="55" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#e8e8e8">Packed with</text>
      <text x="55" y="50" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#e8e8e8">vitamins &amp; fiber</text>
    </g>
  </svg>
);

const CharacterHappy = () => (
  <svg viewBox="0 0 400 500" className="w-full h-full">
    {/* Dark anime background */}
    <defs>
      <linearGradient id="characterBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{stopColor: "#1a2a47", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "#0f1623", stopOpacity: 1}} />
      </linearGradient>
      <linearGradient id="skinTone" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: "#d4a574", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "#c9945f", stopOpacity: 1}} />
      </linearGradient>
    </defs>
    
    <rect width="400" height="500" fill="url(#characterBg)" />
    
    {/* Anime character - confident teen stance */}
    <g transform="translate(200, 240)">
      {/* Head with anime proportions */}
      <circle cx="0" cy="-65" r="28" fill="url(#skinTone)" stroke="#000" strokeWidth="1.5" />
      
      {/* Hair - modern, layered anime style */}
      <path d="M -28 -85 Q -28 -110 0 -115 Q 28 -110 28 -85 L 25 -65 Q 0 -60 -25 -65 Z" 
            fill="#1a1a2e" stroke="#000" strokeWidth="1" />
      <path d="M -18 -90 Q -15 -105 -8 -100" fill="#2d3e50" stroke="#000" strokeWidth="0.8" />
      <path d="M 18 -90 Q 15 -105 8 -100" fill="#2d3e50" stroke="#000" strokeWidth="0.8" />
      
      {/* Eyes - determined, cool anime style */}
      <ellipse cx="-11" cy="-70" rx="8" ry="12" fill="#000" stroke="#000" strokeWidth="1" />
      <ellipse cx="11" cy="-70" rx="8" ry="12" fill="#000" stroke="#000" strokeWidth="1" />
      <ellipse cx="-11" cy="-75" rx="3.5" ry="6" fill="#e8e8e8" />
      <ellipse cx="11" cy="-75" rx="3.5" ry="6" fill="#e8e8e8" />
      
      {/* Confident smirk - not childish */}
      <path d="M -10 -50 Q 0 -45 12 -48" stroke="#000" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      {/* Neck */}
      <rect x="-12" y="-37" width="24" height="12" fill="url(#skinTone)" stroke="#000" strokeWidth="1" />
      
      {/* Athletic body - energetic pose */}
      <path d="M -28 -25 L -32 35 L 32 35 L 28 -25 Q 0 -30 -28 -25" 
            fill="#2c5aa0" stroke="#000" strokeWidth="1.5" />
      
      {/* Arms - dynamic action pose */}
      <ellipse cx="-42" cy="5" rx="12" ry="45" fill="url(#skinTone)" stroke="#000" strokeWidth="1.5" transform="rotate(-50 -42 5)" />
      <ellipse cx="42" cy="-5" rx="12" ry="45" fill="url(#skinTone)" stroke="#000" strokeWidth="1.5" transform="rotate(50 42 -5)" />
      
      {/* Legs - grounded stance */}
      <ellipse cx="-12" cy="55" rx="9" ry="38" fill="#1a1a1a" stroke="#000" strokeWidth="1.5" />
      <ellipse cx="12" cy="55" rx="9" ry="38" fill="#1a1a1a" stroke="#000" strokeWidth="1.5" />
    </g>
    
    {/* Power indicators - subtle glow effect */}
    <circle cx="120" cy="120" r="8" fill="#4a90e2" opacity="0.6" />
    <circle cx="280" cy="100" r="6" fill="#4a90e2" opacity="0.5" />
    
    {/* Modern manga speech bubble */}
    <g transform="translate(40, 300)">
      <path d="M 5 0 L 160 0 Q 170 0 170 10 L 170 80 Q 170 90 160 90 L 15 90 L 0 110 L 15 92 L 10 10 Q 10 0 5 0" 
            fill="#2d3e50" stroke="#000" strokeWidth="1.5" />
      <text x="85" y="28" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#e8e8e8">Strong nutrition</text>
      <text x="85" y="50" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#e8e8e8">builds strength</text>
      <text x="85" y="72" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#e8e8e8">and focus</text>
    </g>
  </svg>
);

const NutritionPower = () => (
  <svg viewBox="0 0 400 500" className="w-full h-full">
    {/* Dark dramatic background */}
    <defs>
      <radialGradient id="powerBurst" cx="50%" cy="50%">
        <stop offset="0%" style={{stopColor: "#ff6b6b", stopOpacity: 0.8}} />
        <stop offset="70%" style={{stopColor: "#ff4444", stopOpacity: 0.3}} />
        <stop offset="100%" style={{stopColor: "#1a1a2e", stopOpacity: 0}} />
      </radialGradient>
      <linearGradient id="darkBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{stopColor: "#2d1a1a", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "#1a0f0f", stopOpacity: 1}} />
      </linearGradient>
    </defs>
    
    <rect width="400" height="500" fill="url(#darkBg)" />
    
    {/* Dramatic power effect - more sophisticated */}
    <g transform="translate(200, 220)">
      {/* Outer explosion ring */}
      <circle cx="0" cy="0" r="80" fill="url(#powerBurst)" />
      
      {/* Energy circles */}
      <circle cx="0" cy="0" r="70" fill="none" stroke="#ff6b6b" strokeWidth="2" opacity="0.6" />
      <circle cx="0" cy="0" r="50" fill="none" stroke="#ff8888" strokeWidth="2" opacity="0.4" />
      <circle cx="0" cy="0" r="30" fill="none" stroke="#ffaaaa" strokeWidth="1.5" opacity="0.3" />
      
      {/* Central core - intense */}
      <circle cx="0" cy="0" r="20" fill="#ffcccc" stroke="#000" strokeWidth="2" />
      <circle cx="0" cy="0" r="12" fill="#ff6b6b" stroke="#000" strokeWidth="1" />
      
      {/* Lightning bolts - angular and dynamic */}
      <path d="M -30 -60 L -45 -30 L -25 -25 L -40 10 L -15 5 L -20 50 Z" 
            fill="#ffee66" stroke="#000" strokeWidth="1.5" />
      <path d="M 40 -55 L 60 -20 L 40 -15 L 55 25 Z" 
            fill="#ffee66" stroke="#000" strokeWidth="1.5" />
    </g>
    
    {/* Radiating power lines */}
    <line x1="200" y1="50" x2="200" y2="10" stroke="#ff6b6b" strokeWidth="2" />
    <line x1="200" y1="430" x2="200" y2="470" stroke="#ff6b6b" strokeWidth="2" />
    <line x1="80" y1="220" x2="20" y2="220" stroke="#ff6b6b" strokeWidth="2" />
    <line x1="320" y1="220" x2="380" y2="220" stroke="#ff6b6b" strokeWidth="2" />
    
    {/* Diagonal energy beams */}
    <line x1="100" y1="100" x2="40" y2="40" stroke="#ff8888" strokeWidth="1.5" opacity="0.7" />
    <line x1="300" y1="100" x2="360" y2="40" stroke="#ff8888" strokeWidth="1.5" opacity="0.7" />
    <line x1="100" y1="340" x2="40" y2="400" stroke="#ff8888" strokeWidth="1.5" opacity="0.7" />
    <line x1="300" y1="340" x2="360" y2="400" stroke="#ff8888" strokeWidth="1.5" opacity="0.7" />
    
    {/* Modern impact text - not cartoonish */}
    <g transform="translate(200, 210)">
      <text x="0" y="0" textAnchor="middle" fontSize="42" fontWeight="bold" fill="#000" opacity="0.8">POWER</text>
      <text x="0" y="0" textAnchor="middle" fontSize="42" fontWeight="bold" fill="#ff6b6b">POWER</text>
    </g>
    
    {/* Effect indicator box */}
    <g transform="translate(280, 100)">
      <rect x="0" y="0" width="100" height="70" rx="4" fill="#2d3e50" stroke="#ff6b6b" strokeWidth="1.5" />
      <text x="50" y="25" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ff8888">Energy</text>
      <text x="50" y="45" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ff8888">boost!</text>
    </g>
  </svg>
);

const BattleScene = () => (
  <svg viewBox="0 0 400 500" className="w-full h-full">
    {/* Dark anime battle background */}
    <defs>
      <linearGradient id="battleBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{stopColor: "#1a0f1a", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "#0f0f1f", stopOpacity: 1}} />
      </linearGradient>
      <linearGradient id="heroColor" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: "#4a9eff", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "#2d5aa0", stopOpacity: 1}} />
      </linearGradient>
      <linearGradient id="villainColor" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: "#ff4444", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "#8b0000", stopOpacity: 1}} />
      </linearGradient>
    </defs>
    
    <rect width="400" height="500" fill="url(#battleBg)" />
    
    {/* Battle composition - two forces clashing */}
    <g transform="translate(160, 200)">
      {/* Hero character - left side */}
      <circle cx="-30" cy="-50" r="22" fill="#d4a574" stroke="#000" strokeWidth="1.5" />
      <path d="M -50 -65 Q -50 -85 -30 -90" fill="#2c1810" stroke="#000" strokeWidth="1" />
      <rect x="-50" y="-25" width="40" height="50" fill="url(#heroColor)" stroke="#000" strokeWidth="1.5" />
      <ellipse cx="-45" cy="35" rx="9" ry="32" fill="#1a1a1a" stroke="#000" strokeWidth="1.5" />
      <ellipse cx="-15" cy="35" rx="9" ry="32" fill="#1a1a1a" stroke="#000" strokeWidth="1.5" />
      
      {/* Villain/unbalanced food - right side */}
      <circle cx="40" cy="-50" r="22" fill="#8b4513" stroke="#000" strokeWidth="1.5" />
      <path d="M 20 -70 Q 15 -85 40 -90" fill="#5a2d0c" stroke="#000" strokeWidth="1" />
      <rect x="20" y="-25" width="40" height="50" fill="url(#villainColor)" stroke="#000" strokeWidth="1.5" />
      <ellipse cx="25" cy="35" rx="9" ry="32" fill="#1a1a1a" stroke="#000" strokeWidth="1.5" />
      <ellipse cx="55" cy="35" rx="9" ry="32" fill="#1a1a1a" stroke="#000" strokeWidth="1.5" />
      
      {/* Energy collision - center */}
      <circle cx="5" cy="-30" r="20" fill="#ffee66" stroke="#000" strokeWidth="1.5" />
      <circle cx="5" cy="-30" r="28" fill="none" stroke="#ffee66" strokeWidth="1" opacity="0.5" />
      
      {/* Explosive clash effect */}
      <path d="M -5 -35 L 0 -55 L 8 -38 L 15 -50 L 12 -30 L 20 -35 L 10 -20 L 18 -15 L 5 -10 Z" 
            fill="#ffaa44" stroke="#000" strokeWidth="1" />
    </g>
    
    {/* Impact radiating lines */}
    <line x1="130" y1="150" x2="90" y2="120" stroke="#ffee66" strokeWidth="2" />
    <line x1="145" y1="100" x2="110" y2="50" stroke="#ffee66" strokeWidth="1.5" />
    <line x1="270" y1="150" x2="310" y2="120" stroke="#ffee66" strokeWidth="2" />
    <line x1="255" y1="100" x2="290" y2="50" stroke="#ffee66" strokeWidth="1.5" />
    <line x1="110" y1="260" x2="70" y2="300" stroke="#ff6b6b" strokeWidth="2" />
    <line x1="290" y1="260" x2="330" y2="300" stroke="#ff6b6b" strokeWidth="2" />
    
    {/* Impact sound effect - modern style */}
    <g transform="translate(50, 70)">
      <rect x="0" y="0" width="100" height="65" rx="3" fill="#2d3e50" stroke="#000" strokeWidth="1.5" />
      <text x="50" y="35" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#ffee66" fontStyle="italic">CLASH!</text>
    </g>
    
    {/* Nutritional victory message */}
    <g transform="translate(260, 320)">
      <path d="M 5 0 L 105 0 Q 115 0 115 10 L 115 70 Q 115 80 105 80 L 15 80 L 0 100 L 12 82 L 10 10 Q 10 0 5 0" 
            fill="#2d3e50" stroke="#000" strokeWidth="1.5" />
      <text x="60" y="28" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#4a9eff">Balanced</text>
      <text x="60" y="45" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#4a9eff">nutrition</text>
      <text x="60" y="62" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#4a9eff">wins!</text>
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
