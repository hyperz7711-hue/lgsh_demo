import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// 데모 모드 - 백엔드 없이 동작 (proxy 없음)
export default defineConfig({
  plugins: [react()],
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3001,
  },
});
