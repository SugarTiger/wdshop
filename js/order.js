$(function() {
    placeholder($('.order_search>input'), '商品名称/订单号/商品编码');
    // 删除
    $('.del').click(function() {
        var r = confirm("确定删除订单吗？");
        if (r === true) {
            $(this).parent().parent().remove();
        }
        isAllC();
    });
    // 选择
    $('.checkbox').click(function() {
        checkbox($(this));
        isAllC();
    });
    // 全选
    $('.all_select').click(function() {
        checkbox($('.all_select'));
        var checkb = $(this).find('input');
        $('.checkbox>span').attr('class', $(this).find('input').is(':checked') ? 'boxchecked' : '');
        $('.checkbox>input').attr('checked', $(this).find('input').is(':checked'));
    });
    // 选择删除
    $('.select_del').click(function() {
        var r = confirm("确定删除选择的订单吗？");
        if (r && $('.order_list .checkbox>span[class="boxchecked"]').length > 0) {
            $('.order_list>li').each(function() {
                if ($(this).find('.checkbox>input').is(':checked')) {
                    $(this).remove();
                }
            });
            isAllC();
        }
    });
});

function checkbox(obj) {
    var checkbox = obj.find('input');
    var span = obj.find('span');
    checkbox.attr('checked', !checkbox.is(':checked'));
    span.attr('class', checkbox.is(':checked') ? 'boxchecked' : '');
}

function isAllC() {
    var isAllc = true;
    $('.order_list .checkbox>input').each(function() {
        if (!$(this).is(':checked')) {
            isAllc = false;
            return false;
        }
    });
    $('.all_select>input').attr('checked', isAllc);
    $('.all_select>span').attr('class', isAllc ? 'boxchecked' : '');
}