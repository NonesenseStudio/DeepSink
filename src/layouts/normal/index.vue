<script setup lang="ts">
import { ViewSidebarOutlined } from "@vicons/material";
import Sider from "@/layouts/normal/components/sider.vue";

const collapsed = ref(false);
const route = useRoute();
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider
      :collapsed="collapsed"
      collapse-mode="width"
      :collapsed-width="0"
      :width="240"
      content-style="overflow:hidden"
      bordered
    >
      <sider v-model:collapsed="collapsed" v-show="!collapsed"></sider>
      <n-space>
        <n-button
          @click="collapsed = false"
          circle
          ghost
          :bordered="false"
          v-if="collapsed"
          style="position: absolute; top: 0; left: 0; transform: scaleX(-1)"
        >
          <template #icon>
            <n-icon>
              <ViewSidebarOutlined />
            </n-icon>
          </template>
        </n-button>
      </n-space>
    </n-layout-sider>
    <n-layout content-class="n-layout-right">
      <n-layout-header bordered v-if="route.path.includes('chat')">
        <n-grid x-gap="12" :cols="3">
          <n-gi></n-gi>
          <n-gi>
            <div style="text-align: center"></div>
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
