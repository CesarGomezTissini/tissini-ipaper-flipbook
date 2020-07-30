<template>
  <v-alert
    v-if="removedProductsFromCart.length > 0"
    border="top"
    colored-border
    color="warning"
    elevation="2"
    dismissible
    v-model="cartNotificator"
  >
    Hemos detectado novedades en tu carrito:

    <ul>
      <li v-for="(product, index) in removedProductsFromCart" :key="index">
        <strong>{{ product.product.name }} ({{ product.product.sku }})</strong>,
        <span v-if="product.newQuantity == 0">eliminado.</span>
        <span v-else
          >Cambio de cantidades de
          <strong>{{ product.product.quantity }}</strong> a
          <strong>{{ product.newQuantity }}.</strong></span
        >
      </li>
    </ul>
  </v-alert>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['removedProductsFromCart']),
    cartNotificator: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
