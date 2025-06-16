<script setup lang="ts">
import { LockOutlined, PersonOutlined } from "@vicons/material";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const userInfo = reactive({
  account: "",
  password: "",
});
const rules = {
  account: [
    {
      required: true,
      message: "请输入账号",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
};
const router = useRouter();
const onRegister = () => {
  router.replace("/register");
};
</script>

<template>
  <n-form ref="formRef" :model="userInfo" :rules="rules">
    <n-form-item path="account">
      <n-input
        v-model:value="userInfo.account"
        @keydown.enter.prevent
        :placeholder="t('sign_in.account_placeholder')"
      >
        <template #prefix>
          <n-icon :component="PersonOutlined" />
        </template>
      </n-input>
    </n-form-item>
    <n-form-item path="password">
      <n-input
        v-model:value="userInfo.password"
        type="password"
        @keydown.enter.prevent
        :placeholder="t('sign_in.password_placeholder')"
      >
        <template #prefix>
          <n-icon :component="LockOutlined" />
        </template>
      </n-input>
    </n-form-item>
    <n-form-item>
      <n-button type="primary" block :loading="false">
        {{ t("sign_in.sign_in") }}
      </n-button>
    </n-form-item>
    <n-button text @click="onRegister">{{ t("sign_in.register") }}</n-button>
  </n-form>
</template>

<style scoped lang="less"></style>
