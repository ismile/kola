const webpack           = require('webpack');
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  name  : "client:base",
  mode  : "development",
  entry : "./dev_client/index.tsx",
  output: {
    filename: "bundle.js",
    path    : path.resolve(__dirname, '../dist/client')
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test  : /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          // experimentalWatchApi: true,
          configFile: './tsconfig.json'
        }
      },
      {
        enforce: "pre",
        test   : /\.js$/,
        loader : "source-map-loader"
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {sourceMap: true}
        },{
          loader: 'sass-loader',
          options: {sourceMap: true}
        }]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {sourceMap: true}
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[name]-[hash].[ext]',
            publicPath: '/',
            emitFile: true
          }
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name]-[hash].[ext]',
            publicPath: '/',
            emitFile: true
          }
        }
      }
    ]
  },

  optimization: {
    splitChunks: {
      automaticNameDelimiter: '-',
      cacheGroups           : {
        vendors: {
          chunks  : "all",
          name    : 'vendors',
          test    : /[\\/]node_modules[\\/]/,
          priority: 1
        }
      }
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      inject           : true,
      template         : path.resolve('./dev_client/index.html'),
      // favicon: path.resolve('./src/favicon.ico'),
    }),
    new MiniCssExtractPlugin({filename: 'style.css'}),
  ],
}
