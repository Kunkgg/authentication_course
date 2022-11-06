import axios from "axios";
import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      user: null,
    };
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common["Authorization"] = userData.token;
    },
    LOGOUT(state) {
      localStorage.removeItem("user");
      location.reload(); // 刷新页面可以清空 state 和 axios headers
      state.user = null;
      axios.defaults.headers.common["Authorization"] = null;
    },
  },
  actions: {
    register({ commit }, credentials) {
      return axios
        .post("//localhost:3000/register", credentials)
        .then(({ data }) => {
          console.log("user data is", data);
          commit("SET_USER_DATA", data);
        });
    },
    login({ commit }, credentials) {
      return axios
        .post("//localhost:3000/login", credentials)
        .then(({ data }) => {
          commit("SET_USER_DATA", data);
        });
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    },
  },
});

export default store;
