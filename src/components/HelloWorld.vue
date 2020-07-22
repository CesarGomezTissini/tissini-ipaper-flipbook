<template>
  <v-container pa-0>
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
export default {
  name: 'HelloWorld',

  data: () => ({
    iframeLoading: true
  }),
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
      console.log($event)
    },
    onOpenBasket: function() {
      alert('Hello World!')
    }
  }
}
</script>
