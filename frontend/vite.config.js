import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Forward API calls to the Express backend during development
      "/api": {
        target: "https://login-expressjs.onrender.com/",
        changeOrigin: true,
      },
    },
  },
});
