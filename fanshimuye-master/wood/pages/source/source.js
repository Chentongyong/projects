// pages/source/source.js
import {
  scoreList
} from "../../utils/api"
Page({

    /**
     * 页面的初始数据
     */
    data: {
      list:[],
      page:1,
      size:10
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
      let that = this
      let page = this.data.page
      let size = this.data.size
      scoreList({
        data:{
          page,
          size
        },
        success:function(res){
          that.setData({
            list:res.data,
            page:page+1

          })
        }
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
      let list = this.data.list
      scoreList({
        data: {
          page,
          size
        },
        success: function (res) {
          
          list.concat(res.data)
          that.setData({
            list,
            page: page + 1

          })
        }
      })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})