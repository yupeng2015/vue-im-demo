<script>
    const headers={
        'Content-Type':'application/x-www-form-urlencoded',
        'access-token':localStorage.getItem('access_token')
    };
    //const baseURL = 'http://vm.mixphp.com'
    export default
    {
        headers,
        //baseURL,//服务器地址
    }
</script>