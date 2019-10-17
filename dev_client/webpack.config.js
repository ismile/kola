const webpack           = require('webpack');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  extends: path.resolve(__dirname, '../dev_client/webpack.base.config.js'),
  name  : "client:dev",
  mode  : "development",
}