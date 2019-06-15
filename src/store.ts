import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import baseUrl from './apiUrl';

Vue.use(Vuex);

function login({commit}: any, user: any){
  return new Promise((resolve, reject) => {
    commit('auth_request')
    axios({url: `${baseUrl}/auth/login/`, data: user, method: 'POST' })
    .then(resp => {
      const token = resp.data.key
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = token
      commit('auth_success', token, {username: user.username})
      resolve(resp)
    })
    .catch(err => {
      commit('auth_error')
      localStorage.removeItem('token')
      reject(err)
    })
  })
}

function register({commit}: any, user: any){
  return new Promise((resolve, reject) => {
    commit('auth_request')
    axios({url: `${baseUrl}/auth/registration/`, data: user, method: 'POST' })
    .then(resp => {
      const token = resp.data.token
      const user = resp.data.user
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = token
      commit('auth_success', token, user)
      resolve(resp)
    })
    .catch(err => {
      commit('auth_error', err)
      localStorage.removeItem('token')
      reject(err)
    })
  })
}

function logout({commit}: any){
  return new Promise((resolve, reject) => {
    commit('logout')
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    resolve()
  })
}

interface State {
  status: string;
  token: string; 
  user: any;
}

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {}
  },
  mutations: {
    auth_request(state: State){
      state.status = 'loading'
    },
    auth_success(state: State, payload: {token: string, user: string}){
      state.status = 'success'
      state.token = payload.token
      state.user = payload.user
    },
    auth_error(state: State){
      state.status = 'error'
    },
    logout(state: State){
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login, 
    register, 
    logout
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    user: state => state.user,
    token: state => state.token
  }
});
