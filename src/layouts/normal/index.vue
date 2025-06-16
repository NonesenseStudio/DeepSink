<script setup lang="ts">
import {
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined,
  PostAddRound,
} from "@vicons/material";
const collapsed = ref(false);
</script>

<template>
  <n-layout has-sider>
    <n-layout-sider
      :collapsed="collapsed"
      collapse-mode="width"
      :collapsed-width="120"
      :width="240"
      content-style="padding: 24px;"
      bordered
    >
      <n-button @click="collapsed = !collapsed" text>
        <template #icon>
          <n-icon>
            <KeyboardArrowRightOutlined v-if="collapsed" />
            <KeyboardArrowLeftOutlined v-else />
          </n-icon>
        </template>
      </n-button>
      <n-button round color="#dbeafe" text-color="#4d6bfe">
        <n-icon><PostAddRound /> </n-icon>开启新对话
      </n-button>
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px;">
      <slot></slot>
    </n-layout-content>
  </n-layout>
</template>

<style scoped lang="less">
.n-layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
