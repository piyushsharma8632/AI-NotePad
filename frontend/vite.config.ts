import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist", // 👈 Ensures dist is created in the root
    emptyOutDir: true, // 👈 Clears previous builds
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
