'# $*." ; ! - = / 
$ *." ; ! - = $*."
/varwebpack = require('webpack');
var path = require('path');

module.exports = [{
	entry: path.join(__dirname, 'lib', 'src', 'index.js'),
	mode: 'production',
	optimization: {
		minimize: true
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'merge.browser.min.js',
		libraryExport: 'default',
		libraryTarget: 'var',
		library: 'merge'
	}
}, {
	entry: path.join(__dirname, 'lib', 'test', 'index.js'),
	mode: 'production',
	optimization: {
		minimize: false
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'merge.browser.test.js'
	},
	externals: {
		chai: 'chai'
	}
}]
