$(function () {
    // 收起详情
    $('.msg>span:last').click(function () {
        $('.details').slideToggle(100);
    });
    // 选择支付方式
    $('.pay_list>li').click(function () {
        var radio = $(this).find('input');
        if (!radio[0].checked) {
            $(this).addClass('active');
            radio[0].checked = true;
            $(this).find('span').addClass('checked');
            removeFalse($(this).siblings());
        }
    });
    // 选择优惠
    $('.highest').click(function (event) {
        event.stopPropagation();
        var ul = $(this).parent().find('ul');
        ul.slideToggle(100);
    });
    $('.fav_list li').click(function () {
        var thisHighest = $(this).parent().prev();
        thisHighest.text($(this).html());
        thisHighest.trigger("click")
    });
    // 验证支付密码
    // $('.paying').submit(function (event) {
    //     // event.preventDefault;
    //     if ($('.pay_list .active').length === 0) {
    //         alert('请选择支付银行！');
    //         return false;
    //     }
    //     var notempt = true;
    //     $(this).find('input[type="password"]').each(function () {
    //         var val = $(this).val();
    //         if (val === '') {
    //             alert('支付密码不能有空！');
    //             notempt = false;
    //             return false;
    //         }
    //     });
    //     if (notempt) {
    //         location.href = confirm('确认支付吗？') ? 'pay_success.html' : 'pay_failure.html';
    //     }
    //     return false;
    // });
    // 点击获得焦点
    $('.pwd>input').click(function () {
        var notempty = $('.pwd>input[value!=""]');
        if (notempty.length === 0) {
            $('#pay_pwd').focus();
        } else if (notempty.length === 6) {
            notempty.last().focus();
        } else {
            notempty.last().next().focus();
        }
    });
    // 输入密码时自动下一位,不能输入除数字外的键
    $('.paying input[type="password"]').keyup(function (event) {
        var gg = $(this).val();
        var keycode = event.keyCode || event.which;
        if (keycode === 8) {
            if ($(this).index() !== 0) {
                $(this).attr({
                    'value': '',
                    'readonly': true
                }).prev().attr('readonly', false).focus();
            }
        } else if (keycode >= 48 && keycode <= 57 || keycode >= 96 && keycode <= 105) {
            if ($(this).index() !== 5 && $(this).val() !== '') {
                $(this).attr('readonly', true).next().attr('readonly', false).focus();
            } else {
                $(this).blur();
            }
        }
    });
    $('.paying input[type="password"]').on('input', function () {
        if (!/[0-9]/.test($(this).val())) {
            this.value = '';
        }
    });
});

function removeFalse(obj) {
    obj.removeClass('active');
    obj.find('.checkbox>input')[0].checked = false;
    obj.find('.checkbox>span').removeClass('checked');
}

new Vue({
    el: "#middle",
    data: {
        orderId:'',
        orderInfo:{},
        balance:0
    },
    mounted: function () {
        this.getOrderInfo();
        var that = this;
        http.get('/getUserInfo',null,function(res){
            that.balance = res.data.userInfo.user_balance
        })
    },
    methods: {
        getOrderInfo: function () {
            var orderId = GetRequest().orderId
            if (!orderId) {
                history.back();
                return;
            }
            var that = this;
            this.orderId = orderId;
            http.get('/getOrderDetail',{
                orderId:orderId
            },function(res){
                that.orderInfo = res.data;
            })
        },
        paying: function () {
            var notempt = true;
            var pwd = '';
            $('.pwd input[type="password"]').each(function () {
                var val = $(this).val();
                if (val === '') {
                    alert('支付密码不能有空！');
                    notempt = false;
                    return false;
                }
                pwd += val;
            });
            if(!notempt)return;
            if(this.balance<this.orderInfo.order_total_price){
                alert('余额不足，请联系客服充值！');
                return;
            }
            var that = this;
            http.post('/userPayOrder',{
                orderId:this.orderId,
                payPwd:md5(pwd)
            },function(res){
                if(res.status===1){
                    location.href = 'pay_success.html?orderProce='+res.data.totalMoney+'&orderId='+that.orderInfo.order_id+'&money='+res.data.money;
                    return
                }else if(res.status===2){
                    alert('余额不足，请联系客服充值！');
                    return;
                } else if(res.status === 3){
                    alert('支付密码错误！')
                    // $('.pwd input[type="password"]').val('')
                    return;
                }
            })
        }
    }
})