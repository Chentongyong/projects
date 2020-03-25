// pages/article/article.js
import {
  friendsInfo,
  friendsLike
} from "../../utils/api"
import {
  msg,
  success
} from "../../utils/util"
Page({

    /**
     * 页面的初始数据
     */
    data: {
      id:0,
      data:{},
      noLogin: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let id = options.id
      let that = this
      
      this.setData({
        id
      })

      this.friendsInfo()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
  good:function(){
    let that = this
    let data = this.data.data
    if (this.data.noLogin == true) {
      msg("你需要先授权")
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }, 2000)
      return false
    }
    friendsLike({
      method:'post',
      data:{
        id:data.id
      },
      success:function(res){
        
        that.friendsInfo()
        setTimeout(()=>{
          let data = that.data.data
          if (data.is_like == true) {
            success("点赞成功")
          } else if (data.is_like == false) {
            success("取消成功")
          }
        },500)
        
        
      }
    })
  },
  friendsInfo:function(){
    let id = this.data.id
    let that = this
    friendsInfo({
      data: {
        id
      },
      success: function (res) {
        that.setData({
          data: res.data
        })
      }
    })
  },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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