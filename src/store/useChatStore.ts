import { defineStore } from "pinia";

interface Message {
  id: string;
  text: string;
  sender: string;
}
export const useChatStore = defineStore("chat", {
  state: () => ({
    currentSession: null as string | null,
    session: {},
    sessions: [] as any[],
    messages: [] as Message[],
  }),
  actions: {
    addMessage(message: Message) {
      this.messages.push(message);
    },
    addSession(session: any) {
      this.sessions.push(session);
    },
    removeSession(sessionId: string) {
      this.sessions = this.sessions.filter(
        (session) => session.id !== sessionId,
      );
    },
    setCurrentSession(sessionId: string) {
      this.currentSession = sessionId;
    },
    clearMessages() {
      this.messages = [];
    },
  },
});
