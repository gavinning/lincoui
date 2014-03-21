define('home1', ['jqmobi', 'pm', 'basepage', 'iScroll', 'txTpl', 'utils', 'slide'], function($, PM, BasePage, iScroll, txTpl, utils, slide) {
    var NBA = window.NBA;
    var recData = null;
    var mainScroll;
    var recScroll;

    var HomePage1 = BasePage.extend({

        initialize: function() {
            this.page.name = 'home1';
            this.page.html = '<div class="virtualPage" page="' + this.page.name + '"></div>';
            this.page.mainScroll = null;
            this.page.recScroll = null;
            this.page.nextDate = null;
            this.page.fetching = false;
        },

        enter: function() {
            this._renderHTML();
        },

        leave: function() {
            this.page.mainScroll = null;
            this.page.recScroll = null;
            this.page.nextDate = null;
            this.page.fetching = false;
        },

        _renderHTML: function() {
            var _this = this;
            var TPL = '' +
                '<div id="t_home_wrapper" style="overflow: hidden"><div style="overflow: hidden;">' +
                '<div class="content">' +
                '   <div class="live-slide">' +
                '       <div class="live-box">' +
                '           <div class="prev on t_home_rec_prev"></div>' +
                '           <div class="lv-slide" id="t_home_rec_wrapper">' +
                '           </div>' +
                '           <div class="next on t_home_rec_next"></div>' +
                '       </div>' +
                '   </div>' +
                '   <div class="lv1-nav">' +
                '       <nav class="u-list">' +
                '           <li><a href="#rank">排名</a></li>' +
                '           <li><a href="#statics">统计</a></li>' +
                '           <li><a href="">商城</a></li>' +
                '           <li><a href="#nowbets">竞猜</a></li>' +
                '       </nav>' +
                '   </div>' +
                '   <section class="lv1-se">' +
                '<div class="lv1-list">' +
           ' <div class="lv-title on">' +
                '<em class="date">今天</em>' +
                '<time>2013-11-16</time>' +
                '<div class="lv-line-space"></div>' +
            '</div>' +
            '<div class="live-game">' +
               ' <div class="live-team">' +
                   ' <div class="team left">' +
                        '<div class="team-logo"><a class="u-img" href=""><img src="images/img/t2.png" alt=""></a></div>' +
                        '<div class="tema-name">波斯顿凯尔特人</div>' +
                  '  </div>' +
                   ' <div class="lv-vs"><img src="images/vs2.png" width="20" height="13" alt=""></div>' +
                    '<div class="team right">' +
                        '<div class="team-logo"><a class="u-img" href=""><img src="images/img/t3.png" alt=""></a></div>' +
                       ' <div class="tema-name">多伦多猛龙</div>' +
                   ' </div>' +
                '</div>' +
                '<div class="live-team-info">' +

                   ' <div class="team-score">' +
                      '  <div class="item">87</div>' +
                       ' <div class="item">93</div>' +
                    '</div>' +
                    '<div class="to-game"><a href=""><i class="lv3-video"></i>精彩回放</a></div>' +

              '  </div>' +
           ' </div>' +
           ' <div class="live-game">' +
                '<div class="live-team">' +
                   ' <div class="team left">' +
                        '<div class="team-logo"><a class="u-img" href=""><img src="images/img/t2.png" alt=""></a></div>' +
                       ' <div class="tema-name">波斯顿凯尔特人</div>' +
                   ' </div>' +
                   ' <div class="lv-vs"><img src="images/vs2.png" width="20" height="13" alt=""></div>' +
                   ' <div class="team right">' +
                       ' <div class="team-logo"><a class="u-img" href=""><img src="images/img/t3.png" alt=""></a></div>' +
                       ' <div class="tema-name">多伦多猛龙</div>' +
                   ' </div>' +
               ' </div>' +
                '<div class="live-team-info">' +

                   ' <div class="team-score">' +
                       ' <div class="item">87</div>' +
                        '<div class="item">93</div>' +
                   ' </div>' +
                   ' <div class="to-game"><a href=""><i class="lv3-img"></i>精彩回放</a></div>' +

               ' </div>' +
           ' </div>' +
           ' <div class="live-game">' +
               ' <div class="live-team">' +
                    '<div class="team left">' +
                       ' <div class="team-logo"><a class="u-img" href=""><img src="images/img/t2.png" alt=""></a></div>' +
                       ' <div class="tema-name">波斯顿凯尔特人</div>' +
                   ' </div>' +
                   ' <div class="lv-vs"><img src="images/vs2.png" width="20" height="13" alt=""></div>' +
                    '<div class="team right">' +
                       ' <div class="team-logo"><a class="u-img" href=""><img src="images/img/t3.png" alt=""></a></div>' +
                       ' <div class="tema-name">多伦多猛龙</div>' +
                   ' </div>' +
               ' </div>' +
               ' <div class="live-team-info">' +

                    '<div class="team-score">' +
                        '<div class="item">87</div>' +
                        '<div class="item">93</div>' +
                    '</div>' +
                   ' <div class="to-game"><a href=""><i class="lv3-play"></i>精彩回放</a></div>' +

               ' </div>' +
           ' </div>' +
           ' <div class="live-game">' +
               ' <div class="live-team">' +
                    '<div class="team left">' +
                       ' <div class="team-logo"><a class="u-img" href=""><img src="images/img/t2.png" alt=""></a></div>' +
                        '<div class="tema-name">波斯顿凯尔特人</div>' +
                   ' </div>' +
                   ' <div class="lv-vs"><img src="images/vs2.png" width="20" height="13" alt=""></div>' +
                   ' <div class="team right">' +
                       ' <div class="team-logo"><a class="u-img" href=""><img src="images/img/t3.png" alt=""></a></div>' +
                       ' <div class="tema-name">多伦多猛龙</div>' +
                    '</div>' +
               ' </div>' +
               ' <div class="live-team-info">' +

                   ' <div class="team-time">AM-10:35</div>' +
                    '<div class="to-game off"><a href="">暂无直播</a></div>' +

               ' </div>' +
           ' </div>' +
       ' </div>' +
                '       <a class="lv-btn t_next_sch" href="javascript:;">未来赛程</a>' +
                '   </section>' +
                '</div>';

            TPL +='<footer class="footer live-footer">' +
               ' <nav>' +
                    '<a href="" class="lv-left w-footer-mqq">手机腾讯网</a>' +
                    '<a href="" class="">登录</a>' +
                    '<a href="" class="">留言</a>' +
                '</nav>' +
                '</footer>';
            TPL += '</div></div>';
            var html =TPL;
           _this.page.wrapper.html(html);
        },


        bindMethod: function() {
            var _this = this,
            jdom = this.jdom;

        }

    });

    new HomePage1();
})