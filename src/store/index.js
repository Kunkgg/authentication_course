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
      axios.defaults.headers.common[
        "Authorization"
      ] = userData.token;
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
  },
});

export default store;
