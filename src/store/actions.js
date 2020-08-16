import Vue from "vue";

export default {
  loadUser({ commit }) {
    const users = require("../data/users.json");

    let jwt = Vue.prototype.$cookies.get("jwt") || null;
    let user = jwt ? users.find((u) => u.token == jwt) : null;

    if (user) {
      commit("setUser", user);
    }
  },
};
