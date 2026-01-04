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
    chunkSizeWarningLimit: 1000, // Suppress false warnings for expected large chunks
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor libraries into separate chunks
          if (id.includes('node_modules')) {
            if (id.includes('three')) return 'vendor-three';
            if (id.includes('framer-motion')) return 'vendor-framer';
            if (id.includes('react') || id.includes('@react')) return 'vendor-react';
            if (id.includes('@radix-ui')) return 'vendor-ui';
            if (id.includes('clsx') || id.includes('date-fns') || id.includes('tailwind-merge')) return 'vendor-utils';
            return 'vendor-others';
          }
          
          // Split main components
          if (id.includes('VoiceBot.tsx')) return 'voicebot';
          if (id.includes('AnimeCharacter')) return 'anime-character';
          if (id.includes('games/')) return 'games';
        }
      }
    }
  }
});
