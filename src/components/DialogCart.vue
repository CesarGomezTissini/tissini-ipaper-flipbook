<template>
  <div class="text-xs-center">
    <v-dialog
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      v-model="dialogCart"
      persistent
    >
      <v-card>
        <v-container>
          <v-row justify="center" no-gutters>
            <v-col :cols="12" :sm="6" :md="5" :lg="4">
              <h2 class="mb-3">Productos Añadidos</h2>
              <template v-for="(cartProduct, index) in cart">
                <product :product="cartProduct" :key="index" />
              </template>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Product from '@/components/Product'
import { mapState, mapGetters } from 'vuex'
export default {
  props: {
    value: Boolean
  },
  data: function() {
    return {}
  },
  computed: {
    ...mapState(['cart']),
    dialogCart: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  components: {
    Product
  },
  methods: {
    closeDialog: function() {
      this.dialogCart = false
    }
  }
}
</script>
