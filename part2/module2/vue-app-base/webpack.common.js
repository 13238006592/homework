const path = require('path')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopywebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    mode: 'none',
    entry: './src/main.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: '/.js$/',
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/preset-env',{modules:'commonjs'}]]
                        }
                    }
                ]
            },
            {
                test: /.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{loader:'url-loader',options:{esModule:false}}]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlwebpackPlugin({ template: './public/index.html' }),
        new webpack.DefinePlugin({ BASE_URL: JSON.stringify("/") }),
        
    ]

}