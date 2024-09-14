import Aura from "@primevue/themes/aura";
import image from "@rollup/plugin-image";
import type { NitroConfig } from "nitropack";
import type { NuxtConfig } from "nuxt/schema";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  experimental: {
    componentIslands: true,
  },
  sitemap: {
    exclude: ["/admin/**"],
    // @nuxtjs/sitemap的server端$fetch没有携带event，请求sources会报错，所以使用patch-package修复
    sitemaps: {
      pages: {
        includeAppSources: true,
      },
      articles: {
        sources: [`/api/__sitemap__/urls/articles`],
      },
    },
  },
  app: {
    head: {
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/sharer.js@0.5.2/sharer.min.js",
          defer: true,
        },
      ],
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
  css: ["~/assets/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  nitro: {
    preset: "cloudflare-pages",
    experimental: {
      wasm: true,
    },
    rollupConfig: {
      plugins: [image()],
    },
  } as NitroConfig,
  modules: [
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "nitro-cloudflare-dev",
    "@primevue/nuxt-module",
    "@nuxt/eslint",
    "nuxt-svgo-loader",
    "@vee-validate/nuxt",
    "@formkit/auto-animate/nuxt",
    "@nuxtjs/leaflet",
    "@nuxt/icon",
    "@nuxtjs/sitemap",
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
  i18n: {
    vueI18n: "./i18n.config.ts",
    locales: ["en", "zh"],
    defaultLocale: "en",
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      redirectOn: "all",
    },
  },
  runtimeConfig: {
    adminUsername: "admin@example.com",
    adminPassword: "123456",
    public: {
      siteName: "Compilesoul",
    },
  },
} as NuxtConfig);
