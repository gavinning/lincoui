define('home', [], function () {
    var _A = TOUCH.Auto;

    var HomePage = BasePage.extend({

        initialize: function() {
            this.page.name = 'home';
            this.page.html = '<div class="virtualPage" page="'+this.page.name+'"></div>';
        },

        enter: function(){
            _A.titleDom.html('秀车');
            this.renderHTML();
        },

        back: function(){
            _A.titleDom.html('秀车');
        },

        renderHTML: function(){
            var sid = _A.loginModule.getSid();
            var tpl = ''
                +'<div class="show-content">'
                +'<section class="gmqcar-soso">'
                +'<form class="search-form">'
                +'<input type="text" class="soso-text-search" id="t_home_search_text" placeholder="输入您感兴趣的内容试试手气">'
                +'<input type="reset" class="reset-btn on">'
                +'<input type="button" value="" class="soso-btn" id="t_home_search">'
                +'</form>'
                +'</section>'
                +'	<section class="show-banner" id="homebanner">'
                +'		<a href="<#=banner.url#>" target="_blank"><img src="<#=banner.picUrl#>" alt="" width="320" height="180"></a>'
                +'	</section>'
                +'	<# for(var i=0; i<cataList.length; i++ ){ #>'
                +'	<section class="show-indeximg <#= i==0 ? "first" : "" #>">'
                +'		<div class="lv1-title"><#=cataList[i]["name"]#></div>'
                +'		<div class="u-img">'
                +'			<# for(var n=0; n<cataList[i]["imgs"].length; n++ ){ #>'
                +'			<a href="#cat/id=<#=cataList[i].id#>&orderId=<#=n#>">'
                +'              <div style="background-image:url(<#=cataList[i]["imgs"][n].firstPic#>);width:<#= n==0 ? 192 : 98 #>px;height:<#= n==0 ? 134 : 64 #>px;background-size:cover;"></div>'
                +'          </a>'
                +'			<# } #>'
                +'		</div>'
                +'	</section>'
                +'	<# } #>'
                +'</div>'
                +'<section class="show-tag">'
                +'<div class="lv1-title">热门标签</div>'
                +'<div class="u-content">'
                +'	<# for(var i=0; i<hotTags.length; i++ ){ #>'
                +'	<a href="#search/keyword=<#=hotTags[i]#>"><#=hotTags[i]#></a>'
                +'			<# } #>'
                +'</div>'
                +'</section>';
            var footer_tpl = ''
                +'<section class="gmqcar-recommend">'
                +'<h3 class="gmqcar-title">推荐</h3>'
                +'<div class="gmqcar-details">'
                +'<a target="_blank" href="http://infoapp.3g.qq.com/g/s?aid=touchauto#idx/price=1&ot=1&sid='+sid+'">热车排行榜</a>'
                +'<a target="_blank" href="http://infoapp.3g.qq.com/g/s?&aid=gouche&sid='+sid+'">购车计算器</a>'
                +'<a target="_blank" href="http://info.3g.qq.com/g/s?aid=template&tid=auto_navigate&sid='+sid+'">汽车导航</a>'
                +'</div>'
                +'</section>'
                +'<footer class="footer" id="t_footer">'
                +'<nav>'
                +'<a target="_blank" class="m-qq" href="http://info.3g.qq.com/g/s?aid=template&tid=auto_h&sid='+sid+'">汽车频道</a>'
                +'<a target="_blank" class="leave-msg" href="http://infoapp.3g.qq.com/g/s?aid=touchmsg&pt=55&sid='+sid+'&backurl='+encodeURIComponent(location.href)+'">留言</a>'
                +'</nav>'
                +'</footer>';

            if(!window.cnautoshows) tpl += footer_tpl;
            var reqParams = {'aid' : 'autopiclib_touch_api', 'dt' : 'indexData'},
                _this = this;
            this.request({
                url:apiUrl,
                params : reqParams,
                'success' : function(json){
                    _this.page.wrapper.html(txTpl(tpl, json.indexData, '<#', '#>'));
                    _A.scroller.refresh();
                    setTimeout(function(){
                        _A.scroller.scrollTo(0,-56);
                    },200);
                }
            });
        },

        bindMethod: function(){
            this.jdom.delegate('#t_home_search','click', function(e){
                var keyword=$('#t_home_search_text').val();
                if(keyword.trim()) {
                    window.PM.go("#search/keyword="+encodeURIComponent(keyword));
                }
                e.preventDefault();
            });
            this.jdom.delegate('#t_home_search_text','keydown', function(e){
                if(e.keyCode === 13) {
                    var keyword=$(this).val();
                    if(keyword.trim()) {
                        window.PM.go("#search/keyword="+encodeURIComponent(keyword));
                    }

                    e.preventDefault();
                }
            });
        }
    });

    new HomePage();
});