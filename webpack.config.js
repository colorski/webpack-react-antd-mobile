'use strict';
const path = require('path');

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  
  //配置入口文件信息
  entry: path.join(__dirname, '/src/index'),
  
  //配置输出文件信息
  output: {
    //输出文件的目标目录
    path: path.resolve(__dirname,'dist/'),
    //输出文件名
    filename: 'main_[hash].js',
  },

  module: {
    rules: [
      //支持es2015和jsx
      {
        test:/(\.jsx|\.js)$/,
        exclude:/node_modules/,
        loader:"babel-loader",
        //下边这个query作为单独的属性写成一个对象，放到.babelrc文件里
        query: {
          plugins: [
            //引入antd-mobile
            //注意"libraryDirectory": "lib",  //default: lib
            //不用设置，用默认的就可以，自动找/node_modules/antd-mobile/lib/
            ["import", [{ "style": "css", "libraryName": "antd-mobile" }]]
          ],
          //presets: [['es2015', { modules: false }], 'react']
          //若使用{modules:false}可以开启treeshaking，但prod打包的时候无法把antd-mobile之外的样式打进去
          presets: ['es2015', 'react']
        },
      },
      //支持图片(?limit=1024指：如果图片小于1k就会以dataUrl（base64编码）的形式写在脚本里，否则会在输出目录中拷贝一份图片，并以md5值命名，
      //引用图片的url也会自动改成相应的文件名)
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        loader: 'url-loader?limit=1024&name=[name].[hash:7].[ext]&outputPath=img/'
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin('dist/*.*', {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      title: 'Development HtmlWebpackPlugin',
      filename: __dirname + "/dist/index.html",
      template: __dirname + "/public/index.html"
    }),
  ]
}
