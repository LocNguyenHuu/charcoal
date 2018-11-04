import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import counter from './modules/counter'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        counter
    }
})
