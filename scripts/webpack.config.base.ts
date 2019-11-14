import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import OfflinePlugin from "offline-plugin"
import CopyWebpackPlugin from 'copy-webpack-plugin'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import {CleanWebpackPlugin} from 'clean-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import * as helper from './build-helper'

const config : webpack.Configuration =  {
	entry:{
		app:path.resolve(__dirname,'../src/app/AppLoader'),
		"404":path.resolve(__dirname,'../src/app/404Redirector'),
	},

	output: {
		filename: '[name].bundle.[hash].js',
		chunkFilename: '[name].chunk.[hash].js',
		path: path.resolve(__dirname, '../dist')
	},
	module: {
		rules: [
			{test: /\.(ts|tsx)?$/,loader: 'awesome-typescript-loader'},

			{test: /\.(html)$/, loader: "html-loader"},

			{test: /\.css$/,
                use: [
                     {
                         loader: 'style-loader'  // Put css to <style/>
                     },
                     {
                         loader: 'css-loader'    // parse css
                     }
                ]
            },

			{test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)?$/, 
				use: {
					loader:'url-loader?limit=100000&name=images/[name]_[hash:8].[ext]'
				}
			},
		]
	},
	externals:helper.EXTERNALS,

	plugins: [
		new webpack.ProgressPlugin(), 
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,"../src/app/template"),
			chunks:["app"]
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,"../src/app/template"),
			filename:"404.html",
			chunks:["404"]
		}),
		new CopyWebpackPlugin([
			{
				from:path.resolve(__dirname,"../src/assets/public") ,
				to:path.resolve(__dirname,"../dist")
			},
			{
				from:path.resolve(__dirname,"../src/app/icon/icon.ico") ,
				to:path.resolve(__dirname,"../dist/favicon.ico")
			},
			{
				from:path.resolve(__dirname,"../src/app/manifest.json") ,
				to:path.resolve(__dirname,"../dist/manifest.json")
			},
		]),
		new webpack.DefinePlugin({
			"__EXTERNALS":JSON.stringify(helper.EXTERNALS),
			"__CDN_RES":JSON.stringify(helper.CDN_RES)
		}),
		new CleanWebpackPlugin(),
		// new BundleAnalyzerPlugin(),
		new OfflinePlugin({
			caches:"all",
			externals:helper.CDN_RES
		})
	],

	
	optimization: {
		minimizer:[
			new UglifyJsPlugin({
                uglifyOptions: {
                    compress: true
                }
            })
		],
		splitChunks: {
			cacheGroups: {
				// vendors: {
				// 	name:"vendors",
				// 	priority: -10,
				// 	chunks:'initial',
				// 	test: /[\\/]node_modules[\\/]/
				// }
				// "bs-static-loader":{
				// 	name:"bs-static-loader",
				// 	chunks:"async"
				// }
			},
			name: true,
			chunks: 'async',
			minChunks: 1,
			minSize: 300000,
			maxSize:0
		}
	},

	//@ts-ignore
	devServer: {
		open: true,
		host:"0.0.0.0",
		port : helper.DEV_SERVER_PORT,
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js','.css','.jpg']
	}
};

export default config;