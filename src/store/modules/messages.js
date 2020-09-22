export default {
  namespaced: true,
  state: {
    messages: [],
  },
  mutations: {
    addMessage(state, message) {
      if (!message.id) {
        message.id = state.messages.length + 1;
      }
      state.messages = [message, ...state.messages];
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
        messages
          .sort((a, b) => a.id - b.id)
          .forEach((message) => {
            commit("addMessage", message);
          });
      }
    },
    addMessage({ commit }, message) {
      commit("addMessage", message);
    },
    updateMessage({ commit }, payload) {
      commit("updateMessage", payload);
    },
    removeMessages({ commit }, id) {
      commit("removeMessages", id);
    },
  },
};
