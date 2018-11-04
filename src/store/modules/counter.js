const state = {
    count: 0
}

const getters = {
    count: state => state.count
}

const actions = {
    increment: ({ commit }) => commit('increment'),
    decrement: ({ commit }) => commit('decrement')
}

const mutations = {
    increment(state) {
        state.count++
    },
    decrement(state) {
        state.count--
    }
}

export default {
    actions,
    getters,
    mutations,
    state
}
