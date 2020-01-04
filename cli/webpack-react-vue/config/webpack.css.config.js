module.exports = [
    {
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: 'css-loader'
    },
    {
        test: /\.module\.css$/i,
        use: {
            loader: 'css-loader',
            options: {
                // 0 => no loaders (default);
                // 1 => postcss-loader;
                // 2 => postcss-loader, sass-loader
                importLoaders: 1,
                modules: {
                    localIdentName: "[path][name]__[local]--[hash:base64:5]",
                },
                sourceMap: true
            }
        }
    }
];
