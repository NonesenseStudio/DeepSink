<script setup lang="ts">
import InputBox from "@/views/Chat/components/input-box.vue";
import ToolBar from "@/views/Chat/components/tool-bar.vue";
import {
  KeyboardArrowUpFilled,
  KeyboardArrowDownFilled,
  ArrowDownwardFilled,
} from "@vicons/material";
import MarkdownIt from "markdown-it";
import { getMessages, onMessage } from "@/services/chat.ts";
import { useChatStore } from "@/store";
import logo from "@/assets/logo.png";

const question = ref<string | null>("");
const route = useRoute();
const chatStore = useChatStore();
const page = ref<number>(1);
const conversations = ref<any[]>([
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
  {
    role: "user",
    content: "你是谁",
    reasoning_content: "",
    hideReasoning: true,
  },
  {
    role: "我是人工智能助手智谱清言，是基于智谱 AI 公司于 2024 年训练的语言模型开发的。我的任务是针对用户的问题和要求提供适当的答复和支持。",
    content:
      "我是人工智能助手智谱清言，是基于智谱 AI 公司于 2024 年训练的语言模型开发的。我的任务是针对用户的问题和要求提供适当的答复和支持。",
    reasoning_content: "",
    hideReasoning: true,
  },
  {
    role: "user",
    content: "你能为我做些什么",
    reasoning_content: "",
    hideReasoning: true,
  },
  {
    role: "作为人工智能助手，我可以为您提供多种服务，包括但不限于：\n\n1. **信息查询**：我可以帮助您查找各种信息，如新闻、天气预报、科技动态等。\n2. **语言翻译**：我可以提供多语言翻译服务，帮助您理解和翻译不同语言的内容。\n3. **学习辅导**：我可以协助您学习新知识，提供解释和指导。\n4. **日常生活建议**：我可以提供健康、饮食、生活小窍门等方面的建议。\n5. **编程和技术支持**：我可以帮助解答编程问题，提供技术支持和指导。\n6. **娱乐和休闲**：我可以提供游戏、谜语、故事等娱乐内容。\n7. **写作和编辑**：我可以帮助您撰写文章、报告，或者对已有文本进行编辑和润色。\n\n请问有什么具体的问题或任务需要我帮助您完成吗？",
    content:
      "作为人工智能助手，我可以为您提供多种服务，包括但不限于：\n\n1. **信息查询**：我可以帮助您查找各种信息，如新闻、天气预报、科技动态等。\n2. **语言翻译**：我可以提供多语言翻译服务，帮助您理解和翻译不同语言的内容。\n3. **学习辅导**：我可以协助您学习新知识，提供解释和指导。\n4. **日常生活建议**：我可以提供健康、饮食、生活小窍门等方面的建议。\n5. **编程和技术支持**：我可以帮助解答编程问题，提供技术支持和指导。\n6. **娱乐和休闲**：我可以提供游戏、谜语、故事等娱乐内容。\n7. **写作和编辑**：我可以帮助您撰写文章、报告，或者对已有文本进行编辑和润色。\n\n请问有什么具体的问题或任务需要我帮助您完成吗？",
    reasoning_content: "",
    hideReasoning: true,
  },
]);
const conversationRef = ref();
const md = MarkdownIt({
  html: true,
});

// const onReset = (e) => {};
const scrollBottom = ref<number>(0);
const toBottom = () => {
  conversationRef.value.scrollTop =
    conversationRef.value.scrollHeight - conversationRef.value.offsetHeight;
};

