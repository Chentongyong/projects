// pages/memberLogin/memberLogin.js
import {
    msg,
    success
} from "../../utils/util";
import {
    login,
    getSms
} from "../../utils/api";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        codeTips: '获取验证码',
        phone: '',
        codeDisabled: false,
        disabled: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    text:function(e){
      this.setData({
        text:e.detail.value
      })
    },
    //输入手机号码
    bindphone: function(e) {
        this.setData({
            phone: e.detail.value
        })
    },
    //获取验证码
    getCode: function(e) {
        var phone = this.data.phone;
        var reg = /^1[3456789][0-9]{9}$/;
        var disabled = e.currentTarget.dataset.disabled;
        var that = this;
        if (disabled) {
            return false;
        }
        if (phone == '') {
            msg('请输入手机号码');
            return false
        }
        if (!reg.test(phone)) {
            msg("手机号码格式错误");
            return false
        }
        that.setData({
            codeDisabled: true
        });
        getSms({
            method: 'post',
            data: {
                phone: phone,
                type: 1
            },
            success: function() {
                msg("发送成功,请耐心等待短信");
                that.countDown();
            },
            fail: function(res) {
                that.setData({
                    codeDisabled: false
                });
                if (res.msg) {
                    msg(res.msg);
                    return false
                }
                msg("未知错误");
            }
        });
    },
    countDown: function() {
        var time = 60;
        var code = this.data.codeTips;
        let that = this;
        var interver = setInterval(function() {
            time--;
            code = time + 's后重新获取';
            if (time < 0) {
                clearInterval(interver);
                code = '获取验证码';
                that.setData({
                    codeDisabled: false
                })
            }
            that.setData({
                codeTips: code
            })
        }, 1000)
    },
    formSubmit: function(e) {
        var data = e.detail.value;
        var reg = /^1[3456789][0-9]{9}$/;
        var that = this;
        if (data.phone == '') {
            msg("请输入手机号码");
            return false
        }
        if (!reg.test(data.phone)) {
            msg("手机号码格式错误");
            return false
        }
        if (data.code == '') {
            msg("请输入验证码");
            return false
        }
        that.setData({
            disabled: true
        });
        login({
            method: 'post',
            data: {
                phone: data.phone,
                code: data.code
            },
            success: function() {
                success("登录成功");
                wx.setStorageSync('login', true);
                var pages = getCurrentPages();
                if (pages.length > 1) {
                    var prePage = pages[pages.length - 2];
                    prePage.setData({
                        status: 1
                    })
                }
                setTimeout(function() {
                    wx.switchTab({
                        url: '/pages/index/index'
                    });
                }, 500);
            },
            fail: function(res) {
                that.setData({
                    disabled: false
                });
                if (res.msg) {
                    msg(res.msg);
                    return false
                }
                msg("未知错误");
            }
        })

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    }
})