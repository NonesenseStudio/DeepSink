<script setup lang="ts">
import { LockOutlined, PersonOutlined } from "@vicons/material";
import { useI18n } from "vue-i18n";
import { message as Message, loadingBar } from "@/utils";
import { userLogin } from "@/services/user.ts";
import { useUserStore } from "@/store";
import dayjs from "dayjs";

const { t } = useI18n();
const loading = ref<boolean>(false);
const userStore = useUserStore();
const userInfo = reactive({
  username: "",
  password: "",
});
const emit = defineEmits(["login"]);
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
const onRegister = () => {
  router.replace("/register");
};
const onLogin = () => {
  loading.value = true;
  if (!userInfo.username || !userInfo.password) {
    loading.value = false;
    Message.error("请输用户名和密码");
    return;
  }
  loadingBar.start();
  userLogin(userInfo)
    .then((res) => {
      userStore.setUserInfo({
        username: userInfo.username,
        access_token: res.access_token,
        refresh_token: res.refresh_token,
      });
      localStorage.setItem("access_token", res.access_token);
      localStorage.setItem("refresh_token", res.refresh_token);
      localStorage.setItem(
        "expired_date",
        dayjs().add(7, "day").valueOf().toString(),
      );
      emit("login");
      router.replace("/chat");
      Message.success("登录成功");
      loadingBar.finish();
    })
    .catch(() => {
      loadingBar.error();
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
      <n-button type="primary" block :loading="loading" @click="onLogin">
        {{ t("sign_in.sign_in") }}
      </n-button>
    </n-form-item>
    <n-button text @click="onRegister">{{ t("sign_in.register") }}</n-button>
  </n-form>
</template>

<style scoped lang="less"></style>
