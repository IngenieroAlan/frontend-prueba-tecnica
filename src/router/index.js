import { createMemoryHistory, createRouter } from "vue-router";
import LoginView from "../views/login/LoginView.vue";
import DashboardView from "../views/dashboard/DashboardView.vue";

const routes = [
  { path: "/", component: LoginView },
  { path: "/home", component: DashboardView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
