<template>
  <div class="text-xs-center">
    <DialogProduct
      v-model="dialogProduct"
      :product="product"
      :origin="origin"
    />

    <v-dialog
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      v-model="dialogCart"
      persistent
    >
      <v-card>
        <v-container>
          <v-row justify="center" no-gutters>
            <v-col :cols="12" :sm="6" :md="5" :lg="4">
              <!-- <v-icon color="grey lighten-3" dark>mdi-arrow-left</v-icon> -->
              <v-btn fab dark small color="primary" @click="closeDialog">
                <v-icon color="grey lighten-3" dark>mdi-arrow-left</v-icon>
              </v-btn>
              <h2 class="mb-3">
                Productos Añadidos
              </h2>
              <v-list three-line class="my-1 py-1">
                <v-divider></v-divider>
                <template v-for="(cartProduct, index) in cart">
                  <product-cart
                    :product="cartProduct"
                    :index="index"
                    :key="index"
                    @open="openDialogProduct"
                    @remove-product="removeProduct"
                  />
                </template>
              </v-list>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ProductCart from '@/components/ProductCart'
import DialogProduct from '@/components/DialogProduct'

import { mapState, mapGetters } from 'vuex'
export default {
  props: {
    value: Boolean
  },
  data: function() {
    return {
      product: null,
      dialogProduct: false,
      origin: null
    }
  },
  computed: {
    ...mapState(['cart']),
    dialogCart: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  components: {
    ProductCart,
    DialogProduct
  },
  methods: {
    openDialogProduct: function(product) {
      this.product = product
      this.origin = 'cart'
      this.dialogProduct = true
    },
    closeDialog: function() {
      this.dialogCart = false
    },
    removeProduct: function(index) {
      let cart = JSON.parse(JSON.stringify(this.cart))
      cart.splice(index, 1)
      this.$store.commit('updateCart', cart)
    }
  }
}
</script>
