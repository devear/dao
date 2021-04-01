<template>
    <div height="100">
        <Loader v-if="loading" />
        <v-card
            class="mx-auto"
            max-width="400"
            tile
            v-else
        >
            <v-list dense class="blue darken-2">
            <v-subheader class="white--text">Мой кошелек</v-subheader>
            <v-list-item-group>
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon class="white--text">mdi-wallet-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{currency.info.address}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon class="white--text">mdi-alpha-t-circle-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{currency.balanceTRX}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon class="white--text">mdi-currency-usd</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">{{currency.balance}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
            </v-list>
        </v-card>
    </div>
</template>

<script>

export default {
  name: 'Account',
  data: () => ({
      loading: true,
      currency: null,
      tr: true
  }),
  async mounted(){
      while(this.tr){
        this.currency = await this.$store.dispatch('fetchCurrency')
        this.loading = false
      }
  }
}
</script>