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
        },
        allTocheck: function () {
            var isAllCheck = false;
            var len = this.cartList.length;
            if (len === 0) return false;
            for (var i = 0; i < len; i++) {
                if (!this.cartList[i].checked) {
                    isAllCheck = true;
                    break;
                }
            }
            for (var i = 0; i < len; i++) {
                this.cartList[i].checked = isAllCheck
            }
        },
        addQty: function (i) {
            this.cartList[i].goods_quantity += 1;
            // 添加数量
            http.post('/updateCartPro', {
                qty: 1,
                proId: this.cartList[i].goods_id,
                type: 1
            })
        },
        downQty: function (i) {
            if (this.cartList[i].goods_quantity === 1) return;
            this.cartList[i].goods_quantity -= 1;
            // 添加数量
            http.post('/updateCartPro', {
                qty: 1,
                proId: this.cartList[i].goods_id,
                type: 0
            })
        },
        inputEven: function (i) {
            var pqt = $('#proQty' + i);
            var newQty = pqt.val();
            if (!/^[0-9]*$/.test(newQty) || newQty === '' || newQty === 0) { //检验是否是数字
                return pqt.val(this.cartList[i].goods_quantity)
            }
        },
        changeQty: function (i) {
            var pqt = $('#proQty' + i);
            var newQty = pqt.val();
            var result = Number(newQty) - this.cartList[i].goods_quantity;
            if (result > 0) {
                http.post('/updateCartPro', {
                    qty: Math.abs(result),
                    proId: this.cartList[i].goods_id,
                    type: 1
                })
            } else if (result < 0) {
                http.post('/updateCartPro', {
                    qty: Math.abs(result),
                    proId: this.cartList[i].goods_id,
                    type: 0
                })
            }
            this.cartList[i].goods_quantity = newQty;
        },
        removePro: function (i) {
            if (!confirm('确定删除商品吗？')) return;
            this.removeProHttp(this.cartList[i].goods_id)
            this.cartList.splice(i,1)
        },
        removeAllPro: function () {
            if (this.checkedCount === 0) return;
            if (!confirm('确定删除选择的商品吗？')) return;
            for(var i=0;i<this.cartList.length;i++){
                if(this.cartList[i].checked){
                    this.removeProHttp(this.cartList[i].goods_id)
                    this.cartList.splice(i,1)
                    i--;
                }
            }
        },
        removeProHttp: function (proId) {
            http.post('/delCartPro', {
                proId: proId
            })
        },
        toSubOrder: function () {
            if (this.checkedCount === 0) return;
            var orderPro = [];
            var len = this.cartList.length;
            for (var i = 0; i < len; i++) {
                if (this.cartList[i].checked) {
                    orderPro.push({
                        qty: this.cartList[i].goods_quantity,
                        proId: this.cartList[i].goods_id
                    })
                }
            }
            location.href = "confirm_order.html?orderPro=" + JSON.stringify(orderPro)
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