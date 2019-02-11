import VueRouter from 'vue-router'
import Main from './components/Main.vue'
import Message from './components/Message.vue'
import Register from './components/Register.vue'
import Login from './components/Login.vue'

const router = new VueRouter({
    //mode: 'history',
    mode: 'hash',
    routes: [
        // 动态路径参数 以冒号开头
        { path: '/', component: Main,name:'index'},
        { path: '/message/:user_id', component: Message ,name:'message'},
        { path: '/register', component: Register },
        { path: '/login', component: Login }
    ]
})

router.beforeResolve((to, from,next)=>{
    if(to.path !== '/login' && !localStorage.getItem('access_token')){
        router.push({'path':'/login'});
        return;
    }
    // let res;
    // if(to.path !== '/login'){
    //     res = (async function () {
    //         let response = await Vue.axios.get('/api/public/check-token');
    //         return new Promise((resolve) => {
    //             resolve(response)
    //         })
    //     })()

    +

        +
    // }
    // console.log(res);
    // if(res.status == 401){
    //     router.push({'path':'/login'});
    //     return;
    // }
    next();

})

export default () => {
    return router
}