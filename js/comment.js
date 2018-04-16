$(function () {
    // 评分
    function setgrade(obj, type, seleobj, inputname) {
        obj[type](function () {
            var x = $(this).index();
            if (type == 'click') {
                seleobj.off('mouseenter');
                seleobj.off('mouseleave');
                $("input[name=" + inputname + "]").attr('value', x + 1);
            }
            seleobj.each(function (index) {
                if (index > x) {
                    $(this).css('background-image', 'url(images/kx_icon.png)');
                } else {
                    $(this).css('background-image', 'url(images/hx_icon.png)');
                }
            });
        });
    }
    $('.describe>ul>li').each(function () {
        setgrade($(this), 'mouseenter', $('.describe>ul>li'));
        setgrade($(this), 'click', $('.describe>ul>li'), 'describe');
        $('.describe>ul>li').mouseleave(function () {
            $('.describe>ul>li').css('background-image', 'url(images/kx_icon.png)');
        });
    });
    // 提交表单验证
    // $('.edit_com>form').submit(function (e) {
    //     if ($("input[name='describe']").attr('value') == 0 || $("input[name='mer_serve']").attr('value') == 0 || $("input[name='log_serve']").attr('value') == 0) {
    //         alert('评分不能有0分哦！');
    //         return false;
    //     }
    //     var strlen = $('.com_txt>textarea').val().length;
    //     if (strlen < 10) {
    //         alert('详细说明至少10个字哦！');
    //         return false;
    //     } else if (strlen > 500) {
    //         alert('详细说明不能超过500个字哦！');
    //         return false;
    //     }
    // });
});
new Vue({
    el: "#middle",
    data: {
        proD: {
            goods_img: []
        },
        imgServer: imgServer,
        commentText: '',
        proId:0,
        orderId:0
    },
    mounted: function () {
        var proId = GetRequest().proId;
        var orderId = GetRequest().orderId;
        if (!proId||!orderId) {
            location.href = "shop_list.html";
            return;
        }
        this.proId = proId
        this.orderId = orderId
        this.getProInfo(proId);
    },
    methods: {
        getProInfo: function (proId) {
            var that = this;
            http.get('/public/getProDetail', {
                proId: proId
            }, function (res) {
                that.proD = res.data.items
            });
        },
        onSubmit: function () {
            var f = Number($("#fff").val());
            if (f === 0) {
                alert('评分不能有0分哦！');
                return;
            }
            var strlen = this.commentText.length;
            if (strlen < 10) {
                alert('详细说明至少10个字哦！');
                return false;
            } else if (strlen > 500) {
                alert('详细说明不能超过500个字哦！');
                return false;
            }
            // 提交商品评论
            http.post('/writeProComment',{
                goods_id:this.proId,
                comment_content:this.commentText,
                comment_fraction:f,
                orderId:this.orderId
            },function(res){
                alert('评论成功');
                location.href = "order.html";
            })
            console.log(this.commentText, $("#fff").val())
        }
    }
});