import instance from "@/services/index.ts";

export const userRegister = (data: any) => {
  return instance.post("/api/auth/register", data);
};