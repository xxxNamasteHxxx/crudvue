import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const axios = require('axios').default
export default new Vuex.Store({
  state: {
    utama: [],
    dataanggota: [],
    datatransaksi: []
  },
  mutations: {
    'AMBIL' (state, param) {
      state.utama = param
    }
  },
  actions: {
    ambilUser ({ commit }) {
      axios.get('http://localhost:3000/user')
        .then(function (resp) {
          commit('AMBIL', resp.data)
        })
    }
  },
  modules: {
  }
})
