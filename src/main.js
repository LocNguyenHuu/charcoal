import Vue from 'vue'
import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faAngleDown,
    faBook,
    faHome,
    faPencilAlt,
    faSignInAlt
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import firebaseConfig from './firebase/config'
import router from './router'
import store from './store'

// Vue config
Vue.config.productionTip = false

// Convenience
Vue.prototype.$http = axios

// Firebase
firebase.initializeApp(firebaseConfig).firestore()

// FontAwesome
library.add(faAngleDown, faHome, faBook, faPencilAlt, faSignInAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Router
router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/sign-up']
    const authRequired = !publicPages.includes(to.path)

    if (authRequired) {
        return next('/login')
    }

    next()
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
