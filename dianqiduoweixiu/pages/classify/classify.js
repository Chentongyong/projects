// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: ['热门推荐', '店主推荐', '弥散机', '便携机', '零配件','其他产品'],
    nav2: ['全部商品','销量优先','价格升序','价格降序'],
    list: ['2181', '2182', '2183', '2184', '2185', '2186', '2187', '2188', '2189', '2180'],
    list2: ['2181', '2182', '2183', '2184', '2185', '2186', '2187', '2188', '2189', '2180'],
    navIndex:0,
    productNavIndex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var navIndex = wx.getStorageSync('navIndex')
    
    this.setData({
      navIndex
    })
  },

  navigation:function(e){ //推荐导航
    let that = this
    let index = e.currentTarget.dataset.index
    let navIndex = that.data.navIndex
    that.setData({
      navIndex:index
    })
  },

  tinzs:function(e){
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/detailPage/detailPage',
    })
  },
  product_nav: function (e) {//销量导航
    let that = this
    let index = e.currentTarget.dataset.index
    let productNavIndex = that.data.productNavIndex
    let list = that.data.list
    let list2 = that.data.list2
    that.setData({
      productNavIndex: index
    })
    if (index == 0){
      that.setData({
        list2:list
      })
      console.log(list)
    }else if(index == 1){

    }else if(index == 2){
      for (var i = 0; i < list2.length - 1; i++) {
        // 内层循环,控制比较的次数，并且判断两个数的大小
        for (var j = 0; j < list2.length - 1 - i; j++) {
          // 白话解释：如果前面的数大，放到后面(当然是从小到大的冒泡排序)
          if (list2[j] > list2[j + 1]) {
            var temp = list2[j];
            list2[j] = list2[j + 1];
            list2[j + 1] = temp;
          }
        }
      }
      that.setData({
        list2: list2
      })
    }else if(index == 3){
      for (var i = 0; i < list2.length - 1; i++) {
        for (var j = 0; j < list2.length - 1 - i; j++) {
          if (list2[j] < list2[j + 1]) {
            var temp = list2[j]
            list2[j] = list2[j + 1]
            list2[j + 1] = temp
          }
        }
      }
      that.setData({
        list2:list2
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