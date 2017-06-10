$(function() {
    $('.del').click(function() {
        !confirm('确认删除订单吗？') || $(this).parent().parent().remove();
    });
});