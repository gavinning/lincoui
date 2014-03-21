;(function($){

var on = 'selected', _on = '.selected';
var cu = 'current', _cu = '.current';

var ilinco = {

	tab: function(id, options){
		var tab, content, callback, li, item, id;

		var defaults = {
			tab: 'li',
			content: '.item',
			tabcontent: '.tabcontent',
			active: 'current',
			animate: 'none',
			time: 300,
			callback: ''
		};

		var opt = $.extend({}, defaults, options);

		id = $(id);

		tab = opt.tab;
		content = opt.content;

		li = id.find(tab);
		item = id.find(content);

		if( li.length == 0 ){
			return console.log('don\'t find tab hander');
		}

		if( item.length == 0 ){
			return console.log('don\'t find tab content');
		}

		function none(li, item){
			var that = $(this);
			var index = li.index(this);

			that.addClass(cu).siblings(_cu).removeClass(cu);
			item.eq(index).show().siblings().hide();
		}

		function slide(li, item){
			var box = id.find(opt.tabcontent);
			if( box.length == 0 ){
				return console.log('don\'t find tab content');
			}

			var wid = box.width();
			var index = li.index(this);
			var offset = - wid * index + 'px';

			item.eq(0).animate({marginLeft: offset}, opt.time);
		}

		if( opt.callback ){
			callback = opt.callback
		}
		else{
			switch(opt.animate){
				case 'none': 
					callback = none;
					break;

				case 'slide': 
					callback = slide;
					break;

				default: 
					callback = none;
					break;
			}
		}

		id.delegate(tab, 'click', function(){
			callback.call(this, li, item);
		});
	},

	top: function(id, callback){
		var id, fn;

		id = $(id);

		fn = callback || function(){
			$('html, body').animate({scrollTop: 0}, 400);
		}

		id.on('click', fn);
	},

	toggle: function(className){
		this.className.match(/selected/) ?
			$(this).addClass(on):
			$(this).removeClass(on);
	}

















} // ilinco end.











window.ilinco = ilinco;
})(jQuery);