<template>
  <v-container pa-0>
    <InfoDialog v-model="infoDialog" :product="product" />
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center">
          <!-- <div class="iframe-loading" v-if="iframeLoading">
            iframe loading...
          </div> -->
          <!-- <div> -->
          <iframe
            style="width: 100%; height: 550px"
            ref="frame"
            src="https://viewer.ipaper.io/tissini/catalogo-textil-primavera-verano-2020/"
            @load="onLoad"
            @iframe-load="onIframeLoad"
            @onSpreadChange="onAnyAction"
            @onPageElementClick="itemDetail"
            @onBasketClick="onOpenBasket"
            frameborder="0"
            allow="fullscreen;autoplay"
            allowfullscreen
            webkitallowfullscreen
            mozallowfullscreen
          >
          </iframe>
          <!-- </div> -->
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import InfoDialog from './DialogProduct'
export default {
  name: 'HelloWorld',

  data: () => ({
    iframeLoading: true,
    infoDialog: false,
    bodyMessage: '',
    product: null
  }),
  components: {
    InfoDialog
  },
  methods: {
    onAnyAction: function($event) {},
    start: function() {
      iPaperAPI.goToPage(1)
    },
    onLoad: function() {
      console.log('iframe loaded')
      iPaperAPI.updateEventSettings({
        onBasketClick: { preventDefault: true },
        onPageElementClick: { preventDefault: true }
      })
      this.iframeLoading = false
    },
    onIframeLoad: function() {
      console.log('iframe loaded')
    },
    itemDetail: function($event) {
      // console.log('details')
      // console.log($event.detail.data.productId)
      let product = $event.detail.data.productId

      const api = 'https://api.tissini.app/api/v1/product/searchall/'
      const token =
        'AFZdgWRAzSb6VXmXmTwjR7gCHGEtLZzsOwUjtCovMma4sCeH5kYQpoo3qpKUFVPyUPDmTfxSq94tE3gM'
      axios
        .get(api + product, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          console.log(res.data)
          this.product = res.data[0]
          this.infoDialog = true
        })
        .catch(error => console.log(error))
    },
    onOpenBasket: function() {
      alert('Hello World!')
    }
  }
}
</script>
