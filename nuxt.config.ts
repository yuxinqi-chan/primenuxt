import Aura from "@primevue/themes/aura";
import image from "@rollup/plugin-image";
import type { NitroConfig } from "nitropack";
import type { NuxtConfig } from "nuxt/schema";

const nitroConfig = {
  preset: "cloudflare-pages",
  experimental: {
    wasm: true,
  },
  rollupConfig: {
    plugins: [image()],
  },
} as NitroConfig;

const config = {
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  experimental: {
    componentIslands: true,
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.cdnfonts.com/css/lato",
        },
      ],
    },
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },
  css: ["~/assets/styles.scss", "~/assets/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  nitro: nitroConfig,
  modules: [
    "nitro-cloudflare-dev",
    "@primevue/nuxt-module",
    "@nuxt/eslint",
    "nuxt-svgo-loader",
    "@vee-validate/nuxt",
    "@formkit/auto-animate/nuxt",
    "@nuxtjs/leaflet",
  ],
  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: ".app-dark",
          cssLayer: {
            name: "primevue",
            order: "tailwind-base, primevue, tailwind-utilities",
          },
        },
      },
    },
  },
  runtimeConfig: {
    adminUsername: "admin@example.com",
    adminPassword: "123456",
  },
} as NuxtConfig;
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig(config);
