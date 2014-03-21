/**
 * Created with GUI.
 * Anthor: Gavinning
 * Date: 2013-09-27
 * Time: 14:30
 * Each some folder.
 */


var fs = require('fs');
var path = require('path');
var tool = require('./tool.js');

var fileList = [];
var folderList = [];
var fileHash = {};
var folderHash = {};

function dir(folder, filter){
	var dirList = fs.readdirSync(folder);
	var tmpDir, isFilter;

	folderHash[folder] = true;

	dirList.forEach(function(item, i){
		tmpDir = path.join(folder, item);
		isFilter = tool.inArray(item, filter) >= 0;

		if(fs.statSync(tmpDir).isDirectory()){
			if(!isFilter){
				if(!folderHash[tmpDir]){
					folderList.push(tmpDir);
					dir(tmpDir, filter);
					folderHash[tmpDir] = true;
				}
			}
		}else{
			if( !fileHash[tmpDir] ){
				fileList.push(tmpDir);
				fileHash[tmpDir] = true;
			}
		}
	});

	return {file: fileList, folder: folderList, fileHash: fileHash, folderHash: folderHash};
}

module.exports = dir;