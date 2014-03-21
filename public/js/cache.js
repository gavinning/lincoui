/*
 *!Cache version 1.0
 * By gavinning
 * 2013-12-12 PM
 */

;(function(){
// 高速缓存作用域
var __NameSpace = 'lincoui';
// 用于过滤缓存节点的对象
var lv = {
	hash: {},
	list: []
};

// 重置过滤条件
lv.reset = function(){
	this.hash = {};
	this.list = [];
};

// 获取作用域下的缓存节点列表
function getCacheList(){
	return localStorage[__NameSpace] ?
		localStorage[__NameSpace].split(','):[];
}
// 记录作用域下的缓存列表
function setCacheList(key){
	if( !lv.hash[key] ){
		lv.hash[key] = true;
		lv.list.push(key);
		localStorage[__NameSpace] = lv.list.join(',');
	}
}

function Cache(){
	var that = this;
	this.pro = {};
	this.pro.list = [];

	// 开放作用域设置接口
	this.NameSpace = function(value){
		__NameSpace = value;

		lv.reset();
	};

	// 查看当前作用于下所有的缓存节点
	this.all = function(){
		return console.log(getCacheList());
	};
	
	// 清理作用于下所有缓存
	this.clear = function(){
		var list = getCacheList();

		$.each(list, function(i, val){
			localStorage.removeItem(__NameSpace + val);
		});
		localStorage.removeItem(__NameSpace);
		
		lv.reset();

		return console.log('Cache is cleared.');
	};

	// 清理所有高速缓存，包括非本作用域下
	this.clearAll = function(){
		localStorage.clear();
		return console.log('Cache is cleared.');
	};

	lv.list = getCacheList();
	$.each(lv.list, function(i, val){
		lv.hash[val] = true;

		val === 'list' ?
			Cache.fn.get(val) ? that.pro[val] = Cache.fn.get(val).split(',') : [] :
			that.pro[val] = Cache.fn.get(val);
	})
}

Cache.fn = Cache.prototype = {

	set: function(key, value){
		localStorage[__NameSpace + key] = value;
		setCacheList(key);
	},

	get: function(key){
		return localStorage[__NameSpace + key];
	}
}







window.Cache = Cache;
})();
