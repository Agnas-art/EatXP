import React, { useState } from "react";
import { MapContainer, TileLayer, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface CountryMarker {
  name: string;
  lat: number;
  lng: number;
  emoji: string;
}

const COUNTRY_MARKERS: CountryMarker[] = [
  // North America
  { name: "Canada", lat: 56.1304, lng: -106.3468, emoji: "🍁" },
  { name: "USA", lat: 37.0902, lng: -95.7129, emoji: "🌽" },
  { name: "Mexico", lat: 23.6345, lng: -102.5528, emoji: "🌶️" },
  
  // South America
  { name: "Colombia", lat: 4.5709, lng: -74.2973, emoji: "☕" },
  { name: "Peru", lat: -9.189967, lng: -75.015152, emoji: "🥔" },
  { name: "Brazil", lat: -14.2350, lng: -51.9253, emoji: "🥗" },
  { name: "Argentina", lat: -38.4161, lng: -63.6167, emoji: "🥩" },
  
  // Europe
  { name: "United Kingdom", lat: 55.3781, lng: -3.436, emoji: "🍵" },
  { name: "France", lat: 46.2276, lng: 2.2137, emoji: "🍇" },
  { name: "Spain", lat: 40.463667, lng: -3.74922, emoji: "🍊" },
  { name: "Germany", lat: 51.1657, lng: 10.4515, emoji: "🍺" },
  { name: "Italy", lat: 41.8719, lng: 12.5674, emoji: "🍝" },
  { name: "Greece", lat: 39.0742, lng: 21.8243, emoji: "🫒" },
  { name: "Russia", lat: 61.524, lng: 105.3188, emoji: "🥖" },
  
  // Africa
  { name: "Egypt", lat: 26.8206, lng: 30.8025, emoji: "🌾" },
  { name: "Nigeria", lat: 9.0820, lng: 8.6753, emoji: "🥜" },
  { name: "South Africa", lat: -30.5595, lng: 22.9375, emoji: "🍷" },
  
  // Middle East
  { name: "Saudi Arabia", lat: 23.8859, lng: 45.0792, emoji: "📅" },
  { name: "Iran", lat: 32.4279, lng: 53.6880, emoji: "🍙" },
  { name: "Turkey", lat: 38.9637, lng: 35.2433, emoji: "🍖" },
  
  // South Asia
  { name: "India", lat: 20.5937, lng: 78.9629, emoji: "🍛" },
  { name: "Pakistan", lat: 30.3753, lng: 69.3451, emoji: "🥘" },
  
  // Southeast Asia
  { name: "Thailand", lat: 15.870032, lng: 100.992541, emoji: "🍜" },
  { name: "Vietnam", lat: 14.0583, lng: 108.2772, emoji: "🍲" },
  { name: "Indonesia", lat: -0.7893, lng: 113.9213, emoji: "🥥" },
  
  // East Asia
  { name: "China", lat: 35.8617, lng: 104.1954, emoji: "🥡" },
  { name: "Japan", lat: 36.2048, lng: 138.2529, emoji: "🍣" },
  { name: "South Korea", lat: 35.9078, lng: 127.7669, emoji: "🍱" },
  
  // Oceania
  { name: "Australia", lat: -25.2744, lng: 133.7751, emoji: "🦘" },
  { name: "New Zealand", lat: -40.9006, lng: 174.886, emoji: "🥝" },
];

interface WorldMapProps {
  onCountryClick?: (country: string) => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({ onCountryClick }) => {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-primary/30 shadow-lg">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ width: "100%", height: "100%", minHeight: "400px" }}
        className="z-0"
      >
        {/* OpenStreetMap Tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
        />

        {/* Country Markers */}
        {COUNTRY_MARKERS.map((country) => (
          <Circle
            key={country.name}
            center={[country.lat, country.lng]}
            radius={500000}
            pathOptions={{
              color: "#3b82f6",
              fillColor: "#93c5fd",
              fillOpacity: 0.3,
              weight: 2,
            }}
            eventHandlers={{
              click: () => {
                setSelectedMarker(country.name);
                onCountryClick?.(country.name);
              },
              mouseover: (e) => {
                e.target.setStyle({ fillOpacity: 0.5 });
              },
              mouseout: (e) => {
                e.target.setStyle({ fillOpacity: 0.3 });
              },
            }}
          >
            <Popup className="text-center">
              <div className="font-bold">
                <div className="text-2xl mb-1">{country.emoji}</div>
                <div>{country.name}</div>
              </div>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
};

export default WorldMap;
