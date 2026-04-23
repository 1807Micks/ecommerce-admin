import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // backend port
        changeOrigin: true, // ✅ makes sure host header matches target
        secure: false, // ✅ ignore self-signed certs if using HTTPS locally
      },
    },
  },
});
