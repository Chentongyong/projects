// pages/chat/chat.js
import {
    chat
} from "../../utils/api";
import {
    msg
} from "../../utils/util";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showCode: false,
        detail: {},
      showExecute:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    //打开二维码
    openCode: function() {
        var qrcode = this.data.detail.wx_customer_qrcode;
        if (!qrcode) {
            msg("暂无二维码,请稍后再试");
            return false
        }
        this.setData({
            showCode: true
        });
    },
    //关闭二维码
    closeCode: function() {
        this.setData({
            showCode: false
        });
    },
    //长按二维码
    preview: function() {
        var qrcode = this.data.detail.wx_customer_qrcode;
        wx.previewImage({
            current: qrcode,
            urls: [qrcode]
        })
    },
    //拨打电话
    call: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.detail.customer_tel
        })
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
        var that = this;
        let showExecute = wx.getStorageSync("showExecute")
        this.setData({
          showExecute
        })
        chat({
            success: function(res) {
                that.setData({
                    detail: res.data
                })
            }
        })
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