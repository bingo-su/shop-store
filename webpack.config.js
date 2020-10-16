const path = require('path')

//导入此插件把物理磁盘上的页面放到内存中，同时自动把内存中的bundle.js导入页面底部
const htmlWebpackPlugin = require('html-webpack-plugin')

//打包.vue文件，需要导入一个插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	entry: path.join(__dirname,'./src/main.js'),
	output:{
		path:path.join(__dirname,'./dist'),
		filename:'bundle.js'
	},
	resolve:{
		alias:{
			'vue$':'vue/dist/vue.js'//修改vue导入包的路径
		}
	},
	plugins:[
		new htmlWebpackPlugin({
			template:path.join(__dirname,'./src/index.html'),
			filename:'index.html'
		}),
		new VueLoaderPlugin(),
	],
	module:{//存放所有的第三方加载器
		rules:[//配置所有第三方加载器匹配规则
			{test:/\.css$/, use:['style-loader','css-loader']} ,//处理.css文件的loader
			{test:/\.scss$/, use:['style-loader','css-loader','sass-loader']} ,//处理。scss文件的loader
			{test:/\.vue$/, use:'vue-loader'} ,//处理.vue文件的loader
			{test:/\.(jpg|png|gif|jpeg|bmp)$/, use:'url-loader?esModule=false'},//处理图片的loader
			{test:/\.(ttf|eot|gif|svg|woff|woff2)$/, use:'url-loader'},
			{test:/\.js$/, use:'babel-loader', exclude:/node_modules/},//配置babel转化高级语法
		]
	},
	devtool: 'inline-source-map',
}