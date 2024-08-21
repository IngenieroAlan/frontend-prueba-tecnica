import { createMemoryHistory, createRouter } from "vue-router";
import LoginView from "../views/login/LoginView.vue";
import DashboardView from "../views/dashboard/DashboardView.vue";
import UserView from "../views/user/show/ShowUserView.vue";
import AddUserView from "../views/user/add/AddUserView.vue";

const routes = [
  { path: "/", component: LoginView },
  { path: "/home", component: DashboardView },
  { path: "/user/:id", component: UserView },
  { path: "/user/add", component: AddUserView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
