<template>
<div class="user_section">
    <Row>
        <Col span="24">
        <router-link to="/Register">
            <Button shape="circle">注册</Button>
        </router-link>
        <router-link to="/Login">
            <Button shape="circle">登录</Button>
        </router-link>
        <i-col>
            当前用户是{{me_info.account}}
        </i-col>
        </Col>

    </Row>
    <Row>
        <Col span="24">
            <Tabs value="name1">
                <TabPane label="标签一" name="name1">
                    <router-link :to="{name:'message',params:{user_id:item.id}}" v-for="item in user_list">
                    <Row type="flex" align="middle">
                        <Col span="3">
                        <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="large"></Avatar>
                        </Col>
                        <Col span="6">{{item.account}}</Col>
                    </Row>
                    </router-link>
                </TabPane>
                <TabPane label="标签二" name="name2">标签二的内容</TabPane>
                <TabPane label="标签三" name="name3">标签三的内容</TabPane>
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

