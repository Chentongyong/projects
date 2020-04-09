// pages/integral/integral.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      { day: '1', num: '10', sign: 1 },
      { day: '2', num: '20', sign: 1 },
      { day: '3', num: '30', sign: 0 },
      { day: '4', num: '40', sign: 0 },
      { day: '5', num: '50', sign: 0 },
      { day: '6', num: '60', sign: 0 },
      { day: '7', num: '70', sign: 0 },
    ],
    img: '../../images/my-icon/Sign_in_successfully.png',
    img2: '../../images/my-icon/Did_not_sign_in.png',

    usageRecord:[
      { use: '兑换商品', date: '2019-11-30', usageQuantity: "-100" },
      { use: '兑换商品', date: '2019-11-30', usageQuantity: "-100" },
      { use: '兑换商品', date: '2019-11-30', usageQuantity: "-100" },
      { use: '兑换商品', date: '2019-11-30', usageQuantity: "-100" },
      { use: '兑换商品', date: '2019-11-30', usageQuantity:"-100"},
    ],
    sign:0,
    integral:1000
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  sign_in_immediately:function(){//立即签到
    let list = this.data.list
    let integral = this.data.integral
    if (this.data.sign == 0){
      this.setData({
        sign: 1
      })
      let flag = false
      for(let i=0;i<list.length;i++){
        if (list[i].sign == 0){
          list[i].sign=1
          integral = integral + +list[i].num
          break
        }
      }
      
      this.setData({
        list,
        integral
      })
      wx.showToast({
        title: '签到成功',
        icon: 'none',
        duration: 2000,
      })
    } else if (this.data.sign == 0){
      wx.showToast({
        title: '今天已经签到过了',
        icon: 'none',
        duration: 2000,
      })
    }
  },

  integral_rulu:function(){//积分规则页面跳转
    wx.navigateTo({
      url: '../integralRulu/integralRulu',
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