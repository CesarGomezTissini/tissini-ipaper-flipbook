import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
    catalogProducts: [],
    removedProductsFromCart: [],
    isCartNotVisitedYet: true
  },
  mutations: {
    setCartIsNotVisitedYet: (state, payload) =>
      (state.isCartNotVisitedYet = payload),
    pushToCart: (state, payload) => {
      state.cart.push(payload)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    updateCart: (state, payload) => {
      state.cart = payload
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    setCatalogProducts: (state, payload) => (state.catalogProducts = payload),
    setRemovedProductsFromCart: (state, payload) =>
      state.removedProductsFromCart.push(payload)
  },
  getters: {
    countProductsFromCart: state => {
      let count = 0
      state.cart.forEach(element => (count += element.quantity))

      return count
    }
  },
  actions: {
    getProducts: ({ commit, dispatch }) => {
      axios
        .get('https://dev.tissini.app/api/v1/ipaper/products/searchall')
        .then(response => {
          commit('setCatalogProducts', response.data.products)
          dispatch('checkCart')
        })
    },
    checkCart: ({ state, commit }) => {
      let cart = state.cart.filter(product => {
        let productFound = state.catalogProducts
          .find(item => item.reference == product.reference)
          .variants.find(variant => product.id == variant.id)

        if (!productFound) {
          commit('setRemovedProductsFromCart', {
            product: JSON.parse(JSON.stringify(product)),
            newQuantity: 0
          })
          return
        }

        if (
          productFound.quantity > 0 &&
          productFound.quantity < product.quantity
        ) {
          commit('setRemovedProductsFromCart', {
            product: JSON.parse(JSON.stringify(product)),
            newQuantity: productFound.quantity
          })

          product.quantity = productFound.quantity
        }

        return product
      })

      commit('updateCart', cart)
    }
  }
})
