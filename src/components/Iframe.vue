<template>
  <v-container pa-0>
    <v-snackbar :timeout="2000" color="primary" top v-model="snackbar">
      <div style="text-align: center;">
        <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
        Producto agregado
      </div>
    </v-snackbar>
    <DialogProduct
      v-model="dialogProduct"
      :product="product"
      @showSnackbar="showSnackbar"
    />
    <DialogCart v-model="dialogCart" />
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-container>
            <iframe
              class="responsive-iframe"
              ref="frame"
              src="https://viewer.ipaper.io/tissini/catalogo-textil-primavera-verano-2020/"
              @load="onLoad"
              @onSpreadChange="onAnyAction"
              @onPageElementClick="itemDetail"
              frameborder="0"
              allow="fullscreen;autoplay"
              allowfullscreen
              webkitallowfullscreen
              mozallowfullscreen
            >
            </iframe>
          </v-container>
        </v-row>
      </v-col>
    </v-row>

    <v-scale-transition>
      <v-btn
        fab
        right
        dark
        fixed
        bottom
        bordered
        color="primary"
        class="elevation-7"
        @click="openDialogCart"
        v-if="!this.iframeLoading && cart.length > 0"
        ><v-icon dark>mdi-cart</v-icon>
        <v-badge
          :content="countProductsFromCart"
          :value="countProductsFromCart"
          color="primary"
          style="margin-top: -40px; left: 10px; font-size: 20px"
        >
        </v-badge>
      </v-btn>
    </v-scale-transition>
  </v-container>
</template>

<script>
import axios from 'axios'
import DialogProduct from './DialogProduct'
import DialogCart from './DialogCart'
import { mapState, mapGetters } from 'vuex'

import products from '@/utils/products'
export default {
  mixins: [products],
  data: () => ({
    iframeLoading: true,
    dialogProduct: false,
    bodyMessage: '',
    product: null,
    page: null,
    snackbar: false,
    dialogCart: false
  }),
  components: {
    DialogProduct,
    DialogCart
  },
  computed: {
    ...mapState(['catalogProducts', 'cart']),
    ...mapGetters(['countProductsFromCart'])
  },
  methods: {
    onAnyAction: function($event) {
      // console.log($event)
    },
    onLoad: function() {
      iPaperAPI.updateEventSettings({
        onBasketClick: { preventDefault: true },
        onPageElementClick: { preventDefault: true }
      })
      this.iframeLoading = false
      this.$emit('loaded')
    },
    itemDetail: function($event) {
      let { product: productFound } = this.findProduct(
        $event.detail.data.productId
      )

      if (productFound) {
        this.product = productFound
        this.dialogProduct = true
      } else {
        alert('Este producto no tiene existencias en ninguna de sus tallas.')
      }
    },
    searchPage() {
      iPaperAPI.goToPage(+this.page)
    },
    showSnackbar() {
      this.snackbar = true
    },
    openDialogCart: function() {
      this.$store.commit('setCartIsNotVisitedYet', false)
      this.dialogCart = true
    }
  }
}
</script>

<style scoped>
::v-deep .v-badge__badge.pink {
  font-size: 18px;
  width: 25px;
  height: 25px;
  border-radius: 20px;
}

.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: calc(100% - 8rem);
}

::v-deep .v-btn--absolute.v-btn--bottom,
.v-btn--fixed.v-btn--bottom {
  bottom: 54px;
}
</style>
