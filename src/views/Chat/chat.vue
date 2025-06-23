<script setup lang="ts">
import InputBox from "@/views/Chat/components/input-box.vue";
import ToolBar from "@/views/Chat/components/tool-bar.vue";
import {
  KeyboardArrowUpFilled,
  KeyboardArrowDownFilled,
} from "@vicons/material";
import MarkdownIt from "markdown-it";

const question = ref<string | null>("");
const conversations = ref([
  {
    role: "user",
    content: "你好",
    reasoning_content: "你好",
    hideReasoning: true,
  },
  {
    role: "assistant",
    content: "你好",
    reasoning_content: "你好",
    hideReasoning: true,
  },
]);
const conversationRef = ref();
const md = MarkdownIt({
  html: true,
});

// const onReset = (e) => {};
// const toBottom = () => {
//   conversationRef.value.scrollTop =
//     conversationRef.value.scrollHeight - conversationRef.value.offsetHeight;
// };
//
// const onScroll = (e: any) => {
//   showToBottom.value =
//     e.target.scrollTop + e.target.offsetHeight < e.target.scrollHeight - 50;
// };
const onSubmit = () => {
  if (question.value) {
    conversations.value.push({
      role: "user",
      content: question.value,
      reasoning_content: "",
      hideReasoning: true,
    });
    // toBottom();
    question.value = null;
  }
};
</script>

<template>
  <div class="chat">
    <div class="chat-conversation" ref="conversationRef">
      <n-space vertical style="width: 100%">
        <template v-for="item in conversations">
          <div class="chat-conversation-user" v-if="item.role === 'user'">
            <div class="chat-conversation-message">
              {{ item.content }}
            </div>
          </div>
          <div class="chat-conversation-assistant" v-else>
            <n-button
              text
              :focusable="false"
              @click="item.hideReasoning = !item.hideReasoning"
              v-if="item.reasoning_content"
            >
              <!--                {{ item.resoning ? "思考中" : "已深度思考" }}-->
              思考中
              <template #icon>
                <n-icon>
                  <KeyboardArrowUpFilled v-if="item.hideReasoning" />
                  <KeyboardArrowDownFilled v-else />
                </n-icon>
              </template>
            </n-button>
            <div
              class="chat-conversation-reasoning"
              v-html="md.render(item.reasoning_content)"
            ></div>
            <div
              class="chat-conversation-content"
              v-html="md.render(item.content)"
            ></div>
            <tool-bar :content="item.content" />
          </div>
        </template>
      </n-space>
    </div>
    <input-box v-model:question="question" @submit="onSubmit" />
  </div>
</template>

<style scoped lang="less">
.chat {
  width: 100%;
  height: 100%;
  padding: 0 15%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  &-content {
    flex: 1;
    overflow: auto;
  }
  &-conversation {
    flex: 1;
    width: 100%;
    padding: 10px 0;
    overflow: auto;
    box-sizing: border-box;
    transition: all ease-out 0.5s;

    &-user {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }

    &-assistant {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      transition: all ease-in 0.1s;
    }

    &-reasoning {
      margin-top: 10px;
      padding: 0 10px;
      font-size: 0.8rem;
      color: #888;
      border-left: 1px solid #888;

      &.hide {
        margin-top: 0;
        height: 0;
        visibility: hidden;
      }
    }

    &-content {
      padding: 10px 0 5px;
      border-radius: 10px;
      font-size: 1rem;
    }

    &-message {
      background: #dbeafe;
      color: #4d6bfe;
      padding: 10px 15px;
      border-radius: 10px;
      font-size: 1rem;
      max-width: 70%;
    }
  }
}
</style>
