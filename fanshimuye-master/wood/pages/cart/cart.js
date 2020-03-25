// pages/cart/cart.js
import {
    msg,
    success
} from "../../utils/util";
import {
    delCart,
    cartList,
    editCart
} from "../../utils/api";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        delBtnWidth: 158,
        startX: '',
        account: '0.00',
        isAllcheck: false,
        isload: true,
        loading: false,
        page: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getList();
    },
    touchS: function(e) {
        //设置触摸起始点水平方向位置
        this.setData({
            startX: e.touches[0].clientX
        })
    },
    touchM: function(e) {
        //手指移动时水平方向位置
        var moveX = e.touches[0].clientX;
        //手指起始点位置与移动期间的差值
        var disX = this.data.startX - moveX;
        var delBtnWidth = this.data.delBtnWidth;
        var txtStyle = "";
        if (disX == 0 || disX < 0) { //如果移动距离小于等于0，文本层位置不变
            txtStyle = "0";
        } else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离
            txtStyle = disX;
            if (disX >= delBtnWidth) {
                //控制手指移动距离最大值为删除按钮的宽度
                txtStyle = delBtnWidth;
            }
        }
        //获取手指触摸的是哪一项
        var index = e.currentTarget.dataset.index;
        var list = this.data.list;
        list[index].right = '-' + txtStyle;
        this.setData({
            list: list
        })
    },
    touchE: function(e) {
        //手指移动结束后水平位置
        var endX = e.changedTouches[0].clientX;
        //触摸开始与结束，手指移动的距离
        var disX = this.data.startX - endX;
        var delBtnWidth = this.data.delBtnWidth;
        //如果距离小于删除按钮的1/2，不显示删除按钮
        var txtStyle = disX > delBtnWidth / 2 ? delBtnWidth : "0";
        //获取手指触摸的是哪一项
        var index = e.currentTarget.dataset.index;
        var list = this.data.list;
        list[index].right = '-' + txtStyle;
        list[index].width = txtStyle;
        this.setData({
            list: list
        })
    },
    //删除单个商品
    delItem: function(e) {
        let that = this;
        let index = e.currentTarget.dataset.index;
        let list = this.data.list;
        let id = e.currentTarget.id;
        wx.showModal({
            title: '删除提示',
            content: '是否确认删除',
            confirmColor: '#333',
            confirmText: '确认',
            success: function(res) {
                if (res.confirm) {
                    delCart({
                        method: 'delete',
                        data: {
                            cart_id: id
                        },
                        success: function() {
                            list.splice(index, 1);
                            that.setData({
                                list: list
                            });
                            that.calculate();
                            success("删除成功");
                        },
                        fail: function(res) {
                            if (res.msg) {
                                msg(res.msg);
                                return false
                            }
                            msg("删除失败,未知原因")
                        }
                    })
                }
            }
        });
    },
    //选择商品
    checkGoods: function(e) {
        let index = e.currentTarget.dataset.index;
        let list = this.data.list;
        let isCheck = list[index].isCheck;
        let str = 'list[' + index + '].isCheck';
        this.setData({
            [str]: !isCheck
        });
        this.calculate()
    },
    //选择全部商品
    checkAllGoods: function() {
        let isAllcheck = !this.data.isAllcheck;
        let list = this.data.list;
        list.forEach(e => {
            e.isCheck = isAllcheck;
        });
        this.setData({
            isAllcheck: isAllcheck,
            list: list
        });
        this.calculate();
    },
    //选择数量
    chooseNum: function(e) {
        let index = e.currentTarget.dataset.index;
        let type = e.currentTarget.dataset.type;
        let list = this.data.list;
        let num = list[index].num;
        let str = 'list[' + index + '].num';
        let that = this;
        let id = e.currentTarget.id;
        if (type == "release") {
            // -
            if (num == 1) {
                msg("已是最小数量");
            } else {
                num--;
            }
        } else {
            // +
            num++;
        }
        editCart({
            method: 'put',
            data: {
                cart_id: id,
                num: num
            },
            success: function() {
                that.setData({
                    [str]: num
                });
                that.calculate();
            },
            fail: function(res) {
                if (res.msg) {
                    msg(res.msg);
                    return false
                }
                msg("未知错误");
            }
        });
    },
    //阻止冒泡
    stop: function() {

    },
    //输入数量
    changeIpt: function(e) {
        var value = e.detail.value;
        let index = e.currentTarget.dataset.index;
        let str = 'list[' + index + '].num';
        let that = this;
        let id = e.currentTarget.id;
        editCart({
            method: 'put',
            data: {
                cart_id: id,
                num: parseInt(value) > 0 ? parseInt(value) : 1
            },
            success: function() {
                if (value < 1) {
                    that.setData({
                        [str]: 1
                    })
                } else {
                    that.setData({
                        [str]: parseInt(value)
                    })
                }
                that.calculate();
            },
            fail: function(res) {
                if (res.msg) {
                    msg(res.msg);
                    return false
                }
                msg("未知错误");
            }
        });
    },
    //删除多项
    delGoods: function() {
        let that = this;
        let list = this.data.list;
        let items = [];
        let ids = [];
        list.forEach((e, index) => {
            if (e.isCheck) {
                items.push(index);
                ids.push(e.id);
            }
        });
        if (items.length < 1) {
            msg("请先选择需要删除的商品");
            return false
        }
        ids = ids.toString();
        wx.showModal({
            title: '删除提示',
            content: '是否确认删除这' + items.length + '件商品',
            confirmText: '确认',
            confirmColor: '#333',
            success: function(res) {
                if (res.confirm) {
                    delCart({
                        method: 'delete',
                        data: {
                            cart_id: ids
                        },
                        success: function() {
                            items.sort(that.sortNumber);
                            // 删除数组元素
                            items.forEach(e => {
                                list.splice(e, 1);
                            });
                            that.setData({
                                list: list
                            });
                            that.calculate();
                            success("删除成功");
                        },
                        fail: function(res) {
                            if (res.msg) {
                                msg(res.msg);
                                return false
                            }
                            msg("删除失败,未知原因")
                        }
                    })
                }
            }
        });
    },
    sortNumber: function(a, b) {
        // 排序算法
        return b - a;
    },
    //结算
    confirmOrder: function() {
        let that = this;
        let list = this.data.list;
        let items = [];
        let ids = [];
        list.forEach((e, index) => {
            if (e.isCheck) {
                items.push(index);
                ids.push(e.id);
            }
        });
        if (items.length < 1) {
            msg("请先选择需要结算的商品");
            return false
        }
        ids = ids.toString();
        wx.navigateTo({
            url: '/pages/confirmOrder/confirmOrder?id=' + ids + '&type=1'
        });
    },
    //合计
    calculate: function() {
        let list = this.data.list;
        let len = list.length;
        let i = 0;
        let account = 0;
        let isAllcheck = this.data.isAllcheck;
        list.forEach(e => {
            if (e.isCheck) {
                i++;
                account += e.price * e.num;
            }
        });
        if (i == len && len > 0) {
            isAllcheck = true;
        } else {
            isAllcheck = false
        }
        this.setData({
            isAllcheck: isAllcheck,
            account: account.toFixed(2)
        })
    },
    //获取列表
    getList: function() {
        const that = this;
        var isload = this.data.isload;
        var page = that.data.page + 1;
        let size = 10;
        if (!isload) {
            return false;
        }
        that.setData({
            loading: true
        })
        cartList({
            data: {
                page: page,
                size: size
            },
            success: function(res) {
                if (res.code == 200) {
                    let arr = res.data;
                    let num = that.data.list.length;
                    if (arr.length == 0) {
                        that.setData({
                            isload: false,
                            loading: false
                        })
                        return false
                    }
                    if (arr.length < size) {
                        that.setData({
                            isload: false
                        });
                    }
                    arr.forEach((e, index) => {
                        e.right = 0;
                        e.width = 0;
                        let str = 'list[' + (index + num) + ']';
                        that.setData({
                            [str]: e
                        });
                    });
                    that.setData({
                        loading: false,
                        page: page
                    })
                } else {
                    msg(res.msg);
                }
            }
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
        this.setData({
            list: [],
            page: 0,
            isload: true,
            loading: false
        });
        this.getList();
        this.calculate();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        this.getList();
    }
})