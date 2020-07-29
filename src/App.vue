<template>
  <v-app>
    <v-main>
      <Iframe />
    </v-main>
  </v-app>
</template>

<script>
import Iframe from './components/Iframe'
import { mapGetters } from 'vuex'

export default {
  name: 'App',

  components: {
    Iframe
  },
  created() {
    this.$store.dispatch('getProducts')
    this.getCart()
  },
  methods: {
    getCart: function() {
      if (localStorage.cart) {
        this.$store.commit('updateCart', JSON.parse(localStorage.cart))
      }
    }
  }
}
</script>
