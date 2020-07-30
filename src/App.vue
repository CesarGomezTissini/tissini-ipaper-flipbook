<template>
  <v-app>
    <v-main>
      <v-snackbar
        class="cart__notifier"
        :timeout="-1"
        color="warning"
        v-model="snackBar"
        rounded="pill"
        transition="slide-x-transition"
      >
        <div style="text-align: center;">
          <v-icon dark right>mdi-alert-outline</v-icon>
          Hay novedades en el carrito. <br />Presiona en el botón flotante para
          ver.
        </div>
      </v-snackbar>
      <Iframe @loaded="iframeLoaded = true" />
    </v-main>
  </v-app>
</template>

<script>
import Iframe from './components/Iframe'
import { mapState } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      iframeLoaded: false
    }
  },
  components: {
    Iframe
  },
  created() {
    this.getCart()
    this.$store.dispatch('getProducts')
  },
  computed: {
    ...mapState(['removedProductsFromCart', 'isCartNotVisitedYet']),
    snackBar: {
      get() {
        return (
          this.iframeLoaded &&
          this.removedProductsFromCart.length > 0 &&
          this.isCartNotVisitedYet
        )
      },
      set() {}
    }
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

<style scoped>
::v-deep .v-snack.cart__notifier {
  width: 200px;
  top: -40px;
}

::v-deep .cart__notifier .v-snack__content {
  padding-left: 70px;
  padding-right: 0px;
}

@media screen and (max-width: 320px) {
  ::v-deep .v-snack.cart__notifier {
    width: 140px;
  }

  ::v-deep .cart__notifier .v-snack__content {
    padding-left: 100px;
    padding-right: 0px;
    font-size: 12px;
  }
}
</style>
