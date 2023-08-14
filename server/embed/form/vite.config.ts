import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "form-embed.js",
        assetFileNames: "assets/form-embed.[ext]",
        // other output options...
      },
    },
  },
});
