const webpack           = require('webpack');
const path              = require('path');
const NodemonPlugin     = require('nodemon-webpack-plugin');

module.exports = {
  extends: path.resolve(__dirname, '../dev_server/webpack.base.config.js'),
  name  : "server:prod",
  mode  : "production",
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
}
