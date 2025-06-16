<script setup lang="ts">
import { LockOutlined, PersonOutlined } from "@vicons/material";
import { useI18n } from "vue-i18n";
import { userRegister } from "@/services/user.ts";

const { t } = useI18n();
const userInfo = reactive({
  username: "",
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
const onLogin = () => {
  router.replace("/login");
};
const onRegister = () => {
  userRegister(userInfo).then((res) => {
    console.log(res);
  });
};
</script>

<template>
  <n-form ref="formRef" :model="userInfo" :rules="rules">
    <n-form-item path="account">
      <n-input
        v-model:value="userInfo.username"
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
      <n-button type="primary" block :loading="false" @click="onRegister">
        {{ t("sign_in.signup") }}
      </n-button>
    </n-form-item>
    <n-button text @click="onLogin">{{ t("sign_in.login") }}</n-button>
  </n-form>
</template>

<style scoped lang="less"></style>
