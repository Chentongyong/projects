// pages/watchMessage/watchMessage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist:[
      { src: '../../images/user.png', user: '拓冠科技', replytime: '2019-11-30', huifu: '还不错呀，真的挺好用的！', user2: '' },
      { src: '../../images/user.png', user: '拓冠科技', replytime: '2019-11-30', huifu: '我也觉得', user2: '拓冠科技' }
    ],
    comment:false,
    flag:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  the_commodity:function(){
    wx.navigateTo({
      url: '/pages/detailPage/detailPage',
    })
  },
  comments:function(){
    let flag = 0
    this.setData({
      comment: true,
      flag
    })
  },
  comments2: function () {
    let flag = 1
    this.setData({
      comment: true,
      flag
    })
    
  },
  bindblur:function(e){
    console.log(e)
    let value = e.detail.value
    let flag = this.data.flag
    let datalist = this.data.datalist
    let data = {}
    if (flag == 1){
      data = {src: '../../images/user.png', user: '拓冠科技', replytime: '2019-11-30', huifu: value, user2: '拓冠科技' }
    } 
    if (flag == 0){
      data = { src: '../../images/user.png', user: '拓冠科技', replytime: '2019-11-30', huifu: value, user2: '' }
    }
    datalist.push(data)
    this.setData({
      datalist,
      comment: false
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