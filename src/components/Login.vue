<template>
    <div>
        <Row>
            <i-col>
                <Card title="会员登录">
                    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                        <p>
                            <FormItem label="用户名" prop="account">
                                <Input name="account" v-model="formInline.account" prefix="ios-contact" type="text" placeholder="Enter name" style="width: 100%" autocomplete="on" />
                            </FormItem>
                            <FormItem label="密码" prop="password">
                                <Input name="password" v-model="formInline.password" prefix="md-unlock" type="password" placeholder="Enter password" style="width: 100%" />
                            </FormItem>
                        </p>
                        <p style="text-align: right">
                            <Button type="success" @click="handleLoginSubmit('formInline')">登录</Button>
                        </p>
                    </Form>
                </Card>
            </i-col>
        </Row>
    </div>
</template>
<script>
    import qs from 'qs';

    export default {
        data(){
            return{
                formInline: {
                    account: '',
                    password: ''
                },
                ruleInline: {
                    account: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            handleLoginSubmit(name) {
                let _this = this;
                _this.$refs[name].validate((valid) => {
                    if (valid) {
                        let postData = qs.stringify(_this.formInline);
                        _this.axios.post('api/public/post-login', postData)
                            .then(function (response) {
                                _this.$Message.success(response.data.msg);
                                //全局 storage
                                localStorage.setItem("access_token",response.data.access_token);
                                _this.axios.defaults.headers['access-token'] = response.data.access_token;
                                _this.$store.state.ws_object = new WebSocket('ws://192.168.1.14:9502?access_token='+response.data.access_token);
                                _this.$store.commit('login');
                                _this.$router.push({path:'/'});
                            })
                            .catch(function (error) {
                                _this.$Message.error(error.response.data.msg);
                            });

                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        },
        mounted:function () {
         console.log(this.$store.state.login_status);
        }
    }
</script>