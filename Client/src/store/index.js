import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    token: window.sessionStorage.getItem('token'),
}

const mutations = {
    LOGIN: (state,data)=>{
        state.token = data;
        window.sessionStorage.setItem('token',data)
    },
    LOGOUT: (state) =>{
        state.token = null;
        window.sessionStorage.removeItem('token')
    }
}

const actions = {
    UserLogin({ commit },data){
        commit('LOGIN',data)
    },
    UserLogout({ commit }){
        commit('LOGOUT')
    }
}

export default new Vuex.Store({
    state,mutations,actions
})