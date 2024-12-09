import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bookCoupons:0
  },
  getters: {
  },
  mutations: {
    changeBookCoupons(state){
      state.bookCoupons = 30
    },
  },
  actions: {
  },
  modules: {
  }
})
