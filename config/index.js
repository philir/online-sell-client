// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
	build: {
		env: require('./prod.env'),
		index: path.resolve(__dirname, '../dist/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'sell',
		assetsPublicPath: '/',
		productionSourceMap: false,
		// Gzip off by default as many popular static hosts such as
		// Surge or Netlify already gzip all static assets for you.
		// Before setting to `true`, make sure to:
		// npm install --save-dev compression-webpack-plugin
		productionGzip: false,
		productionGzipExtensions: ['js', 'css'],
		port: 9000,
        	sellUrl: 'http://philir.natapp1.cc/sell',
        	openidUrl: 'http://philir.natapp1.cc/sell/wechat/authorize',
        	wechatPayUrl: 'http://proxy.springboot.cn/pay'
	},
	dev: {
		env: require('./dev.env'),
		port: 8088,
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		proxyTable: {
      "/sell": {
            target: "http://philir.natapp1.cc/sell", 
            changeOrigin: true,
            pathRewrite: {
                '^/sell': ''
            }
        }
    },
		// CSS Sourcemaps off by default because relative paths are "buggy"
		// with this option, according to the CSS-Loader README
		// (https://github.com/webpack/css-loader#sourcemaps)
		// In our experience, they generally work as expected,
		// just be aware of this issue when enabling this option.
		cssSourceMap: false,
		sellUrl: 'http://127.0.0.1:8088',
		openidUrl: 'http://philir.natapp1.cc/sell/wechat/authorize',
		wechatPayUrl: 'http://proxy.springboot.cn/pay'
	}
}
