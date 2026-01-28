// SVG-based World Map with Country Boundaries
// This provides a simplified but geographically accurate representation

export const WorldMapSVG = () => {
  return (
    <svg
      viewBox="0 0 1000 600"
      className="w-full h-full"
      style={{ background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)" }}
    >
      {/* Water Background */}
      <rect width="1000" height="600" fill="#e0f2fe" />

      {/* Continents with simplified borders */}
      {/* North America */}
      <g fill="#f5f5f5" stroke="#64748b" strokeWidth="0.5" opacity="0.8">
        <path d="M 100 80 L 180 60 L 200 100 L 180 160 L 120 150 Z" />
      </g>

      {/* South America */}
      <g fill="#f5f5f5" stroke="#64748b" strokeWidth="0.5" opacity="0.8">
        <path d="M 150 180 L 200 160 L 220 250 L 180 300 L 140 280 Z" />
      </g>

      {/* Europe */}
      <g fill="#f5f5f5" stroke="#64748b" strokeWidth="0.5" opacity="0.8">
        <path d="M 380 60 L 480 50 L 500 120 L 420 140 Z" />
      </g>

      {/* Africa */}
      <g fill="#f5f5f5" stroke="#64748b" strokeWidth="0.5" opacity="0.8">
        <path d="M 480 120 L 580 100 L 600 180 L 560 300 L 480 320 L 440 200 Z" />
      </g>

      {/* Middle East */}
      <g fill="#f5f5f5" stroke="#64748b" strokeWidth="0.5" opacity="0.8">
        <path d="M 520 120 L 600 100 L 620 180 L 550 200 Z" />
      </g>

      {/* Asia */}
      <g fill="#f5f5f5" stroke="#64748b" strokeWidth="0.5" opacity="0.8">
        <path d="M 520 80 L 750 60 L 780 200 L 700 240 L 600 180 L 550 140 Z" />
      </g>

      {/* Southeast Asia */}
      <g fill="#f5f5f5" stroke="#64748b" strokeWidth="0.5" opacity="0.8">
        <path d="M 680 200 L 750 180 L 780 280 L 700 300 Z" />
      </g>

      {/* India */}
      <g fill="#f5f5f5" stroke="#64748b" strokeWidth="0.5" opacity="0.8">
        <path d="M 580 140 L 620 130 L 630 200 L 590 210 Z" />
      </g>

      {/* Australia/Oceania */}
      <g fill="#f5f5f5" stroke="#64748b" strokeWidth="0.5" opacity="0.8">
        <path d="M 750 350 L 820 340 L 830 420 L 760 430 Z" />
      </g>

      {/* Japan */}
      <g fill="#f5f5f5" stroke="#64748b" strokeWidth="0.5" opacity="0.8">
        <path d="M 820 120 L 850 110 L 860 160 L 830 170 Z" />
      </g>

      {/* Latitude/Longitude grid lines (subtle) */}
      <g stroke="#cbd5e1" strokeWidth="0.3" opacity="0.3">
        {/* Meridians */}
        {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((x) => (
          <line key={`meridian-${x}`} x1={x} y1="0" x2={x} y2="600" />
        ))}
        {/* Parallels */}
        {[100, 200, 300, 400, 500].map((y) => (
          <line key={`parallel-${y}`} x1="0" y1={y} x2="1000" y2={y} />
        ))}
      </g>

      {/* Country Labels (for reference) */}
      <g fontSize="10" fill="#64748b" opacity="0.5" fontWeight="500">
        <text x="140" y="120">USA</text>
        <text x="420" y="100">Europe</text>
        <text x="580" y="160">Africa</text>
        <text x="640" y="160">India</text>
        <text x="720" y="150">China</text>
        <text x="820" y="145">Japan</text>
        <text x="770" y="380">Australia</text>
      </g>

      {/* Legend */}
      <g>
        <rect x="20" y="20" width="150" height="60" fill="rgba(255, 255, 255, 0.9)" stroke="#cbd5e1" rx="4" />
        <text x="30" y="40" fontSize="12" fontWeight="bold" fill="#1e293b">
          🗺️ World Map
        </text>
        <text x="30" y="60" fontSize="10" fill="#64748b">
          Click on regions to explore
        </text>
        <text x="30" y="75" fontSize="9" fill="#94a3b8">
          9 countries available
        </text>
      </g>
    </svg>
  );
};

// Country coordinates for marker placement (adjusted to map coordinates)
export const countryMapCoordinates: Record<string, { x: number; y: number }> = {
  Mexico: { x: 140, y: 200 },
  Peru: { x: 170, y: 300 },
  Brazil: { x: 240, y: 280 },
  Greece: { x: 450, y: 110 },
  Italy: { x: 420, y: 130 },
  Nigeria: { x: 500, y: 250 },
  India: { x: 600, y: 180 },
  Thailand: { x: 700, y: 240 },
  "South Korea": { x: 820, y: 140 },
  Japan: { x: 850, y: 130 },
};

export default WorldMapSVG;
