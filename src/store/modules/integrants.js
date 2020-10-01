export default {
  namespaced: true,
  state: {
    integrants: [],
  },
  mutations: {
    addIntegrant(state, integrant) {
      if (!integrant.id) {
        integrant.id = state.integrants.length + 1;
      }
      state.integrants = [integrant, ...state.integrants];
    },
    updateIntegrant(state, payload) {
      let index = state.integrants.findIndex((el) => el.id == payload.id);

      if (index != -1) {
        state.integrants[index] = {
          ...state.integrants[index],
          ...payload.data,
        };
      }
    },
    removeIntegrants(state, id) {
      state.integrants = state.integrants.filter((el) => el.id != id);
    },
  },
  actions: {
    loadIntegrants({ commit, state }) {
      if (!state.integrants.length > 0) {
        let integrants = require("../../data/integrants.json");
        integrants
          .sort((a, b) => a.id - b.id)
          .forEach((integrant) => {
            commit("addIntegrant", integrant);
          });
      }
    },
    addIntegrant({ commit }, integrant) {
      commit("addIntegrant", integrant);
    },
    updateIntegrant({ commit }, payload) {
      commit("updateIntegrant", payload);
    },
    removeIntegrant({ commit }, id) {
      commit("removeIntegrants", id);
    },
  },
};
