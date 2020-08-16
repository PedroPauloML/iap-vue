import Vue from "vue";
import Vuex from "vuex";

import messages from "./modules/messages";
import user from "./modules/user";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  modules: {
    user,
    messages,
  },
});
