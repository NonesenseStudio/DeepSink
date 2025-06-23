import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { useUserStore } from "@/store";

export const checkTokenGuard = (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const token = localStorage.getItem("token");
  const userStore = useUserStore();
  if (token) {
    // 如果有 token，且要跳转的页面不是首页，则跳转到首页
    userStore.userInfo.token = token;
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
