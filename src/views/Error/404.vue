<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const router = useRouter();
const onClick = () => {
  router.replace("/");
};
</script>

<template>
  <n-result status="404" title="404" :description="t('error.404')">
    <template #footer>
      <n-button @click="onClick">
        {{ t("error.toIndex") }}
      </n-button>
    </template>
  </n-result>
</template>

<style scoped lang="less">
.n-result {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
