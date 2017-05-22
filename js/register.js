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
                $('.yicon>span>img').attr({ src: yzm[i].src, alt: yzm[i].alt });
                i++;
            });
        });
    })();
    placeholder($('.yicon>input'), '验证码');
    // 提交表单时验证
    $('.userdeal>span').click(function() {
        if ($('#userdeal').is(':checked')) {
            $('.userdeal>span').css('background-image', 'url(images/checkbox_false.png)');
            $('#userdeal').attr('checked', false);
        } else {
            $('.userdeal>span').css('background-image', 'url(images/checkbox_true.png)');
            $('#userdeal').attr('checked', 'checked');
        }
    });
    $('.userdeal>label').click(function() {
        if ($('#userdeal').is(':checked')) {
            $('.userdeal>span').css('background-image', 'url(images/checkbox_false.png)');
        } else {
            $('.userdeal>span').css('background-image', 'url(images/checkbox_true.png)');
        }
    });
    $('.register').submit(function() {
        // 会员名
        var username = $.trim($('#username').val());
        if (username == '') {
            alert('请填写**会员名**！');
            return false;
        }
        // 手机
        var phone = $.trim($('#phone').val());
        if (phone == '') {
            alert('请填写**手机号**！');
            return false;
        } else if (!(/^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/.test(phone))) {
            alert('请填写正确**手机号**！');
            return false;
        }
        // 邮箱
        var email = $.trim($('#email').val());;
        if (email == '') {
            alert('请填写**邮箱**！');
            return false;
        } else if (!(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email))) {
            alert('请填写正确**邮箱地址**！');
            return false;
        }
        // 密码
        var pwd = $.trim($('#pwd').val());
        var repwd = $.trim($('#repwd').val());
        if (pwd == '') {
            alert('请输入**密码**！');
            return false;
        } else if (pwd.length < 8) {
            alert('密码长度要大于8！');
            return false;
        } else if (pwd !== repwd) {
            alert('两次密码输入不相同');
            return false;
        }
        // 验证码
        var yzm = $.trim($('#yicon').val());
        var yyzm = $('.yicon>span>img').attr('alt');
        if ($('#yicon').val() == '验证码') {
            alert('请输入**验证码**!');
            return false;
        } else if (yzm.toLowerCase() !== yyzm) {
            alert('验证码输入错误！');
            return false;
        }
        // 用户协议
        if (!$('#userdeal').is(':checked')) {
            alert('请阅读并同意《用户协议》！');
            return false;
        }
    });
});