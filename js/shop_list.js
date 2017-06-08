$(function() {
    // 改变bg高度的函数
    bgH($('.bg'));
    // li点击改变样式
    $('.sort>ul>li,.option>ul>li').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
    });
    // 加入购物车，添加到本地存储
    $('.addshopcart').click(function() {
        var i = Math.floor(Math.random() * 6);
        proInfoArr[i].count = 1;
        addtoLocals(new Proinfo(proInfoArr[i]));
        // prosum();
        console.log(prosum());
    });
});
// 改变bg高度的函数
function bgH(obj) {
    var parentH = obj.parent().innerHeight();
    obj.css('height', parentH - 38 + 'px');
}