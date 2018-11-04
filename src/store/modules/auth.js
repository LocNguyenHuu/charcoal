import firebase from 'firebase'
import { SET_USER } from './mutationTypes'

const state = {
    user: {}
}

const getters = {
    user: state => state.user
}

const actions = {
    postLogin: ({ commit }, payload) => {
        const { email, password } = payload

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((data) => {
                const { email } = data.user
                commit(SET_USER, { email })
            })
            .catch(err => console.log(err))
    }
}

const mutations = {
    [SET_USER](state, user) {
        state.user = user
    }
}

export default {
    actions,
    getters,
    mutations,
    state
}
