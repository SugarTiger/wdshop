// 输入框默认提示
function placeholder(obj, val, isPwd) {
    obj.focus(function() {
        if ($(this).val() == val) {
            $(this).attr('value', '');
            if (isPwd) {
                $(this)[0].type = 'password';
            }
        }
    });
    obj.blur(function() {
        if ($(this).val() == '') {
            $(this).attr('value', val);
            if (isPwd) {
                $(this)[0].type = 'text';
            }
        }
    });
}
// 验证码
var yzm = [
    { src: 'images/yzm1.png', alt: 'bcsm' },
    { src: 'images/yzm2.png', alt: 'gfrf' },
    { src: 'images/yzm3.png', alt: 'qeyu' },
    { src: 'images/yzm4.png', alt: 'afea' }
];
$(function() {
    // 导航下拉
    // toggle() 方法在 jQuery 版本 1.8 中被废弃，在版本 1.9 中被移除。
    (function() {
        function menter() {
            $('.menu>h2>img').attr('src', 'images/arrows_icon2w.png');
        }

        function mleave() {
            $('.menu>h2>img').attr('src', 'images/arrows_icon2.png');
        }
        $('.menu').on('mouseleave', mleave);
        $('.menu').on('mouseenter', menter);
        $('.menu').click(function() {
            $('.submenu').slideToggle(350);
            var atclass = $('.menu>h2').attr('class');
            if (atclass) {
                $('.menu').on('mouseleave', mleave);
                $('.menu').on('mouseenter', menter);
                setTimeout(function() {
                    $('.menu>h2>img').attr('src', 'images/arrows_icon2.png');
                    $('.menu>h2').attr('class', '');
                }, 350);
            } else {
                $('.menu').off('mouseleave');
                $('.menu').off('mouseenter');
                $('.menu>h2>img').attr('src', 'images/arrows_icon.png');
                $('.menu>h2').attr('class', 'active');
            }
        });
    })();
    // 搜索框默认提示
    placeholder($('.search>input'), "电饭煲");
    // 侧边栏的高度
    (function() {
        var mainHeight = parseFloat($('.main').css('height'));
        if ((mainHeight + 70) < 401) {
            $('.sidebar').css('height', 401 + 'px');
        } else {
            $('.sidebar').css('height', mainHeight + 70 + 'px');
        }
    })();
});