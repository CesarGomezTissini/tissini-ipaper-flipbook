<template>
  <div class="text-xs-center">
    <DialogProduct v-model="dialogProduct" :product="product" />

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
              <h2 class="mb-3">Productos Añadidos</h2>
              <template v-for="(cartProduct, index) in cart">
                <product-cart
                  :product="cartProduct"
                  :index="index"
                  :key="index"
                  @open="openDialogProduct"
                />
              </template>
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
      dialogProduct: false
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
      console.log(product)
      this.product = product
      this.dialogProduct = true
    },
    closeDialog: function() {
      this.dialogCart = false
    }
  }
}
</script>
