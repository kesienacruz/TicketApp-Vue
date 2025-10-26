import { createRouter, createWebHistory } from "vue-router";
import Landing from "../pages/Landing.vue";
import Login from "../pages/Login.vue";
import Signup from "../pages/Signup.vue";
import Dashboard from "../pages/Dashboard.vue";
import Tickets from "../pages/Tickets.vue";
import { useAuthStore } from "../stores/auth.js";
import { MSG_SESSION_EXPIRED } from "../utils/constants.js";

const routes = [
  { path: "/", component: Landing },
  { path: "/auth/login", component: Login },
  { path: "/auth/signup", component: Signup },
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/tickets", component: Tickets, meta: { requiresAuth: true } },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (!auth.hydrated) auth.hydrate();
  if (to.meta.requiresAuth && !auth.user) {
    const live = document.getElementById("toast-live-assertive");
    if (live) live.textContent = MSG_SESSION_EXPIRED;
    auth.expireSession();
    return "/auth/login";
  }
  return true;
});

export default router;
