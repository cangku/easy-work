const path = require("path");
module.exports = (options, ctx) => ({
    chainWebpack: (config, isServer) => {
        config.resolveLoader.modules.add(
            path.resolve(__dirname, "node_modules")
        );
    },
    plugins: []
});
