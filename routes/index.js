
/*
 * GET home page.
 */

// exports.index = function(req, res){
//   res.render('index', { title: 'Express' });
// };

var fs = require('fs');
var config = require('./config');
var zip = require("node-native-zip");
var dir = require('../modules/dir');
var path = require('path');
var ejs = require('ejs');

var testData = require('../temp/data/comment');


module.exports = function(app, appDir){

	app.get('/', function(req, res){
		res.render('index', { title: 'Express' });
	});

	app.get('/dataModule', function(req, res){
		res.render(appDir + '/temp/module_', testData);
	});

	app.post('/api/getDataModule', function(req, res){
		ejs.renderFile(appDir + '/temp/module_.ejs', req.body.data ? req.body.data : testData, function(err, str){
			console.log(str)
			res.end(str);
		})

	});

	app.post('/api/getTemplate', function(req, res){
		var doctype = '<!doctype html>\n';

		var head = '<head>'
				  + req.body.head
				  +'</head>\n';

		var page = '<div class="' + req.body.page.className + '"> \n'
				  + config.tmpSpace + '\n'
				  + '</div>\n';

		var body = '<body>\n'
				  + page
				  +'</body>\n';

		var html =  doctype
				  +'<html>\n'
				  + head
				  + body
				  + '</html>';
				  
		fs.writeFile(config.tmpPath, html, 'utf-8');
		res.end('Template is builded');
	});


	app.post('/api/getModule', function(req, res){
		var file = req.body.projectName + '/' + req.body.filename;
		var folder = config.projectPath + req.body.projectName + '/';

		var url = req.headers.origin + config.projectUrl + file;
		var paths = config.projectPath + file;
		var content = config.tmp.replace(config.tmpSpace, req.body.content);

		// console.log(folder)

		try{
			fs.statSync(folder).isDirectory()
		}
		catch(e){
			fs.mkdirSync(folder);
		}

		fs.writeFile(paths, content, 'utf-8');
		res.end(url);
	})

	app.post('/api/getZip', function(req, res){
		var archive = new zip();
		var folder = config.projectPath + req.body.projectName + '/';
		var files = dir(folder);

		// 创建要打包文件列表
		var list = [];
		for(var i=0,len=files.file.length; i<len; i++){
			var _file = {};
			_file.name = path.basename(files.file[i]);
			_file.path = folder + _file.name;

			list.push(_file);
		}

		// console.log(list)

		// 打包文件为zip
		archive.addFiles(list, function(err){
			if(err) return console.log('err while adding files', err);

			var buff = archive.toBuffer();
			var _zipName = req.body.projectName + '.zip';
			var _zipPath = config.zipPath + _zipName;
			var _zipUrl = req.headers.origin + config.zipUrl + _zipName;

			fs.writeFile(_zipPath, buff, function(){
				res.end(_zipUrl);
				console.log('Finished');
			})
		})

	});


	// app.post('/api/setModules', function(req, res){
	// 	var html = req.body.content;
	// 	var jsdom = require('jsdom').jsdom;
	// 	var document = jsdom(html);
	// 	var window = document.parentWindow;

	// 	var jq = document.createElement('script');
	// 	jq.src = appDir + "/public/js/jquery.js"
	// 	document.head.appendChild(jq);

	// 	jq.onload = function(){
	// 		console.log($(html).find('div').length)
		
	// 	}
	// })

}