import { defineConfig } from "astro/config";
import tailwind from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "server",           // ← Indica que usas SSR
  adapter: vercel(),          // ← Adaptador para Vercel
  vite: {
    plugins: [
      tailwind(),
      VitePWA({
        registerType: "autoUpdate",
        manifest: {
          name: "Qaleta",
          short_name: "Qaleta",
          description: "Sistema de control de ventas y gastos",
          theme_color: "#111827",
          background_color: "#111827",
          display: "standalone",
          start_url: "/dashboard",
          icons: [
            {
              src: "/icon-192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/icon-512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
        devOptions: {
          enabled: true,
        },
      }),
    ],
  },
});