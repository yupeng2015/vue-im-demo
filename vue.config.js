// vue.config.js
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://vm.mixphp.com:9501',
                changeOrigin: true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}