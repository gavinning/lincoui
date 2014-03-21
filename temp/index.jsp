<%@ page contentType="text/html; charset=utf-8" language="java" %>
<%@ include file="for_include/include.jsp" %>
<!DOCTYPE HTML>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0,user-scalable=no" />
        <meta name="format-detection" content="telephone=no">
        <meta name="author" content="Tencent..gavinning" />
        <meta name="copyright" content="Copyright (c) 1998-2012 Tencent." />
        <meta name="description" content="手机腾讯网" />
        <link rel="apple-touch-icon-precomposed" href="http://3gimg.qq.com/info/touch/auto/images/img/icon.jpg"/>
        <title>秀车</title>
        <style type="text/css">
            .virtualPage{display:none}
            .virtualPage[selected='true']{display:block}
        </style>
        <%
            //登录状态
            boolean isLogin = s_user.isLogin3G();
            long uinL = s_user.getUinL();
            String fwdPage = NetUtilEx.getSafeStringParameter(request, "fwd", "");
            String fwdKeyword = NetUtilEx.getSafeStringParameter(request, "keyword", "");
            //统计日志
            InfoappStatLogUtil.pkuPvLogPkuTouch(request,response,16,"auto","autolib_touch_index");

            boolean testEnv = false;

            if( request.getServerName().contains("kf0309") ){
                testEnv = true;
            }

            String apiUrl = "/g/s";
            if(testEnv) {
                apiUrl = "/infoapp/s";
            }
            //灰度cdn源服务器
            boolean isCdnStoreinc=false;
            if(GrayReleaseUtil.isAllowed("info", "iscdnstoreinc", s_user.getUinL())){
                    isCdnStoreinc=true;
            }
            if(BrowserFeatureUtil.isFromAndroid(BrowserFeatureUtil.getHeaderMap(request))) {
        %>
            <style type="text/css">*{-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}</style>
        <%
            }
        %>

        <%if(testEnv) {%>
            <link href="http://gavinning.kf0309.3g.qq.com/webapp_html/info/car/css/auto.css" rel="stylesheet"type="text/css">
        <%} else {%>
            <link href="http://3gimg.qq.com/info/touch/auto/css/auto2.min.20131030.css" rel="stylesheet" type="text/css">
        <%}%>

        <link href="http://3gimg.qq.com/ptlogin/touch/css/ptlogin.css" rel="stylesheet" type="text/css">
        <script>
            window.CONFIG = {};
            window.CONFIG.USER = {};
            window.CONFIG.USER.sid = "<%=sid%>";
            window.CONFIG.USER.qq = "<%=uinL%>";
            window.CONFIG.USER.isLogin =<%=isLogin%>;
            window.AUTOCONFIGPATH = "<%=path%>";

            window.apiUrl="<%=apiUrl%>";

            window.isOs7 = (navigator.userAgent).indexOf('OS 7') !== -1;

            if(window.screen.height == 568){
                document.querySelector('meta[name="viewport"]').content="width=320,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no";
            }

			//var moduleName = 'autopiclib';
			//改成用产品id打日志
			var moduleName = '29';
            // 统计工具 本地存储
            var StatisticTool = {
                storage: window.localStorage,
                storageKey: 'mqq_temp_statistic',
                wordSplit: ',',
                itemSplit: '#',
                serverParam: 'statistic',
                save: function(pageName, title, value) {
                    if(!this.storage) return false;
                    var oStr = moduleName + this.wordSplit + pageName + this.wordSplit + title + this.wordSplit + value,
                            oldData = this.storage.getItem(this.storageKey),
                            newData = oldData ? oldData + this.itemSplit + oStr : oStr;
                    this.storage.setItem(this.storageKey, newData);
                },
                get: function() {
                    if(!this.storage) return false;
                    var data = this.storage.getItem(this.storageKey);
                    this.clear();
                    return data || false;
                },
                clear: function() {
                    this.storage.removeItem(this.storageKey);
                },
                send: function(title, value) {
                }
            };


        </script>
    </head>
    <body>
        <div class="show">
            <header class="show-head">
                <h1 class="_top" id="headtitle">秀车</h1>
                <div class="show-head-bar">
                    <a href="javascript:;" id="t_back" class="back">返回</a>
                    <a class="input-link" id="add" >添加图片</a>
                    <a class="my-home" id="user">个人主页</a>
                    <a class="u-submit" id="submit" style="display:none"></a>
                    <a href="#home" id="tohome" style="display:none" class="home">首页</a>
                </div>
            </header>

            <div id = "scroll">
                <div id="wrapper" class="wrapper">
                </div>
            </div>
        </div>

        <%if(testEnv) {%>
            <script type="text/javascript">
                var g_config = {
                    jsmap:{
                        'auto': '/auto.js',
                        'basepage': '/basepage.js',
                        'iScroll': '/iScroll.js',
                        'jqmobi': '/jqmobi.js',
                        'pm': '/pm.js',
                        'shareBind': '/shareBind.js',
                        'slide': '/slide.js',
                        'txTpl': '/txTpl.js',
                        'init' : '/init.js',
                        'addpic': '/pages/addpic.js',
                        'jpegencoder': '/jpegencoder.js',
                        'jpegmeta': '/jpegmeta.js',
                        'cat': '/pages/cat.js',
                        'home': '/pages/home.js',
                        'imagepack': '/pages/imagepack.js',
                        'medal': '/pages/medal.js',
                        'packdetail': '/pages/packdetail.js',
                        'search': '/pages/search.js',
                        'user': '/pages/user.js'
                    },
                    storeInc:{},
                    staticPath: '/infoapp/auto/autopiclib/touch/js',
                    testEnv: true
                };
            </script>
		    <%if(isCdnStoreinc){%>
				<script type="text/javascript" src="http://3gimg.qq.com/wap30/info/storeIncLoad-core-v2.js"></script>
			<%}else{%>
				<script type="text/javascript" src="http://3gimg.qq.com/wap30/info/storeIncLoad-core-log.js"></script>
			<%}%>
        <%} else {%>
            <script type="text/javascript" id="file_config">
                var g_config = {
                    jsmap:{
                        'auto': '/base.js?004',
                        'basepage': '/base.js',
                        'iScroll': '/base.js',
                        'jqmobi': '/base.js',
                        'pm': '/base.js',
                        'shareBind': '/base.js',
                        'slide': '/base.js',
                        'txTpl': '/base.js',
                        'init' : '/base.js',
                        'addpic': '/pages/addpic.js?004',
                        'jpegencoder': '/pages/addpic.js',
                        'jpegmeta': '/pages/addpic.js',
                        'cat': '/pages/cat.js',
                        'home': '/pages/home.js?003',
                        'imagepack': '/pages/imagepack.js',
                        'medal': '/pages/medal.js',
                        'packdetail': '/pages/packdetail.js',
                        'search': '/pages/search.js',
                        'user': '/pages/user.js'
                    },
                    storeInc:{
                        'store': true,
                        'inc': true,
                        'debug': false
                    },
                    testEnv: false,
                    staticPath: '/info/infoapp/autopiclib',
					realPath:'http://infocdn.3g.qq.com/infocdn/storeinc',
                    buildType: 'file'
                };
            </script>
			<%if(isCdnStoreinc){%>
				<script type="text/javascript" src="http://3gimg.qq.com/wap30/info/storeIncLoad-core-v2.js"></script>
			<%}else{%>
				<script type="text/javascript" src="http://3gimg.qq.com/wap30/info/storeIncLoad-core-log.js"></script>
			<%}%>

        <%}%>
        <script type="text/javascript" src="http://3gimg.qq.com/ptlogin/touch/js/ptlogin.js"></script>

        <script type="text/javascript">
            MT.config(g_config);
            require('init');
        </script>
<%if("23520".equals(NetUtil.getStringParameter(request,"g_f","-1"))){%>
<script src="http://m.baidu.com/static/ala/webapp/api.js"></script>
<%}%>
    </body>
</html>
