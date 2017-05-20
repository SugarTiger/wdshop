$(function() {
    // 评分
    function setgrade(obj, type, seleobj, inputname) {
        obj[type](function() {
            var x = $(this).index();
            if (type == 'click') {
                seleobj.off('mouseenter');
                seleobj.off('mouseleave');
                $("input[name=" + inputname + "]").attr('value', x + 1);
            }
            seleobj.each(function(index) {
                if (index > x) {
                    $(this).css('background-image', 'url(images/kx_icon.png)');
                } else {
                    $(this).css('background-image', 'url(images/hx_icon.png)');
                }
            });
        });
    }
    $('.describe>ul>li').each(function() {
        setgrade($(this), 'mouseenter', $('.describe>ul>li'));
        setgrade($(this), 'click', $('.describe>ul>li'), 'describe');
        $('.describe>ul>li').mouseleave(function() {
            $('.describe>ul>li').css('background-image', 'url(images/kx_icon.png)');
        });
    });
    $('.mer_serve>ul>li').each(function() {
        setgrade($(this), 'mouseenter', $('.mer_serve>ul>li'));
        setgrade($(this), 'click', $('.mer_serve>ul>li'), 'mer_serve');
        $('.mer_serve>ul>li').mouseleave(function() {
            $('.mer_serve>ul>li').css('background-image', 'url(images/kx_icon.png)');
        });
    });
    $('.log_serve>ul>li').each(function() {
        setgrade($(this), 'mouseenter', $('.log_serve>ul>li'));
        setgrade($(this), 'click', $('.log_serve>ul>li'), 'log_serve');
        $('.log_serve>ul>li').mouseleave(function() {
            $('.log_serve>ul>li').css('background-image', 'url(images/kx_icon.png)');
        });
    });
    // 提交表单验证
    $('.edit_com>form').submit(function(e) {
        if ($("input[name='describe']").attr('value') == 0 || $("input[name='mer_serve']").attr('value') == 0 || $("input[name='log_serve']").attr('value') == 0) {
            alert('评分不能有0分哦！');
            return false;
        }
        var strlen = $('.com_txt>textarea').val().length;
        if (strlen < 10) {
            alert('详细说明至少10个字哦！');
            return false;
        } else if (strlen > 500) {
            alert('详细说明不能超过500个字哦！');
            return false;
        }
    });
});