// pages/classify/classify.js
import {
    msg
} from "../../utils/util";
const app = getApp();
import {
    getUserInfo,
    saveUserInfo,
    goodsCate
} from "../../utils/api";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        guide: [],
        current: 0,
        list: [],
        loading: true,
        isload: true,
        page: 0,
        login: false,
        cate_id: '',
        status: 1,
        isShow: false,
        showError: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getCate();
    },
    //切换一级分类
    chooseTab: function(e) {
        var index = e.currentTarget.dataset.index;
        var id = e.currentTarget.id;
        this.setData({
            current: index,
            list: [],
            page: 0,
            isload: true,
            cate_id: id
        });
        this.getList();
    },
    //获取一级分类
    getCate: function() {
        let that = this;
        goodsCate({
            success: function(res) {
                let arr = res.data;
                let num = that.data.guide.length;
                if (arr.length < 0) {
                    that.setData({
                        showError: true
                    })
                    return false
                }
                arr.forEach((e, index) => {
                    let str = 'guide[' + (index + num) + ']';
                    that.setData({
                        [str]: e
                    });
                });
                that.setData({
                    cate_id: arr[0].id,
                    isShow: true
                })
                that.getList();
            },
            fail: function() {
                msg("获取分类失败");
            }
        })
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
        });
        goodsCate({
            data: {
                page: page,
                size: size,
                pid: this.data.cate_id
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
        var that = this;
        //获取用户信息
        getUserInfo({
            success: function(res) {
                //1.判断是否注册过
                if (res.data.status == 0) {
                    that.setData({
                        status: res.data.status
                    });
                    wx.hideTabBar();
                    return false
                }
                //2.判断是否登录
                let isLogin = wx.getStorageSync('login');
                if (!isLogin) {
                    //未登录
                    that.setData({
                        status: 0
                    });
                    wx.hideTabBar();
                    return false
                }
                wx.showTabBar();
                if (!res.data.headimg) {
                    //判断是否已授权
                    if (app.globalData.userInfo != null) {
                        //后续进行保存用户信息等操作
                        that.setData({
                            login: true
                        });
                        //保存用户信息
                        saveUserInfo({
                            method: 'post',
                            data: {
                                iv: app.globalData.rawData.iv,
                                encryptedData: app.globalData.rawData.encryptedData
                            },
                            fail: function() {
                                //如果失败
                                that.setData({
                                    login: false
                                })
                            }
                        })
                    }
                } else {
                    that.setData({
                        login: true
                    })
                }
            },
            fail: function(res) {

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
        this.getList();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})