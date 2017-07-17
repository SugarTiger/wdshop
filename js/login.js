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
    placeholder($('.loginname>input'), '手机号/邮箱');
    placeholder($('.pwd>input'), '密码', true);
    placeholder($('.yicon>input'), '验证码');
    // 验证
    Check($("#loginname"), '登录名', function(obj) {
        var that = obj[0];
        var aw = obj.siblings('em');
        var val = obj.val();
        if (!(ishadval('phone', val) || ishadval('email', val))) {
            aw.html('此登录名不存在').css({ "color": "#B90101", "display": "block" });
            that.checks = false;
            return false;
        }
        return true;
    });
    Check($("#pwd"), '密码', function(obj) {
        return true;
    });
    Check($("#yicon"), '验证码', function(obj) {
        var that = obj[0];
        var aw = obj.siblings('em');
        var yyzm = $.trim($('.yimg>img').attr('alt'));
        var val = obj.val();
        if (val.toLowerCase() !== yyzm) {
            aw.html('验证码输入错误').css({ "color": "#B90101", "display": "block" });
            that.checks = false;
            $('.yimg').trigger('click');
            return false;
        }
        return true;
    });
    // 提交表单时验证
    $('.login').submit(function() {
        // 登录名
        if (!$("#loginname")[0].checks) {
            $("#loginname").focus();
            return false;
        }
        // 密码
        if (!$("#pwd")[0].checks) {
            $("#pwd").focus();
            return false;
        }
        var loginname = $('#loginname').val();
        var pwd = md5($("#pwd").val());
        var arr = getLocalArr();
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].phone == loginname || arr[i].email == loginname) {
                var obj = arr[i];
                break;
            }
        }
        if (obj.pwd !== pwd) {
            $('.pwd>em').html('密码或登录名错误').css({ "color": "#B90101", "display": "block" });
            return false;
        }
        // 验证码
        if (!$("#yicon")[0].checks) {
            $("#yicon").focus();
            return false;
        }
        location.href = "user.html";
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
        } else if (val === "手机号/邮箱" || val === "密码" || val === "验证码") {
            aw.html(target + '不能为空').css({ "color": "#B90101", "display": "block" });
            this.checks = false;
        } else if (func($(this))) {
            aw.css({ "color": "#B90101", "display": "none" });
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