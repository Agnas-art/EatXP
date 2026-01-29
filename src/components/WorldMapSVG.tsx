import React from "react";

export const WorldMapSVG = () => {
  return (
    <svg
      viewBox="0 0 1200 800"
      className="w-full h-full"
      style={{ background: "linear-gradient(135deg, #87CEEB 0%, #E0F6FF 100%)" }}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Ocean/Water background */}
      <rect width="1200" height="800" fill="#87CEEB" />

      {/* Simplified Political World Map with realistic country boundaries */}
      <g stroke="#333333" strokeWidth="1.5" fill="#f0f0f0">
        {/* NORTH AMERICA */}
        {/* Canada */}
        <path d="M 100 60 L 240 50 L 280 180 L 140 200 Z" fill="#D4E8D4" stroke="#333333" strokeWidth="1.5" />
        
        {/* USA */}
        <path d="M 140 200 L 280 180 L 320 260 L 180 280 Z" fill="#FFE4B5" stroke="#333333" strokeWidth="1.5" />
        
        {/* Mexico */}
        <path d="M 180 280 L 320 260 L 340 360 L 210 370 Z" fill="#E8D4B8" stroke="#333333" strokeWidth="1.5" />

        {/* SOUTH AMERICA */}
        {/* Colombia & Venezuela */}
        <path d="M 210 370 L 280 350 L 300 420 L 240 430 Z" fill="#F0D9B8" stroke="#333333" strokeWidth="1" />
        
        {/* Brazil */}
        <path d="M 300 420 L 420 400 L 450 550 L 350 560 Z" fill="#FFD700" stroke="#333333" strokeWidth="1.5" />
        
        {/* Peru */}
        <path d="M 240 430 L 300 420 L 320 520 L 280 530 Z" fill="#F4D3A0" stroke="#333333" strokeWidth="1" />
        
        {/* Argentina */}
        <path d="M 280 530 L 340 520 L 360 700 L 310 710 Z" fill="#E8D4C4" stroke="#333333" strokeWidth="1.5" />

        {/* EUROPE */}
        {/* UK & Ireland */}
        <path d="M 480 100 L 520 95 L 530 180 L 490 185 Z" fill="#D4E4F0" stroke="#333333" strokeWidth="1" />
        
        {/* France */}
        <path d="M 520 95 L 580 90 L 600 200 L 540 210 Z" fill="#E8D4F0" stroke="#333333" strokeWidth="1.5" />
        
        {/* Spain & Portugal */}
        <path d="M 460 140 L 510 135 L 530 210 L 480 220 Z" fill="#F0E4D0" stroke="#333333" strokeWidth="1" />
        
        {/* Germany */}
        <path d="M 580 90 L 640 85 L 660 180 L 600 190 Z" fill="#D4D4E8" stroke="#333333" strokeWidth="1.5" />
        
        {/* Italy */}
        <path d="M 590 200 L 630 195 L 650 280 L 610 285 Z" fill="#F0D4B8" stroke="#333333" strokeWidth="1" />
        
        {/* Greece */}
        <path d="M 630 220 L 670 215 L 690 300 L 650 305 Z" fill="#E8D4D8" stroke="#333333" strokeWidth="1" />
        
        {/* Russia (European part) */}
        <path d="M 640 60 L 800 40 L 850 220 L 680 240 Z" fill="#D4D4B0" stroke="#333333" strokeWidth="1.5" />

        {/* AFRICA */}
        {/* North Africa */}
        <path d="M 530 240 L 680 220 L 720 340 L 560 360 Z" fill="#E8C87C" stroke="#333333" strokeWidth="1" />
        
        {/* West Africa */}
        <path d="M 560 360 L 650 350 L 680 480 L 600 490 Z" fill="#F4C860" stroke="#333333" strokeWidth="1" />
        
        {/* Central Africa */}
        <path d="M 650 350 L 780 330 L 820 480 L 720 490 Z" fill="#D8B494" stroke="#333333" strokeWidth="1" />
        
        {/* East Africa */}
        <path d="M 780 330 L 880 310 L 920 500 L 820 520 Z" fill="#C4A584" stroke="#333333" strokeWidth="1" />
        
        {/* Southern Africa */}
        <path d="M 750 520 L 860 500 L 900 700 L 800 710 Z" fill="#B8A890" stroke="#333333" strokeWidth="1.5" />

        {/* MIDDLE EAST & WESTERN ASIA */}
        {/* Saudi Arabia & Gulf States */}
        <path d="M 720 280 L 820 260 L 860 400 L 760 420 Z" fill="#E8D4A8" stroke="#333333" strokeWidth="1" />
        
        {/* Iran */}
        <path d="M 800 260 L 900 240 L 930 380 L 830 400 Z" fill="#D8C8A8" stroke="#333333" strokeWidth="1" />
        
        {/* Turkey */}
        <path d="M 680 200 L 760 190 L 790 280 L 720 290 Z" fill="#E8D4B8" stroke="#333333" strokeWidth="1" />

        {/* SOUTH ASIA */}
        {/* India */}
        <path d="M 880 340 L 980 320 L 1020 500 L 920 520 Z" fill="#FFD996" stroke="#333333" strokeWidth="1.5" />
        
        {/* Pakistan */}
        <path d="M 840 280 L 900 270 L 930 380 L 870 390 Z" fill="#E8D4B8" stroke="#333333" strokeWidth="1" />

        {/* SOUTHEAST ASIA */}
        {/* Thailand */}
        <path d="M 980 400 L 1040 390 L 1070 500 L 1010 510 Z" fill="#F0E8C8" stroke="#333333" strokeWidth="1" />
        
        {/* Vietnam */}
        <path d="M 1040 390 L 1080 385 L 1100 480 L 1060 485 Z" fill="#E8DCC8" stroke="#333333" strokeWidth="1" />
        
        {/* Indonesia */}
        <path d="M 1000 520 L 1100 510 L 1120 650 L 1020 660 Z" fill="#E4D4B8" stroke="#333333" strokeWidth="1" />

        {/* EAST ASIA */}
        {/* China */}
        <path d="M 900 200 L 1050 180 L 1100 380 L 950 400 Z" fill="#FFD9B3" stroke="#333333" strokeWidth="1.5" />
        
        {/* Japan */}
        <path d="M 1080 240 L 1140 235 L 1160 340 L 1100 345 Z" fill="#F0E8E0" stroke="#333333" strokeWidth="1" />
        
        {/* South Korea */}
        <path d="M 1040 220 L 1080 215 L 1095 300 L 1055 305 Z" fill="#E8E0D8" stroke="#333333" strokeWidth="1" />

        {/* OCEANIA */}
        {/* Australia */}
        <path d="M 1070 580 L 1160 570 L 1180 720 L 1090 730 Z" fill="#D8B8A0" stroke="#333333" strokeWidth="1.5" />
        
        {/* New Zealand */}
        <path d="M 1180 680 L 1220 675 L 1240 760 L 1200 765 Z" fill="#D0A894" stroke="#333333" strokeWidth="1" />
      </g>

      {/* Graticule (latitude/longitude grid) */}
      <g stroke="#cccccc" strokeWidth="0.5" opacity="0.2">
        {/* Meridians - every 30 degrees */}
        {[0, 120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200].map((x) => (
          <line key={`meridian-${x}`} x1={x} y1="0" x2={x} y2="800" />
        ))}
        {/* Parallels - every 30 degrees */}
        {[0, 100, 200, 300, 400, 500, 600, 700, 800].map((y) => (
          <line key={`parallel-${y}`} x1="0" y1={y} x2="1200" y2={y} />
        ))}
        {/* Equator */}
        <line x1="0" y1="400" x2="1200" y2="400" strokeWidth="0.8" stroke="#999999" strokeDasharray="4,4" />
        {/* Prime Meridian */}
        <line x1="600" y1="0" x2="600" y2="800" strokeWidth="0.8" stroke="#999999" strokeDasharray="4,4" />
      </g>

      {/* Continent labels */}
      <text x="180" y="30" fontSize="14" fill="#333333" fontWeight="700" opacity="0.4" textAnchor="middle">
        NORTH AMERICA
      </text>
      <text x="310" y="580" fontSize="14" fill="#333333" fontWeight="700" opacity="0.4" textAnchor="middle">
        SOUTH AMERICA
      </text>
      <text x="550" y="80" fontSize="14" fill="#333333" fontWeight="700" opacity="0.4" textAnchor="middle">
        EUROPE
      </text>
      <text x="700" y="630" fontSize="14" fill="#333333" fontWeight="700" opacity="0.4" textAnchor="middle">
        AFRICA
      </text>
      <text x="950" y="280" fontSize="14" fill="#333333" fontWeight="700" opacity="0.4" textAnchor="middle">
        ASIA
      </text>
      <text x="1120" y="700" fontSize="14" fill="#333333" fontWeight="700" opacity="0.4" textAnchor="middle">
        OCEANIA
      </text>

      <defs>
        <filter id="shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="1" floodOpacity="0.2" />
        </filter>
      </defs>
    </svg>
  );
};

