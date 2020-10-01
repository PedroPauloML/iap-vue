import Vue from "vue";
import Vuex from "vuex";

import messages from "./modules/messages";
import user from "./modules/user";
import news from "./modules/news";
import schedules from "./modules/schedules";
import integrants from "./modules/integrants";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  modules: {
    user,
    news,
    messages,
    schedules,
    integrants,
  },
});
