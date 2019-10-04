var path = require("path");
var webpack = require("webpack");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var dist = path.resolve("./dist");

require('./createSide')

module.exports = {
  entry: {
    index: "./src/main.js"
  },
  output: {
    path: "dist",
    filename: "[name].js",
    publicPath: "./",
    chunkFilename: "[name]_[id]_[chunkhash:8].chunk.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["env"]
        }
      },
      {
        test: /\.css$/,
        // loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader?limit=10240&name=img/[name].[hash:8].[ext]"
      },
      {
        test: /\.tpl$/,
        loader: "compressed-string-loader"
      }
    ]
  },
  resolve: {
    extensions: ["", ".js", ".json"],
    alias: {
      css: path.resolve("src/css"),
      img: path.resolve("src/img"),
      js: path.resolve("src/js")
    }
  },
  externals: {
    jquery: "jQuery"
  },
  plugins: [
    new CleanWebpackPlugin(dist, {
      root: path.dirname(dist)
    }),
    new webpack.BannerPlugin("版权所有，翻版必究"),
    new webpack.DefinePlugin({
      LOCAL_ROOT: JSON.stringify("http://aaaaa.com")
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //     mangle: false,
    //     compress: false,
    //     sourceMap: true,
    //     output: {
    //         comments: false, // remove all comments
    //     },
    // }),
    // new HtmlWebpackPlugin({
    //     title: 'My App',
    //     template: './src/index.html',
    //     filename: 'index.html',
    //     minify: {
    //         "removeAttributeQuotes": true,
    //         "removeComments": true,
    //         "removeEmptyAttributes": false,
    //         "collapseWhitespace": false
    //     }
    // }),
    // new CopyWebpackPlugin([{
    //     from: './src/lib',
    //     to: 'lib'
    // }]),
    new ExtractTextPlugin("css/[name].[contenthash:8].css")
  ],
  watch: true,
  devtool: "source-map"
};
