<script setup lang="ts">
import SignIn from "@/views/Login/components/sign-in.vue";
import SignUp from "@/views/Login/components/sign-up.vue";
import { useModelStore } from "@/store";
import { getCurrentModel, getModels } from "@/services/model.ts";
import { useI18n } from "vue-i18n";
import { hellos } from "@/i18n";

const { t, locale, messages } = useI18n({
  locale: "zh",
  messages: {
    en: {
      hello: "Hello",
    },
    zh: {
      hello: "你好",
    },
    ...hellos,
  },
});
const languages = computed(() => {
  return Object.keys(messages.value);
});
const route = useRoute();
const onLogin = async () => {
  const modelStore = useModelStore();
  modelStore.model = await getCurrentModel().then(({ data }) => data);
  modelStore.modelList = await getModels();
};
let timer = ref();
const setLanguage = (stop = false) => {
  clearTimeout(timer.value);
  if (stop) return;

  let index = Math.floor(Math.random() * (languages.value.length + 1));
  locale.value = languages.value[index];
  timer.value = setTimeout(() => setLanguage(), 3000);
};
onMounted(() => {
  setLanguage();
});
onUnmounted(() => {
  setLanguage(true);
});
</script>

<template>
  <div class="login">
    <n-card hoverable class="login-card">
      <div class="login-headline">
        <img
          src="@/assets/logo.png"
          alt="logo"
          style="width: 40px; height: auto"
        />
        <div class="login-headline-content">{{ t("hello") }} DeepSink</div>
      </div>
      <sign-in v-if="route.name === 'Login'" @login="onLogin" />
      <sign-up v-else />
    </n-card>
  </div>
</template>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e6f7ff 0%, #f0f9ff 40%, #e6fef8 100%);
  background-size: 400% 400%;
  animation: gradientFlow 10s ease infinite;

  @keyframes gradientFlow {
    0%,
    100% {
      background-position: 0 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  .login-card {
    width: 90%;
    max-width: 400px;
    min-width: 300px;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.5);
    transition: background 0.3s ease;
  }

  &-headline {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    &-content {
      flex: 1;
      font-weight: bold;
      font-size: clamp(16px, 2vw, 24px);
    }
  }
}

@media (max-width: 768px) {
  .login-card {
    width: 80%;
  }
}

@media (prefers-color-scheme: dark) {
  .login {
    background: linear-gradient(135deg, #121826 0%, #1e2a45 50%, #0d2430 100%);
    -webkit-background-size: 400% 400%;
    background-size: 400% 400%;

    .login-card {
      background: rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
