const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
if (process.env.NODE_ENV === 'production') {
    module.exports = {
        devtool: "none", // 移除源码地图（根据需要自行移除）
        plugins: [new BundleAnalyzerPlugin()], // 使用 webpack 插件 webpack-bundle-analyzer 进行打包结果分析优化
        externals: { // 告诉webpack不要对公共库进行打包
            vue: "Vue",
            vuex: "Vuex",
            axios: "axios",
            "vue-router": "VueRouter",
        }
    }
} else if (process.env.NODE_ENV === 'development') {
    module.exports = {}
}