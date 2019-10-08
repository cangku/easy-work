const webpack = require('webpack');
const config = require('../config/webpack.config');
const WebpackDevServer = require('webpack-dev-server');

const compiler = webpack(config); // config.devServer 将被忽略
compiler.run((err, stats) => {
    // console.log(err, stats.hasErrors());
    const info = stats.toJson();
    if (err || stats.hasErrors()) {
        // 处理错误
        console.log(info.errors);
    }
    // 处理完成

    // development server
    const server = new WebpackDevServer(compiler, config.devServer);
    server.listen(config.devServer.port, config.devServer.host, () => {
        console.log(`http://${config.devServer.host}:${config.devServer.port}`);
    });
});

module.exports = () => {};
