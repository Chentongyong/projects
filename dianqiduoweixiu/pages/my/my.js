// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      { name: '我的服务', src: '../../images/my-icon/fuwu.png' },
      { name: '我的收藏', src: '../../images/my-icon/shoucang.png' },
      { name: '地址管理', src: '../../images/my-icon/ditutubiao.png' },
      { name: '分享有礼', src: '../../images/my-icon/fenxiang.png' },
      { name: '成为平台师傅', src: '../../images/my-icon/shenqing.png' },
      { name: '开店申请', src: '../../images/my-icon/kaidianshenqing.png' },
      { name: '联系客服', src: '../../images/my-icon/kefu.png' },
      { name: '关于我们', src:'../../images/my-icon/guanyu.png'},
    ],
    dind:[
      { name: '全部', src: '../../images/my-icon/wallet.png',hint:99 },
      { name: '待分享', src: '../../images/my-icon/share.png',hint:1 },
      { name: '进行中', src: '../../images/my-icon/underway.png',hint:1 },
      { name: '待付尾款', src: '../../images/my-icon/final_payment.png',hint:1 },
      { name: '已完成', src:'../../images/my-icon/accomplish.png',hint:1}

    ],
    my:[
      { name: '积分', num: 1000 },
      { name: '钱包', num: 8888.88 },
      { name: '优惠券', num: 3 }
    ]
  },

  my_message:function(){//消息跳转
    wx.navigateTo({
      url: '../myMessage/myMessage',
    })
  },


  user_basic:function(e){
    console.log(e)
    let index = e.currentTarget.dataset.index
    if(index==0){//打开积分页面
      wx.navigateTo({
        url: '../integral/integral',
      })
    } else if (index == 1){
      wx.navigateTo({
        url: '../myWallet/myWallet',
      })
    } else if (index == 2) {
      wx.navigateTo({
        url: '../discount/discount',
      })
    } 
  },

  my_titlo:function(){//编辑头像
    wx.navigateTo({
      url: '../compile/compile',
    })
  },

  recommend:function(){
    wx.navigateTo({
      url: '/pages/appointment/appointment',
    })
  },

  my_order:function(){//我的订单
    wx.navigateTo({
      url: '../orderForm/orderForm',
    })
  },

  serve:function(e){
    console.log(e)
    let index = e.currentTarget.dataset.index
    if(index == 0){//跳转我的服务
      wx.navigateTo({
        url: '../service/service',
      })
    } else if (index == 1){
      wx.navigateTo({
        url: '../enshrine/enshrine',
      })
    } else if (index == 2) {
      wx.navigateTo({
        url: '../location/location',
      })
    } else if (index == 3) {
      wx.navigateTo({
        url: '../sharePolite/sharePolite',
      })
    } else if (index == 4) {
      wx.navigateTo({
        url: '../master/master',
      })
    } else if (index == 5) {
      wx.navigateTo({
        url: '../shop/shop',
      })
    } else if (index == 6) {
      wx.navigateTo({
        url: '../customer/customer',
      })
    } else if (index == 7) {
      wx.navigateTo({
        url: '../we/we',
      })
    }
  },
  dind:function(e){
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../orderForm/orderForm?tabIndex='+index,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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