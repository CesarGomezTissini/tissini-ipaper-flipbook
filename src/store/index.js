import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
    catalogProducts: []
  },
  mutations: {
    pushToCart: (state, payload) => {
      state.cart.push(payload)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    updateCart: (state, payload) => {
      state.cart = payload
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    setCatalogProducts: (state, payload) => (state.catalogProducts = payload)
  },
  getters: {
    countProductsFromCart: state => {
      let count = 0
      state.cart.forEach(element => (count += element.quantity))

      return count
    }
  },
  actions: {
    getProducts: ({ state, commit }) => {
      axios
        .get('https://dev.tissini.app/api/v1/ipaper/products/searchall')
        .then(response => commit('setCatalogProducts', response.data.products))
    }
  }
})
