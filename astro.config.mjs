import { defineConfig } from "astro/config";
import tailwind from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  vite: {
    plugins: [
      tailwind(),

      VitePWA({
        registerType: "autoUpdate",

        manifest: {
          name: "Qaleta",
          short_name: "Qaleta",

          description:
            "Sistema de control de ventas y gastos",

          theme_color: "#111827",
          background_color: "#111827",

          display: "standalone",
          start_url: "/dashboard.astro",

          icons: [
            {
              src: "/qaleta.jpg",
              sizes: "192x192",
              type: "image/jpg",
            },
            {
              src: "/qaleta.jpg",
              sizes: "512x512",
              type: "image/jpg",
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