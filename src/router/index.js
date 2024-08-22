import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/login/LoginView.vue";
import DashboardView from "../views/dashboard/DashboardView.vue";
import UserView from "../views/user/show/ShowUserView.vue";
import FormUserView from "../views/user/form/FormUserView.vue";
import FormContactView from "../views/contact/FormContactView.vue";

const routes = [
  { path: "/", name: "login", component: LoginView },
  { path: "/home", name: "home", component: DashboardView },
  { path: "/user/:id", name: "userDetails", component: UserView, props: true },
  { path: "/user/add", name: "addUser", component: FormUserView },
  {
    path: "/user/edit/:id",
    name: "editUser",
    component: FormUserView,
    props: true,
  },
  { path: "/contact/add", name: "addContact", component: FormContactView },
  {
    path: "/contact/edit/:id",
    name: "editContact",
    component: FormContactView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
