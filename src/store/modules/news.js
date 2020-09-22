export default {
  namespaced: true,
  state: {
    news: [],
  },
  mutations: {
    addNews(state, news) {
      if (!news.id) {
        news.id = state.news.length + 1;
      }
      state.news = [news, ...state.news];
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
        news
          .sort((a, b) => a.id - b.id)
          .forEach((n) => {
            commit("addNews", n);
          });
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
