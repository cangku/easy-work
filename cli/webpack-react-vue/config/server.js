const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');
const webpackServerConfig = require('./webpack.server.config');

webpackConfig.plugins && (webpackConfig.plugins = webpackConfig.plugins.concat(webpackServerConfig.plugins)) && delete webpackServerConfig.plugins;
webpackConfig.devServer = webpackServerConfig.devServer;

const compiler = Webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    open: true,
    stats: {
        colors: true,
    },
});


const server = new WebpackDevServer(compiler, devServerOptions);
server.listen(webpackConfig.devServer.port, '127.0.0.1', () => {
    console.log(`Starting server on http://localhost:${webpackConfig.devServer.port}`);
});
