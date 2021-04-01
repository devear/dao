import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/login',
            name: 'Login',
            meta: { layout: 'Empty', pageName: '' },
            component: () =>
                import ('../views/Login.vue')
        },
        {
            path: '/signup',
            name: 'Signup',
            meta: { layout: 'Empty', pageName: '' },
            component: () =>
                import ('../views/Signup.vue')
        },
        {
            path: '/',
            name: 'Account',
            meta: { layout: 'Main', pageName: 'Аккаунт', auth: true },
            component: () =>
                import ('../views/Account.vue')
        },
        {
            path: '/market',
            name: 'Market',
            meta: { layout: 'Main', pageName: 'Маркет', auth: true },
            component: () =>
                import ('../views/Market.vue')
        },
        {
            path: '/network',
            name: 'Network',
            meta: { layout: 'Main', pageName: 'Сеть', auth: true },
            component: () =>
                import ('../views/Network.vue')
        },
        {
            path: '/referals',
            name: 'Referals',
            meta: { layout: 'Main', pageName: 'Фонды', auth: true },
            component: () =>
                import ('../views/Referals.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser
    const requireAuth = to.matched.some(record => record.meta.auth)
    if (requireAuth && !currentUser) {
        next('/login?message=login')
    } else {
        next()
    }
})

export default router