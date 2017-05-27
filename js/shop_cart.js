$(function() {
    // 从本地存储加载数据
    var proItems = getPro();
    for (key in proItems) {
        if (hasDom(proItems[key].storeName)) {
            $('.cart_main .' + proItems[key].storeCode + ' .item').prepend(Addlihtml(proItems[key], key));
        } else {
            $('.cart_main').prepend(Additemshtml(proItems[key], key));
        }
    }
    //点击改变商品数目并更改本地存储数据
    (function() {
        $('.add').click(function() {
            var i = parseInt($(this).prev().val());
            var li = $(this).parent().parent();
            var proId = li.find('input[type="hidden"]').val();
            var pricesolo = li.find('.price').html().slice(1);


            // 增加数量
            $(this).prev().attr('value', ++i);
            li.find('.subtotal>em').html((pricesolo * i).toFixed(2));
            li.find('.subtotal>span').html((getProAttr(proId, 'weight') * i).toFixed(1) + 'kg');
            resultPro();

            // 刷新本地存储和页头小标
            updateProinfo(proId, 'count', i);
            prosum();
        });
        $('.down').click(function() {
            var i = parseInt($(this).next().val());
            var li = $(this).parent().parent();
            var pricesolo = li.find('.price').html().slice(1);
            var proId = li.find('input[type="hidden"]').val();

            // 减少数量
            if (--i < 1) {
                $(this).next().attr('value', 1);
            } else {
                $(this).next().attr('value', i);
                li.find('.subtotal>em').html((pricesolo * i).toFixed(2));
                li.find('.subtotal>span').html((getProAttr(proId, 'weight') * i).toFixed(1) + 'kg');
                resultPro();
                // 刷新本地存储和页头小标
                updateProinfo(proId, 'count', i);
                prosum();
            }
        });
        // 点击复选框
        $('.checkbox').click(function() {
            var check = $(this).find('input');
            var parent = $(this).parent();
            if (check.is(':checked')) {
                $(this).find('span').css('background-image', 'url(images/checkbox_false2.png)');
                check.attr('checked', false);
                parent.removeClass('checked');
            } else {
                $(this).find('span').css('background-image', 'url(images/checkbox_true2.png)');
                check.attr('checked', true);
                parent.addClass('checked');
            }
            resultPro();
        });
        // 点击全选框
        $('.all_select').click(function() {
            var check = $(this).find('input');
            var parent = $(this).parent();
            console.log(parent);
            if (check.is(':checked')) {
                $(this).find('span').css('background-image', 'url(images/checkbox_false2.png)');
                check.attr('checked', false);
                if (parent.attr('class') == 'title' || parent.attr('class') == 'handler') {
                    $('.cart_main input[type="checkbox"]').attr('checked', false);
                    $('.cart_main input[type="checkbox"]').prev().css('background-image', 'url(images/checkbox_false2.png)');
                    $('.cart_main .item>li').removeClass('checked');
                } else {
                    parent.find('.item>li .checkbox>input').attr('checked', false);
                    parent.find('.item>li').removeClass('checked');
                }
            } else {
                $(this).find('span').css('background-image', 'url(images/checkbox_true2.png)');
                check.attr('checked', true);
                if (parent.attr('class') == 'title' || parent.attr('class') == 'handler') {
                    $('.cart_main input[type="checkbox"]').attr('checked', true);
                    $('.cart_main input[type="checkbox"]').prev().css('background-image', 'url(images/checkbox_true2.png)');
                    $('.cart_main .item>li').addClass('checked');
                } else {
                    parent.find('.item>li .checkbox>input').attr('checked', true);
                    parent.find('.item>li').addClass('checked');
                }
            }
            // resultPro();
        });
        // 删除键
        $('.del').click(function() {
            var li = $(this).parent().parent();
            if (li.siblings().length == 0) {
                li.parent().parent().remove();
            } else {
                li.remove();
            }
            // 从本地存储中删除数据
            delPro(li.find('input[type="hidden"]').val());
            resultPro();
        });
        //计算合计
        function resultPro() {
            var sum = 0;
            var num = 0;
            $('.cart_main .checked').each(function() {
                sum += parseFloat($(this).find('.subtotal>em').html());
                num += parseInt($(this).find('.count>input').val());
            });
            $('.allprice em').html(sum.toFixed(2));
            $('.sum .num em').html(num);
        }
        resultPro();
    })();
});
// 判断购物车是否存在商店了
function hasDom(domhtml) {
    var itemsArr = [];
    $('.cart_main>.items').each(function() {
        itemsArr.push($(this).find('.all_select>h3').text());
    });
    return (jQuery.inArray(domhtml, itemsArr) > -1);
}

