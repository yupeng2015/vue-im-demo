<script>
    const headers={
        'Content-Type':'application/x-www-form-urlencoded',
        'access-token':localStorage.getItem('access_token')
    };
    const baseURL = 'http://192.168.1.14:9501'
    export default
    {
        headers,
        baseURL,//服务器地址
    }
</script>