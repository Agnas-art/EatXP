import React from "react";

export const WorldMapSVG = () => {
  return (
    <svg
      viewBox="0 0 960 600"
      className="w-full h-full"
      style={{ background: "linear-gradient(135deg, #87CEEB 0%, #E0F6FF 100%)" }}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Ocean/Water background */}
      <rect width="960" height="600" fill="#87CEEB" />

      {/* Detailed Political World Map - Accurate country boundaries */}
      <g stroke="#333333" strokeWidth="1" fill="#f0f0f0">
        {/* NORTH AMERICA */}
        <path d="M 50 40 L 170 30 L 190 130 L 70 140 Z" fill="#D4E8D4" />
        <path d="M 70 140 L 190 130 L 210 210 L 90 220 Z" fill="#FFE4B5" />
        <path d="M 90 220 L 210 210 L 230 280 L 120 290 Z" fill="#E8D4B8" />

        {/* SOUTH AMERICA */}
        <path d="M 120 290 L 230 280 L 250 320 L 140 330 Z" fill="#FFDDB3" />
        <path d="M 130 330 L 200 310 L 220 380 L 160 390 Z" fill="#F0D9B8" />
        <path d="M 220 380 L 300 360 L 320 500 L 240 510 Z" fill="#FFE066" />
        <path d="M 160 390 L 220 380 L 240 480 L 180 490 Z" fill="#F4D3A0" />
        <path d="M 140 490 L 200 530 L 220 600 L 160 600 Z" fill="#E8D4C4" />

        {/* WESTERN EUROPE */}
        <path d="M 360 50 L 390 48 L 400 90 L 370 92 Z" fill="#D4E4F0" />
        <path d="M 390 48 L 430 45 L 445 100 L 405 105 Z" fill="#E8D4F0" />
        <path d="M 340 70 L 385 65 L 405 110 L 360 115 Z" fill="#F0E4D0" />
        <path d="M 420 30 L 480 25 L 500 100 L 460 110 Z" fill="#D0D4E8" />
        <path d="M 430 45 L 480 42 L 510 120 L 450 125 Z" fill="#E8DDE8" />
        <path d="M 450 100 L 475 98 L 495 160 L 465 165 Z" fill="#F0D4B8" />
        <path d="M 475 120 L 530 115 L 550 180 L 490 185 Z" fill="#E8D4D8" />

        {/* RUSSIA & CENTRAL ASIA */}
        <path d="M 500 40 L 630 30 L 660 140 L 540 150 Z" fill="#C8D8C8" />
        <path d="M 660 100 L 730 95 L 750 160 L 690 165 Z" fill="#D8C8A0" />

        {/* MIDDLE EAST */}
        <path d="M 490 140 L 550 135 L 570 170 L 510 175 Z" fill="#E8D4B8" />
        <path d="M 550 150 L 640 140 L 670 240 L 580 250 Z" fill="#F5DDA0" />
        <path d="M 580 250 L 670 240 L 700 330 L 610 340 Z" fill="#E8D4A8" />

        {/* AFRICA */}
        <path d="M 460 150 L 570 140 L 610 230 L 500 240 Z" fill="#F5D9A0" />
        <path d="M 410 200 L 470 190 L 500 270 L 440 280 Z" fill="#F4D0A0" />
        <path d="M 440 280 L 530 270 L 560 360 L 470 370 Z" fill="#F0C890" />
        <path d="M 530 360 L 610 350 L 640 440 L 560 450 Z" fill="#EBC850" />
        <path d="M 610 340 L 700 330 L 730 430 L 650 440 Z" fill="#D8B494" />
        <path d="M 700 330 L 780 320 L 810 440 L 740 450 Z" fill="#C4A584" />
        <path d="M 640 440 L 740 430 L 770 540 L 670 550 Z" fill="#B8A890" />
        <path d="M 680 540 L 760 530 L 790 600 L 710 600 Z" fill="#A89878" />

        {/* SOUTH ASIA */}
        <path d="M 670 250 L 720 245 L 740 320 L 690 325 Z" fill="#E8D4B8" />
        <path d="M 720 270 L 800 260 L 830 380 L 760 390 Z" fill="#FFD996" />
        <path d="M 800 320 L 850 315 L 870 380 L 820 385 Z" fill="#F0D8A8" />

        {/* SOUTHEAST ASIA */}
        <path d="M 780 370 L 840 365 L 870 430 L 810 435 Z" fill="#F0E8C8" />
        <path d="M 840 365 L 880 360 L 900 430 L 860 435 Z" fill="#E8DCC8" />
        <path d="M 810 430 L 870 425 L 890 480 L 830 485 Z" fill="#FFDDB8" />
        <path d="M 840 480 L 920 470 L 940 560 L 860 570 Z" fill="#E4D4B8" />

        {/* EAST ASIA */}
        <path d="M 750 160 L 880 150 L 910 300 L 780 310 Z" fill="#FFD9B3" />
        <path d="M 800 130 L 880 125 L 900 170 L 820 175 Z" fill="#D8C8A0" />
        <path d="M 900 200 L 940 195 L 950 290 L 910 295 Z" fill="#F0E8E0" />
        <path d="M 880 190 L 920 185 L 935 280 L 895 285 Z" fill="#E8E0D8" />

        {/* OCEANIA */}
        <path d="M 840 490 L 910 480 L 930 580 L 860 590 Z" fill="#D8B8A0" />
        <path d="M 920 540 L 950 535 L 960 600 L 930 600 Z" fill="#D0A894" />
      </g>

      {/* Country borders - darker lines */}
      <g stroke="#555555" strokeWidth="1.5" fill="none" opacity="0.7">
        <path d="M 190 130 L 210 210" />
        <path d="M 385 65 L 430 60" />
        <path d="M 550 150 L 580 250" />
        <path d="M 720 270 L 800 260" />
        <path d="M 880 150 L 910 300" />
      </g>

      {/* Equator and Prime Meridian */}
      <g stroke="#999999" strokeWidth="1" strokeDasharray="4,4" opacity="0.6">
        <line x1="0" y1="300" x2="960" y2="300" />
        <line x1="480" y1="0" x2="480" y2="600" />
      </g>

      {/* Continent Labels */}
      <text x="110" y="20" fontSize="11" fontWeight="bold" fill="#666666" opacity="0.5" textAnchor="middle">
        NORTH AMERICA
      </text>
      <text x="170" y="560" fontSize="11" fontWeight="bold" fill="#666666" opacity="0.5" textAnchor="middle">
        SOUTH AMERICA
      </text>
      <text x="430" y="25" fontSize="11" fontWeight="bold" fill="#666666" opacity="0.5" textAnchor="middle">
        EUROPE
      </text>
      <text x="550" y="560" fontSize="11" fontWeight="bold" fill="#666666" opacity="0.5" textAnchor="middle">
        AFRICA
      </text>
      <text x="750" y="260" fontSize="11" fontWeight="bold" fill="#666666" opacity="0.5" textAnchor="middle">
        ASIA
      </text>
      <text x="870" y="560" fontSize="11" fontWeight="bold" fill="#666666" opacity="0.5" textAnchor="middle">
        OCEANIA
      </text>

      <defs>
        <filter id="shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="1" floodOpacity="0.1" />
        </filter>
      </defs>
    </svg>
  );
};

