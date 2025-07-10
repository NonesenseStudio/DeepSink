import instance from "./index.ts";

export const getSessions = (page: number, pageSize: number = 20) => {
  return instance.get(`/sessions?page=${page}&pageSize=${pageSize}`);
};

export const getSession = (id: string) => {
  return instance.get(`/sessions/${id}`);
};

export const editTitle = (id: string, title: string) => {
  return instance.patch(`/sessions/edit/${id}`, {
    title,
  });
};

export const deleteSession = (id: string) => {
  return instance.delete(`/sessions/delete/${id}`);
};
