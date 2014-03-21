// javascript document - author gavinning

define(function(require, exports, module){
	var pages;
	// Project infomation object
	var cache = new Cache();

	var getModule = $('#getModule');

	var lv = {

		makeHTML: function(str){
			if(typeof str !== 'string'){
				console.log('数据类型不对，请传入字符串类型');
				return;
			}

			str = str.replace('<html>', '<lincouiHtml>').replace('</html>', '</lincouiHtml>');
			str = str.replace('<head>', '<lincouiHead>').replace('</head>', '</lincouiHead>');
			str = str.replace('<body>', '<lincouiBody>').replace('</body>', '</lincouiBody>');

			return str;
		},

		makeDrag: function(){
			// 处理拖拽
			$( "#catalog #theModule" ).find('>div>*').draggable({
				appendTo: "body",

				// 处理拖拽区域
				containment: "body",

				// 是否出现滚动条
				scroll: false,

				helper: "clone"
			});
		},

		makeTab: function(){
			var cite = {};
			var classify = ['head'];
			var list = $('#theModule').find('>div>*');

			$.each(classify, function(i, val){
				cite[val] = $();

				$.each(list, function(m, el){
					var _cite = this.getAttribute('lincouicite');
					if(val===_cite){
						cite[val].push(this);
					}
				})
			})

			$('#getCite').find('li').on('click', function(){
				var _cite = this.getAttribute('cite');

				if(_cite === 'all'){
					list.show();
					$(this).addClass('selected').siblings('.selected').removeClass('selected');
				}
				else if(_cite){
					$(this).addClass('selected').siblings('.selected').removeClass('selected');
					list.hide();
					cite[_cite].show();
				}
			})
		},

		dragover: function (e){
			e.stopPropagation();
			e.preventDefault();
		},

		dragleave: function (e){
			e.stopPropagation();
			e.preventDefault();
		},

		drop: function (e){
			lv.open(e.dataTransfer.files);
			e.stopPropagation();
			e.preventDefault();
		},

		open: function(list){
			for(var i=0; i<list.length; i++){
				lv.reader(list[i], i);
			}
		},

		reader: function(file, index){
			var read = new FileReader();

			read.onprogress  = function(e){
				// loading
			}

			read.onloadstart = function(e){
				// start
			}

			read.onload = function(e){
				var _result = e.target.result;

				lv.getlist(_result);
				cache.set('body', _result);

			}

			// read.readAsDataURL(file);
			// read.readAsBinaryString(file);
			read.readAsText(file, 'utf-8');
		},

		getlist: function(data){
			var re, div, head, body, css, obj, page;

			// re = data.replace('<html>', '<lincouiHtml>').replace('</html>', '</lincouiHtml>');
			// re = re.replace('<head>', '<lincouiHead>').replace('</head>', '</lincouiHead>');
			// re = re.replace('<body>', '<lincouiBody>').replace('</body>', '</lincouiBody>');

			re = lv.makeHTML(data);

			div = $(document.createElement('div'));
			div.html(re);

			head = div.find('lincouiHead').html();
			body = div.find('lincouiBody').html();
			page = div.find('lincouiBody > div').get(0);
			css = div.find('link[rel="stylesheet"]');

			obj = {};
			obj.page = {};
			obj.head = head;

			page.className ?
				obj.page.className = page.className : obj.page.className = "page";

			$.post('/api/getTemplate', obj, function(str){
				console.log(str)
			})

			// add css to index page
			$.each(css, function(){
				document.head.appendChild(this);
			});

			$('#theModule').html(body);
			getModule.hide();

			lv.makeDrag();
			lv.makeTab();
		},

		add: function(name, url){
			var li = document.createElement('li');
			var a = document.createElement('a');

			a.innerText = name;
			a.href = url;
			a.target = '_blank';

			li.appendChild(a);

			$('#listCreatedUl').prepend(li);
		},

		showInfo: function(){
			$('.module-info').addClass('selected');
		},

		hideInfo: function(){
			$('.module-info').removeClass('selected');
		},


		clearCache: function(){

			$('#theModule').html('');
			$('#ProjectName').html('');
			getModule.show();

			pages.reset();
			cache.clear();
		}

	};


	function Pages(){
		var that = this;
		this.hash = {};
		this.list = [];
		this.reset = function(){
			that.hash = {};
			that.list = [];
			$('#listCreatedUl').html('');
		};
	}
	pages = new Pages();

	var init = function(){
		$('#ProjectName').html(cache.pro.cname);

		pages.list = cache.pro.list;

		!cache.pro.body || lv.getlist(cache.pro.body);

		if(cache.pro.list) for(var i=0, len = cache.pro.list.length; i<len; i++){
			var name = cache.pro.list[i].split('=')[1];
			var url = cache.pro.list[i].split('=')[0];
			lv.add(name, url);
			pages.hash[url] = name;
		}
	}();


	function draggable(){

		// 处理不可选中状态
		$( "aside" ).disableSelection();


		// 处理拖拽 drop
		$( "#drag" ).droppable({
		  activeClass: "ui-state-default",
		  hoverClass: "ui-state-hover",
		  accept: ":not(.ui-sortable-helper)",

		  drop: function( event, ui ) {
			var _this = this;
			var data = ui.draggable.get(0).outerHTML;

			// console.log(data)
			// 添加HTML节点到页面
			$(_this).find('.newpage').append( data );

		  }

		// 处理排序
		}).sortable({

			// 需要处理的元素
			items: ".newpage > *",

			// 拖拽区域限制
			containment: "body",

			scroll: false,

			sort: function() {
			// gets added unintentionally by droppable interacting with sortable
			// using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
			$( this ).removeClass( "ui-state-default" );
		  }

		});

		// 处理删除操作
		$('.lincoui-aside-left').droppable({

			drop: function( event, ui ){
				var Gid;

				Gid = ui.draggable.attr('gid');

				// 过滤需要删除的组件
				if( ui.draggable.parent().get(0).className === 'newpage' ){

					// 删除符合条件的组件
					ui.draggable.remove();

					// 同时删除组件样式
					$('#drag .newpage').find('[gid='+Gid+']').length === 0 ?
					$('style[gid='+Gid+']').remove() : "";
				}

			}
		});

		// 处理页面宽度适配
		$('#mainPage').find('label').on('click', function(){
			var num = $(this).attr('value');
			$('#drag .newpage').width( num );
		})

		// 处理已匹配组件选中及其后续操作
		$('.newpage').delegate('>*', 'click', function(){
			var Gid, style, area;

			$(this).addClass('selected');
			$(this).siblings('.selected').removeClass('selected');

			lv.showInfo();

			// 获取Gid
			Gid = this.getAttribute('gid');
			// 获取对应css节点
			style = $('style[gid='+Gid+']');
			// 获取css编辑区域
			area = $('#cssEditArea');

			// 取出css以编辑
			area.val( style.html() );
			// 设置编辑区域Gid
			area.attr('gid', Gid);

			return false;
		});

		// 处理页面命名
		$('#NewPage').blur(function(){
			if( this.value ){
				this.placeholder = this.value;
				this.value = '';
				$(this).addClass('sure');
			}
		}).focus(function(){
			$(this).removeClass('sure');
		})

		// 处理页面创建
		$('#cssEditSave').on('click', function(){
			// console.log(pages.list)
			var obj = {};
			var content = $(document.createElement('div'));

			if( !cache.pro.ename ){
				return alert('请创建一个项目');
			}

			if( !$('#theModule').html() ){
				return alert('请拖入组件列表页');
			}

			// 清理因 jquery ui 产生的 ui-draggable类
			content.html($('#drag .newpage').html());
			content.find('.ui-draggable').removeClass('ui-draggable');

			obj.content = content.html();
			obj.filename = $('#NewPage').attr('placeholder');

			obj.filename.match(/\.html$/) ? "" : obj.filename = obj.filename + '.html';
			obj.projectName = cache.pro.ename;


			$.post('/api/getModule', obj, function(str){
				
				$('#saveTips').show().html(obj.filename + '创建成功 <a href="' + str + '" target="_blank" style="color: blue">预览</a>').fadeOut(3000);
				// console.log(pages)

				if(!pages.hash[str]){
					lv.add(obj.filename, str);
					pages.list.push(str+'='+obj.filename);
					pages.hash[str] = obj.filename;
					// localStorage.lincouiProjectPagesList = pages.list.join(',');
					console.log(pages.list)
					cache.set('list', pages.list.join(','));
				}

				// console.log(pages.list)

				return;
			});

		})

		// 创建项目名称
		$('#buildNewPro').on('click', function(){
			$('#ProjectNameCN').val('');
			$('#ProjectNameEN').val('');
			$('#lincouiDialog').fadeIn(200);
		})

		$('#getProNameCancel').on('click', function(){
			$('#lincouiDialog').fadeOut(200);
		});

		$('#getProNameSure').on('click', function(){

			if( !$('#ProjectNameCN').val() ){
				return alert('请输入中文名称')
			}

			if( !$('#ProjectNameEN').val() ){
				return alert('英文名称')
			}

			cache.pro.cname = $('#ProjectNameCN').val();
			cache.pro.ename = $('#ProjectNameEN').val();
			$('#ProjectName').html(cache.pro.cname);
			$('#lincouiDialog').fadeOut(200);

			$('#theModule').html('');
			getModule.show();

			pages.reset();
			cache.clear();

			cache.set('cname', cache.pro.cname);
			cache.set('ename', cache.pro.ename);
		});


		// 处理打包下载
		$('#downloadZip').on('click', function(){
			var obj = {};
			obj.projectName = cache.pro.ename;

			$.post('/api/getZip', obj, function(url){
				window.location.href=url
			})
		})


		// 处理模板列表清空
		$('#resetModule').on('click', function(){
			$('#theModule').html('');
			getModule.show();
		})



		// 处理拼装页面选中状态
		$('.lincoui-aside-inner').on('click', function(){
			$('.newpage').find('>.selected').removeClass('selected');
			lv.hideInfo();
		})


		// 清理缓存
		$('#clearCache').on('click', function(){
			lv.clearCache();
		})

	}
	draggable();



	// 处理属性面板
	function infomation(){

		// 加载动态组件
		$('#getDataModule').on('click', function(){

			$.post('/api/getDataModule', function(str){
				var data = lv.makeHTML(str);
				$('#theModule').html($(data).find('lincouiBody').html());
				getModule.hide();
				lv.makeDrag();
			})
		});

		// 配置数据接口 | 单个组件配置
		$('#dataView').on('click', function(){
			var obj = {};
			var src = $('#newDataInput').val();
			var curr = $('#newPage > .selected');
			var guid = curr.attr('guid');
			var className = curr.get(0).className;

			// console.log(guid)

			$.ajax({
				url: src,
				type: 'GET',
				dataType: 'json',
				success: function(msg){
					obj.data = msg;
					$.post('/api/getDataModule', obj, function(str){
						var data = lv.makeHTML(str);
						var module = $(data).find('div[guid='+guid+']');

						module.get(0).className = className;
						curr.replaceWith(module);

						// $('#theModule').html($(data).find('lincouiBody').html());
						// getModule.hide();
						// lv.makeDrag();
					})
				}
			})

		})

	}
	infomation();


	lv.getModule = function(){
		getModule.get(0).addEventListener("dragover", lv.dragover, false);  
		getModule.get(0).addEventListener("dragleave", lv.dragleave, false);  
		getModule.get(0).addEventListener("drop", lv.drop, false); 
	}();


	lv.setWindow = function(){
		var header = $('#lincoHeader');
		var content = $('#lincouiContent');

		if( content.hasClass('onload') ){
			content.height(window.innerHeight - header.get(0).offsetHeight);
		}
		else{

			content.addClass('onload');

			setTimeout(function(){
				content.height(window.innerHeight - header.get(0).offsetHeight);
			}, 760)
		}
	}

	lv.onWheel = function(){
		var header = $('#lincoHeader');
		var content = $('#lincouiContent');
		var page = $('#newPage');
		var height = header.get(0).offsetHeight;
		var y = 20;
		var pos = height - y;

		document.onwheel = function(e){

			if(e.wheelDeltaY < 0 && !header.hasClass('onsmall') && page.position().top < pos){
				header.addClass('onsmall');
				content.height( content.height() + y);
			}

			if(e.wheelDeltaY > 0 && header.hasClass('onsmall') && page.position().top >= pos){
				header.removeClass('onsmall');
				content.height( content.height() - y);
			}

		}
	}


	$(function(){

		lv.setWindow();

		lv.onWheel();

		window.onresize = function(){
			lv.setWindow();
		}
	})

// define end.	
window.cache = cache;
});
