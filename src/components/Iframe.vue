<template>
  <v-container pa-0>
    <v-snackbar :timeout="3000" color="primary" top v-model="snackbar">
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
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center">
          <iframe
            style="width: 100%; height: 550px"
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
          <!-- </div> -->
        </v-row>
        <v-btn @click="searchPage">
          Página
        </v-btn>
        <v-text-field v-model="page" label="Pagina"></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import DialogProduct from './DialogProduct'
import { mapState } from 'vuex'
export default {
  name: 'HelloWorld',

  data: () => ({
    iframeLoading: true,
    dialogProduct: false,
    bodyMessage: '',
    product: null,
    page: null,
    snackbar: false
  }),
  components: {
    DialogProduct
  },
  computed: {
    ...mapState(['requestedProducts'])
  },
  methods: {
    onAnyAction: function($event) {},
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
    }
  }
}
</script>

<style scoped></style>
