// pages/orderForm/orderForm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: ['全部', '待分享', '进行中', '待付尾款','已完成'],
    tabIndex: 0,
    data:[],
    dataList: [
      { name: '制氧机3L家用吸氧机', gg: '2匹，白色', jine: '2180', num: '1', zt: 1, total_payment: 1 },//待分享
      { name: '制氧机3L家用吸氧机', gg: '2匹，白色', jine: '2180', num: '1', zt: 2, total_payment: 0 },//进行中
      { name: '制氧机3L家用吸氧机', gg: '2匹，白色', jine: '2180', num: '1', zt: 3, total_payment: 0 },//待付尾款
      { name: '制氧机3L家用吸氧机', gg: '2匹，白色', jine: '2180', num: '1', zt: 4, total_payment: 0 },//已完成&&未评价
      { name: '制氧机3L家用吸氧机', gg: '2匹，白色', jine: '2180', num: '1', zt: 5, total_payment: 0 },//已完成&&已评价
      { name: '制氧机3L家用吸氧机', gg: '2匹，白色', jine: '2180', num: '1', zt: 6, total_payment: 1 },//拼团时败
      { name: '制氧机3L家用吸氧机', gg: '2匹，白色', jine: '2180', num: '1', zt: 7, total_payment: 1 },//拼团成功
    ],
    ztList: [
      '',
      '待分享',
      '进行中',
      '待付尾款',
      '已完成',
      '已完成',
      '拼团失败',
      '拼团成功'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let tabIndex = ''
    if (options.tabIndex){
      tabIndex = options.tabIndex
    }
    if (that.data.tabIndex){
      tabIndex = that.data.tabIndex
    }
    let dataList = that.data.dataList
    let arr = []
    console.log(that.data.tabIndex,options.tabIndex)
    if (tabIndex == 0) {
      dataList.forEach(function (item) {
        arr.push(item)
      })
      console.log(arr)
      that.setData({
        data: arr
      })
    } else if (tabIndex == 1) {
      dataList.forEach(function (item) {
        if (item.zt == 1 || item.zt == 6) {
          arr.push(item)
        }
      })
      that.setData({
        data: arr
      })
    } else if (tabIndex == 2) {
      dataList.forEach(function (item) {
        if (item.zt == 2 || item.zt == 7) {
          arr.push(item)
        }
      })
      that.setData({
        data: arr
      })
    } else if (tabIndex == 3) {
      dataList.forEach(function (item) {
        if (item.zt == 3) {
          arr.push(item)
        }
      })
      that.setData({
        data: arr
      })
    } else if (tabIndex == 4 || tabIndex == 5) {
      dataList.forEach(function (item) {
        if (item.zt == 4 || item.zt == 5) {
          arr.push(item)
        }
      })
      that.setData({
        data: arr
      })
    }
    
    that.setData({
      tabIndex
    })
  },
  appointment:function(e){
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/appointment/appointment',
    })
  },
  del_indent:function(e){
    let index = e.currentTarget.dataset.index
    let data = this.data.data
    data.splice(index,1)
    console.log(data,index)
    this.setData({
      data
    })
  },
  examine: function (e) {
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/watchMessage/watchMessage',
    })
  },
  tab: function (e) {
    let that = this
    let index = e.currentTarget.dataset.index
    let data = [...that.data.dataList]
    
    let arr = []
    if (index == 0) {
      data.forEach(function (item) {
        arr.push(item)
      })
      that.setData({
        data: arr
      })
    } else if (index == 1) {
      data.forEach(function (item) {
        if (item.zt == 1 || item.zt == 6) {
          arr.push(item)
        }
      })
      that.setData({
        data: arr
      })
    } else if (index == 2) {
      data.forEach(function (item) {
        if (item.zt == 2 || item.zt == 7) {
          arr.push(item)
        }
      })
      that.setData({
        data: arr
      })
    } else if (index == 3) {
      data.forEach(function (item) {
        if (item.zt == 3) {
          arr.push(item)
        }
      })
      that.setData({
        data: arr
      })
    } else if (index == 4||index==5) {
      data.forEach(function (item) {
        if (item.zt == 4 || item.zt == 5) {
          arr.push(item)
        }
      })
      that.setData({
        data: arr
      })
    }
    that.setData({
      tabIndex: index
    })
  },


  data_list:function(e){
    let index = e.currentTarget.dataset.index
    let data = JSON.stringify(this.data.data[index])
    console.log(data)
    wx.navigateTo({
      url: '../orderDetails/orderDetails?data='+data,
    })
  },

  logistics:function(){
    wx.navigateTo({
      url: '../logistics/logistics',
    })
  },

  evaluate:function(e){
    console.log(e)
    let data = JSON.stringify(this.data.data)
    let index  = e.currentTarget.dataset.index
    let that = this
    wx.navigateTo({
      url: '../evaluate/evaluate?ding=' + index + '&data=' + data,
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