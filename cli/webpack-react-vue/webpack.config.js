const webpack = require('webpack');
const path = require('path');

const config = {
    entry: './src/index', // config resolve extension => ignore .(j|t)sx?
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(ts|tsx)?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [
            '.tsx',
            '.ts',
            '.jsx',
            '.js'
        ]
    }
}

module.exports = config;
