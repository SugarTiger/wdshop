$(function() {
    $('.del').click(function() {
        !confirm('确认删除订单吗？') || $(this).parent().parent().remove();
    });
});
new Vue({
    el:'#middle',
    data:{
        userInfo:{},
        orderList:[],
        imgServer: imgServer
    },
    mounted:function(){
        this.getOrderList();
        this.getUserInfo();
    },
    methods:{
        getOrderList:function(){
            var that = this;
            http.get('/getOrderList',null,function(res){
                that.orderList = res.data;
                that.orderList.reverse()
            })
        },
        getUserInfo:function(){
            var that = this;
            http.get('/getUserInfo',null,function(res){
                that.userInfo = res.data.userInfo
            })
        },
        updateOrder:function(orderId,newStatus){
            if(newStatus===0){
                if(!confirm('确认取消订单？')){
                    return;
                }
            }
            if(newStatus===4){
                if(!confirm('确认收到货物了吗？')){
                    return;
                }
            }
            var that = this;
            http.post('/updateOrder',{
                orderId:orderId,
                newStatus:newStatus,
            },function(res){
                alert('订单操作成功！')
                that.orderList[0].order_status = newStatus
            })
        }
    },
    filters:{
        orderStatus:function(val){
            switch(val){
                case 1:
                    return '待付款';
                case 2:
                    return '待发货';
                case 3:
                    return '待收货';
                case 4:
                    return '待评论';
                case 5:
                    return '已完成';
                case 0:
                    return '订单已取消';
            }
        },
        formTime:function(val){
            var t = new Date(val);
            return t.Format('yyyy-MM-dd hh:mm')
        }
    }
})