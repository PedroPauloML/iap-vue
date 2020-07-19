import Vue from "vue";
import Vuetify from "vuetify/lib";
// import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#004B83",
        secondary: "#D0D7DC",
        accent: "#E08E00",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },
    },
  },
});
