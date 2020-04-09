// pages/withdrawDeposit/withdrawDeposit.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    objective:1,
    src1:[
      "/images/icon/select.png", 
     "/images/my-icon/accomplish.png", 
    ],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  
  card: function(e) {
    this.setData({ num: e.detail.value })
  },
  checknum: function (e) {
    var temp = util.bankCardAttribution(e.detail.value)
    console.log(temp)
    if (temp == 'error') {
      this.setData({
        cardType: '请输入正确的银行卡号'
      })
    } else {
      this.setData({
        cardType: temp.bankName,
      })
    }
  },
  gettype: function (e) {
    console.log(e.detail.value)
    var temp = util.bankCardAttribution(e.detail.value)
    console.log(temp)
    if (temp == 'error' && e.detail.value == '') {
      // temp.bankName = '';
      // temp.cardTypeName = '';
      this.setData({
        cardType: ''
      })
    } else if (temp == 'error' && e.detail.value != '') {
      this.setData({
        cardType: '请输入正确的银行卡号'
      })
    } else {
      this.setData({
        // cardType: temp.bankName + temp.cardTypeName, //银行类型、卡类型
        cardType: temp.bankName,
      })
    }
  },
  selector:function(){
    this.setData({
      objective:1
    })
  },

  selector2: function () {
    this.setData({
      objective: 0
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