import React from "react";

export const WorldMapSVG = () => {
  return (
    <svg
      viewBox="0 0 1200 800"
      className="w-full h-full"
      style={{ background: "linear-gradient(135deg, #0f4c81 0%, #051e3e 100%)" }}
    >
      {/* Ocean/Water - covers entire background */}
      <rect width="1200" height="800" fill="#0f4c81" />

      {/* Subtle ocean wave pattern */}
      <defs>
        <pattern id="waves" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path
            d="M0,50 Q25,40 50,50 T100,50"
            stroke="#64748b"
            strokeWidth="1"
            fill="none"
            opacity="0.05"
          />
        </pattern>
        <filter id="shadow">
          <feDropShadow dx="1" dy="1" stdDeviation="2" floodOpacity="0.2" />
        </filter>
      </defs>
      <rect width="1200" height="800" fill="url(#waves)" />

      {/* Grid Lines */}
      <g stroke="#64748b" strokeWidth="0.5" opacity="0.1">
        {/* Equator */}
        <line x1="0" y1="400" x2="1200" y2="400" strokeDasharray="10,5" />
        {/* Prime Meridian */}
        <line x1="600" y1="0" x2="600" y2="800" strokeDasharray="10,5" />
      </g>

      {/* Countries with accurate boundaries - using AuthaGraph-inspired individual country shapes */}
      <g fill="#f5f1e8" stroke="#8b7d6b" strokeWidth="0.8" filter="url(#shadow)">
        {/* NORTH AMERICA */}
        {/* Canada */}
        <path
          d="M 140 80 L 220 70 L 240 140 L 180 160 L 140 120 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />
        {/* USA */}
        <path
          d="M 180 160 L 240 140 L 270 200 L 220 220 L 180 200 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />
        {/* Mexico */}
        <path
          d="M 220 220 L 270 200 L 280 280 L 230 290 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />

        {/* SOUTH AMERICA */}
        {/* Colombia */}
        <path
          d="M 300 320 L 340 310 L 350 360 L 310 370 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />
        {/* Brazil */}
        <path
          d="M 340 310 L 420 300 L 450 480 L 380 500 L 340 400 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />
        {/* Peru */}
        <path
          d="M 300 380 L 340 370 L 350 480 L 310 490 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />

        {/* EUROPE */}
        {/* UK & Ireland */}
        <path
          d="M 480 110 L 510 105 L 515 160 L 485 165 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />
        {/* France */}
        <path
          d="M 510 110 L 560 100 L 575 170 L 520 175 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />
        {/* Spain */}
        <path
          d="M 460 140 L 510 130 L 520 190 L 470 200 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />
        {/* Italy */}
        <path
          d="M 560 150 L 590 145 L 600 220 L 570 225 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />
        {/* Germany */}
        <path
          d="M 560 100 L 610 90 L 625 150 L 575 160 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />
        {/* Greece */}
        <path
          d="M 600 170 L 640 165 L 650 220 L 610 225 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />

        {/* AFRICA */}
        {/* Egypt & North Africa */}
        <path
          d="M 640 160 L 720 150 L 740 240 L 660 250 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />
        {/* West Africa */}
        <path
          d="M 600 260 L 680 250 L 700 380 L 620 390 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />
        {/* Central Africa */}
        <path
          d="M 680 280 L 780 270 L 800 400 L 700 410 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />
        {/* East Africa */}
        <path
          d="M 780 300 L 850 290 L 870 450 L 800 460 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />
        {/* Southern Africa */}
        <path
          d="M 720 420 L 820 410 L 840 580 L 740 590 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />

        {/* MIDDLE EAST & WESTERN ASIA */}
        {/* Turkey & Middle East */}
        <path
          d="M 650 180 L 710 170 L 730 280 L 670 290 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />

        {/* SOUTH ASIA */}
        {/* India */}
        <path
          d="M 750 280 L 820 270 L 840 380 L 770 390 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />

        {/* EAST ASIA */}
        {/* China region */}
        <path
          d="M 820 150 L 920 140 L 950 280 L 850 290 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />
        {/* Southeast Asia region */}
        <path
          d="M 880 290 L 950 280 L 970 380 L 900 390 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />
        {/* Thailand */}
        <path
          d="M 880 320 L 930 310 L 945 380 L 895 390 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />
        {/* Japan */}
        <path
          d="M 1000 160 L 1050 155 L 1060 230 L 1010 235 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />
        {/* South Korea */}
        <path
          d="M 960 170 L 1000 165 L 1010 220 L 970 225 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />

        {/* OCEANIA */}
        {/* Australia */}
        <path
          d="M 1000 480 L 1080 470 L 1095 600 L 1015 610 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />
        {/* New Zealand */}
        <path
          d="M 1100 560 L 1140 555 L 1150 650 L 1110 655 Z"
          className="hover:fill-orange-300 cursor-pointer transition-colors"
        />
      </g>

      {/* Country boundary enhancement - subtle inner shading */}
      <g stroke="#a89968" strokeWidth="0.3" opacity="0.15" fill="none">
        {/* Regional borders */}
        <path d="M 330 270 L 350 320 L 310 330 Z" />
        <path d="M 600 160 L 650 190 L 620 220 Z" />
        <path d="M 800 270 L 850 300 L 820 350 Z" />
      </g>

      {/* Continent Region Labels - very subtle */}
      <text x="180" y="50" fontSize="12" fill="#666" fontWeight="600" opacity="0.3">
        NORTH AMERICA
      </text>
      <text x="300" y="240" fontSize="12" fill="#666" fontWeight="600" opacity="0.3">
        SOUTH AMERICA
      </text>
      <text x="520" y="100" fontSize="12" fill="#666" fontWeight="600" opacity="0.3">
        EUROPE
      </text>
      <text x="660" y="330" fontSize="12" fill="#666" fontWeight="600" opacity="0.3">
        AFRICA
      </text>
      <text x="850" y="200" fontSize="12" fill="#666" fontWeight="600" opacity="0.3">
        ASIA
      </text>
      <text x="1020" y="540" fontSize="12" fill="#666" fontWeight="600" opacity="0.3">
        OCEANIA
      </text>
    </svg>
  );
};

// Country coordinates mapped to individual country SVG paths for accurate positioning
export const countryMapCoordinates: Record<string, { x: number; y: number }> = {
  Mexico: { x: 255, y: 255 },
  Colombia: { x: 320, y: 345 },
  Peru: { x: 320, y: 435 },
  Brazil: { x: 380, y: 405 },
  "South Korea": { x: 990, y: 195 },
  Japan: { x: 1025, y: 195 },
  India: { x: 795, y: 335 },
  Thailand: { x: 910, y: 355 },
};

export default WorldMapSVG;

