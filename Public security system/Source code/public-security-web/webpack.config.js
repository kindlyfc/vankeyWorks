const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		login: path.resolve(__dirname, './src/js/login.js')
	},
	output: {
		path: path.resolve(__dirname, './assets/js/'),
		filename: 'login.bundle.js'
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			},
			output: {
				comments: false
			}
		}),
		new HtmlWebpackPlugin({
			template: './src/tpl/login.html',
			filename: path.resolve(__dirname, './login.html'),
			chunks:['login'],
			inject: 'body'
		})
	]
}