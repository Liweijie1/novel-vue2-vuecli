import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentBookId:[],
    bookCityData:[],
    bestSelling:[],
    mostPopular:[],
  },
  getters: {
    bestSelling(state){
      return state.bookCityData.slice(0,4)
    },
    mostPopular(state){
      return state.bookCityData.slice(4,12)
    },

  },
  mutations: {
    setCurrentBookId(state,payload){
      state.currentBookId = payload
    },
    setBookCityData(state,payload){
      state.bookCityData = [...payload]
    },
  },
  actions: {
  },
  modules: {
  }
})
