$(function() {
    // 点击验证码更换
    (function() {
        var i = 1;
        var yzmlen = yzm.length;
        $('.yicon>span').each(function() {
            $(this).click(function() {
                if (i > yzmlen - 1) {
                    i = 0;
                }
                $(this).find('img').attr({ src: yzm[i].src, alt: yzm[i].alt });
                i++;
            });
        });
    })();
    placeholder($('.loginname>input'), '手机号/邮箱');
    placeholder($('.pwd>input'), '密码', true);
    placeholder($('.yicon>input'), '验证码');
    // 提交表单时验证
    $('.login').submit(function() {
        var loginname = $.trim($('.loginname>input').val());
        var pwd = $.trim($('.pwd>input').val());
        var yzm = $('.yicon>input').val().toLowerCase();
        var yyzm = $('.yicon>span>img').attr('alt');
        // 登录名验证
        if (!(/^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/.test(loginname) || /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(loginname))) {
            alert('请输入正确的手机号或者邮箱！');
            return false;
        }
        // 密码
        if (pwd == '密码' || pwd.length < 8) {
            alert('请输入密码，且不少于八位！');
            return false;
        }
        // 验证码
        if (yzm != yyzm) {
            alert('验证码输入错误！');
            return false;
        }
    });
});