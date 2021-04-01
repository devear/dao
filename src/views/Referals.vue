<template>
  <div>
    <p class="text-h5">
      Фонды
    </p>
    <v-simple-table maxWidth="100%">
      <template v-slot:default>
        <thead class="blue darken-2">
          <tr>
            <th class="text-left white--text">
              Название<br>Адрес
            </th>
            <th class="text-left white--text">
              Баланс
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
          v-for="fund in funds"
          :key="fund.name"
          >
            <td>
              <span class="text-subtitle-2">{{ fund.name }}</span>
              <br>
              <router-link v-if="fund.t" to="/network">посмотреть распределение по сети</router-link>
              <span class="text-caption" v-else>{{ fund.addr }}</span>
            </td>
            <td class="text-caption">{{ fund.balance }} USDT</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <!--p class="text-h5">
      История входящих транзакций
    </p>
    <v-simple-table maxWidth="100%">
      <template v-slot:default>
        <thead class="blue darken-2">
          <tr>
            <th class="text-left white--text">
              Адрес
            </th>
            <th class="text-left white--text">
              Сумма
            </th>
          </tr>
        </thead>
        <tbody>
          
          <tr
          v-for="fond in fonds"
          :key="fond.name"
          >
            <td class="text-caption">{{ fond.name }}<br>{{ fond.addr }}</td>
            <td class="text-caption">{{ fond.balance }} TRX</td>
          </tr>
        
        </tbody>
      </template>
    </v-simple-table-->
  </div>
</template>

<script>
  import TronWeb from 'tronweb'
  //import TronGrid from 'trongrid'

  export default {
    data: () => ({
      fullNode: "https://api.shasta.trongrid.io",
      solidityNode: "https://api.shasta.trongrid.io",
      eventServer: "https://api.shasta.trongrid.io",
      privateKey: '795b0060d28320d0348db4d9abfebe6629034de03c11a15cec8695cf3646302a',
      //trc20ContractAddress: "TF94ubDQo2cP78Utx4eEotp4iyBeBwNwpB", //"TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
      tr: true,
      decimals: 1000000,
      funds: [
        {
          name: '30% DAO Fund',
          addr: null,
          balance: 0,
          t: false
        },
        {
          name: '26% Partner program Step up',
          addr: null,
          balance: 0,
          t: false
        },
        {
          name: '24% DAO marketing Unilevel',
          addr: null,
          balance: 0,
          t: true
        },
        {
          name: '10% Market liquidity support',
          addr: null,
          balance: 0,
          t: false
        },
        {
          name: '10% Project team',
          addr: null,
          balance: 0,
          t: false
        }
      ]
    }),
    async mounted(){
      const tronWeb = new TronWeb(this.fullNode, this.solidityNode, this.eventServer, this.privateKey)
      //const tronGrid = new TronGrid(tronWeb)
      const contract = await tronWeb.contract().at("TYjsaL4BisZ3VMKGMti4ySvhBUYAyC14Tc")

      //console.log(await tronGrid.account.get(this.fonds[3].addr, {}))

      const contractAddr = await this.$store.dispatch('contractData')
      this.funds[0].addr = contractAddr.funds.f1a
      this.funds[1].addr = contractAddr.funds.f4a
      this.funds[3].addr = contractAddr.funds.f2a
      this.funds[4].addr = contractAddr.funds.f4a

      this.funds[2].addr = 0

      while(this.tr){
          this.funds[0].balance = (await contract.balanceOf(this.funds[0].addr).call() / this.decimals).toFixed(2)
          this.funds[1].balance = (await contract.balanceOf(this.funds[1].addr).call() / this.decimals).toFixed(2)
          //this.fonds[2].balance = (await contract.balanceOf(this.fonds[2].addr).call() / this.decimals).toFixed(2)
          this.funds[3].balance = (await contract.balanceOf(this.funds[3].addr).call() / this.decimals).toFixed(2)
          this.funds[4].balance = (await contract.balanceOf(this.funds[4].addr).call() / this.decimals).toFixed(2)
      }
    }
  }
</script>