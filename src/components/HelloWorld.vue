<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="12">
        <div class="iframe-wrapper">
          <div class="iframe-loading" v-if="iframeLoading">
            iframe loading...
          </div>
          <vue-friendly-iframe
            ref="frame"
            :style="`display: ${iframeLoading ? 'none' : 'block'}`"
            src="https://viewer.ipaper.io/tissini/catalogo-textil-primavera-verano-2020/#/"
            @load="onLoad"
            @iframe-load="onIframeLoad"
            frameborder="0"
            gesture="media"
            allowfullscreen
          ></vue-friendly-iframe>
        </div>
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
    onLoad: function() {
      console.log('iframe loaded')
      this.iframeLoading = false
    },
    onIframeLoad: function() {
      console.log('iframe loaded')
    }
  }
}
</script>

<style>
.iframe-wrapper {
  border: 1px solid gray;
}
.iframe-wrapper .vue-friendly-iframe {
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
}
.iframe-wrapper .vue-friendly-iframe iframe {
  height: 100%;
  width: 100%;
}

@media only screen and (max-width: 600px) {
  .appWrap .l-app .l-app__body #catalogWrap {
    padding-top: 0 !important;
    top: 0 !important;
  }
}
</style>
