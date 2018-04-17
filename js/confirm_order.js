$(function () {
    // 收起地址
    var mm = new Vue({
        el: '#middle',
        data: {
            orderNote: '',
            addressList: [],
            proList: [],
            orderProList: [],
            imgServer: imgServer,
            totalPrice:0,
            selectAddressId:'',
            isShowAddress:true,
            index:0
        },
        mounted: function () {
            var querty = GetRequest();
            if (!querty.orderPro) {
                location.href = "index.html";
                return;
            }
            var that = this;
            this.getAddressList();
            this.orderProList = JSON.parse(querty.orderPro)
            this.orderProList.forEach(function (item) {
                that.getProDetail(item.proId,item.qty);// 商品详情
            })
        },
        computed: {
            isCanSub: function () {
                if (this.selectAddressId !== '' && this.proList.length !== 0) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        methods: {
            selectTheAddress:function(addressId,index){
                this.selectAddressId = addressId
                this.index = index
            },
            toAddAddress:function(){
                location.href = "address.html?orderPro="+JSON.stringify(this.orderProList);
            },
            getAddressList: function () {
                var that = this;
                http.get('/getAddressList', null, function (res) {
                    that.addressList = res.data
                    that.addressList.forEach(function(item){
                        if(item.address_default){
                            that.selectAddressId = item.address_id
                            return;
                        }
                    })
                })
            },
            getProDetail: function (proId,qty) {
                var that = this;
                http.get('/public/getProDetail', {
                    proId: proId
                }, function (res) {
                    that.proList.push(res.data.items)
                    that.totalPrice  = (qty * res.data.items.goods_price)+that.totalPrice
                })
            },
            setDrfaultAddress:function(addressId,i){
                var that = this;
                http.post("/setDefault", {
                    addressId: addressId,
                    address_default: true
                }, function (res) {
                    that.addressList.forEach(function (item) {
                        item.address_default = false
                    })
                    that.addressList[i].address_default = true
                })
            },
            confirm: function () {
                console.log({
                    proList: this.orderProList,
                    addressId: this.selectAddressId, //地址Id
                    orderNote: this.orderNote, // 订单备注
                    postage: 0 //运费
                })
                var that = this;
                var timeOut;
                http.post('/confirmOrder', {
                    proList: this.orderProList,
                    addressId: this.selectAddressId, //地址Id
                    orderNote: this.orderNote, // 订单备注
                    postage: 0 //运费
                }, function (res) {
                    that.orderProList.map(function(item){
                        http.post('/delCartPro', {
                            proId: item.proId
                        },function(){
                            if(!!timeOut){
                                clearTimeout(timeOut);
                            }
                            timeOut = setTimeout(function(){
                                location.href = "pay.html?orderId="+ res.data.orderInfo.order_id
                                timeOut = null;
                            },100)
                        })
                    })
                })
            }
        }
    });
});