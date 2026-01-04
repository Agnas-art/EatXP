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
  optimize: {
    deps: {
      include: [
        'react',
        'react-dom',
        '@radix-ui/react-dialog',
        '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-select',
        'framer-motion',
        'class-variance-authority',
      ]
    }
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Three.js - heavy, separate chunk, doesn't depend on React
          if (id.includes('three')) {
            return 'vendor-three';
          }
          // Keep React and all React-dependent code together in one vendor chunk
          // This ensures React is available when dependent modules load
          if (id.includes('node_modules')) {
            return 'vendor-libs';
          }
        }
      }
    }
  }
});
