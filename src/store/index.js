import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state={//要设置的全局访问的state对象
    has_token: localStorage.getItem('access_token') ? true : false,
    ws_object:{},
};

const getters = {   //实时监听state值的变化(最新状态)
    get_token_status(state) {  //方法名随意,主要是来承载变化的login_status的值
        return state.has_token
    }
};
const mutations= {
    login () {
        state.has_token = true;
    },
    logout(){
        state.ws_object.close();
        state.has_token = false;
        localStorage.removeItem('access_token');
    }
};
const store = new Vuex.Store({
    state,
    getters,
    mutations
});
export default store;