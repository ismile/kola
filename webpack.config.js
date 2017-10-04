var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },

	devServer: {
		port: 9000,
		contentBase: path.join(__dirname, "public"),
	},
/**
 *
 */
	devtool: "source-map",

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components|server)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015'],
						plugins: [
							require("babel-plugin-transform-object-rest-spread"),
							require("babel-plugin-transform-decorators-legacy").default,
							require("babel-plugin-transform-async-to-bluebird").default,
							require("babel-plugin-transform-promise-to-bluebird").default,
							require("babel-plugin-transform-runtime").default,
							require("babel-plugin-transform-class-properties")
						]
					}
				}
			},
			{
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
			{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
			{ test: /\.json$/, use: "json-loader" },
			{
        test: /\.(png|jpg)$/,
        use: {
					loader: 'file-loader',
					options: {
						name: 'images/[name]-[hash].[ext]',
						publicPath: '/dist/',
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
						publicPath: './',
						emitFile: true
					}
				}
      }
		]
	},
	plugins: [
		new ExtractTextPlugin("styles.css"),
		new CopyWebpackPlugin([
			{ from: 'client/index.html', to: 'index.html' }
		])
  ]
}
