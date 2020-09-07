import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store/store";
import router from "./router";

import "./plugins/vue_moment";
import "./plugins/vue-cookies";

import "./assets/global.scss";
import "./assets/tinymce.scss";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
