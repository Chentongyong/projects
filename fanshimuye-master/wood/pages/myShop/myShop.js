// pages/myShop/myShop.js
import {
    getUserInfo,
} from "../../utils/api";
Page({

    /**
     * 页面的初始数据
     */
    data: {
      data:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var that = this;
        //获取用户信息
        getUserInfo({
            success: function (res) {
              that.setData({
                data: res.data
              })
                if (!res.data.headimg) {
                    //判断是否已授权
                    if (app.globalData.userInfo != null) {
                        //后续进行保存用户信息等操作
                        that.setData({
                            login: true,
                            member: {
                                headimg: app.globalData.userInfo.avatarUrl,
                                nickname: app.globalData.userInfo.nickName
                            }
                        });
                        //保存用户信息
                        saveUserInfo({
                            method: 'post',
                            data: {
                                iv: app.globalData.rawData.iv,
                                encryptedData: app.globalData.rawData.encryptedData
                            },
                            fail: function () {
                                //如果失败
                                that.setData({
                                    login: false
                                })
                            }
                        })
                    } else {
                        that.setData({
                            login: false
                        });
                    }
                } else {
                    //如果已授权
                    that.setData({
                        login: true,
                        member: res.data,
                        hasMsg: res.data.msg_remind
                    });
                }
            },
            fail: function (res) {

            }
        });
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})