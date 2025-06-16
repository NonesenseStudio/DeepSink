import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Login/login.vue"),
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
    path: "/Chat",
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
];
export const router = createRouter({
  history: createWebHistory("/"),
  routes,
});
