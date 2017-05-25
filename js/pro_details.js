$(function() {
    var pro_main = $('.pro_main,.you_like');
    var com_main = $('.com_main');
    $('.shop_area li').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
        var htmltext = $(this).find('a').text();
        if (htmltext.indexOf('商品详情') > -1) {
            pro_main.css('display', 'block');
            com_main.css('display', 'none');
        } else if (htmltext.indexOf('累计评价') > -1) {
            pro_main.css('display', 'none');
            com_main.css('display', 'block');
        }
    });
});