const webpack           = require('webpack');
const path              = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  name  : "server:base",
  mode  : "development",
  entry : "./dev_server/index.ts",
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    filename: "bundle.js",
    path    : path.resolve(__dirname, '../dist/server')
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".node"],
    alias: {
      joi: '@hapi/joi'
    }
  },
  module: {
    rules: [
      {
        test   : /\.tsx?$/,
        loader : "ts-loader",
        options: {
          transpileOnly: true,
          // experimentalWatchApi: true,
          configFile: './tsconfig.json'
        }
      },
      {
        test: /\.node?$/,
        loader: 'awesome-node-loader',

      },
      {
        enforce: "pre",
        test   : /\.js$/,
        loader : "source-map-loader"
      }
    ]
  },
  externals: {
    './application.config.js': {
      commonjs: './application.config.js'
    }
  },
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'application.config.js'), to: './'}
    ])
  ]
}
