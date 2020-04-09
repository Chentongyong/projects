// pages/master/master.js
const shengfen = require('../../utils/shengfen.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    diqu: "请选择所在地区",
    list: [
      { name: '', phone: '', region: '', site: '', sfz: '' }
    ],

    submit: 0,
    zheng: '',
    fan: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(shengfen, this)
    this.setData({
      shengfen: shengfen.default
    })
  },


  add: function () {
    this.setData({
      show: true
    })
  },

  onClose() {
    this.setData({ show: false });
  },


  confirm: function (e) {
    console.log(e)
    let value = e.detail.values

    console.log(value)
    let sheng = value[0].name
    let shi = value[1].name
    let qu = value[2].name

    this.setData({
      show: false,
      diqu: `${sheng} - ${shi} - ${qu}`
    });
  },

  zheng: function () {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          zheng: tempFilePaths
        })
      }
    })
  },


  fan: function () {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        that.setData({
          fan: tempFilePaths
        })
      }
    })
  },


  submit: function () {
    this.setData({
      submit: !this.data.submit
    })
  },

  site: function (e) {
    console.log(e)
    let value = e.detail.value
    let list = this.data.list
    list[0].site = value
    this.setData({
      list
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