<template>
  <v-card width="100%" elevation="3" class="mb-2">
    <v-list-item-content class="pa-0">
      <v-row justify="center">
        <v-col :cols="7" class="pl-6">
          <!-- {{ product.name }} -->
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
        >
          <v-icon class="mr-2">mdi-lead-pencil</v-icon>Modificar
        </v-btn>
        <v-btn
          class="ml-0 elevation-0"
          color="red"
          style="color: white; width: 50%; border-radius: 0 0 5px 0"
        >
          <v-icon class="mr-2">mdi-delete</v-icon>Eliminar
        </v-btn>
      </v-card-actions>
    </v-list-item-content>
  </v-card>

  <!-- <v-card width="100%" elevation="3" color="pink lighten-5">
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

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue" @click="test">Edit</v-btn>
    </v-card-actions>
  </v-card> -->

  <!-- <v-list-tile
    :key="`${index + ' ' + product.id + ' ' + (product.promoIndex || '')}`"
    class="my-3"
  >
    <v-col :cols="8">
      <v-list-tile-content class="px-0">
        <v-list-tile-title
          ><span class="truncate">{{ product.name }}</span></v-list-tile-title
        >
        <v-list-tile-sub-title
          class="font-weight-bold"
          style="margin-top: -8px;color: grey"
          ><small>{{ product.sku }}</small>
        </v-list-tile-sub-title>
        <v-divider class="mb-1 white--text" dark></v-divider>

        <v-list-tile-sub-title v-if="product.size !== 'catalog'"
          ><strong>Tamaño:</strong> {{ product.size || 'Único' }}
        </v-list-tile-sub-title>
        <v-list-tile-sub-title
          ><strong>Unidad:</strong>
          <span
            v-if="discountFlag && !product.catalog && product.price > 0"
          >
            <span style="text-decoration: line-through;" class="ml-1">
              ${{ product.price }}
            </span>
            <strong class="mx-1" style="font-size:14px;color: #f06292;"
              >${{ product.priceWithDiscount }}</strong
            >
          </span>
          <span v-else>${{ product.price }}</span>
        </v-list-tile-sub-title> 
        <v-list-tile-sub-title style="font-size: 14px; height: 20px"
          ><strong>Cantidad:</strong> {{ product.selectedQuantityScart }}
        </v-list-tile-sub-title>
      </v-list-tile-content>
    </v-col>
    <v-col :cols="6">
      <v-list-tile-avatar :size="avatarSize" tile style="margin-top: 0px">
        <v-img :src="URL + product.image" width="100%" class="product-image" />
      </v-list-tile-avatar>
    </v-col>
  </v-list-tile> -->
</template>

<script>
import axios from 'axios'

import { mapState } from 'vuex'
export default {
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
    ...mapState(['requestedProducts', 'cart'])
  },
  methods: {
    test: function() {
      let productFound = this.requestedProducts.find(
        element => element.reference == this.product.reference
      )

      if (productFound) {
        productFound['indexSize'] = this.cart[this.index].indexSize
        this.$emit('open', productFound)
      } else {
        const api = 'https://api.tissini.app/api/v1/product/searchall/'
        const token =
          'AFZdgWRAzSb6VXmXmTwjR7gCHGEtLZzsOwUjtCovMma4sCeH5kYQpoo3qpKUFVPyUPDmTfxSq94tE3gM'
        axios
          .get(api + this.product.reference, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(res => {
            console.log(res.data)
            productFound = res.data[0]
            productFound['indexSize'] = this.cart[this.index].indexSize
            this.$emit('open', productFound)
          })
          .catch(error => console.log(error))
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
