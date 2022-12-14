import Vue from "vue";
import VueRouter from "vue-router";
import BoardView from "../views/BoardView.vue";
import ListView from "../views/ListView.vue";
import NewView from "../views/NewView.vue";
import ModifyView from "../views/ModifyView.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",

  routes: [
    {
      path: "/",
      name: "home",
      component: BoardView,
    },
    {
      path: "/new",
      name: "new",
      component: NewView,
    },
    {
      path: "/:id", //동적 라우팅
      component: ListView,
    },
    {
      path: "/mod/:id",
      name: "Modify",
      component: ModifyView,
    },
  ],
});

export default router;
