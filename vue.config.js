// vue-cli 的配置模块
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:7001',
            }
        }
    },
    configureWebpack: require('./webpack.config'),
}