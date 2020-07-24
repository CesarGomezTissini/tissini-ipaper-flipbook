import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
    requestedProducts: []
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
    setRequestedProducts: (state, payload) =>
      state.requestedProducts.push(payload)
  },
  getters: {
    countProductsFromCart: state => {
      let count = 0
      state.cart.forEach(element => (count += element.quantity))

      return count
    }
  },
  actions: {}
})
