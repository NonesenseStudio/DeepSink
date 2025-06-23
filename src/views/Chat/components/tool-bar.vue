<script setup lang="ts">
import {
  ContentCopyOutlined,
  SyncOutlined,
  CheckOutlined,
} from "@vicons/material";
import { useClipboard } from "@vueuse/core";

const props = defineProps<{
  content: string;
}>();
const emits = defineEmits(["reset"]);
const { copy, copied } = useClipboard({ copiedDuring: 3000 });
const onCopy = () => {
  if (copied.value) return;
  copy(props.content);
};
</script>

<template>
  <n-space>
    <n-button text size="small" @click="onCopy" :focusable="false">
      <template #icon>
        <ContentCopyOutlined v-if="!copied" />
        <CheckOutlined v-else />
      </template>
    </n-button>
    <n-button text size="small" @click="emits('reset')" :focusable="false">
      <template #icon>
        <SyncOutlined />
      </template>
    </n-button>
  </n-space>
</template>

<style scoped lang="less"></style>
