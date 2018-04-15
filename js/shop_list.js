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
new Vue({
    el:"#middle",
    data:{
        proList:[],
        hostList:[],
        temList:[],
        imgServer: window.imgServer
    },
    mounted:function(){
        this.getProList();
        this.getHosProList();
    },
    methods:{
        getProList:function(){
            var that = this;
            var query = GetRequest();
            if(query.type === '商品列表'||query.type === '爆款推荐'||!query.type) delete query.type;
            http.get('/public/getProList',{
                status:1,
                type:query.type,
                keyWord:query.keyword
            },function(res){
                that.proList = res.data.list;
                that.temList = res.data.list;
            })
        },
        getHosProList:function(){
            var that = this;
            http.get('/public/getProList',{
                status:1
            },function(res){
                that.hostList = (res.data.list.sort(function(a,b){
                    return b.goods_sales - a.goods_sales
                })).slice(0,4);
            })
        },
        toSubOrder:function(proId){
            if(!getToken()){
                alert('请先登录文的商城！');
                location.href="login.html"
                return;
            }
            var orderPro = [{qty:1,proId:proId}]
            var href="confirm_order.html?orderPro=" + JSON.stringify(orderPro)
            location.href = href
        },
        addshopcart:function(proId){
            if(!getToken()){
                alert('请先登录文的商城！');
                location.href="login.html"
                return;
            }
            console.log(proId);
            http.post('/updateCartPro',{
                qty:1,
                proId:proId,
                type:1
            },function(res){
                
            })
        },
        proSort:function(){
            this.proList=this.temList
            this.proList.sort(function(a,b){
                return a.goods_id - b.goods_id
            });
        },
        sortSale:function(){
            this.proList=this.temList
            this.proList.sort(function(a,b){
                return b.goods_sales - a.goods_sales
            });
        },
        sortpri:function(){
            this.proList=this.temList
            this.proList.sort(function(a,b){
                return b.goods_price - a.goods_price
            });
        }
    }
});