const onScroll = (e: any) => {
  if (!chatStore.currentSession) return;
  scrollBottom.value =
    e.target.scrollHeight - e.target.offsetHeight - e.target.scrollTop;
};
const onSubmit = () => {
  if (question.value) {
    const answer = reactive({
      role: "assistant",
      content: "",
      reasoning_content: "",
      hideReasoning: true,
      finished: false,
    });
    conversations.value.push({
      role: "user",
      content: question.value,
      reasoning_content: "",
      hideReasoning: true,
    });
    conversations.value.push(answer);
    // toBottom();
    onMessage({
      sessionId: chatStore.currentSession,
      role: "user",
      content: question.value,
    }).then((res) => {
      conversations.value.push({
        role: res.role,
        content: res.message,
        reasoning_content: res.reasoning_content || "",
        hideReasoning: true,
        finished: true,
      });
      if (!chatStore.currentSession) {
        chatStore.setCurrentSession(res.sessionId);
        chatStore.addSession({
          sessionId: res.sessionId,
          createdAt: new Date().valueOf(),
          updatedAt: new Date().valueOf(),
        });
      }
      toBottom();
    });
    question.value = null;
  }
};
watch(
  () => route.params.id,
  (val) => {
    if (val) {
      render();
    } else {
      conversations.value = [];
    }
  },
);

const render = async () => {
  let messages = await getMessages(
    chatStore.currentSession as string,
    page.value,
  );
  conversations.value = messages.reverse();
};
onMounted(() => {
  if (chatStore.currentSession) {
    render();
    scrollBottom.value =
      conversationRef.value.scrollHeight -
      conversationRef.value.offsetHeight -
      conversationRef.value.scrollTop;
    nextTick(() => {
      setTimeout(() => {
        toBottom();
      }, 0);
    });
  }
});
</script>

<template>
  <div class="chat">
    <div class="chat-conversation" ref="conversationRef" @scroll="onScroll">
      <n-flex vertical style="width: 100%">
        <template v-for="item in conversations">
          <div class="chat-conversation-user" v-if="item.role === 'user'">
            <div class="chat-conversation-message">
              {{ item.content }}
            </div>
          </div>
          <div class="chat-conversation-assistant" v-else>
            <div class="chat-conversation-assistant-avatar">
              <n-avatar round :src="logo" />
            </div>
            <div class="chat-conversation-assistant-content">
              <div class="dots-container" v-if="false">
                <div class="dot"></div>
                <div class="dot second"></div>
                <div class="dot third"></div>
              </div>
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
                v-if="item.reasoning_content"
                v-html="md.render(item.reasoning_content)"
              ></div>
              <div
                class="chat-conversation-content"
                v-html="md.render(item.content)"
              ></div>
              <tool-bar :content="item.content" />
            </div>
          </div>
        </template>
      </n-flex>
    </div>
    <div class="chat-to__bottom" v-if="scrollBottom >= 50">
      <n-button circle type="tertiary" @click="toBottom">
        <template #icon>
          <n-icon>
            <ArrowDownwardFilled />
          </n-icon>
        </template>
      </n-button>
    </div>
    <input-box
      v-model:question="question"
      @submit="onSubmit"
      style="padding: 0 15%"
    />
  </div>
</template>

<style scoped lang="less">
.chat {
  width: 100%;
  height: 100%;
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
    height: 100%;
    padding: 10px 15%;
    overflow: auto;
    box-sizing: border-box;
    transition: all ease-out 0.5s;
    position: relative;

    &-user {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }

    &-assistant {
      width: 100%;
      display: flex;
      &-avatar {
        margin-right: 20px;
      }
      &-content {
        flex-direction: column;
        align-items: flex-start;
        transition: all ease-in 0.1s;
      }
    }

    &-reasoning {
      margin: 10px 0;
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
      padding-bottom: 5px;
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
  &-to__bottom {
    width: 100%;
    padding: 0 15%;
    height: 0;
    position: relative;
    .n-button {
      position: absolute;
      right: 15%;
      bottom: 30px;
      background-color: #fff;
    }
  }
  .dots-container {
    display: flex;
    gap: 5px;
  }
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    animation: colorWave 2s infinite linear;
    background-color: #dadada;
  }
  .second {
    animation-delay: 0.5s;
  }
  .third {
    animation-delay: 1s;
  }
  @keyframes colorWave {
    0%,
    100% {
      background-color: #dadada;
    }
    50% {
      background-color: #fafafa;
    }
  }
  @media (prefers-color-scheme: dark) {
    .n-button {
      background-color: #18181c;
    }
  }
}
</style>
