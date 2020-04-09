// pages/enshrine/enshrine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:0,
    list:['商品列表', '资讯列表'],
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
    zonghe: ['综', '合', '推', '荐'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  sptab:function(e){
    let index = e.currentTarget.dataset.index
    if (index == 0){
      this.setData({
        tab: 0
      })
    } else if (index == 1) {
      this.setData({
        tab: 1
      })
    }
  },
  result:function(e){
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/detailPage/detailPage',
    })
  },
  information_data:function(e){
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/InformationData/InformationData',
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