
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 30 * 60 * 60 * 1000,
    timeData:{},
    user_img:[
      '../../images/user.png',
      '../../images/icon/unknown_user.png',
      '../../images/icon/unknown_user.png',
      '../../images/icon/unknown_user.png',
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onChange(e) {
    this.setData({
      timeData: e.detail
    });
  },
  
  transmit:function(){
    wx.updateShareMenu({
      withShareTicket: true,
      success(res){ 
        console.log(res)
      },
      fail(e){
        console.log(e)
      }
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
  onShareAppMessage: function (e) {
    console.log(e)
  }
})