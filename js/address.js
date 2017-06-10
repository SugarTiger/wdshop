$(function() {
    // 添加地址时表单验证
    // 收件人
    $('#addruser').focus(function() {
        $(this).parent().find('span').html('');
    });
    $('#addruser').blur(function() {
        var value = $.trim($(this).val());
        if (value == "") {
            $(this).parent().find('span').html('输入不能为空！');
        }
    });
    // 所在地区
    $('#area').focus(function() {
        $(this).parent().find('span').html('');
    });
    $('#area').blur(function() {
        var value = $.trim($(this).val());
        if (value == "") {
            $(this).parent().find('span').html('输入不能为空！');
        }
    });
    // 详情地址
    $('#addr_details').focus(function() {
        $(this).parent().find('span').html('');
    });
    $('#addr_details').blur(function() {
        var value = $.trim($(this).val());
        if (value == "") {
            $(this).parent().find('span').html('输入不能为空！');
        }
    });
    // 手机号码
    $('#phone').focus(function() {
        $(this).parent().find('span').html('');
    });
    $('#phone').blur(function() {
        var value = $.trim($(this).val());
        if (value == "") {
            $(this).parent().find('span').html('输入不能为空！');
        } else if (!(/^1[34578]\d{9}$/.test(value))) {
            $(this).parent().find('span').html('手机号码输入有误！');
        }
    });
    // 固定号码
    $('#tel').focus(function() {
        $(this).parent().find('span').html('');
    });
    $('#tel').blur(function() {
        var value = $.trim($(this).val());
        if (value == "") {
            $(this).parent().find('span').html('输入不能为空！');
        }
    });
    // 邮箱
    $('#email').focus(function() {
        $(this).parent().find('span').html('');
    });
    $('#email').blur(function() {
        var value = $.trim($(this).val());
        if (value == "") {
            $(this).parent().find('span').html('输入不能为空！');
        } else if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value))) {
            $(this).parent().find('span').html('邮箱地址输入有误！');
        }
    });
    // 删除订单
    $('.addrs>button').click(function() {
        if (confirm('确定删除收货地址？')) {
            $(this).parent().remove();
        }
    });
});