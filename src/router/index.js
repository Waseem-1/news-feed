import Vue from "vue";
import VueRouter from "vue-router";
import Posts from "../views/Posts.vue";
import PageOne from "../views/PageOne.vue";
import PageTwo from "../views/PageTwo.vue";
import PageThree from "../views/PageThree.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Posts",
    component: Posts,
  },
  {
    path: "/page-one",
    name: "page-one",
    component: PageOne,
  },
  {
    path: "/page-two",
    name: "page-two",
    component: PageTwo,
  },
  {
    path: "/page-three",
    name: "page-three",
    component: PageThree,
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
  },
  // fall back route, if there is no valid route
  {
    path: "*",
    redirect: { name: "404" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
