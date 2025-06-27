import instance from "@/services/index.ts";

export const userRegister = (data: any) => {
  return instance.post("/auth/register", data);
};
export const userLogin = (data: any) => {
  return instance.post("/auth/login", data);
};
export const userLogout = (token: string) => {
  return instance.post("/auth/logout", {
    refresh_token: token,
  });
};
export const refreshToken = (token: string) => {
  return instance.post("/auth/refresh", {
    refresh_token: token,
  });
};
export const connTest = () => {
  return instance.get("/test");
};
