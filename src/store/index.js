import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentBookId:[],
    bookCityData:[],
    bestSelling:[],
    mostPopular:[],
    novelExpress:[],
  },
  getters: {
    bestSelling(state){
      return state.bookCityData.slice(0,5)
    },
    mostPopular(state){
      return state.bookCityData.slice(5,13)
    },
    novelExpress(state){
      return state.bookCityData.slice(13,17)
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
