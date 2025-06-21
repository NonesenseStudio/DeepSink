<script setup lang="ts">
import { LockOutlined, PersonOutlined } from "@vicons/material";
import { useI18n } from "vue-i18n";
import { userRegister } from "@/services/user.ts";
import { message as Message } from "@/utils";

const { t } = useI18n();
const loading = ref<boolean>(false);
const userInfo = reactive({
  username: "",
  password: "",
});
const agreed = ref<boolean>(false);
const rules = {
  username: [
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
  loading.value = true;
  if (!userInfo.username || !userInfo.password) {
    Message.info("请输入用户名和密码");
    loading.value = false;
    return;
  }
  userRegister(userInfo)
    .then(() => {
      Message.success("注册成功");
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<template>
  <n-form ref="formRef" :model="userInfo" :rules="rules">
    <n-form-item path="username">
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
      <n-checkbox v-model:checked="agreed">
        已阅读并同意我们的
        <a href="/terms.html" target="_blank">用户协议</a>
        与
        <a href="/privacy.html" target="_blank">隐私政策</a>
      </n-checkbox>
    </n-form-item>
    <n-form-item>
      <n-button
        type="primary"
        block
        :loading="loading"
        @click="onRegister"
        attr-type="submit"
      >
        {{ t("sign_in.signup") }}
      </n-button>
    </n-form-item>
    <n-button text @click="onLogin">{{ t("sign_in.login") }}</n-button>
  </n-form>
</template>

<style scoped lang="less">
a {
  color: #409eff;
  text-decoration: underline;
  cursor: pointer;
  user-select: auto;
}
</style>
