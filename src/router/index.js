import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login/Login.vue";
import Registration from "../pages/Registration/Registration.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/registration",
    name: "registration",
    component: Registration,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
