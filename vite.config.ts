import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tanstackStart from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: "./src/start.ts",
      },
    },
  },
});
