<template>
  <div class="text-xs-center">
    <v-dialog
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      v-model="infoDialog"
      width="400"
      persistent
    >
      <v-card v-if="!productDetail">
        <h1>no hay</h1>
      </v-card>
      <v-card v-else>
        <v-img
          height="350"
          :src="'https://api.tissini.app' + productDetail.images[0].url"
        >
          <v-row align="start" class="lightbox white--text ma-1 fill-height">
            <v-col>
              <v-btn fab dark small color="primary" @click.stop="closeDialog">
                <v-icon dark>mdi-arrow-left</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-img>
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
          <span>Tallas</span>
          <v-chip-group
            v-model="variant"
            active-class="pink lighten-1 white--text"
          >
            <v-chip
              v-for="(variant, index) in productDetail.variants"
              :key="index"
              :disabled="!Boolean(variant.quantity)"
            >
              {{ variant.size }}
            </v-chip>
          </v-chip-group>
          <v-select
            v-if="quantities.length > 0"
            label="Cantidad"
            v-model="quantitySelected"
            :items="quantities"
            required
            color="primary"
          ></v-select>
          <v-footer fixed v-if="quantities.length > 0">
            <v-col class="text-center" cols="12">
              <v-btn
                outlined
                rounded
                color="primary"
                block
                dark
                @click="addProduct"
              >
                <v-icon size="small" dark>mdi-cart-arrow-down</v-icon>
                AGREGAR AL CARRITO
              </v-btn>
            </v-col>
          </v-footer>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
    product: Object
  },
  data: function() {
    return {
      name: 'info-dialog',
      variant: null,
      quantitySelected: 1,
      quantities: [],
      variantSelected: null
    }
  },
  watch: {
    variant(value) {
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
    infoDialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    productDetail() {
      return this.product
    },
    price: {
      //return this.productDetail.price
      get() {
        return this.productDetail.price
      },
      set(value) {}
    }
  },
  methods: {
    addProduct() {
      let product = {
        size: this.variantSelected.size,
        quantity: this.quantitySelected,
        name: this.productDetail.name,
        reference: this.productDetail.reference,
        price: this.variantSelected.price, //this.getVariantData(this.itemSelected, this.variants.id).price,
        // priceWithDiscount:
        //   this.itemSelected.priceWithDiscount === undefined
        //     ? this.getVariantData(this.itemSelected, this.variants.id).price
        //     : this.itemSelected.priceWithDiscount,
        image:
          this.productDetail.images.length !== 0
            ? this.productDetail.images[0].url
            : null,
        sku: this.variantSelected.sku,
        id: this.variantSelected.id,
        category: this.productDetail.category.category,
        variants: this.productDetail.variants,
        product_id: this.productDetail.id
      }
      let cart = JSON.parse(localStorage.getItem('cart'))
      // console.log(product)
      // console.log(cart)
      if (cart) {
        cart.push(product)
        localStorage.setItem('cart', JSON.stringify(cart))
      } else {
        localStorage.setItem('cart', JSON.stringify([product]))
      }
      this.closeDialog()
    },
    closeDialog: function() {
      this.infoDialog = false
      this.variant = null
      this.quantitySelected = 1
      this.quantities = []
      this.variantSelected = null
    }
  }
}
</script>
