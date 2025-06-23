import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { checkTokenGuard } from "@/router/guard.ts";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    redirect: "/chat",
    meta: {
      layout: "empty",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/login.vue"),
    meta: {
      layout: "empty",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Login/login.vue"),
    meta: {
      layout: "empty",
    },
  },
  {
    path: "/chat",
    name: "Chat",
    meta: {
      layout: "normal",
    },
    children: [
      {
        path: "",
        name: "ChatIndex",
        component: () => import("@/views/Chat/chat.vue"),
      },
    ],
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/Settings/settings.vue"),
    meta: {
      layout: "normal",
      title: "settings.title",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/Error/404.vue"),
    meta: {
      layout: "empty",
    },
  },
];
const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

router.beforeEach(checkTokenGuard);

export default router;
