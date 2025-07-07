<script setup lang="ts">
import {
  ViewSidebarOutlined,
  PostAddRound,
  LogOutFilled,
  SettingsOutlined,
} from "@vicons/material";
import { renderIcon } from "@/utils";
import { useI18n } from "vue-i18n";
import { useUserStore, useChatStore } from "@/store";
import { dialog, message as Message } from "@/utils";
import { userLogout } from "@/services/user.ts";
import Sessions from "@/views/Chat/components/sessions.vue";

const { t } = useI18n();
const router = useRouter();
const useStore = useUserStore();
const chatStore = useChatStore();
defineProps<{
  collapsed: boolean;
}>();
const emits = defineEmits(["update:collapsed"]);
const options = computed(() => {
  return [
    {
      label: t("dropdown.settings"),
      key: "settings",
      icon: renderIcon(SettingsOutlined),
      props: {
        onClick: () => {
          router.push("/settings");
        },
      },
    },
    {
      type: "divider",
      key: "d1",
    },
    {
      label: t("dropdown.logout"),
      key: "logout",
      icon: renderIcon(LogOutFilled),
      props: {
        onClick: () => {
          dialog.warning({
            content: t("dropdown.logout_content"),
            positiveText: t("dropdown.logout_ok"),
            negativeText: t("dropdown.logout_cancel"),
            draggable: true,
            onPositiveClick: () => {
              userLogout(useStore.userInfo.refresh_token).then(() => {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                useStore.userInfo.access_token = "";
                useStore.userInfo.refresh_token = "";
                router.push("/login");
                Message.success("账号已退出");
              });
            },
          });
        },
      },
    },
  ];
});

const onNewChat = () => {
  chatStore.currentSession = null;
  router.push("/chat");
};
</script>

<template>
  <div class="sider">
    <div class="sider-top">
      <n-button
        circle
        ghost
        :bordered="false"
        @click="emits('update:collapsed', !collapsed)"
        style="transform: scaleX(-1)"
      >
        <template #icon>
          <n-icon>
            <ViewSidebarOutlined />
          </n-icon>
        </template>
      </n-button>
      <n-button round color="#dbeafe" text-color="#4d6bfe" @click="onNewChat">
        <n-icon><PostAddRound /> </n-icon>开启新对话
      </n-button>
    </div>
    <div class="sider-middle">
      <sessions />
    </div>
    <div class="sider-bottom">
      <n-dropdown trigger="click" :options="options" width="trigger">
        <n-button>点击！</n-button>
      </n-dropdown>
    </div>
  </div>
</template>

<style scoped lang="less">
.sider {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  gap: 10px;
  &-top {
    width: 100%;
  }
  &-middle {
    width: 100%;
    flex: 1;
    overflow: hidden;
  }
  &-bottom {
    width: 100%;
    .n-button {
      width: 100%;
    }
  }
}
</style>
