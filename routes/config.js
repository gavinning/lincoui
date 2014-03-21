var fs = require('fs');
var config = {



	// 创建页面的模板
	tmp: fs.readFileSync('./views/inc/build_template.ejs', 'utf-8'),
	// 创建页面的body替换字符串
	tmpSpace: '$$__body$$',

	tmpPath: './views/inc/build_template.ejs',


	// 创建页面的路径
	projectPath: './public/data/pages/',

	projectUrl: '/data/pages/',

	zipPath: './public/data/zip/',

	zipUrl: '/data/zip/'







};



module.exports = config;