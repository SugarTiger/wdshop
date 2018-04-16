$(function() {
    // 从本地存储加载数据
    // var proItems = getPro();
    // for (key in proItems) {
    //     if (hasDom(proItems[key].storeName)) {
    //         $('.cart_main .' + proItems[key].storeCode + ' .item').prepend(Addlihtml(proItems[key], key));
    //     } else {
    //         $('.cart_main').prepend(Additemshtml(proItems[key], key));
    //     }
    // }
    $('.items').each(function() {
        if (!isAllChecked($(this))) {
            $(this).find('.all_select>span').removeClass('boxchecked');
            $(this).find('.all_select>input').attr('checked', false);
            $('.title .all_select>span,.handler .all_select>span').removeClass('boxchecked');
            $('.title .all_select>input,.handler .all_select>input').attr('checked', false);
        }
    });
    clearAllC();
    //一系列操作
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
    // 输入数量
    $('.count>input').on('input', function() {
        this.value = this.value.replace(/[^0-9]/g, "");
    }).blur(function() {
        if ($(this).val() === "") {
            $(this).val(1);
        }
        var i = parseInt($(this).val());
        var li = $(this).parent().parent();
        var proId = li.find('input[type="hidden"]').val();
        var pricesolo = li.find('.price').html().slice(1);
        // 操作
        li.find('.subtotal>em').html((pricesolo * i).toFixed(2));
        li.find('.subtotal>span').html((getProAttr(proId, 'weight') * i).toFixed(1) + 'kg');
        resultPro();
        // 刷新本地存储和页头小标
        updateProinfo(proId, 'count', i);
        prosum();
    });
    // 点击复选框
    $('.checkbox').click(function() {
        var check = $(this).find('input');
        var parent = $(this).parent();
        var gParent = parent.parent();
        var proId = $(this).parent().find('input[type="hidden"]').val();
        if (check.is(':checked')) {
            $(this).find('span').removeClass('boxchecked');
            check.attr('checked', false);
            parent.removeClass('checked');
        } else {
            $(this).find('span').addClass('boxchecked');
            check.attr('checked', true);
            parent.addClass('checked');
        }
        // 如果全选了，就父容器的全选按钮也全选
        if (isAllChecked(gParent)) {
            gParent.parent().find('.all_select>span').addClass('boxchecked');
            gParent.parent().find('.all_select>input').attr('checked', true);
        } else {
            gParent.parent().find('.all_select>span').removeClass('boxchecked');
            gParent.parent().find('.all_select>input').attr('checked', false);
        }
        if (isAllChecked($('.items'))) {
            $('.title .all_select>span,.handler .all_select>span').addClass('boxchecked');
            $('.title .all_select>input,.handler .all_select>input').attr('checked', true);
        } else {
            $('.title .all_select>span,.handler .all_select>span').removeClass('boxchecked');
            $('.title .all_select>input,.handler .all_select>input').attr('checked', false);
        }
        resultPro();
        updateProinfo(proId, 'isCheck', check.is(':checked'));
        $('.sum .num em').html($('.cart_main li.checked').length);
    });
    // 点击全选框
    $('.all_select').click(function() {
        var check = $(this).find('input');
        var parent = $(this).parent();
        if (check.is(':checked')) {
            $(this).find('span').removeClass('boxchecked');
            check.attr('checked', false);
            if (parent.attr('class') == 'title' || parent.attr('class') == 'handler') {
                $('.cart_main input[type="checkbox"]').attr('checked', false);
                $('.cart_main input[type="checkbox"]').prev().removeClass('boxchecked');
                $('.cart_main .item>li').removeClass('checked');
                $('.cart_main').find('input[type="hidden"]').each(function() {
                    updateProinfo($(this).val(), 'isCheck', false);
                });
            } else {
                parent.find('.item>li .checkbox>span').removeClass('boxchecked');
                parent.find('.item>li .checkbox>input').attr('checked', false);
                parent.find('.item>li').removeClass('checked');
                parent.find('input[type="hidden"]').each(function() {
                    updateProinfo($(this).val(), 'isCheck', false);
                });
            }
        } else {
            $(this).find('span').addClass('boxchecked');
            check.attr('checked', true);
            if (parent.attr('class') == 'title' || parent.attr('class') == 'handler') {
                $('.cart_main input[type="checkbox"]').attr('checked', true);
                $('.cart_main input[type="checkbox"]').prev().addClass('boxchecked');
                $('.cart_main .item>li').addClass('checked');
                $('.cart_main').find('input[type="hidden"]').each(function() {
                    updateProinfo($(this).val(), 'isCheck', true);
                });
            } else {
                parent.find('.item>li .checkbox>span').addClass('boxchecked');
                parent.find('.item>li .checkbox>input').attr('checked', true);
                parent.find('.item>li').addClass('checked');
                parent.find('input[type="hidden"]').each(function() {
                    updateProinfo($(this).val(), 'isCheck', true);
                });
            }
        }
        // 如果全选了，就父容器的全选按钮也全选
        if (isAllChecked($('.items'))) {
            $('.title .all_select>span,.handler .all_select>span').addClass('boxchecked');
            $('.title .all_select>input,.handler .all_select>input').attr('checked', true);
        } else {
            $('.title .all_select>span,.handler .all_select>span').removeClass('boxchecked');
            $('.title .all_select>input,.handler .all_select>input').attr('checked', false);
        }
        resultPro();
        $('.sum .num em').html($('.cart_main li.checked').length);
    });
    // 删除键
    $('.del').click(function() {
        var r = confirm('主人，你确定把我踢走吗？');
        if (r) {
            var li = $(this).parent().parent();
            var parent = li.parent();
            delFun(li);
            resultPro();
            prosum();
            if (isAllChecked(parent)) {
                parent.parent().find('.all_select>span').addClass('boxchecked');
                parent.parent().find('.all_select>input').attr('checked', true);
            }
            if (isAllChecked($('.items'))) {
                $('.title .all_select>span,.handler .all_select>span').addClass('boxchecked');
                $('.title .all_select>input,.handler .all_select>input').attr('checked', true);
            }
            $('.sum .num em').html($('.cart_main li.checked').length);
            clearAllC();
        }
    });
    // 批量删除
    $('.del_check').click(function() {
        if ($('.cart_main .checkbox .boxchecked').length !== 0) {
            var r = confirm('去人批量删除商品？');
            if (r) {
                $('.cart_main .item li').each(function() {
                    if ($(this).find('input[type="checkbox"]').is(':checked')) {
                        delFun($(this));
                    }
                });
                resultPro();
                $('.sum .num em').html(0);
                clearAllC();
            }
        }
    });
    resultPro();
    prosum();
    $('.sum .num em').html($('.cart_main li.checked').length);
});
// 如果本地存储无商品条目，则取消全选
function clearAllC() {
    var clen = $(".cart_main").find('input[type="checkbox"]').length;
    if (clen === 1) {
        $(".all_select>span").removeClass('boxchecked');
        $('.all_select>input').attr('checked', false);
    }
}
// 删除函数
function delFun(obj) {
    if (obj.siblings().length == 0) {
        obj.parent().parent().remove();
    } else {
        obj.remove();
    }
    // 从本地存储中删除数据
    delPro(obj.find('input[type="hidden"]').val());
}
//计算合计
function resultPro() {
    var sum = 0;
    var num = 0;
    $('.cart_main .checked').each(function() {
        sum += parseFloat($(this).find('.subtotal>em').html());
        num += parseInt($(this).find('.count>input').val());
    });
    $('.allprice em').html(sum.toFixed(2));
    // $('.sum .num em').html(num);
}
//判断一个集合里面发复选框是否都被选中了
function isAllChecked(parent) {
    var isAllChecked = true;
    var pcheckbox = parent.find('input[type="checkbox"]');
    if (pcheckbox.length !== 0) {
        pcheckbox.each(function() {
            if (!$(this).is(':checked')) {
                isAllChecked = false;
                return false;
            }
        });
    } else if (pcheckbox.length === 0) {
        return false;
    }
    return isAllChecked;
}


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
       <span class="boxchecked"></span>\
       <input type="checkbox"  checked="checked" >\
       <h3>' + obj.storeName + '</h3>\
   </div>\
   <ul class="item">\
       <li class="' + (obj.isCheck ? 'checked' : '') + '">\
            <input type="hidden" value="' + proId + '">\
           <div class="checkbox">\
               <span class="' + (obj.isCheck ? 'boxchecked' : '') + '"></span>\
               <input type="checkbox" ' + (obj.isCheck ? 'checked="checked"' : '') + '" >\
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
               <span class="' + (obj.isCheck ? 'boxchecked' : '') + '"></span>\
               <input type="checkbox"  ' + (obj.isCheck ? 'checked="checked"' : '') + '" >\
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