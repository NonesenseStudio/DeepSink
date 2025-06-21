<script setup lang="ts">
import { useDark } from "@vueuse/core";
import { darkTheme, type GlobalThemeOverrides } from "naive-ui";

const isDark = useDark();
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "#4d6bfe",
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
</script>

<template>
  <n-config-provider
    :theme="isDark ? darkTheme : null"
    :theme-overrides="themeOverrides"
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
