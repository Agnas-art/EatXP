import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "/EatXP/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React core - MUST come first
          if (id.includes('react/') || id.includes('react-dom/') || (id.includes('node_modules') && /react(@|\\)/.test(id))) {
            return 'vendor-react';
          }
          // Three.js - heavy, separate chunk, doesn't depend on React
          if (id.includes('three')) {
            return 'vendor-three';
          }
          // ALL remaining dependencies - they all depend on React
          // Keep them in a single chunk that loads after React
          if (id.includes('node_modules')) {
            return 'vendor-libs';
          }
        }
      }
    }
  }
});
