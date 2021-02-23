const path = require("path");
const webpack = require("webpack");

function resolve(dir) {
	return path.join(__dirname, dir);
}
module.exports = {
	/* 部署生产环境和开发环境下的URL：可对当前环境进行区分，
baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */

	/* baseUrl: process.env.NODE_ENV === 'production' ? './' : '/' */
	publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
	lintOnSave: true,
	runtimeCompiler: true, //关键点在这
	/* 输出文件目录：在npm run build时，生成文件的目录名称 */
	outputDir: "dist",
	/* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
	assetsDir: "assets",
	/* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
	productionSourceMap: false,
	/* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，
	   你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
	filenameHashing: false,
	/* 代码保存时进行eslint检测 */
	lintOnSave: false,
	indexPath: "index.html",
	//构建多页面的应用，页面的配置
	pages: {
		index: {
			entry: "src/main.js",
			// 模板来源
			template: "public/index.html",
			// 在 dist/index.html 的输出
			filename: "index.html",
			title: "Index page",
			// 提取出来的通用 chunk 和 vendor chunk。
			chunk: ["chunk-vendors", "chunk-common", "index"]
		}
	},
	css: {
		//extract: true,// 是否使用css分离插件 ExtractTextPlugin
		sourceMap: false, // 开启 CSS source maps
		//oaderOptions: {},// css预设器配置项
		// 启用 CSS modules for all css / pre-processor files.
		requireModuleExtension: true
	},
	chainWebpack: config => {
		config.resolve.symlinks(true); // 修复热更新失效
		config.module.rule('md')
			.test(/\.md/)
			.use('vue-loader')
			.loader('vue-loader')
			.end()
			.use('vue-markdown-loader')
			.loader('vue-markdown-loader/lib/markdown-compiler')
			.options({
				raw: true
			});
		config.resolve.alias // 添加别名
			.set("@", resolve("./src"))
			.set("components", resolve("./src/components"))
			.set("views", resolve("./src/views"))
			.set("common", resolve("./src/common"))
			.set("scss", resolve("./src/common/sass"))
			.set("js", resolve("./src/common/js"))
			.set("docs", resolve("./src/docs"));
		//set第一个参数：设置的别名，第二个参数：设置的路径
	},
	configureWebpack: config => {
		if (process.env.VUE_APP_MODE === "production") {
			// 为生产环境修改配置...
			config.mode = "production";
		} else {
			// 为开发环境修改配置...
			config.mode = "development";
		}
		// config.module.rules.push({
		//     use:[{
		//         loader:'sass-loader'
		//     }]
		// })
	},
	/* webpack-dev-server 相关配置 */
	devServer: {
		/* 自动打开浏览器 */
		open: true,
		/* 设置为0.0.0.0则所有的地址均能访问 */
		host: "localhost",
		port: 3000,
		https: false,
		hotOnly: false,
		/* 使用代理 */
		proxy: {
			"/api": {
				/* 目标代理服务器地址 */
				target: "http://localhost:3001/",
				/* 允许跨域 */
				changeOrigin: true,
				pathRewrite: {
          "^/api": ""
        }
			}
		}
	}
};