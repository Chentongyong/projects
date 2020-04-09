// pages/service/service.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      { name: '空气净化器维修', zt: 0, ztname: '待接单' },
      { name: '空气净化器维修', zt: 0, ztname: '待接单' },
      { name: '空气净化器维修', zt: 1, ztname: '已接单' },
      { name: '空气净化器维修', zt: 1, ztname: '已接单' },
      { name: '空气净化器维修', zt: 2, ztname: '已完成' },
      { name: '空气净化器维修', zt: 2, ztname: '已完成' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  demand:function(e){
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../serviceDemand/serviceDemand',
    })
  },
  cancel:function(e){
    let index = e.currentTarget.dataset.index
    let list = this.data.list
    list.splice(index,1)
    this.setData({
      list
    })
    wx.showToast({
      title: '取消成功',
      icon: 'none',
      duration: 2000,
     
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