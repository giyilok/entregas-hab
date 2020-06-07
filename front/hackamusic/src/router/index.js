import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Error from "../views/Error.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/topTracks",
    name: "TopTracks",
    component: () => import("../views/TopTracks.vue"),
  },
  {
    path: "/topArtists",
    name: "TopArtists",
    component: () => import("../views/TopArtists.vue"),
  },
  {
    path: "*",
    name: "Error",
    component: Error,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
