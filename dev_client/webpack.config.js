const webpack           = require('webpack');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge             = require('webpack-merge')

module.exports = merge(require('./webpack.base.config'), {
  name  : "client:dev",
  mode  : "development",
  devtool: "source-map",
})
