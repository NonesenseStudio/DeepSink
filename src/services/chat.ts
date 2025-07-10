import instance from "./index.ts";

export interface MessageDTO {
  sessionId: string | null;
  content: string;
  role: "user" | "assistant" | "system";
}

export const onMessage = (params: MessageDTO) => {
  return instance.post("/chat/messages", params);
};

export const getMessages = (id: string, page: number) => {
  return instance.get(`/chat/messages/${id}?page=${page}`);
};
