import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
// import router from "../routes/index";
import { fetchboard } from "../api/index";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    list: [],
  },
  mutations: {
    SET_BOARD(state, list) {
      state.list = list;
    },
  },
  actions: {
    FETCH_BOARD(context) {
      fetchboard()
        .then((response) => {
          context.commit("SET_BOARD", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // FETCH_LIST(context, payload) {
    //   axios
    //     .post("http://192.168.70.212/posts", payload)
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .then(() => {
    //       alert("등록되었습니다.");
    //       router.push({ name: "home" });
    //     })
    //     .catch((err) => console.log(err));
    // },
  },
});
