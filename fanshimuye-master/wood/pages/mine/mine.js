// pages/mine/mine.js
import {
  msg
} from "../../utils/util";
const app = getApp();
import {
  getUserInfo,
  saveUserInfo,
  orderSum
} from "../../utils/api";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    member: {},
    hasMsg: false,
    showExecute: true,
    noLogin: false,
    sumData: {
      "pending_count": 0,
      "delivered_count": 0,
      "refund_count": 0
    },
    shopState: ''
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    orderSum({ //获取状态代发货、代付款、退换售后添加提醒信息
      success: function(res) {
        if (res.code == 200) {
          that.setData({
            sumData: res.data
          })
        }
      }
    })
    getUserInfo({
      success: function(res) {
        if (res.data.nickname == null) {
          that.setData({
            noLogin: true
          })
        } else {
          that.setData({
            noLogin: false
          })
        }
      }
    })
    let showExecute = wx.getStorageSync("showExecute")
    this.setData({
      showExecute
    })
    //获取用户信息
    getUserInfo({
      success: function(res) {
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
              fail: function() {
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
      fail: function(res) {

      }
    });
    saveUserInfo({//获取小店状态
      success: (res) => {
        // console.log(res.data.store_status)
        this.setData({
          shopState: res.data.store_status
        })
      },
      fail: function(res) {

      }
    })
  },
  member_data: function() {
    if (this.data.noLogin == true) {
      msg("你需要先授权")
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }, 2000)
      this.setData({
        noLogin: false
      })
      return false
    }

  },
  goAudit() { //跳转我的小店
    if (this.data.login) { //已授权
      if (this.data.shopState == 1) { //申请我的小店通过
        wx.navigateTo({
          url: '/pages/myShop/myShop'
        })
      } else if (this.data.shopState == 0) { //小店申请审核中
        wx.showToast({
          title: '正在审核中',
          icon: 'success',
          duration: 2000
        })
      } else if (this.data.shopState == 2) { //未申请
        wx.navigateTo({
          url: '/pages/audit/audit'
        })
      } else {
        wx.navigateTo({
          url: '/pages/audit/audit'
        })
      }
    } else {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
    // url = "{{login ? '/pages/myShop/myShop' : '/pages/login/login'}}"
    // wx.navigateTo({
    //   url: '/pages/audit/audit'
    // })
  }
})