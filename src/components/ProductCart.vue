<template>
  <v-card width="100%" elevation="3" color="pink lighten-5">
    <div class="d-flex flex-no-wrap justify-space-between">
      <div class="col-7">
        <v-card-title class="h5" v-text="product.name"></v-card-title>

        <v-card-subtitle>
          <p class="mb-0"><strong>SKU:</strong> {{ product.sku }}</p>
          <p class="mb-0"><strong>Precio:</strong> ${{ product.price }}</p>
          <p class="mb-0"><strong>Cantidad:</strong> {{ product.quantity }}</p>
        </v-card-subtitle>
      </div>
      <div class="col-5">
        <v-avatar class="ma-0" size="130" tile>
          <v-img :src="`http://api.tissini.app/${product.image}`"></v-img>
        </v-avatar>
      </div>
    </div>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue" @click="test">Edit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'

import { mapState } from 'vuex'
export default {
  props: {
    product: {
      type: Object,
      required: true,
      default: () => {}
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(['requestedProducts', 'cart'])
  },
  methods: {
    test: function() {
      let productFound = this.requestedProducts.find(
        element => element.reference == this.product.reference
      )

      if (productFound) {
        productFound['indexSize'] = this.cart[this.index].indexSize
        this.$emit('open', productFound)
      } else {
        const api = 'https://api.tissini.app/api/v1/product/searchall/'
        const token =
          'AFZdgWRAzSb6VXmXmTwjR7gCHGEtLZzsOwUjtCovMma4sCeH5kYQpoo3qpKUFVPyUPDmTfxSq94tE3gM'
        axios
          .get(api + this.product.reference, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(res => {
            console.log(res.data)
            productFound = res.data[0]
            productFound['indexSize'] = this.cart[this.index].indexSize
            this.$emit('open', productFound)
          })
          .catch(error => console.log(error))
      }
    }
  }
}
</script>
