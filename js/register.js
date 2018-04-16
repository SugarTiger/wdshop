$(function() {
    var ym = getYM();
    $('.yimg>img').attr('src',ym.url).attr('alt',ym.alt);
    // 点击验证码更换
    $('.yicon>span').click(function() {
        var ym = getYM();
        $('.yimg>img').attr('src',ym.url).attr('alt',ym.alt);
    });
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
        // if (ishadval('username', val)) {
        //     aw.html('此会员名已存在').css({ "color": "#B90101", "display": "block" });
        //     that.checks = false;
        //     return false;
        // }
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
        // if (ishadval('phone', val)) {
        //     aw.html('此手机号已存在').css({ "color": "#B90101", "display": "block" });
        //     that.checks = false;
        //     return false;
        // }
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
        // if (ishadval('email', val)) {
        //     aw.html('此邮箱号已存在').css({ "color": "#B90101", "display": "block" });
        //     that.checks = false;
        //     return false;
        // }
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
    // 支付密码
    Check($("#paywd"), '支付密码', function(obj) {
        var that = obj[0];
        var aw = obj.siblings('em');
        var val = obj.val();
        if (val.length !== 6) {
            aw.html('支付密码必须为6位').css({ "color": "#B90101", "display": "block" });
            that.checks = false;
            return false;
        }else if(!Number(val)){
            aw.html('支付密码必须数字').css({ "color": "#B90101", "display": "block" });
            that.checks = false;
            return false;
        }
        return true;
    });
    // 在此输入支付密码
    Check($("#repaywd"), '支付密码', function(obj) {
        var that = obj[0];
        var aw = obj.siblings('em');
        var val = obj.val();
        if (val !== $("#paywd").val()) {
            aw.html('两次输入的支付密码不相同').css({ "color": "#B90101", "display": "block" });
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
        if (val.toLowerCase() !== yyzm.toLowerCase()) {
            aw.html('验证码输入错误').css({ "color": "#B90101", "display": "block" });
            that.checks = false;
            $('.yimg').trigger('click');
            return false;
        }
        return true;
    });
    // 提交
    $('#register').click(function() {
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
        // 支付密码
        if (!$("#paywd")[0].checks) {
            $("#paywd").focus();
            return false;
        }
        // 确认支付密码
        if (!$("#repaywd")[0].checks) {
            $("#repaywd").focus();
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
        // post到后台
        http.post('/userReg',{
            phone:$('#phone').val(),
            userName:$('#username').val(),
            email:$('#email').val(),
            pwd:md5($('#pwd').val()),
            payPwd:md5($('#paywd').val())
        },function(res){
            if(res.status!==1){
                alert(res.msg);
                return;
            }
            alert('注册成功,正在登录。。。');
            setToken(res.data.token)
            location.href = 'user.html';
        });
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