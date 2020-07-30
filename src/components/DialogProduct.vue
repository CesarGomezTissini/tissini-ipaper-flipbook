<template>
  <div class="text-xs-center">
    <v-dialog
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      v-model="dialogProduct"
      persistent
    >
      <v-card v-if="!productDetail">
        <h1>no hay</h1>
      </v-card>
      <v-card :height="containerHeight" v-else>
        <v-row justify="center" no-gutters>
          <v-col :cols="12" :sm="5" :md="4" :lg="3">
            <v-card elevation="0">
              <v-row
                align="start"
                class="lightbox white--text ma-0 fill-height"
              >
                <v-btn
                  right
                  fab
                  fixed
                  dark
                  small
                  color="primary"
                  @click="closeDialog"
                  style="top: 10px;"
                >
                  <v-icon dark>mdi-close</v-icon>
                </v-btn>
              </v-row>
              <v-carousel
                :show-arrows="productDetail.images.length > 1"
                v-model="carrousel"
                hide-delimiters
                :height="carrouselHeight"
              >
                <v-carousel-item
                  v-for="(image, i) in productDetail.images"
                  :key="i"
                >
                  <v-img width="100%" contain :src="URL + image.url">
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="primary"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-carousel-item>
              </v-carousel>
              <v-divider></v-divider>
              <v-card-title>
                <v-row no-gutters>
                  <v-col :cols="8" :sm="9">
                    {{ productDetail.name }}
                  </v-col>
                  <v-col :cols="4" style="text-align: right;" :sm="3">
                    ${{ price }}
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-text>
                <span>Tallas disponibles</span>
                <v-chip-group
                  v-model="variant"
                  active-class="pink lighten-2 white--text bordered"
                >
                  <v-chip
                    v-for="(variant, index) in sizes"
                    :key="index"
                    :disabled="!Boolean(variant.quantity)"
                    :color="Boolean(variant.quantity) ? 'pink lighten-5' : ''"
                  >
                    {{ variant.size }}
                  </v-chip>
                </v-chip-group>
                <v-select
                  :disabled="!quantities.length > 0"
                  label="Cantidad"
                  v-model="quantitySelected"
                  :items="quantities"
                  required
                  color="primary"
                ></v-select>
                <v-footer color="pink lighten-5" fixed>
                  <v-col class="text-center" cols="12">
                    <v-btn
                      :disabled="quantities.length === 0"
                      outlined
                      rounded
                      color="primary"
                      @click="addUpdateProduct"
                    >
                      <v-icon dark class="mr-2">mdi-cart-arrow-down</v-icon>
                      {{
                        origin != 'cart'
                          ? 'AGREGAR AL CARRITO'
                          : 'Actualizar producto'
                      }}
                    </v-btn>
                  </v-col>
                </v-footer>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import products from '@/utils/products'

import { URL } from '@/utils/http'

