// pages/logistics/logistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        text: '快件已离开广州；发往深圳',
        desc: '2018-08-28 10:26:38'
      },
      {
        text: '快件已经发货',
        desc: '2018-08-27 17:29:56'
      },
      {
        text: '从广州运到北京； 操作员：李珊',
        desc: '2018-08-26 16:38:23'
      },
      
    ],
    list:[
      { xx: '订单商品已到广州配送点【配送中】', time: '2019-11-27 18:57', peis: '配送员【中通小V】电话13800138000' },
      { xx: '订单商品已到广州配送点【配送中】', time: '2019-11-27 18:57', peis: '配送员【中通小V】电话13800138000' },
      { xx: '订单商品已到广州配送点【配送中】', time: '2019-11-27 18:57', peis: '配送员【中通小V】电话13800138000' },
      { xx: '订单商品已到广州配送点【配送中】', time: '2019-11-27 18:57', peis: '配送员【中通小V】电话13800138000'},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  wul:function(){
    let list = this.data.list
    list.push({ xx: '订单商品已到广州配送点【配送中】', time: '2019-11-27 18:57', peis: '配送员【中通小V】电话13800138000' },)
    this.setData({
      list
    })
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