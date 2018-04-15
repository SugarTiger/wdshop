// 放大镜效果
function zoom(scale) {
    //scale控制缩放比例的产量
    var img_boxW = $('.img_box').innerWidth();
    var img_boxH = $('.img_box').innerHeight();
    var imgOffT = $('.img_box>img').offset().top;
    var imgOffL = $('.img_box>img').offset().left;
    // 配置放大镜镜片大小
    var zoomW = $('.zoom').css('width', img_boxW / scale + 'px').innerWidth();
    var zoomH = $('.zoom').css('height', img_boxH / scale + 'px').innerHeight();
    // 设置放大镜窗口大小
    $('.bigimg').css('width', img_boxW + 'px');
    $('.bigimg').css('height', img_boxH + 'px');
    $('.bigimg>img').css('width', img_boxW * scale + 'px');
    $('.bigimg>img').css('height', img_boxH * scale + 'px');
    $('.img_box').mouseenter(function () {
        $('.bigimg').fadeIn("fast");
        $('.zoom').fadeIn("fast");
    });
    $('.img_box').mouseleave(function () {
        $('.bigimg').fadeOut("fast");
        $('.zoom').fadeOut("fast");
    });
    $('.img_box').mousemove(function (event) {
        $('.bigimg>img').attr('src', $('.img_box>img').attr('src'));
        var dw = event.pageX - imgOffL - zoomW / 2;
        var dh = event.pageY - imgOffT - zoomH / 2;
        if (dw <= 0) {
            dw = 0;
        } else if (dw >= img_boxW - zoomW + 1) {
            dw = img_boxW - zoomW + 1;
        }
        if (dh <= 0) {
            dh = 0;
        } else if (dh >= img_boxH - zoomH) {
            dh = img_boxH - zoomH;
        }
        $('.zoom').css('left', dw + 'px');
        $('.zoom').css('top', dh + 'px');
        $('.bigimg>img').css('left', -dw * scale + 'px');
        $('.bigimg>img').css('top', -dh * scale + 'px');
    });
};
$(function () {
    var pro_main = $('.pro_main,.you_like');
    var com_main = $('.com_main');
    $('.shop_area li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        var htmltext = $(this).find('a').text();
        if (htmltext.indexOf('商品详情') > -1) {
            pro_main.css('display', 'block');
            com_main.css('display', 'none');
        } else if (htmltext.indexOf('累计评论') > -1) {
            pro_main.css('display', 'none');
            com_main.css('display', 'block');
        }
    });
    // 颜色分类点击边样式
    (function () {
        $('.color>ul>li').each(function () {
            $(this).click(function () {
                $(this).addClass('active').siblings().removeClass('active');
            });
        });
    })();
    // 添加收藏
    (function () {
        var love = false;
        $(".add_love").click(function () {
            if(!getToken()){
                alert('请先登录文的商城');
                location.href = "login.html";
                return;
            }
            var img = $(this).find('img');
            if (love) {
                img.attr('src', 'images/love_icon.png');
            } else {
                img.attr('src', 'images/love_icon2.png');
            }
            love = !love;
        });
    })();
    // 搜索本店
    // placeholder($('.shop_search>input'), "搜本店");

    // 加入购物车，添加到本地存储
    (function () {
        $('.shoppingcart').click(function () {
            var i = Math.floor(Math.random() * 6);
            var count = $('#count').val();
            proInfoArr[i].count = parseInt(count);
            addtoLocals(new Proinfo(proInfoArr[i]));
            prosum();
        });
    })();

    // 店内搜索
    $('#min,#max').on('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
    // 排序
    (function () {
        var up = true;
        $('.sort>li:last-of-type').click(function () {
            var that = $(this);
            $(this).find('img').attr('src', up ? 'images/arrows_icon3_2.png' : 'images/arrows_icon3.png');
            if (up) {
                $(this).attr('class', 'on');
            } else {
                setTimeout(function () {
                    that.attr('class', '');
                }, 500);
            }
            $(this).find('ul').slideToggle(500);
            up = !up;
        });
        $('.sort>li:last-of-type>ul>li').click(function () {
            console.log($('.sort>li:last-of-type>a').html($(this).text() + ' <img src="images/arrows_icon3.png" alt="">'));
        });
    })();
});

