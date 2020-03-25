// pages/flaunt/flaunt.js
import {
  msg,
  success
} from "../../utils/util";
import {
  userList,
  friendsCenter
} from "../../utils/api";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        images: [
            '/static/images/case_01.jpg',
            '/static/images/case_01.jpg',
            '/static/images/case_01.jpg',
        ],
        list:[],
        page:1,
        size:10,
      nodes:''
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
      
      let page = this.data.page
      let that = this
      userList({
        data:{
          page:1,
          size:10
        },
        success:function(res){
          let list = []
          list=res.data
          that.setData({
            list,
            page: page+1
          })
        },
        fail:function(res){
          msg(res.msg)
        }
      })
      friendsCenter({
        success:function(res){
          that.setData({
            nodes: res.data.text,
            data:res.data
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
      // let list = []
      // let that = this
      // let page = this.data.page
      // userList({
      //   data: {
      //     page,
      //     size: 10
      //   },
      //   success: function (res) {
      //     list: res.data
      //     that.setData({
      //       list,
      //       page:page+1
      //     })
      //   },
      //   fail: function (res) {
      //     msg(res.msg)
      //   }
      // })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})