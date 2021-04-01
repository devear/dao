import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import 'materialize-css/dist/js/materialize.min'
import messagePlugin from '@/utils/message.plugin'
import Loader from '@/components/app/Loader'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import VueTree from '@ssthouse/vue-tree-chart'


Vue.component('vue-tree', VueTree)

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.component('Loader', Loader)

firebase.initializeApp({
    apiKey: "AIzaSyDc6N1bVoa6kirJEh8ZEDp8rSqunT9RhZw",
    authDomain: "decen-eafbe.firebaseapp.com",
    projectId: "decen-eafbe",
    storageBucket: "decen-eafbe.appspot.com",
    messagingSenderId: "689741459530",
    appId: "1:689741459530:web:31bf24df94a6c0cd7076b3"
})

let app

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            store,
            vuetify,
            render: h => h(App)
        }).$mount('#app')
    }
})