// Country coordinates mapped to individual country SVG paths for accurate positioning
export const countryMapCoordinates: Record<string, { x: number; y: number }> = {
  Mexico: { x: 270, y: 315 },
  Colombia: { x: 260, y: 405 },
  Peru: { x: 290, y: 475 },
  Brazil: { x: 380, y: 480 },
  Argentina: { x: 325, y: 610 },
  "United Kingdom": { x: 505, y: 140 },
  France: { x: 560, y: 150 },
  Spain: { x: 495, y: 175 },
  Germany: { x: 610, y: 135 },
  Italy: { x: 620, y: 240 },
  Greece: { x: 660, y: 260 },
  Russia: { x: 720, y: 140 },
  Egypt: { x: 610, y: 290 },
  Nigeria: { x: 610, y: 420 },
  "South Africa": { x: 820, y: 600 },
  "Saudi Arabia": { x: 790, y: 340 },
  Iran: { x: 860, y: 320 },
  Turkey: { x: 720, y: 245 },
  India: { x: 950, y: 410 },
  Pakistan: { x: 890, y: 330 },
  Thailand: { x: 1010, y: 450 },
  Vietnam: { x: 1070, y: 435 },
  Indonesia: { x: 1060, y: 585 },
  China: { x: 990, y: 290 },
  Japan: { x: 1120, y: 290 },
  "South Korea": { x: 1070, y: 260 },
  Australia: { x: 1120, y: 650 },
  "New Zealand": { x: 1210, y: 720 },
};

export default WorldMapSVG;
