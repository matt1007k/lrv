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
    path: "/options",
    name: "Options",
    component: () => import("../pages/Options.vue"),
  },
  {
    path: "/claims/create",
    name: "NewClaim",
    component: () => import("../pages/claims/NewClaim.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/auth/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../pages/auth/Register.vue"),
  },
  {
    path: "/message-success",
    name: "MessageSuccess",
    component: () => import("../pages/MessageSuccess.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("../pages/auth/ForgotPassword.vue"),
  },
  {
    path: "/reset-password/:token",
    name: "ResetPassword",
    component: () => import("../pages/auth/ResetPassword.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../pages/admin/Claims.vue"),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../pages/admin/Profile.vue"),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/detail/:type/:id",
    name: "Detail",
    component: () => import("../pages/admin/claims/Show.vue"),
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
