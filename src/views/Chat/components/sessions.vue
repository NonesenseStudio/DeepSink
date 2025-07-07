<script setup lang="ts" xmlns="">
import { DeleteOutlined, EditOutlined, MoreVertFilled } from "@vicons/material";
import { renderIcon } from "@/utils";
import { useI18n } from "vue-i18n";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import { message as Message } from "@/utils";
import { useChatStore } from "@/store";

const { t } = useI18n();
dayjs.extend(isToday);
dayjs.extend(isYesterday);
const route = useRoute();
const router = useRouter();
const chatStore = useChatStore();
const getOptions = () => {
  return [
    {
      label: t("rename"),
      key: "edit",
      icon: renderIcon(EditOutlined),
      props: {
        onClick: () => {
          Message.success("编辑成功");
        },
      },
    },
    {
      label: t("delete"),
      key: "delete",
      icon: renderIcon(DeleteOutlined, {
        color: "red",
      }),
      props: {
        style: {
          color: "red",
        },
        onClick: () => {
          Message.success("删除成功");
        },
      },
    },
  ];
};
const showMoreId = ref("");
const data = [
  {
    id: "1",
    title: "这是一段非常长的文本，以至于都溢出了",
    createdAt: "2025-11-11",
    updatedAt: "2025-7-04",
  },
  {
    id: "2",
    title: "这是一段非常长的文本，以至于都溢出了",
    createdAt: "2024-10-11",
    updatedAt: "2024-10-11",
  },
  {
    id: "3",
    title: "这是一段非常长的文本，以至于都溢出了",
    createdAt: "2024-10-11",
    updatedAt: "2024-10-11",
  },
];
const groupSessions = computed(() => {
  const groups: any = {};
  data.forEach((msg) => {
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
      (a: any, b: any) => dayjs(b.timestamp).unix() - dayjs(a.timestamp).unix(),
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
  router.push("/chat/" + item.id);
  showMoreId.value = item.id;
};

onMounted(() => {
  chatStore.setCurrentSession((route.params?.id as string) || "");
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
            这是一串非常长的文本，以至于它都溢出了
          </div>
          <template
            v-if="showMoreId === item.id || route.params.id === item.id"
          >
            <n-dropdown trigger="click" :options="getOptions">
              <n-button text :focusable="false">
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
