<template>
    <div>
        <v-app-bar app class="indigo darken-3">
            <v-app-bar-nav-icon @click="drawer = !drawer" class="white--text"></v-app-bar-nav-icon>
            <v-toolbar-title
            class="white--text text-h6 font-weight-light d-none d-sm-flex">DAO Consensus - {{pageName}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <div
                    v-bind="attrs"
                    v-on="on"
                    >
                    <span class="mr-4 white--text text-h6 font-weight-light">{{userName}}</span>
                    <v-avatar
                    class="text--darken-3 blue-grey lighten-5 text-button"
                    size="40"
                    >{{userName[0]}}{{userName[1]}}</v-avatar>
                    </div>
                </template>
                <v-list>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon class="indigo--text">mdi-wallet-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="indigo--text">{{address}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <!--v-list-item>
                        <v-list-item-icon>
                            <v-icon class="indigo--text">mdi-alpha-t-circle-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="indigo--text">{{currency.balanceTRX}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item-->
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon class="indigo--text">mdi-currency-usd</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="indigo--text">{{balance}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="logout">
                        <v-list-item-icon>
                            <v-icon class="indigo--text">mdi-exit-to-app</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="indigo--text">Выйти</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
        <v-navigation-drawer
        v-model="drawer"
        fixed
        temporary
        class="indigo darken-3 white--text"
        >
            <v-list-item>
                <v-list-item-content>
                <v-list-item-title class="title white--text text-h6 font-weight-light">
                    DAO Consensus
                </v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list
                dense
                nav
            >
                <v-list-item
                v-for="item in items"
                :key="item.title"
                :to="item.link"
                link
                >
                <v-list-item-icon>
                    <v-icon class="white--text">{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="white--text font-weight-light">{{ item.title }}</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            <v-list-item
                href="https://wallet.dars.one"
                link
                >
                <v-list-item-icon>
                    <v-icon class="white--text">mdi-ballot-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="white--text font-weight-light">Голосование</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    data: () => ({
    items: [
      { title: 'Кабинет', icon: 'mdi-account', link: '/' },
      { title: 'Маркет', icon: 'mdi-shopping-outline', link: '/market' },
      { title: 'Фонды', icon: 'mdi-account-group', link: '/referals' },
      { title: 'Сеть', icon: 'mdi-blur', link: '/network' },
      //{ title: 'Голосование', icon: 'mdi-ballot-outline', link: 'https://wallet.dars.one' }
    ],
    right: null,
    drawer: null,
    message: {
        avatar: null
    },
    loading: true,
    currency: null,
    address: null,
    balance: null,
    tr: true
  }),
  computed: {
      pageName(){
        return this.$route.meta.pageName
      },
      userName(){
          const name = this.$store.getters.info ? '' + this.$store.getters.info.name + '' : 'Гость'
          return name
      }
  },
  async mounted(){
    while(this.tr){
        this.currency = await this.$store.dispatch('fetchCurrency')
        this.address = this.currency.info.address
        this.balance = this.currency.balance
        this.loading = false
    }
  },
  methods: {
    async logout(){
        await this.$store.dispatch('logout')
        this.$router.push('/login?message=logout')
    }
  }
}
</script>