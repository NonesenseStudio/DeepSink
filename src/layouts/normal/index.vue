<script setup lang="ts">
import { ViewSidebarOutlined } from "@vicons/material";
import Sider from "@/layouts/normal/components/sider.vue";
const collapsed = ref(false);
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
        <n-button @click="collapsed = !collapsed" text v-if="collapsed">
          <template #icon>
            <ViewSidebarOutlined />
          </template>
        </n-button>
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
