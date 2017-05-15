$(function() {
    // 导航下拉
    // toggle() 方法在 jQuery 版本 1.8 中被废弃，在版本 1.9 中被移除。
    $('.menu>h2').click(function() {
        $('.submenu').slideToggle("slow", "swing");
    });
    $('.submenu').click(function() {
        $('.menu>h2').trigger("click");
    });
});