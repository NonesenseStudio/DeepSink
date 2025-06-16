import instance from "@/services/index.ts";

export const userRegister = (data: any) => {
  return instance.post("/register", data);
};

const userLogin = (data: any) => {
  return instance.post("/user/login", data);
};
