const webpackBabelConfig = require('./webpack.babel.config');
const webpackTypescriptConfig = require('./webpack.typescript.config');

const config = {
    module: {
        rules: [
            webpackBabelConfig,
            webpackTypescriptConfig
        ]
    }
}

module.exports = config;
