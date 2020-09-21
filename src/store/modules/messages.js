export default {
  namespaced: true,
  state: {
    messages: [],
  },
  mutations: {
    addMessage(state, messages) {
      messages = [messages].flat().map((el, index) => {
        el.id = state.messages.length + index + 1;
        return el;
      });
      state.messages = [...messages, ...state.messages];
    },
    updateMessage(state, payload) {
      let index = state.messages.findIndex((el) => el.id == payload.id);

      if (index != -1) {
        state.messages[index] = { ...state.messages[index], ...payload.data };
      }
    },
    removeMessages(state, id) {
      state.messages = state.messages.filter((el) => el.id != id);
    },
  },
  actions: {
    loadMessages({ commit, state }) {
      if (!state.messages.length > 0) {
        let messages = require("../../data/messages.json").map((obj) => {
          obj.content = obj.content.filter((el) => !!el).join("");

          return obj;
        });
        commit("addMessage", messages);
      }
    },
    addMessage({ commit }, messages) {
      commit("addMessage", messages);
    },
    updateMessage({ commit }, payload) {
      commit("updateMessage", payload);
    },
    removeMessages({ commit }, id) {
      commit("removeMessages", id);
    },
  },
};
