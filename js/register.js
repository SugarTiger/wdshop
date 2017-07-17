$(function() {
    // 点击验证码更换
    (function() {
        var i = 1;
        var yzmlen = yzm.length;
        $('.yicon>span').click(function() {
            if (i > yzmlen - 1) {
                i = 0;
            }
            $('.yimg').find('img').attr({ src: yzm[i].src, alt: yzm[i].alt });
            i++;
        });
    })();
    placeholder($('.yicon>input'), '验证码');
    // 复选框
    $('.userdeal>span,.userdeal>label').click(function(e) {
        var ischecked = $('#userdeal').is(':checked');
        $('.userdeal>span').css('background-image', ischecked ? 'url(images/checkbox_false.png)' : 'url(images/checkbox_true.png)');
        (e.target.tagName == 'SPAN') && $('#userdeal').attr('checked', !ischecked);
    });

    //注册验证
    // 会员名
    Check($("#username"), '会员名', function(obj) {
        var that = obj[0];
        var aw = obj.siblings('em');
        var val = obj.val();
        if (ishadval('username', val)) {
            aw.html('此会员名已存在').css({ "color": "#B90101", "display": "block" });
            that.checks = false;
            return false;
        }
        return true;
    });
    // 手机
    Check($("#phone"), '手机', function(obj) {
        var that = obj[0];
        var aw = obj.siblings('em');
        var val = obj.val();
        if (!(/(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/.test(val))) {
            aw.html('请填写正确的手机号').css({ "color": "#B90101", "display": "block" });
            that.checks = false;
            return false;
        }
        if (ishadval('phone', val)) {
            aw.html('此手机号已存在').css({ "color": "#B90101", "display": "block" });
            that.checks = false;
            return false;
        }
        return true;
    });
    // 邮箱
    Check($("#email"), '邮箱', function(obj) {
        var that = obj[0];
        var aw = obj.siblings('em');
        var val = obj.val();
        if (!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/i.test(val))) {
            aw.html('请填写正确的邮箱号').css({ "color": "#B90101", "display": "block" });
            that.checks = false;
            return false;
        }
        if (ishadval('email', val)) {
            aw.html('此邮箱号已存在').css({ "color": "#B90101", "display": "block" });
            that.checks = false;
            return false;
        }
        return true;
    });
    // 密码
    Check($("#pwd"), '密码', function(obj) {
        var that = obj[0];
        var aw = obj.siblings('em');
        var val = obj.val();
        if (val.length < 8) {
            aw.html('密码长度要大于8').css({ "color": "#B90101", "display": "block" });
            that.checks = false;
            return false;
        }
        return true;
    });
    //再次输入密码
    Check($("#repwd"), '密码', function(obj) {
        var that = obj[0];
        var aw = obj.siblings('em');
        var val = obj.val();
        if (val.length < 8) {
            aw.html('密码长度要大于8').css({ "color": "#B90101", "display": "block" });
            that.checks = false;
            return false;
        } else if (val !== $("#pwd").val()) {
            aw.html('两次输入的密码不相同').css({ "color": "#B90101", "display": "block" });
            that.checks = false;
            return false;
        }
        return true;
    });
    // 验证码
    Check($("#yicon"), '验证码', function(obj) {
        var that = obj[0];
        var aw = obj.siblings('em');
        var yyzm = $('.yimg>img').attr('alt');
        var val = obj.val();
        if (val.toLowerCase() !== yyzm) {
            aw.html('验证码输入错误').css({ "color": "#B90101", "display": "block" });
            that.checks = false;
            $('.yimg').trigger('click');
            return false;
        }
        return true;
    });
    // 提交
    $('.register').submit(function() {
        // 会员名
        if (!$("#username")[0].checks) {
            $("#username").focus();
            return false;
        }
        // 手机
        if (!$("#phone")[0].checks) {
            $("#phone").focus();
            return false;
        }
        // 邮箱
        if (!$("#email")[0].checks) {
            $("#email").focus();
            return false;
        }
        // 密码
        if (!$("#repwd")[0].checks) {
            $("#repwd").focus();
            return false;
        }
        // 确认密码
        if (!$("#repwd")[0].checks) {
            $("#repwd").focus();
            return false;
        }
        // 验证码
        if (!$("#yicon")[0].checks) {
            $("#yicon").focus();
            return false;
        }
        // 用户协议
        if (!$('#userdeal').is(':checked')) {
            alert('请阅读并同意《用户协议》！');
            return false;
        }
        // 保存在本地存储
        var obj = {
            username: $('#username').val(),
            phone: $('#phone').val(),
            email: $('#email').val(),
            pwd: md5($('#pwd').val()),
        }
        localStorage.setItem("wduserinfo", localStorage.getItem("wduserinfo") ? localStorage.getItem("wduserinfo") + "&" + JSON.stringify(obj) : JSON.stringify(obj));
        location.href = "login.html";
        return false;
    });
});

function Check(obj, target, func) {
    if (obj.length === 0) {
        console.error(obj.selector + '不存在');
        return false;
    } else if (typeof target !== 'string') {
        console.error('target 的类型必须为string');
        return false;
    }
    obj.focus(function() {
        var aw = $(this).siblings('em');
        aw.html("请输入" + target).css({ "color": "#666", "display": "block" });
    }).blur(function() {
        var aw = $(this).siblings('em');
        var val = $(this).val();
        if (val.indexOf(' ') > -1) {
            aw.html(target + '不能包含空格').css({ "color": "#B90101", "display": "block" });
            this.checks = false;
        } else if (val === "" || val === "验证码") {
            aw.html(target + '不能为空').css({ "color": "#B90101", "display": "block" });
            this.checks = false;
        } else if (func($(this))) {
            aw.html(target + '输入正确').css({ "color": "#8ac007", "display": "block" });
            this.checks = true;
        }
    });
}
//获取本地存储wduserinfo的某项数据
function getLocalArr() {
    var str = localStorage.getItem('wduserinfo');
    if (!str) {
        return;
    }
    var arr = str.split("&");
    var i, arr2 = [];
    for (i = 0; i < arr.length; i++) {
        arr2[i] = JSON.parse(arr[i]);
    }
    return arr2;
}

function ishadval(key, value) {
    var arr = getLocalArr();
    if (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][key]) {
                if (arr[i][key] == value) {
                    return true;
                }
            }
        }
    }

}