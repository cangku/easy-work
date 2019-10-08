const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve('.', 'dist'),
        compress: true,
        host: '0.0.0.0',
        hot: true,
        port: 9000,
        open: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'webpack',
            template: 'src/index.html'
        })
    ],
    optimization: {
        usedExports: true
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve('.', 'dist')
    }
};
