// pages/moreRecommended/moreRecommended.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 30 * 60 * 60 * 1000,
    zt:0,
    searchData: [
      { titlo: '制氧机3L家用吸氧机', describe: "制氧+雾化，带雾化老人孕妇医用分子筛氧气机 3L家用制氧机", src: '../../images/goods1.png', money: '2180', sales: '666' },
      { titlo: '制氧机3L家用吸氧机', describe: "制氧+雾化，带雾化老人孕妇医用分子筛氧气机 3L家用制氧机", src: '../../images/goods1.png', money: '2180', sales: '666' },
      { titlo: '制氧机3L家用吸氧机', describe: "制氧+雾化，带雾化老人孕妇医用分子筛氧气机 3L家用制氧机", src: '../../images/goods1.png', money: '2180', sales: '666' },
      { titlo: '制氧机3L家用吸氧机', describe: "制氧+雾化，带雾化老人孕妇医用分子筛氧气机 3L家用制氧机", src: '../../images/goods1.png', money: '2180', sales: '666' },
      { titlo: '制氧机3L家用吸氧机', describe: "制氧+雾化，带雾化老人孕妇医用分子筛氧气机 3L家用制氧机", src: '../../images/goods1.png', money: '2180', sales: '666' },
      { titlo: '制氧机3L家用吸氧机', describe: "制氧+雾化，带雾化老人孕妇医用分子筛氧气机 3L家用制氧机", src: '../../images/goods1.png', money: '2180', sales: '666' },
      { titlo: '制氧机3L家用吸氧机', describe: "制氧+雾化，带雾化老人孕妇医用分子筛氧气机 3L家用制氧机", src: '../../images/goods1.png', money: '2180', sales: '666' },
      { titlo: '制氧机3L家用吸氧机', describe: "制氧+雾化，带雾化老人孕妇医用分子筛氧气机 3L家用制氧机", src: '../../images/goods1.png', money: '2180', sales: '666' },
      { titlo: '制氧机3L家用吸氧机', describe: "制氧+雾化，带雾化老人孕妇医用分子筛氧气机 3L家用制氧机", src: '../../images/goods1.png', money: '2180', sales: '666' },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let zt = 0
    if (options.zt){zt = options.zt}
    this.setData({
      zt
    })
    if(zt == 0){
      wx.setNavigationBarTitle({
        title: '推荐产品'
      })
    }else if(zt == 1){
      wx.setNavigationBarTitle({
        title: '限时抢购'
      })
    }else if(zt== 2){
      wx.setNavigationBarTitle({
        title: '团购优惠'
      })
    }
  },


  data_box:function(e){
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/detailPage/detailPage',
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