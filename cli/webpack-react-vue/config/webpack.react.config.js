const webpackBabelConfig = require('./webpack.babel.config');
const webpackTypescriptConfig = require('./webpack.typescript.config');

let webpackCssConfig = require('./webpack.css.config');

// vue css config
webpackCssConfig.use = ['style-loader'].concat(webpackCssConfig.use);

const config = {
    module: {
        rules: [
            webpackBabelConfig,
            webpackTypescriptConfig,
            webpackCssConfig
        ]
    }
}

module.exports = config;
