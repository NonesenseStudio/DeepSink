<script setup lang="ts">
import { useDark, useToggle, usePreferredColorScheme } from "@vueuse/core";
import { darkTheme, type GlobalThemeOverrides } from "naive-ui";
import { useSettingsStore } from "@/store";
import { zhCN, enUS, dateZhCN, dateEnUS } from "naive-ui";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
const isDark = useDark({
  selector: "html",
  attribute: "class",
  valueDark: "dark",
  valueLight: "light",
});
const toggle = useToggle(isDark);
const preferredColor = usePreferredColorScheme();
const settingsStore = useSettingsStore();
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "#4d6bfe",
  },
  Card: {
    borderRadius: "20px",
  },
  Input: {
    borderRadius: "20px",
  },
};

const layouts = new Map();
const route = useRoute();

function getLayout(name: string) {
  if (layouts.get(name)) return layouts.get(name);
  const layout = markRaw(
    defineAsyncComponent(() => import(`@/layouts/${name}/index.vue`)),
  );
  layouts.set(name, layout);
  return layout;
}

const Layout = computed(() => {
  if (!route.matched?.length) return null;
  return getLayout(route.meta?.layout as string);
});
const setTheme = computed(() => {
  let isDarkMode: boolean;
  if (settingsStore.theme === "system") {
    isDarkMode = preferredColor.value === "dark";
  } else {
    isDarkMode = settingsStore.theme === "dark";
  }
  toggle(isDarkMode);
  return isDarkMode ? darkTheme : null;
});
const setLanguage = computed(() => {
  if (settingsStore.language.includes("zh")) {
    return { locale: zhCN, dateLocale: dateZhCN };
  } else if (settingsStore.language.includes("en")) {
    return { locale: enUS, dateLocale: dateEnUS };
  }
  return { locale: zhCN, dateLocale: dateZhCN };
});
</script>

<template>
  <n-config-provider
    :theme="setTheme"
    :theme-overrides="themeOverrides"
    :locale="setLanguage.locale"
    :date-locale="setLanguage.dateLocale"
  >
    <n-global-style />
    <router-view v-if="Layout" v-slot="{ Component, route: curRoute }">
      <component :is="Layout">
        <KeepAlive :include="[]">
          <component
            :is="Component"
            :key="
              route.matched?.length
                ? curRoute.matched[0]?.path
                : curRoute.fullPath
            "
          ></component>
        </KeepAlive>
      </component>
    </router-view>
  </n-config-provider>
</template>

<style scoped>
.n-config-provider {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
