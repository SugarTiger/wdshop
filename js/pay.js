$(function() {
    // 收起详情
    $('.msg>span:last').click(function() {
        $('.details').slideToggle(100);
    });
    // 选择支付方式
    $('.pay_list>li').click(function() {
        var checkBox = $(this).find('input');
        if (checkBox.is(':checked')) {
            removeFalse($(this));
        } else {
            $(this).addClass('active');
            checkBox.attr('checked', true);
            $(this).find('span').addClass('checked');
            removeFalse($(this).siblings());
        }
    });
    // 选择优惠
    $('.highest').click(function(event) {
        event.stopPropagation();
        var ul = $(this).parent().find('ul');
        ul.slideToggle(100);
    });
    $('.fav_list li').click(function() {
        var thisHighest = $(this).parent().prev();
        thisHighest.text($(this).html());
        thisHighest.trigger("click")
    });
    // 验证支付密码
    $('.paying').submit(function() {
        if ($('.pay_list .active').length === 0) {
            alert('请选择支付银行！');
            return false;
        }
        var notempt = true;
        $(this).find('input[type="password"]').each(function() {
            var val = $(this).val();
            if (val === '') {
                alert('支付密码不能有空！');
                notempt = false;
                return false;
            }
        });
        location.href = confirm('确认支付吗？') ? 'pay_success.html' : 'pay_failure.html';
        return false;
    });
    // 点击获得焦点
    $('.pwd>input').click(function() {
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
    $('.paying input[type="password"]').keyup(function(event) {
        var gg = $(this).val();
        var keycode = event.keyCode || event.which;
        if (keycode === 8) {
            $(this).attr('value', '').prev().focus();
        } else {
            $(this).next().focus();
        }
    });
    $('.paying input[type="password"]').on('input', function() {
        if (!/[0-9]/.test($(this).val())) {
            this.value = '';
        }
    });
});

function removeFalse(obj) {
    obj.removeClass('active');
    obj.find('.checkbox>input').attr('checked', false);
    obj.find('.checkbox>span').removeClass('checked');
}