// pages/addAddress/addAddress.js
import {
    msg,
    success
} from "../../utils/util";
import {
    addAddress,
    addressDetail
} from "../../utils/api";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: '',
        detail: {
            name: '',
            phone: '',
            desc: '',
            area: ''
        },
        region: [],
        disabled: false,
        id: '',
        is_default: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        if (options.type == 'edit') {
            wx.setNavigationBarTitle({
                title: '编辑地址'
            });
            that.setData({
                type: options.type
            })
            addressDetail({
                data: {
                    id: options.id
                },
                success: function(res) {
                    that.setData({
                        detail: {
                            name: res.data.name,
                            phone: res.data.phone,
                            address: res.data.address,
                            province: res.data.province,
                            city: res.data.city,
                            area: res.data.area,
                        },
                        region: [res.data.province, res.data.city, res.data.area],
                        id: options.id,
                        is_default: res.data.is_default
                    });
                },
                fail: function() {
                    msg("获取地址详情失败")
                }
            });
        } else {
            wx.setNavigationBarTitle({
                title: '添加地址'
            });
        }
    },
    //选择区域
    bindRegionChange: function(e) {
        this.setData({
            region: e.detail.value
        })
    },
    //提交
    formSubmit: function(e) {
        let data = e.detail.value;
        let type = this.data.type;
        let method = 'post';
        let that = this;
        let reg = /^1[3456789][0-9]{9}$/;
        let id = this.data.id;
        if (data.name == '') {
            msg("请输入姓名");
            return false
        }
        if (data.phone == '') {
            msg("请输入手机号");
            return false
        }
        if (!reg.test(data.phone)) {
            msg("手机号码格式错误");
            return false
        }
        if (this.data.region.length < 1) {
            msg("请选择所在区域");
            return false
        }
        if (data.address == '') {
            msg("请输入详细地址");
            return false
        }
        that.setData({
            disabled: true
        });
        if (type == 'edit') {
            data.id = id;
            method = 'put'
        }
        data.province = this.data.region[0];
        data.city = this.data.region[1];
        data.area = this.data.region[2];
        data.is_default = this.data.is_default;
        addAddress({
            method: method,
            data: data,
            success: function(res) {
                msg("保存成功");
                var pages = getCurrentPages();
                if (pages.length > 1) {
                    //上一个页面实例对象
                    var prePage = pages[pages.length - 2];
                    prePage.setData({
                        refreash: true
                    })
                }
                setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 500);
            },
            fail: function() {
                msg("保存失败");
                that.setData({
                    disabled: false
                });
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})