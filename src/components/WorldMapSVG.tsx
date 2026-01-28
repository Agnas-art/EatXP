// Realistic SVG World Map with Continents, Oceans, and Country Borders

export const WorldMapSVG = () => {
  return (
    <svg
      viewBox="0 0 1200 800"
      className="w-full h-full"
      style={{
        background: "#1e40af",
      }}
    >
      {/* Ocean/Water - covers entire background */}
      <rect width="1200" height="800" fill="#1e40af" />

      {/* Subtle ocean wave pattern */}
      <defs>
        <pattern id="ocean" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          <circle cx="50" cy="50" r="30" fill="rgba(255, 255, 255, 0.02)" />
          <circle cx="150" cy="150" r="30" fill="rgba(255, 255, 255, 0.02)" />
        </pattern>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="1" dy="1" stdDeviation="1" floodOpacity="0.3" />
        </filter>
      </defs>
      <rect width="1200" height="800" fill="url(#ocean)" />

      {/* NORTH AMERICA */}
      <g fill="#e8e8e0" stroke="#666" strokeWidth="0.5" filter="url(#shadow)">
        {/* Canada */}
        <path d="M 150 100 L 280 80 L 300 150 L 200 170 L 150 150 Z" />
        {/* USA */}
        <path d="M 180 180 L 280 160 L 300 250 L 200 260 Z" />
        {/* Mexico */}
        <path d="M 180 260 L 220 250 L 230 320 L 190 320 Z" />
      </g>

      {/* SOUTH AMERICA */}
      <g fill="#e8e8e0" stroke="#666" strokeWidth="0.5" filter="url(#shadow)">
        {/* Colombia/Venezuela */}
        <path d="M 220 330 L 260 320 L 270 380 L 230 380 Z" />
        {/* Brazil */}
        <path d="M 260 340 L 340 320 L 360 500 L 270 510 Z" />
        {/* Peru */}
        <path d="M 220 380 L 260 370 L 270 500 L 230 510 Z" />
        {/* Argentina/Chile */}
        <path d="M 230 510 L 280 500 L 300 650 L 250 660 Z" />
      </g>

      {/* EUROPE */}
      <g fill="#e8e8e0" stroke="#666" strokeWidth="0.5" filter="url(#shadow)">
        {/* UK/Ireland */}
        <path d="M 480 120 L 510 110 L 520 160 L 490 160 Z" />
        {/* France */}
        <path d="M 510 140 L 550 130 L 560 180 L 510 180 Z" />
        {/* Spain */}
        <path d="M 490 170 L 520 160 L 530 220 L 500 220 Z" />
        {/* Italy */}
        <path d="M 560 160 L 590 150 L 600 220 L 570 230 Z" />
        {/* Germany/Central Europe */}
        <path d="M 540 120 L 600 110 L 620 160 L 560 160 Z" />
        {/* Greece */}
        <path d="M 600 190 L 630 180 L 640 230 L 610 240 Z" />
      </g>

      {/* AFRICA */}
      <g fill="#e8e8e0" stroke="#666" strokeWidth="0.5" filter="url(#shadow)">
        {/* North Africa */}
        <path d="M 520 210 L 650 190 L 680 280 L 530 290 Z" />
        {/* West Africa */}
        <path d="M 520 290 L 580 280 L 600 450 L 540 460 Z" />
        {/* Central Africa */}
        <path d="M 580 290 L 680 280 L 720 480 L 600 470 Z" />
        {/* East Africa */}
        <path d="M 680 300 L 740 290 L 780 500 L 720 510 Z" />
        {/* Southern Africa */}
        <path d="M 650 480 L 750 470 L 760 650 L 680 660 Z" />
      </g>

      {/* MIDDLE EAST */}
      <g fill="#e8e8e0" stroke="#666" strokeWidth="0.5" filter="url(#shadow)">
        {/* Saudi Arabia/Gulf */}
        <path d="M 640 220 L 700 210 L 720 320 L 660 330 Z" />
        {/* Iran */}
        <path d="M 700 200 L 760 190 L 780 310 L 720 320 Z" />
      </g>

      {/* ASIA */}
      <g fill="#e8e8e0" stroke="#666" strokeWidth="0.5" filter="url(#shadow)">
        {/* Russia */}
        <path d="M 600 80 L 900 60 L 920 220 L 620 240 Z" />
        {/* Central Asia */}
        <path d="M 700 180 L 800 170 L 820 280 L 720 300 Z" />
        {/* India */}
        <path d="M 780 260 L 840 250 L 860 380 L 800 390 Z" />
        {/* China */}
        <path d="M 820 140 L 950 120 L 980 280 L 860 300 Z" />
        {/* Southeast Asia */}
        <path d="M 880 300 L 950 280 L 980 450 L 900 470 Z" />
      </g>

      {/* JAPAN */}
      <g fill="#e8e8e0" stroke="#666" strokeWidth="0.5" filter="url(#shadow)">
        <path d="M 1000 180 L 1040 170 L 1050 280 L 1010 290 Z" />
      </g>

      {/* SOUTH KOREA */}
      <g fill="#e8e8e0" stroke="#666" strokeWidth="0.5" filter="url(#shadow)">
        <path d="M 980 210 L 1010 200 L 1020 260 L 990 270 Z" />
      </g>

      {/* THAILAND */}
      <g fill="#e8e8e0" stroke="#666" strokeWidth="0.5" filter="url(#shadow)">
        <path d="M 900 340 L 940 330 L 950 420 L 910 430 Z" />
      </g>

      {/* AUSTRALIA/OCEANIA */}
      <g fill="#e8e8e0" stroke="#666" strokeWidth="0.5" filter="url(#shadow)">
        <path d="M 950 550 L 1050 540 L 1070 680 L 970 690 Z" />
      </g>

      {/* NEW ZEALAND */}
      <g fill="#e8e8e0" stroke="#666" strokeWidth="0.5" filter="url(#shadow)">
        <path d="M 1100 650 L 1130 640 L 1140 740 L 1110 750 Z" />
      </g>

      {/* Equator line (subtle reference) */}
      <line x1="0" y1="400" x2="1200" y2="400" stroke="#666" strokeWidth="0.5" opacity="0.3" strokeDasharray="5,5" />

      {/* Prime Meridian line (subtle reference) */}
      <line x1="550" y1="0" x2="550" y2="800" stroke="#666" strokeWidth="0.5" opacity="0.3" strokeDasharray="5,5" />

      {/* Continent Labels for context */}
      <g fontSize="14" fill="#666" opacity="0.4" fontWeight="bold">
        <text x="200" y="150">NORTH</text>
        <text x="200" y="170">AMERICA</text>

        <text x="270" y="450">SOUTH</text>
        <text x="270" y="470">AMERICA</text>

        <text x="540" y="140">EUROPE</text>

        <text x="600" y="380">AFRICA</text>

        <text x="750" y="200">ASIA</text>

        <text x="1000" y="630">AUSTRALIA</text>
      </g>

      {/* Legend/Title */}
      <g>
        <rect x="20" y="20" width="200" height="80" fill="rgba(0, 0, 0, 0.8)" rx="8" />
        <text x="35" y="45" fontSize="16" fontWeight="bold" fill="white">
          🗺️ World Map
        </text>
        <text x="35" y="65" fontSize="12" fill="#e8e8e0">
          Continents & Borders
        </text>
        <text x="35" y="85" fontSize="11" fill="#a0a0a0">
          9 countries featured
        </text>
      </g>

      {/* Ocean current visualization */}
      <g stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" fill="none" opacity="0.3">
        <path d="M 0 200 Q 300 150 600 200 T 1200 200" />
        <path d="M 0 600 Q 300 550 600 600 T 1200 600" />
      </g>
    </svg>
  );
};

// Updated country coordinates for realistic map positions
export const countryMapCoordinates: Record<string, { x: number; y: number }> = {
  Mexico: { x: 210, y: 290 },
  Peru: { x: 245, y: 440 },
  Greece: { x: 620, y: 210 },
  Italy: { x: 580, y: 190 },
  Nigeria: { x: 570, y: 370 },
  India: { x: 810, y: 320 },
  Thailand: { x: 920, y: 380 },
  "South Korea": { x: 1000, y: 230 },
  Japan: { x: 1020, y: 230 },
};

export default WorldMapSVG;

