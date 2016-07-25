var LiveReloadPlugin = require('webpack-livereload-plugin');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var postcssImport = require('postcss-import');

module.exports = function(entry, output) {
    var webpackBase = require('./webpack.base.js')(entry, output);
    var webpackConfig = {
        watch: true,
        // devtool: 'source-map', // 暂时关闭，新创建的组件会有编译的问题
        postcss: function (webpack) {
			return [
				postcssImport({
					onImport: function (files) {
				        files.forEach(this.addDependency)
					}.bind(webpack),
				}),
				precss,
				autoprefixer
			];
        },
        plugins:[new LiveReloadPlugin()]
    };

    return Object.assign({}, webpackBase, webpackConfig);
};
