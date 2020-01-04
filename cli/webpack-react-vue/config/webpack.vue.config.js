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

// utils function

/**
 *
 * @param {*} data 需要验证的数据
 * @param { } type 需要验证数据的类型是不是指定类
 *
 * @return boolean/string
 */
function validateType(data, type) {
    if (type) {
        return new RegExp(type, 'i').test(Object.prototype.toString.call(data));
    } else {
        return Object.prototype.toString.call(NaN).match(/(?<=\s)\w+(?=])/);
    }
}

// vue css config
const localWebpackCssConfig = webpackCssConfig.map(({ ...config }) => {
    config.use = ['vue-style-loader'].concat(config.use);
    return config;
})

const config = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            webpackBabelConfig,
            webpackTypescriptConfig,
            ...localWebpackCssConfig
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}

module.exports = config;
