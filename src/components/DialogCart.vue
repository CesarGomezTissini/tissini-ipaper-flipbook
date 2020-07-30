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
          <v-row justify="center" no-gutters style="margin-bottom: 50px">
            <v-col :cols="12" :sm="6" :md="5" :lg="4">
              <cart-notifier v-model="cartNotifier" />
              <div v-if="cart.length > 0">
                <v-toolbar dense class="elevation-0">
                  <v-btn :ripple="false" icon x-large @click="closeDialog">
                    <v-icon color="primary" dark>mdi-arrow-left</v-icon>
                  </v-btn>
                  <v-toolbar-title>Productos Añadidos</v-toolbar-title>
                </v-toolbar>

                <v-list three-line class="my-1 py-1">
                  <template v-for="(cartProduct, index) in cart">
                    <product-cart
                      :product="cartProduct"
                      :index="index"
                      :key="index"
                      @open="openDialogProduct"
                    />
                  </template>
                </v-list>
                <h2 class="text-right">
                  Total: <span class="primary--text">${{ totalCart }}</span>
                </h2>
                <v-footer color="green lighten-5" fixed>
                  <v-col class="text-center" cols="12">
                    <v-btn
                      :disabled="cart.length == 0"
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
              </div>
              <v-container v-else>
                <v-row>
                  <v-col :cols="12" class="text-center">
                    <v-row justify="center" align="center">
                      <v-img :src="emptyCart" />
                      <h3 class="mb-5">
                        Parece que no hay productos en el carrito aún. Qué tal
                        si empezamos a agregar?
                      </h3>

                      <v-btn @click="dialogCart = false" rounded color="primary"
                        >Ir al catálogo</v-btn
                      >
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
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
import CartNotifier from '@/components/CartNotifier'

import empty_cart from '@/assets/empty_cart.png'

import { mapState, mapGetters } from 'vuex'
export default {
  props: {
    value: Boolean
  },
  data: function() {
    return {
      product: null,
      dialogProduct: false,
      origin: null,
      emptyCart: empty_cart
    }
  },
  computed: {
    ...mapState(['cart', 'removedProductsFromCart']),
    ...mapGetters(['totalCart']),
    dialogCart: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    cartNotifier: {
      get() {
        return this.removedProductsFromCart.length > 0
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  components: {
    ProductCart,
    DialogProduct,
    CartNotifier
  },
  methods: {
    openDialogProduct: function(product) {
      this.product = product
      this.origin = 'cart'
      this.dialogProduct = true
    },
    closeDialog: function() {
      this.cartNotifier = false
      this.dialogCart = false
    },
    sendForWhatsApp: function() {
      let bodyMessage = `Me gustaría ordenar esto:\n\n`

      this.cart.forEach(product => {
        bodyMessage += `*Nombre*: ${product.name}\n`
        bodyMessage += `*SKU*: ${product.sku}\n`
        bodyMessage += `*Talla*: ${product.size}\n`
        bodyMessage += `*Precio*: $${product.price}\n`
        bodyMessage += `*Cantidad*: ${product.quantity}\n`
        bodyMessage += `-----------------------------------\n`
      })

      bodyMessage += `\n*Total*: *$${this.totalCart}*`

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

<style scoped>
::v-deep .v-toolbar__content {
  padding: 4px 0px;
}
</style>
