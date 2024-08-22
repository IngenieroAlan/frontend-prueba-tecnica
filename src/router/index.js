import { createMemoryHistory, createRouter } from "vue-router";
import LoginView from "../views/login/LoginView.vue";
import DashboardView from "../views/dashboard/DashboardView.vue";
import UserView from "../views/user/show/ShowUserView.vue";
import AddUserView from "../views/user/add/AddUserView.vue";
import AddContactView from "../views/contact/AddContactView.vue";

const routes = [
  { path: "/", name: "login", component: LoginView },
  { path: "/home", name: "home", component: DashboardView },
  { path: "/user/:id", name: "userDetails", component: UserView, props: true },
  { path: "/user/add", name: "addUser", component: AddUserView },
  { path: "/contact/add", name: "addContact", component: AddContactView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
