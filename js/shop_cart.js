new Vue({
    el: '#middle',
    data: {
        cartList: [],
        imgServer: imgServer
    },
    methods: {
        getCart: function () {
            var that = this;
            http.get('/getCart', null, function (res) {
                if (res.data.cartProList.length > 0) {
                    res.data.cartProList.forEach(function (pro) {
                        pro.checked = false;
                    })
                }
                that.cartList = res.data.cartProList
            })
        },
        checkPro: function (i) {
            this.cartList[i].checked = !this.cartList[i].checked;
            console.log(this.cartList[i].checked)
        },
        allTocheck: function () {
            var len = this.cartList.length;
            if (len === 0) return false;
            for (var i = 0; i < len; i++) {
                this.cartList[i].checked = !this.allChecked
            }
        },
        addQty: function (i) {
            this.cartList[i].goods_quantity += 1;
        },
        downQty: function (i) {
            if(this.cartList[i].goods_quantity===1)return;
            this.cartList[i].goods_quantity -= 1;
        },
        removePro: function (i) {
            if(!confirm('确定删除商品吗？'))return;
        },
        removeAllPro:function(){
            if(this.checkedCount===0)return;
            if(!confirm('确定删除选择的商品吗？'))return;
        },
        toSubOrder: function () {
            if (this.checkedCount === 0) return;
            var orderPro = [];
            var len = this.cartList.length;
            for (var i = 0; i < len; i++) {
                if (this.cartList[i].checked) {
                    orderPro.push({
                        qty:this.cartList[i].goods_quantity,
                        proId:this.cartList[i].goods_id
                    })
                }
            }
            location.href = "confirm_order.html?orderPro="+JSON.stringify(orderPro)
        }
    },
    mounted: function () {
        this.getCart();
    },
    computed: {
        allChecked: function () {
            var len = this.cartList.length;
            if (len === 0) return false;
            for (var i = 0; i < len; i++) {
                if (!this.cartList[i].checked) {
                    return false;
                }
            }
            return true;
        },
        checkedCount: function () {
            var len = this.cartList.length;
            if (len === 0) return 0;
            var sum = 0;
            for (var i = 0; i < len; i++) {
                if (this.cartList[i].checked) {
                    sum += 1;
                }
            }
            return sum;
        },
        sum: function () {
            var len = this.cartList.length;
            if (len === 0) return 0;
            var sum = 0;
            for (var i = 0; i < len; i++) {
                if (this.cartList[i].checked) {
                    sum = sum + (this.cartList[i].goods_quantity * this.cartList[i].goods_price);
                }
            }
            return sum;
        }
    }
})