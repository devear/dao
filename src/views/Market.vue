<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col
        v-for="ii in path"
        :key="ii.title"
        cols="12"
        md="4"
      >
        <v-card class="blue darken-2"
        :elevation="15"
        >
          <v-img
            :src="ii.src"
            class="align-end"
            justify="center"
          >
          </v-img>

          <v-card-actions class="white--text">
            <v-card-title v-text="ii.title" class="body-2"></v-card-title>
            <v-spacer></v-spacer>
            <v-btn
            @click="openModal(ii.summ)"
            >
              купить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-overlay :value="overlay">
      <v-alert
        color="#2A3B4D"
        dense
      >
        <p class="text-center">
          Подтвердите оплату пакета {{this.buy}} $
        </p>
        <div class="text-center">
          <v-btn
          @click="buyProduct()"
          :loading="loading"
          >
            Оплатить
          </v-btn>
        </div>
        <br>
        <div class="text-center">
          <v-btn
          @click="overlay = !overlay"
          :loading="loading"
          >
            Отменить
          </v-btn>
        </div>
      </v-alert>
    </v-overlay>
  </v-container>
</template>

<script>
import TronWeb from 'tronweb'
export default {
  name: 'Market',
  components: {
    
  },
  data: () => ({
    overlay: false,
    loading: false,
    buy: 0,
    fullNode: "https://api.shasta.trongrid.io",
    solidityNode: "https://api.shasta.trongrid.io",
    eventServer: "https://api.shasta.trongrid.io",
    privateKey: '795b0060d28320d0348db4d9abfebe6629034de03c11a15cec8695cf3646302a',
    //trc20ContractAddress: "TF94ubDQo2cP78Utx4eEotp4iyBeBwNwpB", //"TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
    tr: true,
    token: null,
    contract: null,
    tronWeb: null,
    decimals: 1000000,
    path: [
      {src: require('@/assets/img/1.jpg'), title: 'Пакет 10$', summ: 10},
      {src: require('@/assets/img/2.jpg'), title: 'Пакет 100$', summ: 100},
      {src: require('@/assets/img/3.jpg'), title: 'Пакет 300$', summ: 300},
      {src: require('@/assets/img/4.jpg'), title: 'Пакет 1000$', summ: 1000},
      {src: require('@/assets/img/5.jpg'), title: 'Пакет 2500$', summ: 2500},
      {src: require('@/assets/img/6.jpg'), title: 'Пакет 5000$', summ: 5000}
    ]
  }),
  async mounted(){
    this.tronWeb = new TronWeb(this.fullNode, this.solidityNode, this.eventServer, this.privateKey)
    this.token = await this.tronWeb.contract().at("TYjsaL4BisZ3VMKGMti4ySvhBUYAyC14Tc")
    this.contract = await this.tronWeb.contract().at("TBCbUXaDek1v7dJMXouLNhMQRFckem42yC")
    
  },
  methods: {
    async buyProduct(){
      this.loading = true
      this.overlay = false
      this.loading = false
      try {
          await this.token.transfer('TBCbUXaDek1v7dJMXouLNhMQRFckem42yC', (this.buy * 1000000).toString()).send({
              feeLimit:1_000_000_000,
              callValue:0,
              shouldPollResponse:true
          })
      } catch(error) {
          console.error("trigger token error",error)
      }
      try {
          await this.contract.transfer().send({
              feeLimit:1_000_000_000,
              callValue:0,
              shouldPollResponse:true
          })
      } catch(error) {
          console.error("trigger smart contract error",error)
      }
    },
    openModal(summ){
      this.overlay = !this.overlay
      this.buy = summ
    }
  }
}
</script>