const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack'); // 用于访问内置插件
const path = require('path');

const config = {
  entry:  {
    index:  path.resolve(__dirname, './src/main.js'),
    vendor: ['react','react-dom','react-router-dom','antd','antd-mobile']
  },
  output: {
      filename: "bundle.js",
      path: __dirname + '/dist', //输出文件路径
    //   publicPath:'/'  //指定静态资源 (图片等) 的发布地址
  },
  // devtool: 'eval-source-map',
  module:{
    loaders:[
        {
            test:/\.(js|jsx)$/,
            exclude:/node_modules/,
            loaders:"babel-loader",
            query:{
                presets:['es2015','react']
            }
        },
        {
            test:/\.css$/,
            loader:['style-loader','css-loader']
        },
        {
            test: /\.(jpg|png|gif|svg)$/,
            loader: 'url-loader?name=assets/[hash].[ext]'

        },
        
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js'
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //     mangle: {
    //         except: ['exports', 'require', 'module', '_']
    //     },
    //     compress: {
    //         warnings: false
    //     },
    //     output: {
    //         comments: false,
    //     }
    // })
  ],

  devServer: {
   port:9099
 }

};

module.exports = config;
