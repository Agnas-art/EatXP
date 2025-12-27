// Professional webtoon style (inspired by luacomic.org aesthetic)
// Sophisticated character design with dynamic poses, professional proportions, cinematic lighting

import React from "react";

const FruitForest = () => (
  <svg viewBox="0 0 400 500" className="w-full h-full">
    <defs>
      <radialGradient id="lightRay" cx="50%" cy="0%">
        <stop offset="0%" style={{stopColor: "#ffffff", stopOpacity: 0.3}} />
        <stop offset="100%" style={{stopColor: "#1a1a2e", stopOpacity: 0}} />
      </radialGradient>
      <linearGradient id="treeTrunk" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: "#5d4037", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "#2d2416", stopOpacity: 1}} />
      </linearGradient>
      <radialGradient id="appleSurface" cx="35%" cy="35%">
        <stop offset="0%" style={{stopColor: "#e63946", stopOpacity: 1}} />
        <stop offset="60%" style={{stopColor: "#a4161a", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "#6b0504", stopOpacity: 1}} />
      </radialGradient>
      <filter id="characterShadow">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.4" />
      </filter>
      <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: "#e8c8a4", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "#c9945f", stopOpacity: 1}} />
      </linearGradient>
    </defs>
    
    <rect width="400" height="300" fill="#0f172a" />
    <circle cx="350" cy="60" r="45" fill="#2d3e50" opacity="0.3" />
    <path d="M 0 80 Q 100 70 200 85 T 400 80 L 400 100 Q 200 90 0 100 Z" fill="#1a2332" opacity="0.4" />
    
    <ellipse cx="100" cy="250" rx="120" ry="100" fill="#0d1f2d" opacity="0.6" />
    <ellipse cx="350" cy="270" rx="130" ry="90" fill="#142033" opacity="0.5" />
    
    <g>
      <path d="M 50 290 Q 45 220 65 150 Q 75 100 95 60" 
            fill="url(#treeTrunk)" stroke="#1a1a1a" strokeWidth="2" />
      <ellipse cx="50" cy="290" rx="35" ry="15" fill="#2d2416" />
      <ellipse cx="85" cy="120" rx="85" ry="100" fill="#1b4620" opacity="0.9" />
      <ellipse cx="55" cy="90" rx="70" ry="80" fill="#2d6a3e" opacity="0.7" />
      <ellipse cx="110" cy="110" rx="60" ry="70" fill="#3d8a4e" opacity="0.6" />
      <path d="M 70 70 Q 85 60 100 75 Q 95 85 75 85 Z" fill="#5ca66f" opacity="0.5" />
    </g>
    
    <g>
      <path d="M 355 290 Q 350 210 370 130 Q 385 60 400 40" 
            fill="url(#treeTrunk)" stroke="#1a1a1a" strokeWidth="2" />
      <ellipse cx="355" cy="290" rx="32" ry="14" fill="#2d2416" />
      <ellipse cx="380" cy="90" rx="90" ry="110" fill="#0f3d1f" opacity="0.95" />
      <ellipse cx="340" cy="70" rx="75" ry="85" fill="#2a5c38" opacity="0.7" />
      <ellipse cx="405" cy="100" rx="65" ry="75" fill="#3d7a4a" opacity="0.65" />
      <path d="M 360 50 Q 380 35 395 60 Q 390 75 365 70 Z" fill="#5ca66f" opacity="0.5" />
    </g>
    
    <g>
      <circle cx="65" cy="95" r="15" fill="url(#appleSurface)" />
      <ellipse cx="70" cy="90" rx="8" ry="10" fill="#ff6b6b" opacity="0.4" />
      <ellipse cx="60" cy="100" rx="6" ry="8" fill="#6b0504" opacity="0.3" />
      <line x1="65" y1="80" x2="65" y2="70" stroke="#4d3020" strokeWidth="1.5" />
      
      <circle cx="105" cy="110" r="13" fill="url(#appleSurface)" />
      <ellipse cx="109" cy="105" rx="7" ry="9" fill="#ff6b6b" opacity="0.4" />
      
      <circle cx="80" cy="140" r="12" fill="url(#appleSurface)" />
      <ellipse cx="84" cy="136" rx="6" ry="8" fill="#ff6b6b" opacity="0.4" />
      
      <circle cx="375" cy="80" r="16" fill="url(#appleSurface)" />
      <ellipse cx="380" cy="75" rx="9" ry="11" fill="#ff6b6b" opacity="0.4" />
      <line x1="375" y1="64" x2="375" y2="52" stroke="#4d3020" strokeWidth="1.5" />
      
      <circle cx="340" cy="120" r="14" fill="url(#appleSurface)" />
      <ellipse cx="344" cy="115" rx="7" ry="9" fill="#ff6b6b" opacity="0.4" />
    </g>
    
    <rect y="300" width="400" height="200" fill="#1a2d1a" />
    <rect y="300" width="400" height="80" fill="#2d4d2d" opacity="0.4" />
    
    <g transform="translate(200, 250)" filter="url(#characterShadow)">
      <ellipse cx="0" cy="-65" rx="24" ry="26" fill="url(#skinGrad)" stroke="#000" strokeWidth="1.5" />
      
      <path d="M -24 -85 Q -28 -105 -12 -115 Q 0 -120 12 -115 Q 28 -105 24 -85 L 22 -70 Q 0 -62 -22 -70 Z" 
            fill="#1a0f08" stroke="#000" strokeWidth="1" />
      <path d="M -20 -95 Q -15 -110 0 -115" fill="none" stroke="#2d1a10" strokeWidth="1" opacity="0.6" />
      <path d="M 20 -95 Q 15 -110 0 -115" fill="none" stroke="#2d1a10" strokeWidth="1" opacity="0.6" />
      
      <ellipse cx="-10" cy="-72" rx="6" ry="9" fill="#1a1a1a" stroke="#000" strokeWidth="1" />
      <ellipse cx="10" cy="-72" rx="6" ry="9" fill="#1a1a1a" stroke="#000" strokeWidth="1" />
      <ellipse cx="-8" cy="-76" rx="3" ry="5" fill="#ffffff" />
      <ellipse cx="12" cy="-76" rx="3" ry="5" fill="#ffffff" />
      <circle cx="-7" cy="-73" r="1.5" fill="#4a90e2" />
      <circle cx="13" cy="-73" r="1.5" fill="#4a90e2" />
      
      <path d="M 0 -62 L -2 -55" stroke="#c9945f" strokeWidth="1" fill="none" />
      
      <path d="M -8 -48 Q 0 -43 8 -48" stroke="#a6725f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      <rect x="-12" y="-47" width="24" height="18" fill="url(#skinGrad)" stroke="#000" strokeWidth="1" />
      
      <path d="M -30 -28 Q -35 10 -25 35 L 25 35 Q 35 10 30 -28 Q 0 -32 -30 -28" 
            fill="#2c5a9e" stroke="#000" strokeWidth="1.5" />
      <ellipse cx="-18" cy="5" rx="12" ry="25" fill="#1a3a6e" opacity="0.3" />
      <ellipse cx="18" cy="5" rx="12" ry="25" fill="#1a5a9e" opacity="0.3" />
      
      <path d="M -30 -15 Q -50 -5 -55 25" 
            fill="url(#skinGrad)" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 30 -15 Q 50 -5 55 25" 
            fill="url(#skinGrad)" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="-58" cy="28" r="6" fill="url(#skinGrad)" stroke="#000" strokeWidth="1" />
      <circle cx="58" cy="28" r="6" fill="url(#skinGrad)" stroke="#000" strokeWidth="1" />
      
      <path d="M -15 35 Q -18 50 -16 80" 
            fill="#1a1a2e" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 15 35 Q 18 50 16 80" 
            fill="#1a1a2e" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
    </g>
    
    <g transform="translate(280, 70)">
      <path d="M 5 8 L 5 65 Q 5 75 15 75 L 95 75 Q 105 75 105 65 L 105 8 Q 105 0 95 0 L 15 0 Q 5 0 5 8 M 20 75 L 8 92 L 22 77 Z" 
            fill="#2c3e50" stroke="#000" strokeWidth="1.5" rx="3" />
      <text x="55" y="28" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#e8e8e8">Nutrients</text>
      <text x="55" y="48" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#e8e8e8">fuel growth</text>
    </g>
  </svg>
);

