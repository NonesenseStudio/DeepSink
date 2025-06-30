<script setup lang="ts">
import { useI18n } from "vue-i18n";
import {
  KeyboardArrowUpFilled,
  SmartToyOutlined,
  SportsBasketballOutlined,
  FilePresentFilled,
  ArrowUpwardFilled,
} from "@vicons/material";
import { message as Message } from "@/utils";
import { useModelStore } from "@/store";

const { t } = useI18n();
const props = defineProps<{
  question: string | null;
}>();
const emit = defineEmits(["update:question", "submit"]);
const value = ref("");
const isThink = ref(false);
const options = computed(() => {
  return modelStore.modelList.map((item) => {
    return {
      label: item.model_name,
      key: item.id,
    };
  });
});

const modelStore = useModelStore();
const handleSelect = (key: string | number) => {
  value.value = key as string;
};

const inputValue = computed({
  get() {
    return props.question;
  },
  set(val) {
    emit("update:question", val);
  },
});

const handleEnter = (e: KeyboardEvent) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    if (props.question) {
      emit("submit");
    } else {
      Message.destroyAll();
      Message.warning("请输入问题");
    }
  }
};
</script>

<template>
  <div class="input-box">
    <n-card content-style="padding:10px">
      <n-input
        :placeholder="t('chat.placeholder')"
        type="textarea"
        size="small"
        v-model:value="inputValue"
        @keydown="handleEnter"
        :autosize="{
          minRows: 3,
          maxRows: 5,
        }"
      />
      <div class="button-group">
        <n-space>
          <n-dropdown
            trigger="click"
            :options="options"
            @select="handleSelect"
            placement="top"
          >
            <n-button round icon-placement="right">
              {{ value || "弹出选择" }}
              <template #icon>
                <NIcon>
                  <KeyboardArrowUpFilled />
                </NIcon>
              </template>
            </n-button>
          </n-dropdown>
          <n-button
            round
            ghost
            :focusable="false"
            :type="isThink ? 'primary' : 'default'"
            @click="isThink = !isThink"
          >
            <template #icon>
              <n-icon>
                <SmartToyOutlined />
              </n-icon>
            </template>
            深度思考
          </n-button>
          <n-button round ghost :focusable="false">
            <template #icon>
              <n-icon>
                <SportsBasketballOutlined />
              </n-icon>
            </template>
            联网搜索
          </n-button>
        </n-space>
        <n-space>
          <n-button ghost :bordered="false" circle :focusable="false">
            <template #icon>
              <n-icon>
                <FilePresentFilled />
              </n-icon>
            </template>
          </n-button>
          <n-popover trigger="click" :disabled="question">
            请输入你的问题
            <template #trigger>
              <n-button
                circle
                type="primary"
                :focusable="false"
                :disabled="!question?.trim()"
                @click="emit('submit')"
              >
                <template #icon>
                  <n-icon><ArrowUpwardFilled /></n-icon>
                </template>
              </n-button>
            </template>
          </n-popover>
        </n-space>
      </div>
    </n-card>
    <div class="input-box-notice">内容由AI生成，请注意甄别</div>
  </div>
</template>

<style scoped lang="less">
.input-box {
  width: 100%;

  &-notice {
    text-align: center;
    font-size: 12px;
    color: #999;
    margin: 10px 0;
  }

  .n-card {
    border-radius: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .n-input {
      background: unset;
    }

    .button-group {
      display: flex;
      justify-content: space-between;
    }

    :deep(.n-input__border),
    :deep(.n-input__state-border) {
      display: none;
    }
  }
}
</style>
