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
        prosum();
    });
    // 点击高级选项
    // $('.type>li').hover(function() {
    //     var i = $(this).index();
    //     $(this).css('background-image', 'url(images/arrows_icon9_2.png)');
    //     $(".type_list>ul").eq(i).show().siblings().css('display', 'none');
    //     $(".type_list").css('display', 'block').css('bottom', -$(".type_list").innerHeight() + 7 + 'px');
    // }, function() {
    //     $(this).css('background-image', 'url(images/arrows_icon9.png)');
    //     $(".type_list").css('display', 'none');
    // });
   	$("body").click(function(){
   		$('.type_list').hide();
   		$('.type>li').css('background-image', 'url(images/arrows_icon9.png)');
   	});
    $('.type>li').click(function(event) {
    	event.stopPropagation(); 
        var i = $(this).index();
        var data_i = $(".type_list").attr('data_i');
        var listdisplay = $(".type_list").css('display');
        $(this).css('background-image', 'url(images/arrows_icon9_2.png)');
        $(".type_list>ul").eq(i).show().siblings().css('display', 'none');
        var h = $(".type_list").innerHeight();
        if (i !== parseInt(data_i)) {
            $(".type_list").css('display', 'block').css('bottom', -h + 7 + 'px');
            $(this).siblings().css('background-image', 'url(images/arrows_icon9.png)');
        } else {
            $(".type_list").fadeToggle().css('bottom', -h + 7 + 'px');
            if (listdisplay !== 'block') {
                $(this).css('background-image', 'url(images/arrows_icon9_2.png)');
            } else {
                $(this).css('background-image', 'url(images/arrows_icon9.png)');
            }
        }
        $(".type_list").attr('data_i', i);
        $(".type_list>ul").eq(i).find('li').on('click', hclick).parent().siblings().find('>li').off('click', hclick);
    });
    $('#priceMin').on('input', function() {
        var temp =  this.value.replace(/[^0-9.]/g, '');
        if(temp.indexOf('.')===0||temp.indexOf(0)===0){
            this.value ='';
            return;
        }
        var len2 = temp.length;
        this.value = temp;
        var d = temp[len2-1];
        if(d === '.'){
            if(this.value.slice(0,len2-1).indexOf('.')!==-1){
                this.value = temp.slice(0,len2-1);
            }
        }
    });
    $('#priceMax').on('input', function() {
        var temp =  this.value.replace(/[^0-9.]/g, '');
        if(temp.indexOf('.')===0||temp.indexOf(0)===0){
            this.value ='';
            return;
        }
        var len2 = temp.length;
        this.value = temp;
        var d = temp[len2-1];
        if(d === '.'){
            if(this.value.slice(0,len2-1).indexOf('.')!==-1){
                this.value = temp.slice(0,len2-1);
            }
        }
    });
    // 确定验证
    $('#priceBtn').click(function(){
        var min =$('#priceMin').val(),
        max = $('#priceMax').val();
        if(min === '' || max===''){
            return;
        }
        if(parseFloat(min) > parseFloat(max)){
            alert('价格错误');
            return false;
        }
    });
});
// 改变bg高度的函数
function bgH(obj) {
    var parentH = obj.parent().innerHeight();
    obj.css('height', parentH - 38 + 'px');
}
// 高级选项
function hclick(obj) {
    $(".type_list").fadeOut();
    $('.type>li').css('background-image', 'url(images/arrows_icon9.png)');
}