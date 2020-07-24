<template>
  <v-app>
    <!-- <dialog-cart v-model="dialogCart" /> -->
    <!-- <v-app-bar app color="grey lighten-3" dark>
      <div class="d-flex align-center">
        <v-img
          class="shrink mr-2"
          contain
          :src="logo"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>
      <v-badge
        style="margin-top: 6px;"
        :content="countProductsFromCart"
        :value="countProductsFromCart"
        color="pink"
        overlap
      >
        <v-btn @click="openDialogCart" icon color="pink lighten-2"
          ><v-icon size="36">mdi-cart</v-icon></v-btn
        >
      </v-badge>
    </v-app-bar> -->

    <v-main>
      <Iframe />
    </v-main>
  </v-app>
</template>

<script>
import Iframe from './components/Iframe'
// import DialogCart from './components/DialogCart'
import { mapGetters } from 'vuex'

import tissini_logo from '@/assets/tissini-toolbar.png'

export default {
  name: 'App',
  data: () => ({
    logo: tissini_logo,
    dialogCart: false
  }),
  computed: {
    ...mapGetters(['countProductsFromCart'])
  },
  components: {
    Iframe
    // DialogCart
  },
  created() {
    this.getCart()
  },
  methods: {
    getCart: function() {
      if (localStorage.cart) {
        this.$store.commit('updateCart', JSON.parse(localStorage.cart))
      }
    },
    openDialogCart: function() {
      this.dialogCart = true
    }
  }
}
</script>

<style scoped>
::v-deep .v-btn:not(.v-btn--round).v-size--default {
  min-width: 36px;
}

::v-deep .v-badge__badge {
  bottom: calc(100% - 15px) !important;
  left: calc(100% - 15px) !important;
}
</style>
