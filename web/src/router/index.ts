import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import { useStore } from "../store";
import { UserGettersTypes } from "../store/modules/user/userGetter";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/Login.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../pages/admin/Claims.vue"),
    meta: {
      requireLogin: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useStore();
  if (
    to.matched.some((record) => record.meta.requireLogin) &&
    !store.getters[UserGettersTypes.IS_AUTHENTICATED]
  ) {
    next("/login");
  } else {
    next();
  }
});

export default router;
