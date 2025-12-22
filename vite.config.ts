import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

// Network configuration - allows access from multiple networks
// HTTPS configuration for development
const getHttpsConfig = () => {
  const keyPath = path.resolve(__dirname, "./ssl/key.pem");
  const certPath = path.resolve(__dirname, "./ssl/cert.pem");
  
  if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    return {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    };
  }
  return true; // Fall back to auto-generated certificates
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 5173,
    https: false,
    allowedHosts: "all",
    hmr: {
      protocol: "http",
      host: "192.168.29.225",
      port: 5173,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
