import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import store from './store'//引入store

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import AxiosGlobal from './components/common/AxiosGlobal.vue'
//Vue.axios.defaults.baseURL = AxiosGlobal.baseURL;
//Vue.axios.defaults.headers=AxiosGlobal.headers;

//初始化关闭
window.isCloseHint = false;
window.addEventListener("beforeunload", function(e) {
    if (window.isCloseHint) {
        Vm.$store.state.ws_object.close();
        var confirmationMessage = "要记得保存！你确定要离开我吗？";
        // 兼容 Gecko + IE
        (e || window.event).returnValue = confirmationMessage;
        // 兼容 Gecko + Webkit, Safari, Chrome
        return confirmationMessage;
    }
});

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
import VueRouterConfig from './vue-router.config'
Vue.config.productionTip = false
//vue-router
const router = VueRouterConfig()
let Vm = new Vue({
    router:router,
    store,
  render: h => h(App),
    created:function () {
        let _this = this;
        console.log('初始化Vue');
        if(localStorage.getItem('access_token')){
            _this.$store.state.ws_object = new WebSocket('ws://192.168.1.14:9502?access_token='+localStorage.getItem('access_token'));
        }

        //设置 http response 拦截器
        _this.axios.interceptors.response.use(
            response => {
                return response;
            },
            error => {
                if (error.response) {
                    switch (error.response.status) {
                        case 401:
                            // 返回 401 清除token信息并跳转到登录页面
                            //localStorage.removeItem('access_token');
                            _this.$store.state.ws_object.close();
                            _this.$store.commit('logout');
                            _this.$router.push({
                                path: '/login',
                            })
                    }
                }
                return Promise.reject(error.response.data)   // 返回接口返回的错误信息
            });

        _this.axios.interceptors.request.use(
            config => {
                let params = {'access-token':localStorage.getItem('access_token')};
                //Object.assign(config.headers,AxiosGlobal.headers)
                if(config.hasOwnProperty('params')){
                    params = Object.assign(params,config.params);
                }
                config.params = params;
                return config;
            },
            err => {
                return Promise.reject(err);
            });

    }
}).$mount('#app')
