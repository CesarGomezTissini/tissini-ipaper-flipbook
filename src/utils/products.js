import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['catalogProducts', 'cart'])
  },
  methods: {
    findProduct: function(
      productToSearch,
      propToCompare = 'reference',
      array = this.catalogProducts
    ) {
      let result = {
        product: array.find(
          element => element[propToCompare] == productToSearch
        ),
        index: array.findIndex(
          element => element[propToCompare] == productToSearch
        )
      }

      return result
    },
    removeProduct: function(index) {
      let cart = JSON.parse(JSON.stringify(this.cart))
      cart.splice(index, 1)
      this.$store.commit('updateCart', cart)
    }
  }
}