const AppleCharacter = () => (
  <svg viewBox="0 0 400 500" className="w-full h-full">
    <defs>
      <radialGradient id="appleSurfacePro" cx="40%" cy="35%">
        <stop offset="0%" style={{stopColor: "#ff5555", stopOpacity: 1}} />
        <stop offset="40%" style={{stopColor: "#d63946", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "#801e1e", stopOpacity: 1}} />
      </radialGradient>
      <radialGradient id="appleGlow" cx="30%" cy="20%">
        <stop offset="0%" style={{stopColor: "#ff8888", stopOpacity: 0.6}} />
        <stop offset="100%" style={{stopColor: "#ff8888", stopOpacity: 0}} />
      </radialGradient>
      <linearGradient id="sceneBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{stopColor: "#1a1a2e", stopOpacity: 1}} />
        <stop offset="50%" style={{stopColor: "#2d3e50", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "#0f1623", stopOpacity: 1}} />
      </linearGradient>
      <filter id="appleShadow">
        <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
        <feDropShadow dx="3" dy="6" stdDeviation="4" floodOpacity="0.5" />
      </filter>
    </defs>
    
    <rect width="400" height="500" fill="url(#sceneBg)" />
    
    <circle cx="100" cy="100" r="60" fill="#4a90e2" opacity="0.1" />
    <circle cx="350" cy="400" r="80" fill="#4a90e2" opacity="0.08" />
    
    <g transform="translate(200, 200)" filter="url(#appleShadow)">
      <circle cx="0" cy="0" r="85" fill="url(#appleSurfacePro)" stroke="#000" strokeWidth="2" />
      
      <circle cx="-28" cy="-35" r="42" fill="url(#appleGlow)" />
      
      <ellipse cx="0" cy="75" rx="50" ry="20" fill="#4d1616" opacity="0.4" />
      
      <g>
        <rect x="-8" y="-105" width="16" height="50" fill="#6b4423" stroke="#000" strokeWidth="1.5" rx="3" />
        <line x1="-6" y1="-90" x2="6" y2="-90" stroke="#4d3020" strokeWidth="0.8" opacity="0.6" />
        <line x1="-5" y1="-70" x2="7" y2="-70" stroke="#4d3020" strokeWidth="0.8" opacity="0.6" />
        <line x1="-4" y1="-50" x2="8" y2="-50" stroke="#4d3020" strokeWidth="0.8" opacity="0.6" />
      </g>
      
      <g>
        <ellipse cx="25" cy="-75" rx="35" ry="22" fill="#3d8a4e" stroke="#000" strokeWidth="1.5" transform="rotate(-40 25 -75)" />
        <ellipse cx="30" cy="-80" rx="18" ry="10" fill="#5ca66f" opacity="0.5" transform="rotate(-40 30 -80)" />
        <path d="M 15 -75 Q 35 -85 45 -70" stroke="#2d5c38" strokeWidth="0.8" fill="none" />
        <path d="M 18 -80 Q 38 -88 50 -75" stroke="#2d5c38" strokeWidth="0.8" fill="none" />
      </g>
      
      <g>
        <ellipse cx="-32" cy="-18" rx="16" ry="22" fill="#ffffff" stroke="#000" strokeWidth="1.5" />
        <circle cx="-32" cy="-12" r="12" fill="#2d4a8f" stroke="#000" strokeWidth="1" />
        <circle cx="-32" cy="-12" r="7" fill="#000" />
        <circle cx="-28" cy="-16" r="3.5" fill="#ffffff" />
        <circle cx="-35" cy="-8" r="1.5" fill="#ffffff" />
        <path d="M -50 -35 Q -32 -30 -15 -35" stroke="#000" strokeWidth="1" fill="none" />
        <path d="M -48 -35 L -46 -42" stroke="#000" strokeWidth="0.8" />
        <path d="M -32 -31 L -32 -38" stroke="#000" strokeWidth="0.8" />
        <path d="M -16 -35 L -18 -42" stroke="#000" strokeWidth="0.8" />
      </g>
      
      <path d="M -20 25 Q 0 35 20 25" stroke="#8b3a3a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M -18 27 Q 0 32 18 27" stroke="#d4a5a5" strokeWidth="1" fill="none" opacity="0.7" />
    </g>
    
    <circle cx="150" cy="140" r="3" fill="#4a90e2" opacity="0.4" />
    <circle cx="280" cy="160" r="2.5" fill="#4a90e2" opacity="0.3" />
    <circle cx="320" cy="240" r="2" fill="#4a90e2" opacity="0.35" />
    
    <g transform="translate(240, 70)">
      <path d="M 8 8 L 8 70 Q 8 80 18 80 L 120 80 Q 130 80 130 70 L 130 8 Q 130 0 120 0 L 18 0 Q 8 0 8 8 M 25 80 L 10 105 L 28 82 Z" 
            fill="#2c3e50" stroke="#000" strokeWidth="1.5" />
      <text x="69" y="32" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#e8e8e8">Rich in</text>
      <text x="69" y="52" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#e8e8e8">antioxidants</text>
    </g>
  </svg>
);

