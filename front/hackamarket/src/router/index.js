import Vue from "vue";
import VueRouter from "vue-router";
import { isLoggedIn } from "../api/utils";
import { checkAdmin } from "../api/utils";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      // Ruta pública
      allowAnonymous: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: {
      // Ruta pública
      allowAnonymous: true,
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    meta: {
      // Ruta pública
      allowAnonymous: true,
    },
  },
  {
    path: "/clientes",
    name: "Clientes",
    component: () => import("../views/Clientes.vue"),
    meta: {
      // Ruta privada
      allowAnonymous: false,
      allowNoAdmin: false,
    },
    beforeEnter: (to, from, next) => {
      // Si la ruta es privada (lo de arriba), y no es admin, lo manda a home
      if (to.meta.allowNoAdmin === false && !checkAdmin()) {
        next({
          path: "/home",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/addclients",
    name: "AddClients",
    component: () => import("../views/AddClients.vue"),
    meta: {
      // Ruta privada
      allowAnonymous: false,
      allowNoAdmin: false,
    },
    beforeEnter: (to, from, next) => {
      // Si la ruta es privada (lo de arriba), y no es admin, lo manda a home
      if (to.meta.allowNoAdmin === false && !checkAdmin()) {
        next({
          path: "/products",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/productos",
    name: "Productos",
    component: () => import("../views/Productos.vue"),
    meta: {
      // Ruta privada
      allowAnonymous: false,
      allowNoAdmin: true,
    },
    beforeEnter: (to, from, next) => {
      // Si la ruta es privada (lo de arriba), y no es admin, lo manda a home
      if (to.meta.allowNoAdmin === false && !checkAdmin()) {
        next({
          path: "/products",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    },
  },
  {
    path: "*",
    name: "error",
    component: () => import("../views/Error.vue"),
    meta: {
      // Ruta pública
      allowAnonymous: false,
    },
  },
];

const router = new VueRouter({
  routes,
});

// Comprobando cada página por si la persona está logueada
router.beforeEach((to, from, next) => {
  // Si la ruta es privada y la persona no tiene token
  if (!to.meta.allowAnonymous && !isLoggedIn()) {
    next({
      path: "/",
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});

export default router;
