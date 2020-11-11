export default {
  namespaced: true,
  state: {
    layout: "Site",
  },
  mutations: {
    changeLayout(state, newLayout) {
      state.layout = newLayout;
    },
  },
  actions: {
    changeLayout({ commit }, newLayout) {
      commit("changeLayout", newLayout);
    },
  },
};
