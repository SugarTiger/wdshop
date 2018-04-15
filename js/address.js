$(function () {
    new Vue({
        el: '#middle',
        data: {
            addressList: [],
            address_receiver: '',
            address_area: '',
            address_details: '',
            address_phone: '',
            address_call_phone: '',
            address_email: '',
            editAddressId: undefined,
            addressIndex: undefined
        },
        computed: {
            isCanSub: function () {
                if (this.address_receiver !== '' && this.address_area !== '' && this.address_details !== '' && this.address_phone !== '' && (/^1[34578]\d{9}$/.test(this.address_phone))) {
                    return true;
                }
                return false;
            }
        },
        mounted: function (res) {
            this.getAddressList();
            (function () {
                // 添加地址时表单验证
                // 收件人
                $('#addruser').focus(function () {
                    $(this).parent().find('span').html('');
                });
                $('#addruser').blur(function () {
                    var value = $.trim($(this).val());
                    if (value == "") {
                        $(this).parent().find('span').html('输入不能为空！');
                    }
                });
                // 所在地区
                $('#area').focus(function () {
                    $(this).parent().find('span').html('');
                });
                $('#area').blur(function () {
                    var value = $.trim($(this).val());
                    if (value == "") {
                        $(this).parent().find('span').html('输入不能为空！');
                    }
                });
                // 详情地址
                $('#addr_details').focus(function () {
                    $(this).parent().find('span').html('');
                });
                $('#addr_details').blur(function () {
                    var value = $.trim($(this).val());
                    if (value == "") {
                        $(this).parent().find('span').html('输入不能为空！');
                    }
                });
                // 手机号码
                $('#phone').focus(function () {
                    $(this).parent().find('span').html('');
                });
                $('#phone').blur(function () {
                    var value = $.trim($(this).val());
                    if (value == "") {
                        $(this).parent().find('span').html('输入不能为空！');
                    } else if (!(/^1[34578]\d{9}$/.test(value))) {
                        $(this).parent().find('span').html('手机号码输入有误！');
                    }
                });
                // 邮箱
                $('#email').focus(function () {
                    $(this).parent().find('span').html('');
                });
                $('#email').blur(function () {
                    var value = $.trim($(this).val());
                    if (value == "") return;
                    if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value))) {
                        $(this).parent().find('span').html('邮箱地址输入有误！');
                    }
                });
            })()
        },
        methods: {
            getAddressList: function () {
                var that = this;
                http.get('/getAddressList', null, function (res) {
                    that.addressList = res.data;
                    var addressIndex = GetRequest().addressIndex
                    if (addressIndex !== undefined) {
                        that.addressIndex = addressIndex;
                        that.editAddressId = that.addressList[addressIndex].address_id
                        that.address_receiver = that.addressList[addressIndex].address_receiver;
                        that.address_area = that.addressList[addressIndex].address_area;
                        that.address_details = that.addressList[addressIndex].address_details;
                        that.address_phone = that.addressList[addressIndex].address_phone;
                        that.address_call_phone =that.addressList[addressIndex].address_call_phone;
                        that.address_email = that.addressList[addressIndex].address_email;
                    }
                })
            },
            removeAddress: function (addressId, i) {
                if (confirm('确定删除收货地址？')) {
                    http.post('/delAddress', {
                        addressId: addressId
                    }, function (res) {
                        that.addressList.splice(i, 1)
                    })
                }
            },
            editAddress: function (addressId, i) {
                this.address_receiver = this.addressList[i].address_receiver;
                this.address_area = this.addressList[i].address_area;
                this.address_details = this.addressList[i].address_details;
                this.address_phone = this.addressList[i].address_phone;
                this.address_call_phone = this.addressList[i].address_call_phone;
                this.address_email = this.addressList[i].address_email;
                location.href = "#add_addr"
                this.editAddressId = addressId
                this.addressIndex = i

            },
            setDefault: function (addressId, i) {
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
            saveAddress: function () {
                if (!this.isCanSub) {
                    return
                }
                var that = this;
                var addressObj = {
                    address_receiver: this.address_receiver,
                    address_area: this.address_area,
                    address_details: this.address_details,
                    address_phone: this.address_phone,
                    address_call_phone: this.address_call_phone,
                    address_email: this.address_email
                }
                if (this.editAddressId === undefined) {
                    http.post("/addAddress", addressObj, function (res) {
                        var orderPro = GetRequest().orderPro;
                        if (!!orderPro) {
                            location.href = "confirm_order.html?orderPro=" + orderPro
                        } else {
                            that.addressList.push(addressObj)
                            that.initAddress();
                            alert('收货地址添加成功')
                        }
                    })
                } else {
                    addressObj.address_id = this.editAddressId
                    http.post("/updateAddress", addressObj, function (res) {
                        that.addressList[that.addressIndex].address_receiver = addressObj.address_receiver
                        that.addressList[that.addressIndex].address_area = addressObj.address_area
                        that.addressList[that.addressIndex].address_details = addressObj.address_details
                        that.addressList[that.addressIndex].address_phone = addressObj.address_phone
                        that.addressList[that.addressIndex].address_call_phone = addressObj.address_call_phone
                        that.addressList[that.addressIndex].address_email = addressObj.address_email
                        that.initAddress();
                        alert('收货地址更新成功');
                        if(GetRequest().addressIndex!==undefined){history.back()}
                    })
                }
            },
            initAddress: function () {
                this.address_receiver = '';
                this.address_area = '';
                this.address_details = '';
                this.address_phone = '';
                this.address_call_phone = '';
                this.address_email = '';
            }
        }
    })
});