const CharacterHappy = () => (
  <svg viewBox="0 0 400 500" className="w-full h-full">
    <defs>
      <linearGradient id="charBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{stopColor: "#0d1f2d", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "#050a13", stopOpacity: 1}} />
      </linearGradient>
      <linearGradient id="bodySkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: "#e8c8a4", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "#b8976d", stopOpacity: 1}} />
      </linearGradient>
      <linearGradient id="clothingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: "#3a7bd5", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "#1a4d8a", stopOpacity: 1}} />
      </linearGradient>
      <radialGradient id="energyAura">
        <stop offset="0%" style={{stopColor: "#4a90e2", stopOpacity: 0.4}} />
        <stop offset="100%" style={{stopColor: "#4a90e2", stopOpacity: 0}} />
      </radialGradient>
      <filter id="charShadow">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.5" />
      </filter>
    </defs>
    
    <rect width="400" height="500" fill="url(#charBg)" />
    
    <circle cx="80" cy="150" r="100" fill="#4a90e2" opacity="0.08" />
    <circle cx="320" cy="350" r="120" fill="#4a90e2" opacity="0.06" />
    
    <g transform="translate(200, 240)" filter="url(#charShadow)">
      <ellipse cx="0" cy="-70" rx="25" ry="28" fill="url(#bodySkinGrad)" stroke="#000" strokeWidth="1.5" />
      
      <path d="M -25 -90 Q -28 -115 -8 -125 Q 0 -128 8 -125 Q 28 -115 25 -90 L 23 -70 Q 0 -62 -23 -70 Z" 
            fill="#1a0f08" stroke="#000" strokeWidth="1" />
      <path d="M -10 -110 Q -5 -120 5 -115" stroke="#2d1a10" strokeWidth="1" fill="none" opacity="0.7" />
      <path d="M 10 -108 Q 15 -118 20 -110" stroke="#2d1a10" strokeWidth="1" fill="none" opacity="0.7" />
      
      <g>
        <ellipse cx="-11" cy="-70" rx="8" ry="12" fill="#ffffff" stroke="#000" strokeWidth="1.5" />
        <circle cx="-11" cy="-68" r="6" fill="#2d4a8f" stroke="#000" strokeWidth="0.8" />
        <circle cx="-11" cy="-68" r="3" fill="#000" />
        <circle cx="-8" cy="-72" r="2.5" fill="#ffffff" />
        <path d="M -19 -82 Q -11 -75 -3 -82" stroke="#000" strokeWidth="1" fill="none" />
        <line x1="-18" y1="-82" x2="-16" y2="-89" stroke="#000" strokeWidth="0.7" />
        <line x1="-11" y1="-80" x2="-11" y2="-88" stroke="#000" strokeWidth="0.7" />
        <line x1="-4" y1="-82" x2="-2" y2="-89" stroke="#000" strokeWidth="0.7" />
        
        <ellipse cx="11" cy="-70" rx="8" ry="12" fill="#ffffff" stroke="#000" strokeWidth="1.5" />
        <circle cx="11" cy="-68" r="6" fill="#2d4a8f" stroke="#000" strokeWidth="0.8" />
        <circle cx="11" cy="-68" r="3" fill="#000" />
        <circle cx="14" cy="-72" r="2.5" fill="#ffffff" />
        <path d="M 3 -82 Q 11 -75 19 -82" stroke="#000" strokeWidth="1" fill="none" />
        <line x1="4" y1="-82" x2="2" y2="-89" stroke="#000" strokeWidth="0.7" />
        <line x1="11" y1="-80" x2="11" y2="-88" stroke="#000" strokeWidth="0.7" />
        <line x1="18" y1="-82" x2="20" y2="-89" stroke="#000" strokeWidth="0.7" />
      </g>
      
      <path d="M 0 -58 L -2 -50" stroke="#c9945f" strokeWidth="1" fill="none" />
      
      <path d="M -9 -42 Q 0 -35 9 -42" stroke="#a6725f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="0" cy="-40" rx="6" ry="2" fill="#c9945f" opacity="0.5" />
      
      <rect x="-14" y="-48" width="28" height="20" fill="url(#bodySkinGrad)" stroke="#000" strokeWidth="1" />
      
      <path d="M -32 -28 Q -38 5 -28 40 L 28 40 Q 38 5 32 -28 Q 0 -35 -32 -28" 
            fill="url(#clothingGrad)" stroke="#000" strokeWidth="1.5" />
      
      <ellipse cx="-22" cy="10" rx="14" ry="30" fill="#1a4d8a" opacity="0.3" />
      <ellipse cx="22" cy="10" rx="14" ry="30" fill="#2d6aa0" opacity="0.2" />
      
      <g>
        <path d="M -32 -15 Q -55 -8 -62 28" fill="url(#bodySkinGrad)" stroke="#000" strokeWidth="1.5" />
        <ellipse cx="-62" cy="28" rx="7" ry="8" fill="url(#bodySkinGrad)" stroke="#000" strokeWidth="1" />
        <path d="M -45 -5 Q -52 10 -58 25" stroke="#b8976d" strokeWidth="1" fill="none" opacity="0.5" />
        
        <path d="M 32 -15 Q 55 -8 62 28" fill="url(#bodySkinGrad)" stroke="#000" strokeWidth="1.5" />
        <ellipse cx="62" cy="28" rx="7" ry="8" fill="url(#bodySkinGrad)" stroke="#000" strokeWidth="1" />
        <path d="M 45 -5 Q 52 10 58 25" stroke="#b8976d" strokeWidth="1" fill="none" opacity="0.5" />
      </g>
      
      <path d="M -16 40 Q -18 55 -16 85" 
            fill="#1a1a2e" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 16 40 Q 18 55 16 85" 
            fill="#1a1a2e" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
      
      <circle cx="0" cy="0" r="100" fill="url(#energyAura)" />
    </g>
    
    <line x1="100" y1="200" x2="60" y2="180" stroke="#4a90e2" strokeWidth="1" opacity="0.4" />
    <line x1="320" y1="180" x2="360" y2="150" stroke="#4a90e2" strokeWidth="1" opacity="0.4" />
    
    <g transform="translate(30, 320)">
      <path d="M 8 8 L 8 85 Q 8 95 18 95 L 172 95 Q 182 95 182 85 L 182 8 Q 182 0 172 0 L 18 0 Q 8 0 8 8 M 28 95 L 8 120 L 32 97 Z" 
            fill="#2c3e50" stroke="#000" strokeWidth="1.5" />
      <text x="95" y="35" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#e8e8e8">Balanced</text>
      <text x="95" y="55" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#e8e8e8">nutrition builds</text>
      <text x="95" y="75" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#e8e8e8">strength &amp; focus</text>
    </g>
  </svg>
);

