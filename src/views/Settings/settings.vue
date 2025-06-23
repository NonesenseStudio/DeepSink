<script setup lang="ts">
import { KeyboardArrowRightFilled, ArrowBackFilled } from "@vicons/material";
import { useI18n } from "vue-i18n";
import { useSettingsStore } from "@/store";
import { toggleTheme } from "@/utils";

const { t, locale } = useI18n({ useScope: "global" });
const showDrawer = ref(false);
const settingsStore = useSettingsStore();
const languages = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "zh-CN",
    label: "中文",
  },
];
const themes = [
  {
    value: "dark",
    label: t("settings.theme.dark"),
  },
  {
    value: "light",
    label: t("settings.theme.light"),
  },
  {
    value: "system",
    label: t("settings.system"),
  },
];
const changeTheme = (value: string) => {
  settingsStore.theme = value;
  toggleTheme();
};
const changeLanguage = (value: string) => {
  locale.value = value;
};
</script>

<template>
  <div class="settings">
    <n-space vertical size="large">
      <n-card :title="t('settings.basic_settings')">
        <n-list>
          <n-list-item>
            <n-thing title="模型管理" description="当前使用：DeepSeek">
            </n-thing>
            <template #suffix>
              <n-button
                :focusable="false"
                ghost
                :bordered="false"
                circle
                @click="showDrawer = true"
              >
                <template #icon>
                  <n-icon><KeyboardArrowRightFilled /></n-icon>
                </template>
              </n-button>
            </template>
          </n-list-item>
        </n-list>
      </n-card>
      <n-card :title="t('settings.system_settings')">
        <n-list>
          <n-list-item>
            <n-thing :title="t('settings.theme.title')"></n-thing>
            <template #suffix>
              <n-radio-group
                :value="settingsStore.theme"
                name="theme"
                @update-value="changeTheme"
              >
                <n-radio-button
                  v-for="theme in themes"
                  :key="theme.value"
                  :value="theme.value"
                  :label="theme.label"
                />
              </n-radio-group>
            </template>
          </n-list-item>
          <n-list-item>
            <n-thing :title="t('settings.language')"></n-thing>
            <template #suffix>
              <n-select
                v-model:value="settingsStore.language"
                :options="languages"
                style="width: 100px"
                @update-value="changeLanguage"
              ></n-select>
            </template>
          </n-list-item>
        </n-list> </n-card
    ></n-space>
    <n-drawer
      v-model:show="showDrawer"
      width="100%"
      placement="right"
      to=".settings"
      :trap-focus="false"
      :block-scroll="false"
    >
      <n-drawer-content>
        <template #header>
          <n-button text @click="showDrawer = false">
            <template #icon>
              <n-icon><ArrowBackFilled /></n-icon>
            </template>
          </n-button>
        </template>
        《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<style scoped lang="less">
.settings {
  padding: 10px 0;
  min-width: 500px;
  max-width: 600px;
  margin: 0 auto;
  .n-card {
    background: #f4f4f8;

    .n-list {
      background-color: unset;
    }
  }
}
.dark {
  .n-card {
    background: #18181c;
    color: #fff;
  }
}
</style>
