const webpack           = require('webpack');
const path              = require('path');
const NodemonPlugin     = require( 'nodemon-webpack-plugin' );
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge             = require('webpack-merge')

module.exports = merge(require('./webpack.base.config'), {
  name  : "server:dev",
  mode  : "development",
  plugins: [
    new BundleAnalyzerPlugin()
  ],
})
