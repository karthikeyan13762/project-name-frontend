import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Changing port 5174 to 3000

  // server: {
  //   port: 3000,
  // },
  server: {
    proxy: {
      "/api": "https://project-name-backend-dcqp.onrender.com",
      "/upload": "https://project-name-backend-dcqp.onrender.com",
    },
  },
});
