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
          <!-- </div> -->
        </v-row>
        <!-- <v-btn @click="searchPage">
          Página
        </v-btn>
        <v-text-field v-model="page" label="Pagina"></v-text-field> -->
      </v-col>
    </v-row>

    <v-scale-transition>
      <v-btn
        fab
        right
        dark
        fixed
        bottom
        color="pink lighten-2"
        class="elevation-7"
        @click="openDialogCart"
        v-if="!this.iframeLoading"
        ><v-icon dark>mdi-cart</v-icon>
        <v-badge
          :content="countProductsFromCart"
          :value="countProductsFromCart"
          color="pink"
          style="margin-top: -60px; left: 10px; font-size: 20px"
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
export default {
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
    ...mapState(['requestedProducts']),
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
    },
    itemDetail: function($event) {
      let product = $event.detail.data.productId

      let productFound = this.requestedProducts.find(
        element => element.reference == product
      )

      if (productFound) {
        this.product = productFound
        this.dialogProduct = true
      } else {
        const api = 'https://api.tissini.app/api/v1/product/searchall/'
        const token =
          'AFZdgWRAzSb6VXmXmTwjR7gCHGEtLZzsOwUjtCovMma4sCeH5kYQpoo3qpKUFVPyUPDmTfxSq94tE3gM'
        axios
          .get(api + product, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(res => {
            this.$store.commit('setRequestedProducts', res.data[0])
            this.product = res.data[0]
            this.dialogProduct = true
          })
          .catch(error => error)
      }
    },
    searchPage() {
      iPaperAPI.goToPage(+this.page)
    },
    showSnackbar() {
      this.snackbar = true
    },
    openDialogCart: function() {
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
  height: 100%;
}
</style>