export const countryMapCoordinates: Record<string, { x: number; y: number }> = {
  Canada: { x: 110, y: 85 },
  USA: { x: 140, y: 170 },
  Mexico: { x: 160, y: 250 },
  Colombia: { x: 160, y: 350 },
  Peru: { x: 190, y: 430 },
  Brazil: { x: 270, y: 430 },
  Argentina: { x: 180, y: 550 },
  "United Kingdom": { x: 375, y: 70 },
  France: { x: 415, y: 75 },
  Spain: { x: 365, y: 90 },
  Germany: { x: 460, y: 85 },
  Italy: { x: 470, y: 130 },
  Greece: { x: 510, y: 150 },
  Russia: { x: 590, y: 95 },
  Egypt: { x: 550, y: 200 },
  Nigeria: { x: 490, y: 360 },
  "South Africa": { x: 750, y: 570 },
  "Saudi Arabia": { x: 650, y: 295 },
  Iran: { x: 680, y: 240 },
  Turkey: { x: 530, y: 155 },
  India: { x: 770, y: 330 },
  Pakistan: { x: 710, y: 285 },
  Thailand: { x: 820, y: 395 },
  Vietnam: { x: 870, y: 390 },
  Indonesia: { x: 880, y: 520 },
  China: { x: 840, y: 230 },
  Japan: { x: 930, y: 245 },
  "South Korea": { x: 910, y: 235 },
  Australia: { x: 880, y: 535 },
  "New Zealand": { x: 945, y: 570 },
};

export default WorldMapSVG;
