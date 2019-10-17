const webpack           = require('webpack');
const path              = require('path');
const NodemonPlugin     = require( 'nodemon-webpack-plugin' );
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  extends: path.resolve(__dirname, '../dev_server/webpack.base.config.js'),
  name  : "server:dev",
  mode  : "development",
  plugins: [
    new BundleAnalyzerPlugin()
  ],
}
