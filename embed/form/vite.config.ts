import resolve from "@rollup/plugin-node-resolve";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    {
      ...resolve({
        preferBuiltins: false,
        browser: true,
      }),
      enforce: "pre",
      apply: "build",
    },
  ],
  publicDir: "public",
});
