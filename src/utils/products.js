import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['catalogProducts', 'cart'])
  },
  methods: {
    findProduct: function(
      productToSearch,
      propToCompare = 'reference',
      action = 'find',
      array = this.catalogProducts
    ) {
      let result = {
        find: array.find(element => element[propToCompare] == productToSearch),
        findIndex: array.findIndex(
          element => element[propToCompare] == productToSearch
        )
      }

      return result[action]
    },
    removeProduct: function(index) {
      let cart = JSON.parse(JSON.stringify(this.cart))
      cart.splice(index, 1)
      this.$store.commit('updateCart', cart)
    }
  }
}
