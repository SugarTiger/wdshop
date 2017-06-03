$(function() {
    // 收起详情
    $('.msg>span:last').click(function() {
        $('.details').slideToggle(100);
    });
    // 选择支付方式
    $('.checkbox').click(function() {
        var checkBox = $(this).find('input');
        var parent = $(this).parent();
        if (checkBox.is(':checked')) {
            removeFalse(parent);
        } else {
            parent.addClass('active');
            checkBox.attr('checked', true);
            $(this).find('span').addClass('checked');
            removeFalse(parent.siblings());
        }
    });
    // 选择优惠
    $('.highest').click(function() {
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
        var notempt = true;
        $(this).find('input[type="password"]').each(function() {
            var val = $(this).val();
            if (val === '') {
                alert('支付密码不能有空！');
                notempt = false;
                return false;
            }
            // else if (!/[0-9]/.test(val)) {
            //     alert('支付密码要为数字！');
            //     $(this).attr('value', '').siblings().attr('value', '');
            //     notempt = false;
            //     return false;
            // }
        });
        return notempt;
    });
    // 点击获得焦点
    function getFocus() {
        $(this).parent().find('input:not([readonly]):last').focus();
    }
    $('.pwd>input[readonly]').click(getFocus);
    // 输入密码时自动下一位,不能输入除数字外的键
    $('.paying input[type="password"]').keyup(function(event) {
        var gg = $(this).val();
        var keycode = event.keyCode || event.which;
        if (keycode === 8) {
            if ($(this).index() !== 0) {
                $(this).attr('readonly', true);
                $(this).on('click', getFocus);
            }
            $(this).prev().attr('value', '').focus();
        } else {
            if (!/[0-9]/.test(gg)) {
                $(this).val('');
                $(this).focus();
                return;
            } else {
                if ($(this).val() !== '') {
                    $(this).off('click');
                    $(this).next().removeAttr('readonly').focus();
                } else {
                    $(this).next().attr('readonly', true);
                }
            }
        }
    });
});

function removeFalse(obj) {
    obj.removeClass('active');
    obj.find('.checkbox>input').attr('checked', false);
    obj.find('.checkbox>span').removeClass('checked');
}