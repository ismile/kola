const webpack           = require('webpack');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin    = require('uglifyjs-webpack-plugin');
const merge             = require('webpack-merge')

module.exports = merge(require('./webpack.base.config'), {
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
})
