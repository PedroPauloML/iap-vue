export default {
  namespaced: true,
  state: {
    schedules: [],
  },
  mutations: {
    addSchedule(state, schedule) {
      if (!schedule.id) {
        schedule.id = state.schedules.length + 1;
      }
      state.schedules = [schedule, ...state.schedules];
    },
    updateSchedule(state, payload) {
      let index = state.schedules.findIndex((el) => el.id == payload.id);

      if (index != -1) {
        state.schedules[index] = { ...state.schedules[index], ...payload.data };
      }
    },
    removeSchedules(state, id) {
      state.schedules = state.schedules.filter((el) => el.id != id);
    },
  },
  actions: {
    loadSchedules({ commit, state }) {
      if (!state.schedules.length > 0) {
        let schedules = require("../../data/schedules.json").map((obj) => {
          obj.description = obj.description.filter((el) => !!el).join("");

          return obj;
        });
        schedules
          .sort((a, b) => a.id - b.id)
          .forEach((schedule) => {
            commit("addSchedule", schedule);
          });
      }
    },
    addSchedule({ commit }, schedule) {
      commit("addSchedule", schedule);
    },
    updateSchedule({ commit }, payload) {
      commit("updateSchedule", payload);
    },
    removeSchedule({ commit }, id) {
      commit("removeSchedules", id);
    },
  },
};
