import { createPinia } from "pinia";
import type { App } from "vue";

export * from "./useUserStore.ts";
export * from "./useSettingsStore.ts";
export * from "./useModelStore.ts";

export function setupStore(app: App) {
  const pinia = createPinia();
  app.use(pinia);
}
