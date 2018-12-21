<template>
    <div>
        <Row>
            <i-col>
                <Card title="会员注册">
                    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                    <p>
                        <FormItem label="用户名" prop="account">
                    <Input name="account" v-model="formInline.account" prefix="ios-contact" type="text" placeholder="Enter name" style="width: 100%" />
                        </FormItem>
                        <FormItem label="密码" prop="password">
                    <Input name="password" v-model="formInline.password" prefix="md-unlock" type="password" placeholder="Enter password" style="width: 100%" />
                        </FormItem>
                    </p>
                    <p style="text-align: right">
                        <Button type="success" @click="handleRegisterSubmit('formInline')">注册</Button>
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
            handleRegisterSubmit(name) {
                let _this = this;
                _this.$refs[name].validate((valid)=>{
                    if (valid) {
                        this.$Message.success('Success!');
                        let postData = qs.stringify(_this.formInline);
                        _this.axios.post('/api/public/post-register', postData)
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
        }
    }
</script>