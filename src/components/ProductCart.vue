<template>
  <v-card width="100%" elevation="3" class="mb-2">
    <v-list-item-content class="pa-0">
      <v-row justify="center">
        <v-col :cols="7" class="pl-6">
          <v-list-item-title>
            <span class="truncate">{{ product.name }}</span>
          </v-list-item-title>
          <v-list-item-subtitle class="font-weight-bold" style="color: grey"
            ><small>{{ product.sku }}</small>
          </v-list-item-subtitle>
          <v-divider class="mb-1 white--text" dark></v-divider>

          <v-list-item-subtitle v-if="product.size !== 'catalog'"
            ><strong>Tamaño:</strong> {{ product.size || 'Único' }}
          </v-list-item-subtitle>

          <v-list-item-subtitle
            ><strong>Unidad:</strong>
            <span class="ml-1"> ${{ product.price }} </span>
          </v-list-item-subtitle>

          <v-list-item-subtitle style="font-size: 14px; height: 20px"
            ><strong>Cantidad:</strong> {{ product.quantity }}
          </v-list-item-subtitle>
        </v-col>
        <v-col :cols="5" class="pa-0">
          <v-img
            contain
            :src="'https://api.tissini.app' + product.image"
            width="180"
            class="product-image"
            :height="130"
          />
        </v-col>
      </v-row>
      <v-card-actions class="pa-0">
        <v-btn
          color="blue"
          style="color: white; width:50%; border-radius: 0 0 0 5px"
          class="elevation-0"
          @click="editProduct"
        >
          <v-icon class="mr-2">mdi-lead-pencil</v-icon>Modificar
        </v-btn>
        <v-btn
          class="ml-0 elevation-0"
          color="red"
          style="color: white; width: 50%; border-radius: 0 0 5px 0"
          @click="removeProduct(index)"
        >
          <v-icon class="mr-2">mdi-delete</v-icon>Eliminar
        </v-btn>
      </v-card-actions>
    </v-list-item-content>
  </v-card>
</template>

<script>
import axios from 'axios'

import { mapState } from 'vuex'

import products from '@/utils/products'

export default {
  mixins: [products],
  props: {
    product: {
      type: Object,
      required: true,
      default: () => {}
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(['catalogProducts', 'cart'])
  },
  methods: {
    editProduct: function() {
      let productFound = this.findProduct(
        this.product.reference,
        'reference',
        'find',
        this.catalogProducts
      )

      if (productFound) {
        productFound['indexSize'] = this.cart[this.index].indexSize
        productFound['quantity'] = this.cart[this.index].quantity
        this.$emit('open', productFound)
      } else {
        this.removeProduct(this.index)
        alert('Este producto no tiene unidades en ninguna de sus tallas.')
      }
    }
  }
}
</script>
<style scoped>
::v-deep .v-list .v-messages__message {
  margin-left: 35px;
  margin-top: -15px;
  font-size: 13px;
}

::v-deep .v-list-item {
  padding: 0 1px;
  height: 110px;
}

.truncate {
  width: 175px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-image {
  margin-right: 0px;
}

::v-deep .v-list-item__title {
  font-size: 15px;
  font-weight: bold;
}

::v-deep .v-list-item__subtitle {
  font-size: 14px;
  height: 20px;
}
</style>
