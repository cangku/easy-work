const webpack = require('webpack');
const path = require('path');

const webpackReactConfig = require('./webpack.react.config');
const webpackVueConfig = require('./webpack.vue.config');

const defaultConfig = {
    entry: './src/index', // config resolve extension => ignore .(j|t)sx?
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    // modules => submodule config
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.vue'
        ]
    }
}

const config = Object.assign({}, defaultConfig, webpackReactConfig, webpackVueConfig);
module.exports = config;
