import { createRouter, createWebHistory } from "vue-router";
import { LoginCallback } from "@okta/okta-vue";
import Home from "../pages/Home.vue";
import Root from "../pages/Root.vue";

const { VITE_BASE_URL } = import.meta.env;
const baseUrl = VITE_BASE_URL || "";

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes: [
    {
      path: "/",
      component: Root,
    },
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/login/callback",
      component: LoginCallback,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (from.path === "/login/callback" && to.path === "/") {
    next("/home");
  } else {
    next();
  }
});

export default router;
