import { createDiscreteApi, darkTheme } from "naive-ui";
import { NIcon } from "naive-ui";
import { useSettingsStore } from "@/store";
import { useDark, usePreferredColorScheme } from "@vueuse/core";
import type { HTMLAttributes } from "vue";

const isDark = useDark();
const preferredColor = usePreferredColorScheme();
export let { message, notification, dialog, loadingBar, modal } =
  createDiscreteApi(
    ["message", "dialog", "notification", "loadingBar", "modal"],
    {
      configProviderProps: {
        theme: isDark.value ? darkTheme : null, // 动态绑定主题
      },
    },
  );

export const toggleTheme = () => {
  const settingsStore = useSettingsStore();
  let isDarkMode: boolean;
  if (settingsStore.theme === "system") {
    isDarkMode = preferredColor.value === "dark";
  } else {
    isDarkMode = settingsStore.theme === "dark";
  }
  const theme = isDarkMode ? darkTheme : null;
  // 重建离散组件实例
  const newDiscrete = createDiscreteApi(
    ["message", "dialog", "notification", "loadingBar", "modal"],
    {
      configProviderProps: { theme },
    },
  );
  message = newDiscrete.message;
  notification = newDiscrete.notification;
  dialog = newDiscrete.dialog;
  loadingBar = newDiscrete.loadingBar;
  modal = newDiscrete.modal;
};
export const renderIcon = (icon: Component, props?: HTMLAttributes) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon, props),
    });
  };
};
