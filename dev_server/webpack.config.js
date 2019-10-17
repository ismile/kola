const webpack           = require('webpack');
const path              = require('path');
const NodemonPlugin     = require( 'nodemon-webpack-plugin' );

module.exports = {
  extends: path.resolve(__dirname, '../dev_server/webpack.base.config.js'),
  name  : "server:dev",
  mode  : "development",
  plugins: [
    new NodemonPlugin({
      nodeArgs: [ '--inspect' ]
    })
  ],
}
