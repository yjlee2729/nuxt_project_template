import axios from 'axios'

export const state = ()=> ({
    authUser: null
})

export const mutations = {
    SET_USER: function (state, user) {
        state.authUser = user
    }
}
  
export const actions = {
    nuxtServerInit ({ commit }, { req }) {
        if (req.session && req.session.authUser) {
            commit('SET_USER', req.session.authUser);
        }
    },
    async login ({ commit }, { username, password }) {
        try {
          const { data } = await axios.post('/api/account/login', { username, password })
          commit('SET_USER', data);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            const errorMsg = error.response.data.message;
            throw new Error(errorMsg)
          }
          throw error
        }
    },
    async logout ({ commit }) {
        await axios.post('/api/account/logout')
        commit('SET_USER', null)
    }
}