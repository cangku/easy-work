const VueLoaderPlugin = require('vue-loader/lib/plugin');

const webpackBabelConfig = require('./webpack.babel.config');
const webpackTypescriptConfig = require('./webpack.typescript.config');

// ts config options
webpackTypescriptConfig.use.options = {
    appendTsSuffixTo: [/\.vue$/]
}

const config = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            webpackBabelConfig,
            webpackTypescriptConfig
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}

module.exports = config;
