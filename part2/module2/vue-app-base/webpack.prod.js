const {merge} = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopywebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = merge(common, {
    mode: 'development',
    optimization:{
        usedExports:true,
        minimize:true,
        concatenateModules:true
    },
    plugins: [
        new CleanWebpackPlugin(),
        
        new CopywebpackPlugin({
            patterns: [
                { from: 'public'},
                { from: 'src/assets'},
            ],
            options: {
                concurrency: 100,
            },
        }),
    ]
})