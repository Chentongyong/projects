// pages/evaluate/evaluate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:0,
    valueIndex:0,
    tempFilePaths:[],
    ding:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let ding = options.ding
    let data = JSON.parse(options.data)
    this.setData({
      ding,
      data
    })
  },
  onChange(event) {
    this.setData({
      value: event.detail
    });
  },

  grade:function(e){
    console.log(e)
    let valueIndex= e.detail.cursor
    this.setData({
      valueIndex
    })
  },

  wshchuan:function(){
    let that= this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res)
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          tempFilePaths
        })
      }
    })
    
  },
  ding: function (e) {
    let ding = this.data.ding
    let data = this.data.data
    data[ding].zt = 5
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
      data:data
    })
    console.log(pages, prevPage)
    wx.navigateBack({
      delta: 1
    })
    
  },

  del:function(e){
    let that = this 
    let index = e.currentTarget.dataset.index
    let tempFilePaths = that.data.tempFilePaths
    tempFilePaths.splice(index,1)
    that.setData({
      tempFilePaths
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