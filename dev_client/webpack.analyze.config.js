const webpack           = require('webpack');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge             = require('webpack-merge')

module.exports = merge(require('./webpack.base.config'), {
  name  : "analyze:dev",
  mode  : "production",

  plugins: [
    new BundleAnalyzerPlugin()
  ]
})
