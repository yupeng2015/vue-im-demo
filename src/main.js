import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import AxiosGlobal from './components/common/AxiosGlobal.vue'
//Vue.axios.defaults.baseURL = AxiosGlobal.baseURL;
Vue.axios.defaults.headers=AxiosGlobal.headers;
// http response 拦截器
Vue.axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    localStorage.removeItem('access_token');
                    Vue.router.push({
                        path: 'login',
                    })
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });


import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
import VueRouterConfig from './vue-router.config'
Vue.config.productionTip = false
//vue-router
const router = VueRouterConfig()
new Vue({
    router:router,
  render: h => h(App),
}).$mount('#app')