const NutritionPower = () => (
  <svg viewBox="0 0 400 500" className="w-full h-full">
    <defs>
      <radialGradient id="powerCore" cx="50%" cy="50%">
        <stop offset="0%" style={{stopColor: "#ffff99", stopOpacity: 1}} />
        <stop offset="50%" style={{stopColor: "#ffee66", stopOpacity: 0.8}} />
        <stop offset="100%" style={{stopColor: "#ffaa44", stopOpacity: 0}} />
      </radialGradient>
      <radialGradient id="explosionGrad" cx="50%" cy="50%">
        <stop offset="0%" style={{stopColor: "#ff8844", stopOpacity: 0.9}} />
        <stop offset="50%" style={{stopColor: "#ff6b6b", stopOpacity: 0.4}} />
        <stop offset="100%" style={{stopColor: "#1a1a2e", stopOpacity: 0}} />
      </radialGradient>
      <linearGradient id="powerBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{stopColor: "#2d1a1a", stopOpacity: 1}} />
        <stop offset="50%" style={{stopColor: "#1a0f0f", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "#0a0505", stopOpacity: 1}} />
      </linearGradient>
      <filter id="powerGlow">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
      </filter>
    </defs>
    
    <rect width="400" height="500" fill="url(#powerBg)" />
    
    <g transform="translate(200, 220)">
      <circle cx="0" cy="0" r="100" fill="url(#explosionGrad)" />
      <circle cx="0" cy="0" r="80" fill="url(#powerCore)" />
      
      <circle cx="0" cy="0" r="75" fill="none" stroke="#ffee66" strokeWidth="2" opacity="0.6" />
      <circle cx="0" cy="0" r="60" fill="none" stroke="#ffdd55" strokeWidth="1.5" opacity="0.4" />
      <circle cx="0" cy="0" r="40" fill="none" stroke="#ffcc44" strokeWidth="1" opacity="0.3" />
      
      <circle cx="0" cy="0" r="25" fill="#ffffff" stroke="#000" strokeWidth="2" />
      <circle cx="0" cy="0" r="16" fill="#ffff99" stroke="#000" strokeWidth="1.5" />
      <circle cx="0" cy="0" r="8" fill="#ff6b6b" />
      
      <path d="M -40 -80 L -20 -60 L -50 -40 L -30 -20 L -70 0 L -50 20 L -60 50 L -30 40 L -20 80 L 0 60 L 20 80 L 30 40 L 60 50 L 50 20 L 70 0 L 30 -20 L 50 -40 L 20 -60 L 40 -80 Z" 
            fill="#ff8844" stroke="#000" strokeWidth="1.5" />
      
      <path d="M -15 -85 L -35 -50 L -10 -40 L -30 0 L 0 5 L -15 45 Z" 
            fill="#ffee66" stroke="#000" strokeWidth="1.5" />
      <path d="M 55 -65 L 70 -25 L 50 -15 L 65 30 Z" 
            fill="#ffdd55" stroke="#000" strokeWidth="1.5" />
      <path d="M -50 50 L -70 85 L -50 70 Z" 
            fill="#ffcc44" stroke="#000" strokeWidth="1" />
    </g>
    
    <line x1="200" y1="40" x2="200" y2="0" stroke="#ffee66" strokeWidth="2.5" />
    <line x1="200" y1="440" x2="200" y2="480" stroke="#ff6b6b" strokeWidth="2.5" />
    <line x1="50" y1="220" x2="0" y2="220" stroke="#ffee66" strokeWidth="2.5" />
    <line x1="350" y1="220" x2="400" y2="220" stroke="#ffee66" strokeWidth="2.5" />
    
    <line x1="80" y1="100" x2="20" y2="40" stroke="#ffdd55" strokeWidth="2" opacity="0.8" />
    <line x1="320" y1="100" x2="380" y2="40" stroke="#ffdd55" strokeWidth="2" opacity="0.8" />
    <line x1="80" y1="340" x2="20" y2="400" stroke="#ff6b6b" strokeWidth="2" opacity="0.7" />
    <line x1="320" y1="340" x2="380" y2="400" stroke="#ff6b6b" strokeWidth="2" opacity="0.7" />
    
    <g transform="translate(200, 210)" filter="url(#powerGlow)">
      <text x="0" y="0" textAnchor="middle" fontSize="48" fontWeight="900" fill="#000" opacity="0.7">POWER</text>
      <text x="0" y="0" textAnchor="middle" fontSize="48" fontWeight="900" fill="#ffee66">POWER</text>
    </g>
    
    <g transform="translate(300, 110)">
      <rect x="0" y="0" width="110" height="75" rx="4" fill="#2c3e50" stroke="#ffee66" strokeWidth="2" />
      <text x="55" y="28" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ffee66">Energy</text>
      <text x="55" y="48" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ffee66">transformation!</text>
    </g>
  </svg>
);

