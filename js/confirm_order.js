$(function() {
    $('.site_list>li').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
        var name = $(this).find('.name').html();
        var site = $(this).find('.site').html();
        var tel = $(this).find('.tel').html();
        $('.result_site>span').html(site);
        $('.user>span').html(name + tel);
        $('.bill .name').html(name);
    });
    // 收起地址
    $('.up_site').click(function() {
        var show = $('.site_list').css('display');
        $(this).text(show === 'none' ? '收起地址' : '查看地址');
        $('.site_list').slideToggle();
    });
    // 文本域提示
    placeholder($('.msg'), '选填：对本次交易的说明（建议直填写已和卖家协商一致的内容）')
});