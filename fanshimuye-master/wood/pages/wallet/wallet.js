// pages/wallet/wallet.js
import {
  getUserInfo,
  rewardRecord,
  withdrawalList
} from "../../utils/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_tonh:0,
    data:{},
    bringList:'',
    comeList:'',
    page:1,
    size:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  tab_tonh:function(e){
    let that = this
    let page = 1
    let size = this.data.size
    let type = e.currentTarget.dataset.type
    this.setData({
      tab_tonh:type
    })
    if (type == 0){
      rewardRecord({
        method: 'post',
        data: {
          page,
          size
        },
        success: function (res) {
          that.setData({
            comeList: res.data
          })
        }
      })
    }else if(type == 1){
      withdrawalList({
        method: 'post',
        data: {
          page,
          size
        },
        success: function (res) {
          that.setData({ bringList: res.data })
        }
      })
    }
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
    let that = this
    let page = this.data.page
    let size = this.data.size
    getUserInfo({
      success:function(res){
        that.setData({
          data:res.data
        })
      }
    })
    rewardRecord({
      method:'post',
      data:{
        page,
        size
      },
      success:function(res){
        that.setData({
          comeList: res.data,

        })
      }
    })
    withdrawalList({
      method:'post',
      data:{
        page,
        size
      },
      success:function(res){
        that.setData({ 
          bringList: res.data,
        })
      }
    })
    this.setData({
      page: page + 1
    })
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
    let that = this
    let page = this.data.page
    let size = this.data.size
    let tab_tonh = this.data.tab_tonh
    if (tab_tonh == 0){
      rewardRecord({
        method: 'post',
        data: {
          page,
          size
        },
        success: function (res) {
          that.setData({
            comeList: res.data
          })
        }
      })
    } else if (tab_tonh == 1){
      withdrawalList({
        method: 'post',
        data: {
          page,
          size
        },
        success: function (res) {
          that.setData({ bringList: res.data })
        }
      })
    }
    

    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})