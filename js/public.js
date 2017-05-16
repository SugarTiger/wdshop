$(function() {
    // 导航下拉
    // toggle() 方法在 jQuery 版本 1.8 中被废弃，在版本 1.9 中被移除。
    (function() {
        $('.menu>h2').click(function() {
            $('.submenu').slideToggle();
            var atclass = $('.menu>h2').attr('class');
            $('.menu>h2>img').attr('src', atclass ? 'images/arrows_icon2.png' : 'images/arrows_icon.png');
            $('.menu>h2').attr('class', atclass ? '' : 'active')
        });
        $('.submenu').click(function() {
            $('.menu>h2').trigger("click");
        });
    })();
    // 搜索框默认提示
    (function() {
        $('.search>input').focus(function() {
            if ($(this).val() == "电饭煲") {
                $(this).attr('value', '');
            }
        });
        $('.search>input').blur(function() {
            if ($(this).val() == "") {
                $(this).attr('value', '电饭煲');
            }
        });
    })();
    // 侧边栏的高度
    (function() {
        var mainHeight = parseFloat($('.main').css('height'));
        $('.sidebar').css('height', mainHeight + 70 + 'px');
    })();
});