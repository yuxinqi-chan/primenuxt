import type { Config } from "tailwindcss";
// @ts-ignore
import tailwindcssPrimeui from "tailwindcss-primeui";
export default {
  darkMode: ["selector", '[class*="app-dark"]'],
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1920px",
    },
  },
  plugins: [tailwindcssPrimeui],
} satisfies Config;
