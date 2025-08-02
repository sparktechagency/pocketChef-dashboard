import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "92.205.234.255",
    // host: "10.10.7.47",
    port: 5000,
  },
});
