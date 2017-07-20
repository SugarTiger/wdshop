// 点击商品跳转
$('.you_lisk>ul li').click(function() {
        var ahref = $(this).find('a').attr('href');
        window.location = ahref;
    });
// 输入框默认提示
function placeholder(obj, val, isPwd) {
    obj.focus(function() {
        if ($(this).val() == val) {
            $(this).attr('value', '');
            if (isPwd) {
                $(this)[0].type = 'password';
            }
        }
    });
    obj.blur(function() {
        if ($(this).val() == '') {
            $(this).attr('value', val);
            if (isPwd) {
                $(this)[0].type = 'text';
            }
        }
    });
}
// 验证码
var yzm = [
    { src: 'images/yzm1.png', alt: 'bcsm' },
    { src: 'images/yzm2.png', alt: 'gfrf' },
    { src: 'images/yzm3.png', alt: 'qeyu' },
    { src: 'images/yzm4.png', alt: 'afea' }
];
$(function() {
    // 导航下拉
    // toggle() 方法在 jQuery 版本 1.8 中被废弃，在版本 1.9 中被移除。
    (function() {
        function menter() {
            $('.menu>h2>img').attr('src', 'images/arrows_icon2w.png');
        }

        function mleave() {
            $('.menu>h2>img').attr('src', 'images/arrows_icon2.png');
        }
        $('.menu').on('mouseleave', mleave);
        $('.menu').on('mouseenter', menter);
        $('.menu').click(function() {
            $('.submenu').slideToggle(350);
            var atclass = $('.menu>h2').attr('class');
            if (atclass) {
                $('.menu').on('mouseleave', mleave);
                $('.menu').on('mouseenter', menter);
                setTimeout(function() {
                    $('.menu>h2>img').attr('src', 'images/arrows_icon2.png');
                    $('.menu>h2').attr('class', '');
                }, 350);
            } else {
                $('.menu').off('mouseleave');
                $('.menu').off('mouseenter');
                $('.menu>h2>img').attr('src', 'images/arrows_icon.png');
                $('.menu>h2').attr('class', 'active');
            }
        });
    })();
    // 搜索框默认提示
    placeholder($('.search>input'), "电饭煲");
    // 侧边栏的高度
    (function() {
        var mainHeight = parseFloat($('.main').css('height'));
        if ((mainHeight + 70) < 401) {
            $('.sidebar').css('height', 401 + 'px');
        } else {
            $('.sidebar').css('height', mainHeight + 70 + 'px');
        }
    })();
});
// 对本地存储的操作函数
// // 组合数据
function Proinfo(obj) {
    this[obj.proId] = {};
    this[obj.proId].storeName = obj.storeName;
    this[obj.proId].storeCode = obj.storeCode;
    this[obj.proId].isCheck = obj.isCheck;
    this[obj.proId].proName = obj.proName;
    this[obj.proId].proImg = obj.proImg;
    this[obj.proId].proColor = obj.proColor;
    this[obj.proId].proPrice = obj.proPrice;
    this[obj.proId].count = obj.count;
    this[obj.proId].weight = obj.weight;
}
Proinfo.prototype.getProId = function() {
    for (id in this) {
        return id;
    }
}
Proinfo.prototype.getProInfo = function(key) {
    var id = this.getProId();
    return this[id][key];
}
Proinfo.prototype.setProInfo = function(key, newval) {
    var id = this.getProId();
    this[id][key] = newval;
};
// 加入购物车，加入本地存储
function addtoLocals(obj) {
    var proItems = getPro();
    if (proItems == null) {
        localStorage.setItem('shopCart', JSON.stringify(obj));
        return false;
    }
    // 商品id，用来区分商品
    var proId = obj.getProId();
    for (key in proItems) {
        if (proId == key) {
            // 商品的数量
            var count = obj.getProInfo('count');
            obj.setProInfo('count', proItems[key].count + count);
            break;
        }
    }
    proItems[proId] = obj[proId];
    localStorage.setItem('shopCart', JSON.stringify(proItems));
}
// 更新本地存储信息
function updateProinfo(proid, attr, val) {
    var proItems = getPro();
    for (key in proItems) {
        if (proid == key) {
            proItems[key][attr] = val;
            localStorage.setItem('shopCart', JSON.stringify(proItems));
            break;
        }
    }
}
// 获取shopCart的本地存储
function getPro() {
    return JSON.parse(localStorage.getItem('shopCart'));
}
// 获得某个商品的所有信息
// function getProall(proid) {
//     var proItems = getPro();
//     for (key in proItems) {
//         if (proid == key) {
//             return proItems[key];
//         }
//     }
// }
// 获取购物车商品的总数量
function prosum() {
    var proItems = getPro();
    if(proItems === null){
        return 0;
    }
    var sum = Object.keys(proItems).length;
    // for (key in proItems) {
    //     sum += proItems[key].count;
    // }
    $('#header .shop>li>sup').html(sum);
    return sum;
}
//获得某个商品的某个属性
function getProAttr(proid, attr) {
    var proItems = getPro();
    for (key in proItems) {
        if (proid == key) {
            return proItems[key][attr];
        }
    }
}
// 删除shopCart本地存储的某条数据
function delPro(proid) {
    var proItems = getPro();
    for (key in proItems) {
        if (proid == key) {
            delete proItems[key];
            localStorage.setItem('shopCart', JSON.stringify(proItems));
            return;
        }
    }
}
$(function() {
    // 初始化页面头的购物车数
    prosum();
});
// 模拟商品的数据
var proInfoArr = [{
        proId: 'pro01',
        storeName: '美的旗舰店',
        storeCode: 'md',
        isCheck: true,
        proName: '苏泊尔（SUPOR）电饭煲 电饭锅 4L容量全景视窗 一键柴火饭',
        proImg: 'images/prow1.png',
        proColor: '黑色',
        proPrice: '￥299.00',
        weight: 5.3
    },
    {
        proId: 'pro02',
        storeName: '美的旗舰店',
        storeCode: 'md',
        isCheck: true,
        proName: '苏泊尔（SUPOR）电饭煲 电饭锅 4L容量全景视窗 一键柴火饭',
        proImg: 'images/pro5.png',
        proColor: '黑色',
        proPrice: '￥299.00',
        weight: 5.3
    },
    {
        proId: 'pro03',
        storeName: '苏珀尔旗舰店',
        storeCode: 'sber',
        isCheck: true,
        proName: '苏泊尔（SUPOR）电饭煲 电饭锅 4L容量全景视窗 一键柴火饭',
        proImg: 'images/pro6.png',
        proColor: '黑色',
        proPrice: '￥299.00',
        weight: 5.3
    },
    {
        proId: 'pro04',
        storeName: '苏珀尔旗舰店',
        storeCode: 'sber',
        isCheck: true,
        proName: '苏泊尔（SUPOR）电饭煲 电饭锅 4L容量全景视窗 一键柴火饭',
        proImg: 'images/pro7.png',
        proColor: '黑色',
        proPrice: '￥299.00',
        weight: 5.3
    },
    {
        proId: 'pro05',
        storeName: '美的旗舰店',
        storeCode: 'md',
        isCheck: true,
        proName: '苏泊尔（SUPOR）电饭煲 电饭锅 4L容量全景视窗 一键柴火饭',
        proImg: 'images/pro8.png',
        proColor: '黑色',
        proPrice: '￥299.00',
        weight: 5.3
    },
    {
        proId: 'pro06',
        storeName: '苏珀尔旗舰店',
        storeCode: 'sber',
        isCheck: true,
        proName: '苏泊尔（SUPOR）电饭煲 电饭锅 4L容量全景视窗 一键柴火饭',
        proImg: 'images/prow1.png',
        proColor: '黑色',
        proPrice: '￥299.00',
        weight: 5.3
    }
];