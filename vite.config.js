import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      stream: "stream-browserify", // Alias stream to stream-browserify
    },
  },
  optimizeDeps: {
    include: ["stream"], // Ensure stream is bundled during development
  },
});
