'use strict';
const helpers = require('./helpers');
const webpack = require("webpack");
const { CheckerPlugin } = require('awesome-typescript-loader')
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: helpers.root("./src"),
  entry: {
    app: "./main.ts",
    polyfills: './polyfills.ts',
    vendor: './vendor.ts'
  },
  resolve: {
      extensions: ['.js', '.ts'],
    modules: [helpers.root("./src"), "node_modules"]
  },
  module: {
     
      rules: [
          { 
              test: /.ts$/,
              use: [
            {
                loader: 'angular2-template-loader'
            },
            {
                  loader: 'awesome-typescript-loader'
              }]
          }
      ]
  },
  output: {
    path: helpers.root("./dist"),
    filename: "[name].js",
  },
   plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "commons.js",
      minChunks: 2,
    }),
    new CheckerPlugin(),
    new HtmlWebpackPlugin()
  ],
  devServer: {
    contentBase:  helpers.root("./dist"),  // New
  },
};