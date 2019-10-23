const VueLoaderPlugin = require('vue-loader/lib/plugin');

// transpiler
const webpackBabelConfig = require('./webpack.babel.config');
let webpackTypescriptConfig = require('./webpack.typescript.config');

// styling
let webpackCssConfig = require('./webpack.css.config');

// ts config options
webpackTypescriptConfig.use.options = {
    appendTsSuffixTo: [/\.vue$/]
}

// vue css config
// *** 如果先引入 React config，webpackCssConfig.use 可能是数组
webpackCssConfig.use = ['vue-style-loader'].concat(webpackCssConfig.use);

const config = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            webpackBabelConfig,
            webpackTypescriptConfig,
            webpackCssConfig
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}

module.exports = config;
