const withLess = require('@zeit/next-less')

module.exports = {
    webpack: config => {
        // Fixes npm packages that depend on `fs` module
        config.node = {
            fs: 'empty'
        },
        config.module = {
            rules: [
                {
                    test: /\.(jsx|js)?$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env', '@babel/preset-react'
                            ]
                        }
                    }
                },
                {
                    test: /\.(less|css)?$/,
                    use: [{
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                }
            ]
        },
        withLess({
            cssModules: true,
            cssLoaderOptions: {
                importLoaders: 1,
                localIdentName: "[local]___[hash:base64:5]",
            }
        })
        return config
    }
}