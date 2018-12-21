// vue.config.js
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://vm.mixphp.com',
                changeOrigin: true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}