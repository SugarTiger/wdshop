$(function () {
    // 修复在Safari浏览器商品排列问题
    (function () {
        // 判断是否是Safari浏览器
        var safari = 0;
        (function () {
            var browserver = 0;
            var ua = navigator.userAgent;
            if (/AppleWebKit\/(\S+)/.test(ua)) {
                var enginever = RegExp["$1"];
                var enginewebkit = parseFloat(enginever);
                //figure out if it's Chrome or Safari
                if (/Chrome\/(\S+)/.test(ua)) {} else if (/Version\/(\S+)/.test(ua)) {
                    browserver = RegExp["$1"];
                    safari = parseFloat(browserver);
                } else {
                    //approximate version
                    var safariVersion = 1;
                    if (enginewebkit < 100) {
                        safariVersion = 1;
                    } else if (enginewebkit < 312) {
                        safariVersion = 1.2;
                    } else if (enginewebkit < 412) {
                        safariVersion = 1.3;
                    } else {
                        safariVersion = 2;
                    }

                    safari = browserver = safariVersion;
                }
            }
        })();
        if (safari > 0) {
            $('.new_goods ul li:first-of-type img,.hot_goods ul li:first-of-type img,.re_goods ul li:first-of-type img,.boom_goods ul li:first-of-type img').css('height', '548px');
        }
    })();
    // 导航下拉
    $('.menu').off('mouseleave');
    $('.menu').off('mouseenter');
});
new Vue({
    el: "#middle",
    data: {
        bannerList: [],
        info_banner_time: 3000,
        imgServer: window.imgServer,
        proList:[]
    },
    mounted: function () {
        var that = this;
        // 请求网站基本信息
        http.get('/public/getWdInfo', null, function (res) {
            res.data.info_banner.forEach(function(item,i){
                that.bannerList.push({
                    imgUrl : item,
                    proId:res.data.banner_goods_id[i]
                })
            })
            that.info_banner_time = res.data.info_banner_time * 1000;
            that.$nextTick(that.initBanner)
        });
        // 获取商品列表
        this.getProList()
    },
    methods: {
        getProList:function(){
            var that = this;
            http.get('/public/getProList', {
                status:1
            }, function (res) {
                that.proList = res.data.list
            })
        },
        initBanner: function () {
            var that = this;
            // 轮播图js
            // 添加焦点和左右箭头
            function addOl(banner) {
                var liImgs = $("." + banner).find("ul").find("li");
                var ol = $("<ol></ol>");
                liImgs.each(function (i) {
                    ol.append($("<li/>"));
                });
                $("." + banner).append(ol);
                $(".banner ol li").eq(0).addClass("active");
            };

            function active() {
                $(".banner ol li").eq(i).addClass("active").siblings().removeClass("active");
                $(".banner ul li").eq(i).fadeIn(800).siblings().fadeOut(800);
            }
            // 后退
            function moveL() {
                i--;
                if (i == -1) {
                    i = size - 1;
                }
                active();
            }
            // 前进
            function moveR() {
                i++;
                if (i == size) {
                    i = 0;
                }
                active();
            }
            addOl("banner");
            var i = 0;
            var size = $(".banner ol li").length;
            // 绑定左右控制
            $("#left").click(function () {
                moveL();
            });
            $("#right").click(function () {
                moveR();
            });
            // 自动轮播
            var info_banner_time = that.info_banner_time
            var autoMove = setInterval(moveR, info_banner_time);
            $(".banner").hover(function () {
                clearInterval(autoMove);
                $("#left").show();
                $("#right").show();
            }, function () {
                autoMove = setInterval(moveR, info_banner_time);
                $("#left").hide();
                $("#right").hide();
            });
            // 焦点点击
            $(".banner ol li").click(function () {
                i = $(this).index();
                active();
            });
            // 控制轮播图的位置
            function bannerxy() {
                var dw = document.documentElement.clientWidth;
                var leftpx = -(1920 - dw) / 2 + 'px';
                $('.banner').css('left', leftpx);
            };
            bannerxy();
            $(window).resize(bannerxy);
        }
    }
})