const BattleScene = () => (
  <svg viewBox="0 0 400 500" className="w-full h-full">
    <defs>
      <linearGradient id="battleBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{stopColor: "#1a0f1a", stopOpacity: 1}} />
        <stop offset="50%" style={{stopColor: "#2d1a2d", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "#0d0510", stopOpacity: 1}} />
      </linearGradient>
      <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: "#5ba3ff", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "#2d5aa0", stopOpacity: 1}} />
      </linearGradient>
      <linearGradient id="villainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: "#ff5555", stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: "#8b0000", stopOpacity: 1}} />
      </linearGradient>
      <radialGradient id="clashEnergy">
        <stop offset="0%" style={{stopColor: "#ffff99", stopOpacity: 0.9}} />
        <stop offset="100%" style={{stopColor: "#ffff99", stopOpacity: 0}} />
      </radialGradient>
      <filter id="battleShadow">
        <feDropShadow dx="1" dy="3" stdDeviation="3" floodOpacity="0.4" />
      </filter>
    </defs>
    
    <rect width="400" height="500" fill="url(#battleBgGrad)" />
    
    <circle cx="200" cy="250" r="150" fill="#4a90e2" opacity="0.08" />
    
    <g transform="translate(170, 210)" filter="url(#battleShadow)">
      <g transform="translate(-45, 0)">
        <circle cx="0" cy="-55" r="20" fill="#e8c8a4" stroke="#000" strokeWidth="1.5" />
        <path d="M -20 -70 Q -22 -90 0 -95 Q 22 -90 20 -70" fill="#1a0f08" stroke="#000" strokeWidth="1" />
        <ellipse cx="-8" cy="-60" rx="5" ry="7" fill="#000" />
        <ellipse cx="8" cy="-60" rx="5" ry="7" fill="#000" />
        <circle cx="-6" cy="-62" r="2" fill="#ffffff" />
        <circle cx="10" cy="-62" r="2" fill="#ffffff" />
        <path d="M -5 -45 Q 0 -42 5 -45" stroke="#000" strokeWidth="1.5" fill="none" />
        
        <path d="M -22 -35 Q -26 -10 -20 25 L 20 25 Q 26 -10 22 -35 Q 0 -38 -22 -35" 
              fill="url(#heroGrad)" stroke="#000" strokeWidth="1.5" />
        
        <path d="M -22 -20 Q -40 -10 -45 20" fill="#e8c8a4" stroke="#000" strokeWidth="1.5" />
        <path d="M 22 -20 Q 40 -10 45 20" fill="#e8c8a4" stroke="#000" strokeWidth="1.5" />
        
        <path d="M -10 25 Q -12 40 -10 65" fill="#1a1a2e" stroke="#000" strokeWidth="1.5" />
        <path d="M 10 25 Q 12 40 10 65" fill="#1a1a2e" stroke="#000" strokeWidth="1.5" />
      </g>
      
      <g transform="translate(45, 0)">
        <circle cx="0" cy="-55" r="20" fill="#8b4513" stroke="#000" strokeWidth="1.5" />
        <path d="M -15 -75 L -20 -95 L -8 -80 L 0 -98 L 8 -80 L 20 -95 L 15 -75" fill="#5a2d0c" stroke="#000" strokeWidth="1" />
        <ellipse cx="-8" cy="-60" rx="5" ry="7" fill="#000" />
        <ellipse cx="8" cy="-60" rx="5" ry="7" fill="#000" />
        <circle cx="-6" cy="-64" r="1.5" fill="#ff0000" />
        <circle cx="10" cy="-64" r="1.5" fill="#ff0000" />
        <path d="M -5 -42 Q 0 -38 5 -42" stroke="#000" strokeWidth="1.5" fill="none" />
        
        <path d="M -22 -35 Q -28 -10 -22 25 L 22 25 Q 28 -10 22 -35 Q 0 -38 -22 -35" 
              fill="url(#villainGrad)" stroke="#000" strokeWidth="1.5" />
        
        <path d="M -22 -15 Q -42 -8 -48 25" fill="#8b4513" stroke="#000" strokeWidth="1.5" />
        <path d="M 22 -15 Q 42 -8 48 25" fill="#8b4513" stroke="#000" strokeWidth="1.5" />
        
        <path d="M -10 25 Q -13 40 -12 65" fill="#1a1a2e" stroke="#000" strokeWidth="1.5" />
        <path d="M 10 25 Q 13 40 12 65" fill="#1a1a2e" stroke="#000" strokeWidth="1.5" />
      </g>
      
      <circle cx="0" cy="-25" r="28" fill="url(#clashEnergy)" stroke="#000" strokeWidth="2" />
      <circle cx="0" cy="-25" r="38" fill="none" stroke="#ffff99" strokeWidth="1.5" opacity="0.4" />
      
      <path d="M -20 -35 L -10 -55 L 0 -40 L 10 -58 L 20 -35 L 15 -15 L 28 -10 L 12 5 L 18 25 L 0 18 L -18 25 L -12 5 L -28 -10 L -15 -15 Z" 
            fill="#ffaa44" stroke="#000" strokeWidth="1.5" />
    </g>
    
    <line x1="120" y1="160" x2="70" y2="120" stroke="#ffff99" strokeWidth="2" />
    <line x1="135" y1="110" x2="100" y2="50" stroke="#ffff99" strokeWidth="1.5" />
    <line x1="280" y1="160" x2="330" y2="120" stroke="#ffff99" strokeWidth="2" />
    <line x1="265" y1="110" x2="300" y2="50" stroke="#ffff99" strokeWidth="1.5" />
    <line x1="100" y1="290" x2="50" y2="340" stroke="#ff6b6b" strokeWidth="2" />
    <line x1="300" y1="290" x2="350" y2="340" stroke="#ff6b6b" strokeWidth="2" />
    
    <g transform="translate(40, 80)">
      <rect x="0" y="0" width="120" height="75" rx="4" fill="#2c3e50" stroke="#000" strokeWidth="1.5" />
      <text x="60" y="45" textAnchor="middle" fontSize="24" fontWeight="900" fill="#ffff99" fontStyle="italic">CLASH!</text>
    </g>
    
    <g transform="translate(260, 340)">
      <path d="M 8 8 L 8 75 Q 8 85 18 85 L 130 85 Q 140 85 140 75 L 140 8 Q 140 0 130 0 L 18 0 Q 8 0 8 8 M 28 85 L 10 108 L 32 87 Z" 
            fill="#2c3e50" stroke="#000" strokeWidth="1.5" />
      <text x="74" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#5ba3ff">Balanced</text>
      <text x="74" y="48" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#5ba3ff">nutrition</text>
      <text x="74" y="66" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#5ba3ff">wins!</text>
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
