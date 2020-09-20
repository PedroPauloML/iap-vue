export default {
  namespaced: true,
  state: {
    news: [],
  },
  mutations: {
    addNews(state, news) {
      news = [news].flat().map((el, index) => {
        el.id = state.news.length + index + 1;
        return el;
      });
      state.news = [...news, ...state.news];
    },
    updateNews(state, payload) {
      let index = state.news.findIndex((el) => el.id == payload.id);

      if (index != -1) {
        state.news[index] = { ...state.news[index], ...payload.data };
      }
    },
    removeNews(state, id) {
      state.news = state.news.filter((el) => el.id != id);
    },
  },
  actions: {
    loadNews({ commit, state }) {
      if (!state.news.length > 0) {
        let news = require("../../data/news.json").map((obj) => {
          obj.content = obj.content.filter((el) => !!el).join("");

          return obj;
        });
        commit("addNews", news);
      }
    },
    addNews({ commit }, news) {
      commit("addNews", news);
    },
    updateNews({ commit }, payload) {
      commit("updateNews", payload);
    },
    removeNews({ commit }, id) {
      commit("removeNews", id);
    },
  },
};
