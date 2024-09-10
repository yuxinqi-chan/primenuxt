import { defineStore } from "pinia";

export const useLayoutStore = defineStore({
  id: "layoutStore",
  state: () => ({
    presets: ["Aura", "Lara"],
    preset: "Aura" as "Aura" | "Lara",
    primary: "emerald",
    surface: "slate",
    darkTheme: false,
    sidebarDrawerVisible: false,
  }),
  actions: {
    toogleDarkTheme() {
      if (!document.startViewTransition) {
        this.executeDarkModeToggle();
        return;
      }
      document.startViewTransition(() => this.executeDarkModeToggle());
    },
    executeDarkModeToggle() {
      this.darkTheme = !this.darkTheme;
      document.documentElement.classList.toggle("app-dark");
    },
  },
});