new Vue({
    el: '#middle',
    data: {
        proD: {
            goods_img: []
        },
        commontList:[],
        hostList:[],
        percen:0,
        imgServer: window.imgServer
    },
    methods: {
        toSubOrder: function (proId) {
            if (!getToken()) {
                alert('请先登录文的商城！');
                location.href = "login.html"
                return;
            }
            var orderPro = [{
                qty: Number($("#count").val()),
                proId: proId
            }]
            var href = "confirm_order.html?orderPro=" + JSON.stringify(orderPro)
            location.href = href
        },
        addshopcart: function (proId) {
            if (!getToken()) {
                alert('请先登录文的商城！');
                location.href = "login.html"
                return;
            }
            http.post('/updateCartPro',{
                qty:parseInt($("#count").val()),
                proId:proId,
                type:1
            },function(res){
                
            })
        },
        getProCommont:function(proId){
            var that = this;
            http.get('/public/getProComment',{
                proId:proId
            },function(res){
                var total = 0,sum=0;
                res.data.forEach(function(item){
                    item.comment_date = (new Date(item.comment_date)).Format("yyyy-MM-dd");
                    sum+=item.comment_fraction
                    total+=5;
                });
                that.commontList = res.data;
                that.commonTmpList = res.data;
                that.percen = parseInt(sum/total*100)
            })
        },
        commSortData:function(){
            var that = this;
            that.commontList=that.commonTmpList;
            that.commontList.sort(function(a,b){
                return b.comment_fraction - a.comment_fraction
            })
        },
        commSortTime:function(){
            var that = this;
            that.commontList=that.commonTmpList;
            that.commontList.sort(function(a,b){
                return (new Date(b.comment_date)).getTime() - (new Date(a.comment_date)).getTime()
            })
        },
        getHosProList:function(){
            var that = this;
            http.get('/public/getProList',{
                status:1
            },function(res){
                that.hostList = (res.data.list.sort(function(a,b){
                    return b.goods_sales - a.goods_sales
                })).slice(0,4);
            })
        }
    },
    mounted: function () {
        var proId = GetRequest().proId;
        console.log("proId", proId)
        if (!proId) {
            location.href = "shop_list.html";
            return;
        }
        var that = this;
        // 获取商品详情
        http.get('/public/getProDetail', {
            proId: proId
        }, function (res) {
            that.proD = res.data.items;
            that.$nextTick(function () {
                // 点击按钮添加商品数量
                $('.add').click(function () {
                    var val = parseInt($('#count').val()) + 1;
                    if (val > res.data.items.goods_inventory) {
                        val = res.data.items.goods_inventory
                    } //最大库存数
                    $('#count').attr('value', val);
                });
                $('.down').click(function () {
                    var val = parseInt($('#count').val()) - 1;
                    if (val < 1) {
                        val = 1;
                    }
                    $('#count').attr('value', val);
                });
                $('#count').on('input', function () {
                    this.value = this.value.replace(/[^0-9]/g, '');
                    if (this.value === '' || parseInt(this.value) === 0) {
                        this.value = 1;
                    } else if (this.value > res.data.items.goods_inventory) {
                        this.value = res.data.items.goods_inventory
                    } //最大库存数
                });
                zoom(2);
                // 商品详情图片
                function getSrc() {
                    var src = '';
                    $('.img_wrap ul li').each(function () {
                        if ($(this).hasClass("active")) {
                            src = $(this).find('img').attr('src');
                            return false;
                        }
                    });
                    return src;
                }

                function setActive(obj) {
                    obj.addClass('active').siblings().removeClass('active');
                }

                //获取所有的li元素
                var list = $('.img_wrap>ul>li');
                // 每次显示的商品个数
                var pageSize = 4;
                //定义初始页
                var pageInit = 1;
                //定义总页数  向上取整 
                var pageTotal = Math.ceil(list.length / pageSize);
                list.each(function () {
                    $(this).click(function () {
                        setActive($(this));
                        $('.img_box img').attr('src', getSrc());
                    });
                });

                $('.next').click(function () {
                    if (pageInit < pageTotal) {
                        //当前页隐藏
                        list.slice(pageSize * (pageInit - 1), pageSize * pageInit).hide();
                        //下一页显示
                        list.slice(pageSize * pageInit, pageSize * (pageInit + 1)).show();
                        //为每页首个li元素增加样式
                        setActive(list.eq(pageSize * pageInit));
                        $('.img_box img').attr('src', getSrc());
                        pageInit++;
                    }
                });

                $('.prev').click(function () {
                    if (pageInit > 1) {
                        list.slice(pageSize * (pageInit - 1), pageSize * pageInit).hide();
                        list.slice(pageSize * (pageInit - 2), pageSize * (pageInit - 1)).show();
                        setActive(list.eq(pageSize * (pageInit - 2)));
                        $('.img_box img').attr('src', getSrc());
                        pageInit--;
                    }
                });
            });
            that.getProCommont(res.data.items.goods_id);
            that.getHosProList();
        })
    }
})