import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import store from "../store";
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
    path: "/message-success",
    name: "MessageSuccess",
    component: () => import("../pages/MessageSuccess.vue"),
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
