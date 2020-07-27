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
      transition="slide-x-reverse-transition"
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
              <v-footer color="green lighten-5" fixed>
                <v-col class="text-center" cols="12">
                  <v-btn
                    outlined
                    rounded
                    color="green"
                    @click="sendForWhatsApp"
                  >
                    <v-icon dark class="mr-2">mdi-whatsapp</v-icon>
                    Enviar por WhatsApp
                  </v-btn>
                </v-col>
              </v-footer>
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
    },
    sendForWhatsApp: function() {
      let bodyMessage = `Hola {{customer.name}}, este es mi orden desde TISSINI iPaper:\n\n`

      this.cart.forEach(product => {
        bodyMessage += `Nombre: ${product.name}\nSKU: ${product.reference}\nPrecio: $${product.price}\nCantidad: ${product.quantity}\n------------------------------\n`
      })

      if ('share' in navigator) {
        navigator.share({
          title: document.title,
          text: bodyMessage,
          url: 'whatsapp://send?text=' + encodeURIComponent(bodyMessage)
        })
      } else {
        location.href =
          'whatsapp://send?text=' + encodeURIComponent(bodyMessage)
      }
    }
  }
}
</script>
