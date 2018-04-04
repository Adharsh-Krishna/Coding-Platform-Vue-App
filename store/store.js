import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export  default new Vuex.Store({
  state: {
    isLoggedIn:false,
    user_id:""
  },
  mutations: {
    increment (state) {
      state.isLoggedIn=!state.isLoggedIn
    },
    update (state, id) {
      state.user_id=id
    },
    destroy(state){
      state.user_id=""
      state.isLoggedIn=false
    }
  }/*,
  plugins: [createPersistedState({
    paths: ['newCount']
  })]*/
});


