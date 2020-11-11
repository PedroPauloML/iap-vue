import Vue from "vue";
import Vuex from "vuex";

import general from "./modules/general";
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
    general,
    user,
    news,
    messages,
    schedules,
    integrants,
  },
});
