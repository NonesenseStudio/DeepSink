<script setup lang="ts">
import NPage from "@/components/n-page.vue";
import { useI18n } from "vue-i18n";
import {
  EditFilled,
  DeleteFilled,
  ContentCopyOutlined,
} from "@vicons/material";
import type { DataTableColumn } from "naive-ui";
import { NSwitch, NButton } from "naive-ui";
import dayjs from "dayjs";
import { useClipboard } from "@vueuse/core";
import { message as Message } from "@/utils";

const { t } = useI18n({
  fallbackWarn: false,
  messages: {
    en: {
      info: "Please ensure your API is compatible with OpenAI",
      title: "Platform",
      name: "Name",
      stream: "Stream",
      model_version: "Model Version",
      max_tokens: "Max Tokens",
      disabled: "Enabled",
      title_message: "Please Input Platform",
      name_message: "Please input Name",
      key_message: "Please input APIKey",
      url_message: "Please input BaseURL",
    },
    zh: {
      info: "请使用与 OpenAI API 兼容的平台",
      title: "平台名称",
      name: "模型名称",
      stream: "流式传输",
      model_version: "模型版本",
      max_tokens: "最大令牌数",
      disabled: "启用状态",
      title_message: "请输入平台名称",
      name_message: "请输入模型名称",
      key_message: "请输入API Key",
      url_message: "请输入URL",
    },
  },
});
const pageRef = ref();
const columns = computed(() => {
  return [
    {
      title: t("title"),
      key: "title",
    },
    {
      title: t("name"),
      key: "model_name",
    },
    {
      title: "API Key",
      key: "api_key",
      align: "center",
      render: (row: any) =>
        h(NButton, {
          renderIcon: () => h(ContentCopyOutlined),
          size: "small",
          text: true,
          onClick: () => {
            const { copy } = useClipboard();
            copy(row.api_key).then(() => {
              Message.success("复制成功");
            });
          },
        }),
    },
    {
      title: "URL",
      key: "base_url",
    },
    {
      title: t("stream"),
      key: "stream",
      render: (row: any) => {
        return h(NSwitch, {
          value: row.stream,
          checkedValue: 1,
          uncheckedValue: 0,

          // onUpdateValue: (value: boolean) => {
          //   pageRef.value.handleUpdate(
          //     {
          //       id: row.id,
          //       stream: value ? 1 : 0,
          //     },
          //     () => {
          //       row.stream = value ? 1 : 0;
          //     },
          //   );
          // },
        });
      },
    },
    {
      title: t("disabled"),
      key: "disabled",
      render: (row: any) => {
        return h(NSwitch, {
          value: row.disabled,
          checkedValue: 0,
          uncheckedValue: 1,
          // onUpdateValue: (value: boolean) => {
          //   pageRef.value.handleUpdate(
          //     {
          //       id: row.id,
          //       disabled: value ? 1 : 0,
          //     },
          //     () => {
          //       row.disabled = value ? 1 : 0;
          //     },
          //   );
          // },
        });
      },
    },
    {
      title: t("created_time"),
      key: "created_at",
      render: (row: any) => {
        return dayjs(row.created_at).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      title: t("operation"),
      key: "actions",
      width: 180,
      align: "center",
      fixed: "right",
      render: (row: any) =>
        h("div", [
          h(NButton, {
            renderIcon: () => h(EditFilled),
            size: "small",
            type: "primary",
            text: true,
            onClick: () => pageRef.value.handleEdit(row),
            style: "margin-right: 8px;",
          }),
          h(NButton, {
            renderIcon: () => h(DeleteFilled),
            size: "small",
            type: "error",
            text: true,
            onClick: () => pageRef.value.handleDelete(row.id),
          }),
        ]),
    },
  ] as DataTableColumn[];
});
const formData = reactive({
  title: "",
  model_name: "",
  api_key: "",
  base_url: "",
  stream: 1,
  disabled: 0,
  // model_version: "",
  // max_tokens: 1024,
  // temperature: 0.95,
  // top_p: 0.7,
  // stop: "",
  // response_format: "",
});
</script>

<template>
  <n-alert :title="t('info')" type="info" closable> </n-alert>
  <n-page
    :form-data="formData"
    :columns="columns"
    :title="t('model')"
    path="models"
    ref="pageRef"
  >
    <template #form>
      <n-form-item
        :label="t('title')"
        :rule="[
          { required: true, message: t('title_message'), trigger: 'blur' },
        ]"
        path="title"
      >
        <n-input v-model:value="formData.title" />
      </n-form-item>
      <n-form-item
        :label="t('name')"
        :rule="[
          { required: true, message: t('name_message'), trigger: 'blur' },
        ]"
        path="model_name"
      >
        <n-input v-model:value="formData.model_name" />
      </n-form-item>

      <n-form-item
        label="API Key"
        :rule="[{ required: true, message: t('key_message'), trigger: 'blur' }]"
        path="api_key"
      >
        <n-input v-model:value="formData.api_key" />
      </n-form-item>
      <n-form-item
        label="URL"
        :rule="[{ required: true, message: t('url_message'), trigger: 'blur' }]"
        path="base_url"
      >
        <n-input v-model:value="formData.base_url" />
      </n-form-item>
      <!--      <n-form-item :label="t('model_version')">-->
      <!--        <n-input v-model:value="formData.model_version" />-->
      <!--      </n-form-item>-->
      <!--      <n-form-item :label="t('max_tokens')">-->
      <!--        <n-slider-->
      <!--          v-model:value="formData.max_tokens"-->
      <!--          :step="1"-->
      <!--          :max="4095"-->
      <!--          :min="1"-->
      <!--        />-->
      <!--      </n-form-item>-->
      <!--      <n-form-item label="Temperature">-->
      <!--        <n-slider-->
      <!--          v-model:value="formData.temperature"-->
      <!--          :step="0.01"-->
      <!--          :max="1"-->
      <!--          :min="0"-->
      <!--        />-->
      <!--      </n-form-item>-->
      <n-space justify="space-between">
        <n-form-item :label="t('stream')">
          <n-switch
            v-model:value="formData.stream"
            :checked-value="1"
            :unchecked-value="0"
          />
        </n-form-item>
        <n-form-item :label="t('disabled')">
          <n-switch
            v-model:value="formData.disabled"
            :checked-value="0"
            :unchecked-value="1"
          /> </n-form-item
      ></n-space>
      <!--      <n-form-item :label="t('stop')">-->
      <!--        <n-input v-model:value="formData.stop" />-->
      <!--      </n-form-item>-->
      <!--      <n-form-item :label="t('response_format')">-->
      <!--        <n-input v-model:value="formData.response_format" />-->
      <!--      </n-form-item>-->
    </template>
  </n-page>
</template>

<style scoped lang="less"></style>
