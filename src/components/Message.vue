<template>
    <div style="height: 100%;">
        <Row style="padding:10px 0 6px 0">
            <i-col span="2">
                <a @click="$router.back(-1)">返回</a>
            </i-col>
            <Col span="22">
                <Card class="message_header">
                正在和<b style="color:#2db7f5">{{user_info.user.account}}</b>聊天
                </Card>
            </Col>
        </Row>

        <Row>
            <Col span="24">
                <Card class="message_content">
                <Row class-name="message_record" v-for="item in message_list">
                    <Col span="10" class-name="message_record_col message_record_col_left" :class="{'message_record_col_right':item.send_user_id == user_info.me.id}">
                    <p>{{item.content}}</p>
                    </Col>
                </Row>
            </Card>
            </Col>
        </Row>

        <Row style="margin-top: 6px">
            <Col span="24">
                <Card class="message_foot">
                <Row>
                    <Col>
                    <Input class="send_content" v-model="send_content" :rows="4" type="textarea" ref="send_content" style="border: none;resize:none "/>
                    </Col>
                </Row>

                <Row>
                    <Col style="float: right">
                    <Button type="primary" @click="sendMessage">提交</Button>
                    </Col>
                </Row>
            </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
    import qs from "qs"
    export default {
        data(){
            return {
                message_struct:{
                    event:'', //服务端要处理消息的路由规则
                    params:{
                        im_type:'single',
                        content_type:'text',
                        content:'',
                        send_user_id:0,
                        receive_user_id:0
                    }
                },
                message_list:[],
                //发布内容
                send_content:"",
                //聊天容器高度控制
                message_content_height:"",
                //聊天用户的信息
                user_info:{
                    me:{},
                    user:{}

                },
                //websocket对象
                ws_object:'',
                //滚动条本身高度
                scroll_height:0
            }
        },
        methods:{
            //提交信息
            sendMessage:function () {
                let data={
                    im_type:'single',
                    content_type:'text',
                    content:this.send_content,
                    send_user_id:this.user_info.me.id,
                    receive_user_id:this.user_info.user.id
                }
                //请求服务端
                this.message_struct.params = data;
                this.message_struct.event = "messageEmit";
                this.ws_object.send(JSON.stringify(this.message_struct));
                this.message_list.push(data);
                //保证每次都在最低端显示最新消息
                this.$nextTick(function () {
                    document.querySelector('.message_content').scrollTop = document.querySelector('.message_content').scrollHeight
                })

            },
            //获取聊天用户的信息
            getUserInfo:async function (user_id) {
                let _this = this;
                const response = await this.axios.get('/user/get-message-user-info',{
                    params:{user_id:user_id}
                })
                _this.user_info = response.data.data;
                _this.getSingleChatRecord();
            },
            //获取聊天记录
            getSingleChatRecord:function () {
                let _this = this;
                this.axios.get('/user/get-single-chat-record',{
                    params:{send_user_id:_this.user_info.me.id,receive_user_id:_this.user_info.user.id}
                })
                    .then(function (response) {
                        //console.log(response);
                        _this.message_list = response.data.data;
                        _this.$nextTick(function () {
                            //控制聊天容器出现滚动条
                            document.querySelector('.message_content').style.height=_this.message_content_height;
                            document.querySelector('.message_content').scrollTop=document.querySelector('.message_content').scrollHeight;
                        })

                    })
            },
            //websocket聊天初始化
            wsObjectInit:function () {
                let _this = this;
                //webSocket链接
                this.ws_object = _this.$store.state.ws_object;
                this.ws_object.onopen = function(evt) {
                    console.log('已连接');
                };
                this.ws_object.onclose = function() {
                    console.log('已经断开');
                };
                this.ws_object.onmessage = function (evt) {
                    let evtDataJson = JSON.parse(evt.data);
                    console.log(evtDataJson);
                    if(evtDataJson.send_user_id == _this.user_info.user.id){
                        _this.scroll_height = document.querySelector('.message_content').scrollHeight-document.querySelector('.message_content').scrollTop;
                        _this.message_list.push(evtDataJson);
                        //如果滚动条本身就在最底部 保证每次都在最低端显示最新消息
                            _this.$nextTick(function () {
                                document.querySelector('.message_content').scrollTop = document.querySelector('.message_content').scrollHeight
                            })
                    }
                    console.log(evtDataJson);
                }
            }
        },
        watch:{
            scroll_height:function (newVal,oldVal) {
//                console.log(newVal);
//                console.log(oldVal);
            }
        },
        mounted:function () {
            let _this = this;
            //对方信息 聊天历史信息
            this.getUserInfo(this.$route.params.user_id);
            this.wsObjectInit();
            this.message_content_height = screen.height*0.5+"px";
        }
    }
</script>