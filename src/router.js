import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/category",
      name: "category",
      component: () => import("./views/Category")
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("./views/Cart")
    },
    {
      path: "/member",
      name: "member",
      component: () => import("./views/Member")
    },
    {
      path: "/search/keyword::name&id::id",
      name: "search",
      component: () => import("./views/Search")
    },
    {
      path: "/good/:id",
      name: "good",
      component: () => import("./views/Good")
    }
  ]
});
