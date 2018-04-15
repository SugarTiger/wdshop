
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

new Vue({
    el:'#middle',
    data:{
        orderStatus:'',
        orderList:[],
        imgServer: imgServer,
        tempList:[],
        keyWords:''
    },
    mounted:function(){
        this.getOrderList();
    },
    methods:{
        getStatus:function(status){
            if(!status){
                this.orderStatus = '';
                this.orderList = this.tempList;
                return;
            }else{
                this.orderStatus = status
                this.orderList = this.tempList.filter(function(item){
                    return item.order_status == status
                })
            }
        },
        removeOrder:function(orderId,i){
            if(!confirm('确认删除订单？注意：此项不可恢复！'))return;
            var that = this;
            http.post('/delOrder',{
                orderId:orderId
            },function(res){
                if(res.status===1){
                    that.orderList.splice(i,1)
                }
            })
        },
        getOrderList:function(status){
            var that = this;
            http.get('/getOrderList',{
                type:status
            },function(res){
                that.orderList = res.data
                that.orderList.reverse()
                that.tempList = that.orderList
                console.log(that.tempList)
            })
        },
        updateOrder:function(orderId,newStatus,i){
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
                that.orderList[i].order_status = newStatus
            })
        },
        search:function(){
            var that = this;
            if(this.keyWords===''){
                this.orderList = this.tempList;
                return;
            }
            this.orderList = this.tempList.filter(function(item){
                var orderId = item.order_id.toString()
                if(orderId.indexOf(that.keyWords)!==-1){
                    return true;
                }else{
                    for(var i=0;i<item.proList.length;i++){
                        if(item.proList[i].goods_name.indexOf(that.keyWords)!==-1||item.proList[i].goods_type.indexOf(that.keyWords)!==-1){
                            return true
                        }
                    }
                    return false;
                }
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