// 添加一个商店类目
function Additemshtml(obj, proId) {
    var pricesum = (obj.proPrice.slice(1) * obj.count).toFixed(2);
    var weightsum = (obj.weight * obj.count).toFixed(1);
    var itemshtml = '<div class="items ' + obj.storeCode + '">\
   <div class="all_select">\
       <span class="allchecked"></span>\
       <input type="checkbox" name="userdeal" checked="checked" id="userdeal">\
       <h3>' + obj.storeName + '</h3>\
   </div>\
   <ul class="item">\
       <li class="' + (obj.isCheck ? 'checked' : '') + '">\
            <input type="hidden" value="' + proId + '">\
           <div class="checkbox">\
               <span></span>\
               <input type="checkbox"  checked="' + (obj.isCheck ? 'checked' : '') + '" >\
           </div>\
           <div class="info">\
               <a href="pro_details.html">\
                   <img src="' + obj.proImg + '" alt="">\
               </a>\
               <div>\
                   <a href="pro_details.html">' + obj.proName + '</a>\
                   <p><img src="images/7_icon.png" alt="">支持7天无理由退货</p>\
                   <p><img src="images/bao_icon.png" alt="">选廷保</p>\
               </div>\
               <span class="color">颜色分类：<span>黑色</span></span>\
           </div>\
           <span class="price">' + obj.proPrice + '</span>\
           <div class="count">\
               <button class="down">-</button>\
               <input type="text" value="' + obj.count + '">\
               <button class="add">+</button>\
           </div>\
           <div class="subtotal">\
               <em>' + pricesum + '</em>\
               <span>' + weightsum + 'kg</span>\
           </div>\
           <div class="handle">\
               <span class="del">删除</span>\
               <span class="to_mylove">移到我的收藏</span>\
               <span class="attention">加到我的关注</span>\
           </div>\
       </li>\
   </ul>\
  </div>';
    return itemshtml;
}
// 添加商店里的商品
function Addlihtml(obj, proId) {
    var pricesum = (obj.proPrice.slice(1) * obj.count).toFixed(2);
    var weightsum = (obj.weight * obj.count).toFixed(1);
    var lihtml = '<li class="' + (obj.isCheck ? 'checked' : '') + '">\
    <input type="hidden" value="' + proId + '">\
           <div class="checkbox">\
               <span></span>\
               <input type="checkbox"  checked="' + (obj.isCheck ? 'checked' : '') + '" >\
           </div>\
           <div class="info">\
               <a href="pro_details.html">\
                   <img src="' + obj.proImg + '" alt="">\
               </a>\
               <div>\
                   <a href="pro_details.html">' + obj.proName + '</a>\
                   <p><img src="images/7_icon.png" alt="">支持7天无理由退货</p>\
                   <p><img src="images/bao_icon.png" alt="">选廷保</p>\
               </div>\
               <span class="color">颜色分类：<span>黑色</span></span>\
           </div>\
           <span class="price">' + obj.proPrice + '</span>\
           <div class="count">\
               <button class="down">-</button>\
               <input  type="text" value="' + obj.count + '">\
               <button class="add">+</button>\
           </div>\
           <div class="subtotal">\
               <em>' + pricesum + '</em>\
               <span>' + weightsum + 'kg</span>\
           </div>\
           <div class="handle">\
               <span class="del">删除</span>\
               <span class="to_mylove">移到我的收藏</span>\
               <span class="attention">加到我的关注</span>\
           </div>\
       </li>';

    return lihtml;
}