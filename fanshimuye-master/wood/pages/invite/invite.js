// pages/invite/invite.js
import {
  spellInvite,
  orderDetail
} from "../../utils/api"
import {
  msg,
  success
} from "../../utils/util";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_img: [
      '/static/images/avatar.jpg',
      '/static/images/wen.png',
      '/static/images/wen.png',
      '/static/images/wen.png',
      '/static/images/wen.png',
    ],
    data: {},
    images: [],
    join: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this

    let order_id = options.order_id
    if (options.pt_id) {
      order_id = options.pt_id
      this.setData({
        join: true
      })
      this.spellInvite(order_id)
      return false
    }
    this.orderDetail(order_id)
  },

  spellInvite: function (order_id){
    let that = this
    spellInvite({
      data: {
        id: order_id
      },
      success: function (res) {
        let images = res.data.user
        
        that.time(res.data.end_time)
        that.setData({
          data: res.data,
          images
        })
      },
      fail: function (res) {
        msg(res.msg)
      }
    })
  },

  orderDetail: function (order_id) {//详情
  let that = this
    orderDetail({
      data: {
        // order_id
        order_id
      },
      success: function(res) {
        let pt_id = res.data.pt_id
        spellInvite({
          data: {
            id: pt_id
          },
          success: function(res) {
            let images = res.data.user
            
            that.time(res.data.end_time)
            that.setData({
              data: res.data,
              images
            })
          },
          fail: function(res) {
            msg(res.msg)
          }
        })

      }
    })

  },

  time: function(e) {
    e = e.replace(/-/g, '/')
    let nowDate = new Date()
    let nowTimestamp = nowDate.getTime()
    let targetDate = new Date(e)
    let targetTimestamp = targetDate.getTime()
    let count_down = targetTimestamp - nowTimestamp
    let time = {}
    this.data.times = setInterval(() => {
      if (count_down > 0) {
        count_down -= 1000
        time = this.countdown(count_down)

        this.setData({
          time
        })
      } else {
        clearInterval(this.data.times)
      }

    }, 1000)
  },

  countdown: function(_t) {
    var _result = {
      hour: 0,
      minue: 0,
      sec: 0
    }
    if (_t > 0) {
      _result.hour = Math.floor(_t / 1000 / 60 / 60) < 10 ? '0' + Math.floor(_t / 1000 / 60 / 60 % 24).toString() : Math.floor(_t / 1000 / 60 / 60).toString();
      _result.minue = Math.floor(_t / 1000 / 60 % 60) < 10 ? '0' + Math.floor(_t / 1000 / 60 % 60).toString() : Math.floor(_t / 1000 / 60 % 60).toString();
      _result.sec = Math.floor(_t / 1000 % 60) < 10 ? '0' + Math.floor(_t / 1000 % 60).toString() : Math.floor(_t / 1000 % 60).toString();
    }
    return _result;
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
    let that = this
    return {
      title: that.data.data.title,
      path: 'pages/invite/invite?pt_id=' + that.data.data.pt_id,
      imageUrl: that.data.data.logo, // 分享的封面图
    }
  }
})