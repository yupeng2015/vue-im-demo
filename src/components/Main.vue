<template>
<div class="user_section">
    <Row class="row_head_mid" style="padding:10px;">
        <i-col>
            <ButtonGroup>
                <router-link to="/Register">
                    <Button size="default">注册</Button>
                </router-link>
                <router-link to="/Login">
                    <Button size="default">登录</Button>
                </router-link>
            </ButtonGroup>
        </i-col>
    </Row>
    <Row class="row_head_mid mid_user_row">
        <i-col class="mid_user_col" span="4" push="1">
            <Avatar icon="ios-person" />
        </i-col>
        <i-col class="mid_user_col" span="6">
            <p>当前用户是:<b>{{me_info.account}}</b></p>
        </i-col>
        <i-col span="4" class="mid_user_col">
            <Button @click="logout" size="small" icon="ios-exit">退出</Button>
        </i-col>
    </Row>
    <Row>
        <Col span="24">
            <Tabs value="name1">
                <TabPane label="我的好友" name="name1" class="main_tab_main">
                    <router-link :to="{name:'message',params:{user_id:item.id}}" v-for="item in user_list">
                    <Row type="flex" align="middle">
                        <Col span="3">
                        <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="large"></Avatar>
                        </Col>
                        <Col span="6">{{item.account}}</Col>
                    </Row>
                    </router-link>
                </TabPane>
                <TabPane label="我的好群组" name="name2" class="main_tab_main">标签二的内容</TabPane>
                <TabPane label="陌生人" name="name3" class="main_tab_main">标签三的内容</TabPane>
            </Tabs>
        </Col>
    </Row>
</div>
</template>
<script>
    import '../assets/css/main_nav.css'
    export default {
        data(){
            return{
                user_list:[],
                me_info:{}
            }
        },
        methods:{
            getMeInfo:function () {
                let _this = this;
                this.axios.get('/api/user/get-me-info')
                    .then(function (response) {
                        _this.me_info = response.data.data;
                    })
            },
            //退出登录
            logout:function () {
                let _this = this;
                _this.$store.commit('logout');
                _this.$router.push({path:'/login'});
            }
        },
        mounted:function () {
            let _this = this;
            _this.getMeInfo();
            _this.axios.get('/api/public/get-user-list')
                .then(function (response) {
                    _this.user_list = response.data.data
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
</script>

