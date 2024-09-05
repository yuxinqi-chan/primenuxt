import Aura from "@primevue/themes/aura";
import Lara from "@primevue/themes/lara";

const presets = {
  Aura,
  Lara,
};

const layoutConfig = reactive({
  preset: "Aura" as keyof typeof presets,
  primary: "emerald",
  surface: "slate",
  darkTheme: false,
  menuMode: "static",
});

export function useLayout() {
  const sidebarDrawerVisible = useState("sidebarDrawerVisible", () => false);
  const setPrimary = (value: string) => {
    layoutConfig.primary = value;
  };

  const setSurface = (value: string) => {
    layoutConfig.surface = value;
  };

  const setPreset = (value: keyof typeof presets) => {
    layoutConfig.preset = value;
  };

  const toggleDarkMode = () => {
    if (!document.startViewTransition) {
      executeDarkModeToggle();

      return;
    }

    document.startViewTransition(() => executeDarkModeToggle());
  };

  const executeDarkModeToggle = () => {
    layoutConfig.darkTheme = !layoutConfig.darkTheme;
    document.documentElement.classList.toggle("app-dark");
  };

  const isDarkTheme = computed(() => layoutConfig.darkTheme);

  const getPrimary = computed(() => layoutConfig.primary);

  const getSurface = computed(() => layoutConfig.surface);

  return {
    layoutConfig: readonly(layoutConfig),
    isDarkTheme,
    getPrimary,
    getSurface,
    toggleDarkMode,
    setPrimary,
    setSurface,
    setPreset,
    presets,
    sidebarDrawerVisible,
  };
}
