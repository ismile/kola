const webpack           = require('webpack');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  extends: path.resolve(__dirname, '../dev_client/webpack.base.config.js'),
  name  : "analyze:dev",
  mode  : "production",

  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
