<<<<<<< HEAD
import path from "path"
import react from "@vitejs/plugin-react"
import eslint from 'vite-plugin-eslint';
import { defineConfig } from "vite"
 
export default defineConfig({
  plugins: [react(),eslint()],
=======
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
>>>>>>> 44963550beaf6bc1e5082599960ec462d6ac7308
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
<<<<<<< HEAD
})
=======
  build: {
    outDir: "dist", // 👈 Ensures dist is created in the root
    emptyOutDir: true, // 👈 Clears previous builds
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
>>>>>>> 44963550beaf6bc1e5082599960ec462d6ac7308
