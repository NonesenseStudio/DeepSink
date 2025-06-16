<script setup lang="ts">
import { useI18n } from "vue-i18n";
import SignIn from "@/views/Login/components/sign-in.vue";
import SignUp from "@/views/Login/components/sign-up.vue";

const { t } = useI18n();
const route = useRoute();
console.log(route);
</script>

<template>
  <div class="login">
    <n-card hoverable>
      <div class="login-headline">
        <img
          src="@/assets/logo.png"
          alt="logo"
          style="width: 40px; height: auto"
        />
        <h1>Sink to the Deep</h1>
      </div>
      <sign-in v-if="route.name === 'Login'" />
      <sign-up v-else />
    </n-card>
  </div>
</template>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  background: url("./images/background.jpg") no-repeat center 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10%;

  &-headline {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .n-card {
    width: 30%;
    min-width: 300px;
    height: auto;
    border-radius: 20px;
    position: absolute;
  }
}
</style>
