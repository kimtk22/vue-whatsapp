import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../view/HomeView.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
