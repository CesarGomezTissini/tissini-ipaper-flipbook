<template>
  <v-card width="300" elevation="3" color="pink lighten-5">
    <div class="d-flex flex-no-wrap justify-space-between">
      <div class="col-7">
        <v-card-title class="h5" v-text="product.name"></v-card-title>

        <v-card-subtitle>
          <p class="mb-0"><strong>SKU:</strong> {{ product.sku }}</p>
          <p class="mb-0"><strong>Precio:</strong> ${{ product.price }}</p>
          <p class="mb-0"><strong>Cantidad:</strong> {{ product.quantity }}</p>
        </v-card-subtitle>
      </div>
      <div class="col-5">
        <v-avatar class="ma-0" size="130" tile>
          <v-img :src="`http://api.tissini.app/${product.image}`"></v-img>
        </v-avatar>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
      default: () => {}
    }
  }
}
</script>
