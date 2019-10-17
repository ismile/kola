const webpack           = require('webpack');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin    = require('uglifyjs-webpack-plugin');

module.exports = {
  extends: path.resolve(__dirname, '../dev_client/webpack.base.config.js'),
  name  : "client:prod",
  mode  : "production",

  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CompressionPlugin()
  ]
}
