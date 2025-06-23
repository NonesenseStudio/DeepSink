import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    theme: "system",
    language: navigator.language,
  }),
  // other settings
  actions: {
    setTheme(theme: string) {
      this.theme = theme;
    },
    setLanguage(language: string) {
      this.language = language;
    },
  },
});
