import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    token: null,
    FriendList: []
  },
  mutations: {
    setUserAfterLogin (state, payload) {
      state.user = payload
      state.token = payload.token
    }
  },
  getters: {
    isLogin (state) {
      return state.token || localStorage.getItem('token')
    },
    getUserId (state) {
      return state.user.id || localStorage.getItem('id')
    },
    getFriend (state) {
      return state.FriendList
    }
  },
  actions: {
    interceptorsResponse (context) {
      axios.interceptors.response.use(function (response) {
        return response
      }, function (error) {
        console.log(error.response.data.result.message)
        if (error.response.status === 401) {
          console.log(error.response)
          if (error.response.data.result.message === 'invalid token') {
            context.commit('setToken', null)
            localStorage.removeItem('token')
            router.push('/login')
            alert('maaf anda tidak boleh merubah token dengan sendirinya')
          } else if (error.response.data.result.message === 'token expired') {
            context.commit('setToken', null)
            localStorage.removeItem('token')
            router.push('/login')
            alert('maaf session habis silahkan login kembali')
          }
        }
        return Promise.reject(error)
      })
    },
    interceptorsRequest (context) {
      axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        config.headers.Authorization = `Bearer ${context.state.token}`
        return config
      }, function (error) {
        // Do something with request error
        return Promise.reject(error)
      })
    },
    loginUser (context, payload) {
      console.log('loginUser')
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_BASE_URL}/api/v1/users/login`, payload)
          .then(res => {
            // console.log(res)
            context.commit('setUserAfterLogin', res.data.result)
            localStorage.setItem('token', res.data.result.token)
            localStorage.setItem('id', res.data.result.id)
            router.push('/main')
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  modules: {
  }
})
