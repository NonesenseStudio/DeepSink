import instance from "@/services/index.ts";

export const userRegister = (data: any) => {
  return instance.post("/auth/register", data);
};
export const userLogin = (data: any) => {
  return instance.post("/auth/login", data);
};
export const connTest = () => {
  return instance.get("/test");
};
