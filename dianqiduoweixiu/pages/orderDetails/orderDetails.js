// pages/orderDetails/orderDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zt:[
      { zt: '待付款', sy: '剩余时间', sj: '03: 26: 56', src: '/images/qianbao.png' },
      { zt: '待分享', sy: '邀请小伙伴们来拼团吧~', sj: '', src: '/images/fenxiang.png' },
      { zt: '进行中', sy: '请耐心等待您的包裹~', sj: '', src: '/images/jxz.png' },
      { zt: '待付尾款', sy: '请在11月12日00:00之前付尾款~', sj: '', src: '/images/xz.png' },
      { zt: '已完成', sy: '欢迎您的下次光临', sj: '', src: '/images/wc.png' },
      { zt: '已完成', sy: '欢迎您的下次光临', sj: '', src: '/images/wc.png' },
      { zt: '拼团失败', sy: '拼团已经结束', sj: '', src: '/images/lose.png' },
      { zt: '进行中', sy: '拼团成功，请耐心等待您的包裹~', sj: '', src:'/images/jxz.png'},
    ],
    ztma:0,
    time:100000,
    timeData: {},
    total_payment: 0,//是否为团购全款
    user_img: [
      '../../images/user.png',
      '../../images/icon/unknown_user.png',
      '../../images/icon/unknown_user.png',
      '../../images/icon/unknown_user.png',
    ],
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that = this
    let data = JSON.parse(options.data)
    let list = that.data.list
    let ztma = data.zt
    list.push(data)
    that.setData({
      list,
      ztma,
      total_payment: data.total_payment
    })
  },

  onChange(e) {
    this.setData({
      timeData: e.detail
    
    });
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
    var that = this;
    　　var shareObj = {
      　　　　title: "转发的标题",
      　　　　path: '/pages/index/index', // 默认是当前页面，必须是以‘/’开头的完整路径
      　　　　imgUrl: '', //转发时显示的图片路径，支持网络和本地，不传则使用当前页默认截图。
    　　};
  }
})