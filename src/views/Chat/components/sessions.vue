<script setup lang="ts" xmlns="">
import { DeleteOutlined, EditOutlined, MoreVertFilled } from "@vicons/material";
import { renderIcon } from "@/utils";
import { useI18n } from "vue-i18n";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import { message as Message } from "@/utils";
import { useChatStore } from "@/store";
import {
  deleteSession,
  editTitle,
  getSession,
  getSessions,
} from "@/services/session.ts";

const { t } = useI18n({
  messages: {
    en: {
      placeholder: "Please enter the title",
      titleChangeSuccess: "Title change succeed",
      titleChangeFail: "Title change failed",
      deleteSuccess: "Delete succeed",
      deleteFail: "Delete failed",
    },
    zh: {
      placeholder: "请输入标题",
      titleChangeSuccess: "标题修改成功",
      titleChangeFail: "标题修改失败",
      deleteSuccess: "删除成功",
      deleteFail: "删除失败",
    },
  },
});
dayjs.extend(isToday);
dayjs.extend(isYesterday);
const route = useRoute();
const router = useRouter();
const chatStore = useChatStore();
const page = ref(1);
const showModal = ref(false);
const editId = ref<string>("");
const title = ref("");
const getOptions = (item: any) => {
  return [
    {
      label: t("rename"),
      key: "edit",
      icon: renderIcon(EditOutlined),
      props: {
        onClick: () => {
          title.value = item.title;
          editId.value = item.id;
          showModal.value = true;
        },
      },
    },
    {
      label: t("delete"),
      key: "delete",
      icon: renderIcon(DeleteOutlined, {
        color: "#e16e77",
      }),
      props: {
        style: {
          color: "#e16e77",
        },
        onClick: () => {
          deleteSession(item.id).then(() => {
            chatStore.removeSession(item.id);
            Message.success(t("deleteSuccess"));
            router.replace("/chat");
          });
        },
      },
    },
  ];
};
const showMoreId = ref("");
const groupSessions = computed(() => {
  const groups: any = {};
  chatStore.sessions.forEach((msg: any) => {
    const date = dayjs(msg.updatedAt);
    let groupKey: any;
    if (date.isToday()) groupKey = t("date.today");
    else if (date.isYesterday()) groupKey = t("date.yesterday");
    else if (dayjs().diff(date, "day") <= 7) groupKey = t("date.last7Days");
    else if (dayjs().diff(date, "day") <= 30) groupKey = t("date.last30Days");
    else groupKey = date.format("YYYY-MM");

    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(msg);
  });
  Object.keys(groups).forEach((key) => {
    groups[key].sort(
      (a: any, b: any) => dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix(),
    );
  });
  return groups;
});
const onMouseleave = (item: any) => {
  if (route.params.id === item.id) return;
  showMoreId.value = "";
};
const onMouseenter = (item: any) => {
  if (route.params.id === item.id) return;
  showMoreId.value = item.id;
};
const goToChat = (item: any, e: any) => {
  if (route.params.id === item.id || e.target.nodeName === "svg") return;
  chatStore.setCurrentSession(item.id);
  chatStore.setSessionTitle(item.title);
  router.push("/chat/" + item.id);
  showMoreId.value = item.id;
};
const changeTitle = () => {
  if (!editId.value) return;
  editTitle(editId.value, chatStore.sessionTitle)
    .then(() => {
      // sessions.values.find((item) => item.id === editId.value)?.title =
      chatStore.sessionTitle = title.value;
      Message.success(t("titleChangeSuccess"));
      showModal.value = false;
    })
    .catch(() => {
      Message.error(t("titleChangeFail"));
    });
};

const render = () => {
  getSessions(page.value).then((res: any[]) => {
    chatStore.sessions.push(...res);
  });
};

onMounted(async () => {
  chatStore.setCurrentSession((route.params?.id as string) || "");
  if (route.params?.id) {
    chatStore.sessionTitle = await getSession(route.params.id as string).then(
      ({ title }) => title,
    );
  }
  render();
});
onBeforeUnmount(() => {
  chatStore.clearSessions();
});
</script>

<template>
  <n-space vertical size="large">
    <div class="sessions" v-for="(group, groupName) in groupSessions">
      <div class="sessions-header">{{ groupName }}</div>
      <ul class="sessions-list">
        <li
          class="sessions-list-item"
          :class="{ active: route.params.id === item.id }"
          @click="(e: any) => goToChat(item, e)"
          @mouseleave="onMouseleave(item)"
          @mouseenter="onMouseenter(item)"
          v-for="item in group"
        >
          <div class="sessions-list-item__content">
            {{ item.title }}
          </div>
          <template
            v-if="showMoreId === item.id || route.params.id === item.id"
          >
            <n-dropdown trigger="click" :options="getOptions(item)">
              <n-button circle size="tiny" :bordered="false" :focusable="false">
                <template #icon>
                  <n-icon>
                    <MoreVertFilled />
                  </n-icon>
                </template>
              </n-button> </n-dropdown
          ></template>
        </li>
      </ul>
    </div>
  </n-space>
  <n-modal
    v-model:show="showModal"
    style="width: 600px"
    :title="t('edit')"
    :bordered="false"
    preset="card"
    size="huge"
    role="dialog"
    aria-modal="true"
  >
    <template #footer>
      <n-flex justify="flex-end">
        <n-button @click="showModal = false">
          {{ t("cancel") }}
        </n-button>
        <n-button type="primary" @click="changeTitle">
          {{ t("confirm") }}
        </n-button>
      </n-flex>
    </template>
    <n-form-item :label="t('title')" label-placement="left">
      <n-input v-model:value="title" :placeholder="t('placeholder')" />
    </n-form-item>
  </n-modal>
</template>

<style scoped lang="less">
.n-space {
  height: 100%;
  overflow-y: auto;
}

.sessions {
  padding: 0 10px;

  &-header {
    width: 100%;
    padding: 5px;
  }

  &-list {
    list-style: none;
    padding: 0;
    margin: 0;

    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 5px;
      cursor: pointer;
      border-radius: 10px;

      &.active {
        background-color: #f5f5f5;
      }

      &:hover {
        background-color: #f5f5f5;
      }
      @media (prefers-color-scheme: dark) {
        &.active {
          background-color: #333338; /* 深色模式下的背景色 */
        }

        &:hover {
          background-color: #333338; /* 深色模式下的背景色 */
        }
      }
      &__content {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        @media screen and (max-width: 768px) {
          max-width: 100%;
        }
      }
    }
  }
}
</style>