export default {
  mixins: [products],
  props: {
    value: Boolean,
    product: {
      type: Object,
      default: null
    },
    origin: {
      type: String,
      default: 'catalog'
    }
  },
  data: function() {
    return {
      URL: URL,
      variant: null,
      quantitySelected: 1,
      quantities: [],
      variantSelected: null,
      carrousel: 0,
      carrouselHeight: 300,
      containerHeight: 'auto'
    }
  },
  created() {
    window.addEventListener('resize', this.getScreenSize)
  },
  mounted() {
    this.getScreenSize()
  },
  watch: {
    dialogProduct: function(value) {
      if (value && this.product) {
        if (this.origin == 'cart') {
          this.quantitySelected = this.product.quantity
          this.variant = this.product.indexSize
        }
      }
    },
    variant: function(value) {
      if (value || value === 0) {
        this.variantSelected = this.productDetail.variants[value]
        this.price = this.variantSelected.price
        this.quantities = Array.from(
          {
            length:
              this.variantSelected.quantity >= 20
                ? 20
                : this.variantSelected.quantity
          },
          (v, k) => k + 1
        )
      } else {
        this.quantities = []
        this.quantitySelected = 1
        this.variantSelected = null
      }
    }
  },
  computed: {
    ...mapState(['cart']),
    dialogProduct: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    productDetail: {
      //return this.product
      get() {
        return this.product
      },
      set(value) {}
    },
    price: {
      get() {
        return this.productDetail.price
      },
      set(value) {}
    },
    sizes: function() {
      return this.sortingSizes()
    }
  },
  methods: {
    addUpdateProduct: function() {
      let productToAdd = {
        indexSize: this.variant,
        size: this.variantSelected.size,
        quantity: this.quantitySelected,
        name: this.productDetail.name,
        reference: this.productDetail.reference,
        price: this.variantSelected.price,
        image:
          this.productDetail.images.length !== 0
            ? this.productDetail.images[0].url
            : null,
        sku: this.variantSelected.sku,
        id: this.variantSelected.id,
        category: this.productDetail.category,
        variants: this.productDetail.variants,
        product_id: this.productDetail.id
      }

      let cart = JSON.parse(JSON.stringify(this.cart))

      if (this.cart.length > 0) {
        if (this.origin == 'cart') {
          let { index } = this.findProduct(
            this.product.reference,
            undefined,
            this.cart
          )

          cart[index].quantity = this.quantitySelected
          cart[index].size = this.variantSelected.size
          cart[index].sku = this.variantSelected.sku
          cart[index].indexSize = this.variant

          this.$store.commit('updateCart', cart)
          this.$emit('showSnackbar')
          this.closeDialog()
        } else {
          let { index, product } = this.findProduct(
            this.variantSelected.id,
            'id',
            this.cart
          )

          if (index >= 0) {
            let checkedQuantity = cart[index].quantity + this.quantitySelected

            if (checkedQuantity <= product.quantity) {
              cart[index].quantity += this.quantitySelected
              this.$store.commit('updateCart', cart)
              this.$emit('showSnackbar')
              this.closeDialog()
            } else {
              if (product.quantity - cart[index].quantity <= 0) {
                alert(`No puedes agregar más cantidades de este producto.`)
              } else if (product.quantity - cart[index].quantity > 0) {
                alert(
                  `Sólo puedes agregar ${product.quantity -
                    cart[index].quantity} unidades de este producto.`
                )
              }
            }
          } else {
            this.$store.commit('pushToCart', productToAdd)
            this.$emit('showSnackbar')
            this.closeDialog()
          }
        }
      } else {
        this.$store.commit('pushToCart', productToAdd)
        this.$emit('showSnackbar')
        this.closeDialog()
      }
    },

    getScreenSize: function() {
      let widthScreen = window.innerWidth

      if (widthScreen <= 320) {
        this.carrouselHeight = 320
      } else if (widthScreen >= 375 && widthScreen <= 399) {
        this.carrouselHeight = 370
      } else if (widthScreen >= 400 && widthScreen <= 439) {
        this.carrouselHeight = 410
      } else if (widthScreen > 440 && widthScreen < 599) {
        this.carrouselHeight = 450
        this.containerHeight = 750
      } else if (widthScreen >= 768 && widthScreen <= 1023) {
        this.carrouselHeight = 320
      } else if (widthScreen >= 1024 && widthScreen <= 1440) {
        this.carrouselHeight = 340
        this.containerHeight = 'auto'
      } else {
        this.carrouselHeight = 360
      }
    },
    sortingSizes: function() {
      const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
      let variants = this.productDetail.variants.sort((a, b) => {
        const aIndex = sizes.indexOf(a.size.toUpperCase())
        const bIndex = sizes.indexOf(b.size.toUpperCase())

        if (aIndex < 0) {
          if (!isNaN(a.size) && !isNaN(b.size)) {
            return Number(a.size) - Number(b.size)
          }
          return !isNaN(a.size) ? -1 : 1
        }
        if (bIndex < 0) {
          if (!isNaN(a.size) && !isNaN(b.size)) {
            return Number(a.size) - Number(b.size)
          }
          return !isNaN(b.size) ? -1 : 1
        }
        return aIndex - bIndex
      })

      return variants
    },
    closeDialog: function() {
      this.variant = null
      this.quantitySelected = 1
      this.quantities = []
      this.variantSelected = null
      this.carrousel = 0
      this.dialogProduct = false
    }
  }
}
</script>

<style scoped>
.bordered {
  border: 2px solid #d81b60;
}
@media (max-width: 320px) {
  ::v-deep .v-card__title {
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
</style>
