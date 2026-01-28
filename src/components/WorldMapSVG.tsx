import React from "react";

export const WorldMapSVG = () => {
  return (
    <svg
      viewBox="0 0 1200 800"
      className="w-full h-full"
      style={{ background: "linear-gradient(135deg, #87CEEB 0%, #E0F6FF 100%)" }}
    >
      {/* Ocean/Water - covers entire background */}
      <rect width="1200" height="800" fill="#87CEEB" />

      {/* Grid Lines */}
      <g stroke="#999999" strokeWidth="0.5" opacity="0.2">
        {/* Equator */}
        <line x1="0" y1="400" x2="1200" y2="400" strokeDasharray="5,5" />
        {/* Prime Meridian */}
        <line x1="600" y1="0" x2="600" y2="800" strokeDasharray="5,5" />
      </g>

      {/* Countries with detailed boundaries and colors - matching reference map style */}
      <g stroke="#333333" strokeWidth="1" filter="url(#shadow)">
        {/* NORTH AMERICA */}
        {/* Canada */}
        <path d="M 140 50 L 240 40 L 280 150 L 180 160 L 140 100 Z" fill="#D4E8D4" />
        <text x="180" y="90" fontSize="10" fill="#333333" fontWeight="bold" textAnchor="middle">Canada</text>

        {/* USA */}
        <path d="M 180 160 L 280 150 L 300 230 L 220 240 L 180 200 Z" fill="#FFE4B5" />
        <text x="240" y="195" fontSize="10" fill="#333333" fontWeight="bold" textAnchor="middle">USA</text>

        {/* Mexico */}
        <path d="M 220 240 L 300 230 L 310 310 L 240 320 Z" fill="#E8D4B8" />
        <text x="270" y="270" fontSize="9" fill="#333333" fontWeight="bold" textAnchor="middle">Mexico</text>

        {/* SOUTH AMERICA */}
        {/* Colombia */}
        <path d="M 280 320 L 320 310 L 330 370 L 290 380 Z" fill="#F0D9B8" />
        <text x="305" y="345" fontSize="8" fill="#333333" fontWeight="bold" textAnchor="middle">Colombia</text>

        {/* Venezuela */}
        <path d="M 320 310 L 350 305 L 360 340 L 330 345 Z" fill="#E8D4B8" />

        {/* Brazil */}
        <path d="M 330 380 L 420 360 L 430 500 L 340 510 Z" fill="#FFD700" />
        <text x="375" y="440" fontSize="11" fill="#333333" fontWeight="bold" textAnchor="middle">Brazil</text>

        {/* Peru */}
        <path d="M 280 380 L 330 370 L 340 480 L 290 490 Z" fill="#F4D3A0" />
        <text x="310" y="435" fontSize="9" fill="#333333" fontWeight="bold" textAnchor="middle">Peru</text>

        {/* Argentina */}
        <path d="M 300 500 L 350 490 L 360 600 L 310 620 Z" fill="#E8D4C4" />
        <text x="330" y="555" fontSize="10" fill="#333333" fontWeight="bold" textAnchor="middle">Argentina</text>

        {/* EUROPE */}
        {/* UK & Ireland */}
        <path d="M 480 100 L 510 95 L 515 150 L 485 155 Z" fill="#D4E4F0" />
        <text x="497" y="125" fontSize="8" fill="#333333" fontWeight="bold" textAnchor="middle">UK</text>

        {/* France */}
        <path d="M 510 95 L 560 90 L 575 160 L 520 165 Z" fill="#E8D4F0" />
        <text x="540" y="130" fontSize="9" fill="#333333" fontWeight="bold" textAnchor="middle">France</text>

        {/* Spain */}
        <path d="M 460 130 L 510 125 L 520 170 L 470 180 Z" fill="#F0E4D0" />
        <text x="490" y="155" fontSize="9" fill="#333333" fontWeight="bold" textAnchor="middle">Spain</text>

        {/* Germany */}
        <path d="M 560 85 L 610 80 L 625 140 L 575 150 Z" fill="#D4D4E8" />
        <text x="590" y="115" fontSize="9" fill="#333333" fontWeight="bold" textAnchor="middle">Germany</text>

        {/* Italy */}
        <path d="M 570 140 L 600 135 L 610 210 L 580 215 Z" fill="#F0D4B8" />
        <text x="590" y="175" fontSize="9" fill="#333333" fontWeight="bold" textAnchor="middle">Italy</text>

        {/* Greece */}
        <path d="M 610 155 L 640 150 L 650 205 L 620 210 Z" fill="#E8D4D8" />
        <text x="630" y="180" fontSize="8" fill="#333333" fontWeight="bold" textAnchor="middle">Greece</text>

        {/* Russia */}
        <path d="M 610 50 L 750 40 L 780 160 L 650 170 Z" fill="#D4D4B0" />
        <text x="700" y="100" fontSize="11" fill="#333333" fontWeight="bold" textAnchor="middle">Russia</text>

        {/* AFRICA */}
        {/* Egypt & North Africa */}
        <path d="M 640 150 L 720 140 L 740 220 L 660 240 Z" fill="#E8C87C" />
        <text x="695" y="190" fontSize="9" fill="#333333" fontWeight="bold" textAnchor="middle">Egypt</text>

        {/* Nigeria */}
        <path d="M 620 280 L 680 270 L 700 380 L 640 390 Z" fill="#F4C860" />
        <text x="660" y="335" fontSize="9" fill="#333333" fontWeight="bold" textAnchor="middle">Nigeria</text>

        {/* Central Africa */}
        <path d="M 680 300 L 780 280 L 800 420 L 700 430 Z" fill="#D8B494" />
        <text x="740" y="360" fontSize="8" fill="#333333" fontWeight="bold" textAnchor="middle">Central Africa</text>

        {/* East Africa */}
        <path d="M 780 320 L 850 300 L 870 460 L 800 470 Z" fill="#C4A584" />
        <text x="825" y="390" fontSize="9" fill="#333333" fontWeight="bold" textAnchor="middle">East Africa</text>

        {/* Southern Africa */}
        <path d="M 720 440 L 820 420 L 840 580 L 740 590 Z" fill="#B8A890" />
        <text x="780" y="505" fontSize="10" fill="#333333" fontWeight="bold" textAnchor="middle">South Africa</text>

        {/* MIDDLE EAST & WESTERN ASIA */}
        {/* Saudi Arabia */}
        <path d="M 700 220 L 780 210 L 800 330 L 720 340 Z" fill="#E8D4A8" />
        <text x="750" y="280" fontSize="9" fill="#333333" fontWeight="bold" textAnchor="middle">Saudi Arabia</text>

        {/* Iran */}
        <path d="M 780 200 L 850 190 L 870 300 L 800 310 Z" fill="#D8C8A8" />
        <text x="820" y="250" fontSize="8" fill="#333333" fontWeight="bold" textAnchor="middle">Iran</text>

        {/* Turkey */}
        <path d="M 650 140 L 700 135 L 720 200 L 670 210 Z" fill="#E8D4B8" />
        <text x="685" y="170" fontSize="8" fill="#333333" fontWeight="bold" textAnchor="middle">Turkey</text>

        {/* SOUTH ASIA */}
        {/* India */}
        <path d="M 820 280 L 900 270 L 920 420 L 840 430 Z" fill="#FFD996" />
        <text x="870" y="350" fontSize="11" fill="#333333" fontWeight="bold" textAnchor="middle">India</text>

        {/* Pakistan */}
        <path d="M 800 250 L 850 240 L 860 310 L 810 320 Z" fill="#E8D4B8" />
        <text x="830" y="280" fontSize="8" fill="#333333" fontWeight="bold" textAnchor="middle">Pakistan</text>

        {/* SOUTHEAST ASIA */}
        {/* Thailand */}
        <path d="M 920 330 L 970 320 L 990 410 L 940 420 Z" fill="#F0E8C8" />
        <text x="955" y="375" fontSize="8" fill="#333333" fontWeight="bold" textAnchor="middle">Thailand</text>

        {/* Vietnam */}
        <path d="M 970 310 L 1000 305 L 1010 390 L 980 395 Z" fill="#E8DCC8" />
        <text x="990" y="350" fontSize="8" fill="#333333" fontWeight="bold" textAnchor="middle">Vietnam</text>

        {/* Indonesia */}
        <path d="M 950 420 L 1030 410 L 1050 500 L 970 510 Z" fill="#E4D4B8" />
        <text x="1000" y="460" fontSize="9" fill="#333333" fontWeight="bold" textAnchor="middle">Indonesia</text>

        {/* EAST ASIA */}
        {/* China */}
        <path d="M 850 150 L 960 140 L 990 290 L 880 300 Z" fill="#FFD9B3" />
        <text x="920" y="215" fontSize="11" fill="#333333" fontWeight="bold" textAnchor="middle">China</text>

        {/* Japan */}
        <path d="M 1020 160 L 1070 155 L 1080 240 L 1030 245 Z" fill="#F0E8E0" />
        <text x="1050" y="200" fontSize="9" fill="#333333" fontWeight="bold" textAnchor="middle">Japan</text>

        {/* South Korea */}
        <path d="M 980 170 L 1020 165 L 1030 230 L 990 235 Z" fill="#E8E0D8" />
        <text x="1005" y="200" fontSize="8" fill="#333333" fontWeight="bold" textAnchor="middle">S. Korea</text>

        {/* OCEANIA */}
        {/* Australia */}
        <path d="M 1000 480 L 1080 470 L 1095 620 L 1015 630 Z" fill="#D8B8A0" />
        <text x="1050" y="550" fontSize="11" fill="#333333" fontWeight="bold" textAnchor="middle">Australia</text>

        {/* New Zealand */}
        <path d="M 1100 560 L 1140 555 L 1150 670 L 1110 675 Z" fill="#D0A894" />
        <text x="1125" y="615" fontSize="9" fill="#333333" fontWeight="bold" textAnchor="middle">New Zealand</text>
      </g>

      {/* Continent labels */}
      <text x="180" y="30" fontSize="14" fill="#333333" fontWeight="700" opacity="0.4" textAnchor="middle">
        NORTH AMERICA
      </text>
      <text x="310" y="570" fontSize="14" fill="#333333" fontWeight="700" opacity="0.4" textAnchor="middle">
        SOUTH AMERICA
      </text>
      <text x="550" y="80" fontSize="14" fill="#333333" fontWeight="700" opacity="0.4" textAnchor="middle">
        EUROPE
      </text>
      <text x="700" y="620" fontSize="14" fill="#333333" fontWeight="700" opacity="0.4" textAnchor="middle">
        AFRICA
      </text>
      <text x="900" y="250" fontSize="14" fill="#333333" fontWeight="700" opacity="0.4" textAnchor="middle">
        ASIA
      </text>
      <text x="1050" y="750" fontSize="14" fill="#333333" fontWeight="700" opacity="0.4" textAnchor="middle">
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
  Mexico: { x: 270, y: 275 },
  Colombia: { x: 305, y: 345 },
  Peru: { x: 310, y: 435 },
  Brazil: { x: 375, y: 440 },
  Argentina: { x: 330, y: 555 },
  "United Kingdom": { x: 497, y: 125 },
  France: { x: 540, y: 130 },
  Spain: { x: 490, y: 155 },
  Germany: { x: 590, y: 115 },
  Italy: { x: 590, y: 175 },
  Greece: { x: 630, y: 180 },
  Russia: { x: 700, y: 100 },
  Egypt: { x: 695, y: 190 },
  Nigeria: { x: 660, y: 335 },
  "South Africa": { x: 780, y: 505 },
  "Saudi Arabia": { x: 750, y: 280 },
  Iran: { x: 820, y: 250 },
  Turkey: { x: 685, y: 170 },
  India: { x: 870, y: 350 },
  Pakistan: { x: 830, y: 280 },
  Thailand: { x: 955, y: 375 },
  Vietnam: { x: 990, y: 350 },
  Indonesia: { x: 1000, y: 460 },
  China: { x: 920, y: 215 },
  Japan: { x: 1050, y: 200 },
  "South Korea": { x: 1005, y: 200 },
  Australia: { x: 1050, y: 550 },
  "New Zealand": { x: 1125, y: 615 },
};

export default WorldMapSVG;
