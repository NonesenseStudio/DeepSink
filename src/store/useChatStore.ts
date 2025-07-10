import { defineStore } from "pinia";

export const useChatStore = defineStore("chat", {
  state: () => ({
    currentSession: null as string | null,
    session: {},
    sessions: [] as any[],
    sessionTitle: "" as string,
  }),
  actions: {
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
    clearSessions() {
      this.sessions = [];
    },
    setSessionTitle(title: string) {
      this.sessionTitle = title;
    },
  },
});
