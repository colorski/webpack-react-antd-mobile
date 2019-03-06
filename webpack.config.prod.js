'use strict';
const base = require('./webpack.config.js');
const merge = require('webpack-merge');
const webpack = require('webpack');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(base, {
  mode: "production",
  devtool: 'source-map',
  cache: false,
  
  output: {
    //打包上线时用这个路径，因个人项目的线上测试不是放在根目录而是放在'/build/'下
    publicPath: '/build/'
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'style',
          test: /\.(sa|sc|c)ss$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },

  module: {
    rules: [
      //支持css
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
        ]
      },
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new MiniCssExtractPlugin({
      filename: '[name]_[hash].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /style_[0-9a-zA-Z]+\.css/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    }),
    new webpack.BannerPlugin('author: colorski, qq: 290518066, hash: [hash], file: [file]'),
  ]
})
