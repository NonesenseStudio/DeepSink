<script setup lang="ts">
import { LockOutlined, PersonOutlined } from "@vicons/material";
import { useI18n } from "vue-i18n";
import { userRegister } from "@/services/user.ts";
import { message as Message } from "@/utils";

const { t, locale } = useI18n({
  messages: {
    en: {
      username_rule: "Please enter your username",
      password_rule: "Please enter your password",
      empty_info: "Please enter your username and password",
      agreed_info: "Please read and agree to the Terms and Privacy",
      agreed: "I'm already read and agree to the",
      and: "and",
      terms: "Terms",
      privacy: "Privacy",
      succeed: "Register Succeed",
    },
    zh: {
      username_rule: "请输入用户名",
      password_rule: "请输入密码",
      empty_info: "请输入用户名和密码",
      agreed_info: "请阅读并同意我们的用户协议和隐私政策",
      agreed: "已阅读并同意我们的",
      and: "与",
      terms: "用户协议",
      privacy: "隐私政策",
      succeed: "注册成功",
    },
  },
});
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
      message: t("username_rule"),
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: t("password_rule"),
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
    Message.info(t("empty_info"));
    loading.value = false;
    return;
  }
  if (!agreed.value) {
    Message.info(t("agreed_info"));
    loading.value = false;
    return;
  }
  userRegister(userInfo)
    .then(() => {
      Message.success(t("succeed"));
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
      <n-flex align="center" size="small" :wrap="false">
        <n-checkbox v-model:checked="agreed"> </n-checkbox>
        <div>
          {{ t("agreed") }}
          <a
            :href="locale.includes('zh') ? '/terms.html' : '/terms_en.html'"
            target="_blank"
            >{{ t("terms") }}</a
          >
          {{ t("and") }}
          <a
            :href="locale.includes('zh') ? '/privacy.html' : '/privacy_en.html'"
            target="_blank"
            >{{ t("privacy") }}</a
          >
        </div>
      </n-flex>
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
