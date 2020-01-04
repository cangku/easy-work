const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    devServer: {
        contentBase: path.resolve(__dirname, '..', 'dist'),
        compress: true,
        progress: true,
        port: 9009
    },
    plugins: [
        new HtmlWebpackPlugin({                 //在这里实例化
            template: './public/index.html',   //这里告诉他模板html放在什么位置
            filename: 'index.html',             //这里是输出后的文件名，这里我还是叫index.html，可改
            minify: {                           // 这里放缩小的条件
                removeAttributeQuotes: true,    //去掉文件里的双引号
                collapseWhitespace: true,       //去掉文件的空白行，这里是把文件打包成一行
            },
            hash: true
        })
    ]
}
