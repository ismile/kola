const webpack           = require('webpack');
const path              = require('path');
const NodemonPlugin     = require('nodemon-webpack-plugin');
const merge             = require('webpack-merge')

module.exports = merge(require('./webpack.base.config'), {
  name  : "server:prod",
  mode  : "production",
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
})
