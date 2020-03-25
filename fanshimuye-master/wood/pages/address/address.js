// pages/address/address.js
import {
    msg,
    success
} from "../../utils/util";
import {
    addressList,
    delAddress,
    addAddress
} from "../../utils/api";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        isload: true,
        loading: false,
        page: 0,
        delBtnWidth: 158,
        startX: '',
        type: '',
        refreash: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options) {
            this.setData({
                type: options.type
            });
            this.getList();
        }
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
    //设置默认
    setDefault: function(e) {
        let index = e.currentTarget.dataset.index;
        let that = this;
        let list = this.data.list;
        let id = e.currentTarget.id;
        let data = {
            id: id,
            is_default: 1,
            name: list[index].name,
            phone: list[index].phone,
            province: list[index].province,
            city: list[index].city,
            area: list[index].area,
            address: list[index].address
        }
        addAddress({
            method: 'put',
            data: data,
            success: function(res) {
                success("设置成功");
                list.forEach((e, idx) => {
                    if (index != idx) {
                        e.is_default = false
                    } else {
                        e.is_default = true;
                    }
                });
                that.setData({
                    list: list
                })
            },
            fail: function() {
                msg("设置失败");
            }
        })
    },
    //删除地址
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
                    delAddress({
                        method: 'delete',
                        data: {
                            ids: id
                        },
                        success: function() {
                            list.splice(index, 1);
                            that.setData({
                                list: list
                            });
                            success("删除成功")
                        },
                        fail: function() {
                            msg("删除失败");
                        }
                    });
                }
            }
        })
    },
    pinkAddress: function(e) {
        let index = e.currentTarget.dataset.index
        let type = this.data.type
        if (type != 'pay') {
            return false
        }
        var pages = getCurrentPages();
        if (pages.length > 1) {
            //上一个页面实例对象
            var prePage = pages[pages.length - 2];
            let address = this.data.list[index];
            prePage.setData({
                address: address
            })
            wx.navigateBack({
                delta: 1
            });
        }
    },
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
        addressList({
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
        let refreash = this.data.refreash;
        if (refreash) {
            this.setData({
                list: [],
                isload: true,
                loading: false,
                page: 0,
                refreash: false
            });
            this.getList();
        }
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        this.getList();
    }
})