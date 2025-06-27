import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { useUserStore } from "@/store";
import { message as Message } from "@/utils";

export const checkTokenGuard = async (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  const expired_date = localStorage.getItem("expired_date");
  if (parseInt(expired_date as string) - new Date().valueOf() <= 0) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expired_date");
    Message.error("登录已过期，请重新登录");
    next("/login");
  }
  const userStore = useUserStore();
  if (access_token && refresh_token) {
    // 如果有 token，且要跳转的页面不是首页，则跳转到首页
    userStore.userInfo.access_token = access_token;
    userStore.userInfo.refresh_token = refresh_token;
    next();
  } else {
    // 如果没有 token，且要跳转的页面不是登录页，则跳转到登录页
    if (to.path !== "/login" && to.path !== "/register") {
      next("/login");
    } else {
      next();
    }
  }
};
