import Vue from 'vue';
import Vuex from 'vuex';
import AuthService from '../services/auth.service';

Vue.use(Vuex);

const user = JSON.parse(localStorage.getItem('_auth'));
const initialState = user
  ? { isAuth: true, uuid: user.uid }
  : { isAuth: false, uuid: null };

export default Vuex.Store({
  state: initialState,
  mutations: {
    login(state, userInfo) {
      state.uuid = userInfo.uid;
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
    register(state, userInfo) {
      state.uuid = userInfo.uid;
      state.isAuth = false;
    },
    refresh(state) {
      state.isAuth = true;
    },
  },
  actions: {
    async login({ commit }, userInfo) {
      return AuthService.login(userInfo)
        .then((userData) => {
          commit('login', userData);
          return Promise.resolve(userData);
        });
    },
    async logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    async refresh({ commit }, userInfo) {
      return AuthService.refresh(userInfo)
        .then(() => commit('refresh'));
    },
    async register({ commit }, userInfo) {
      return AuthService.register(userInfo)
        .then((userData) => {
          commit('register', userData);
          return Promise.resolve(userData);
        });
    },
  },
  getters: {
    isAuth: state => state.isAuth,
    uuid: state => state.uuid,
  },
});
