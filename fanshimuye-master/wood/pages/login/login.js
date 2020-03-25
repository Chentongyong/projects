// pages/login/login.js
import {
    msg
} from "../../utils/util";
import {
    saveUserInfo
} from "../../utils/api";
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showAuth: true,
        type: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options.type != undefined) {
            this.setData({
                type: options.type
            })
        }
    },
    //关闭授权
    cancel: function() {
        wx.navigateBack();
    },
    //授权用户信息
    getUserInfo: function(e) {
        var that = this;
        if (e.detail.errMsg == "getUserInfo:ok") {
            saveUserInfo({
                method: 'post',
                data: {
                    iv: e.detail.iv,
                    encryptedData: e.detail.encryptedData
                },
                success: function() {
                    app.globalData.userInfo = e.detail.userInfo;
                    app.globalData.rawData = e.detail;
                    wx.navigateBack({
                      delta: 1,
                    })
                },
                fail: function() {
                    msg("保存失败");
                }
            });
        }
    }
})