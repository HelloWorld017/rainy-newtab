const package = require('./package.json');
const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const nodeEnv = (process.env.NODE_ENV || 'development').trim();

const styleLoader = nodeEnv !== 'production'
    ? 'vue-style-loader'
    : MiniCssExtractPlugin.loader;

const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        sourceMap: true
    }
};

const lessLoader = [
    styleLoader, {
        loader: 'css-loader',
        options: {
            importLoaders: 2
        }
    },
    postcssLoader,
    'less-loader'
];

const cssLoader = [
    styleLoader, {
        loader: 'css-loader',
        options: {
            importLoaders: 1
        }
    },
    postcssLoader
];

module.exports = {
    entry: {
        nexodus: path.resolve(__dirname, 'app', 'index.js')
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: '[name].bundle.js'
    },

    mode: nodeEnv,
    target,

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'less': lessLoader,
                        'css': cssLoader,
                        'js': {
                            loader: 'babel-loader'
                        }
                    }
                }
            },

            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/]
            },

            {
                test: /\.less$/,
                loader: lessLoader
            },

            {
                test: /\.css$/,
                use: cssLoader
            },

            {
                test: /\.svg$/,
                oneOf: [
                    {
                        resourceQuery: /inline/,
                        loader: 'vue-svg-loader',
                        options: {
                            svgo: false
                        }
                    },

                    {
                        loader: 'file-loader',
                        options: {
                            name: 'files/[hash:8].[ext]'
                        }
                    }
                ]
            },

            {
                test: /\.(png|jpe?g|gif|woff2?|otf|wav|ttf|eot)(\?|#.*)?$/,
                loader: 'file-loader',
                options: {
                    name: 'files/[hash:8].[ext]'
                }
            }
        ]
    },

    plugins: [
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new MiniCssExtractPlugin({filename: '[name].bundle.css'}),
        new VueLoaderPlugin(),
        new WebpackBarPlugin({profile: true})
    ],

    target,

    devtool: '#eval-source-map'
};

if(nodeEnv === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.optimization = {
        minimize: true
    };
}
