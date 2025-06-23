<script setup lang="ts">
import { ViewSidebarOutlined } from "@vicons/material";
import Sider from "@/layouts/normal/components/sider.vue";
import { useI18n } from "vue-i18n";

const collapsed = ref(false);
const { t } = useI18n();
const route = useRoute();
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider
      :collapsed="collapsed"
      collapse-mode="width"
      :collapsed-width="0"
      :width="240"
      content-style="padding: 10px;"
      bordered
    >
      <sider v-model:collapsed="collapsed"></sider>
    </n-layout-sider>
    <n-layout content-class="n-layout-right">
      <n-layout-header bordered>
        <n-grid x-gap="12" :cols="3">
          <n-gi>
            <n-button @click="collapsed = !collapsed" text v-if="collapsed">
              <template #icon>
                <ViewSidebarOutlined />
              </template>
            </n-button>
          </n-gi>
          <n-gi>
            <div style="text-align: center">
              {{ route.meta?.title ? t(route.meta?.title as string) : "" }}
            </div>
          </n-gi>
          <n-gi> </n-gi>
        </n-grid>
      </n-layout-header>
      <n-layout-content> <slot></slot></n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style scoped lang="less">
.n-layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  &-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 5%;
  }
  &-content {
    height: 95%;
    overflow: hidden;
  }
  :deep(.n-layout-right) {
    overflow: hidden;
  }
}
</style>
