import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login/Login.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
