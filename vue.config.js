// vue.config.js
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://vm.test.com:9501',
                changeOrigin: true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    },
    publicPath:"./",
    //assetsDir:"./"
}