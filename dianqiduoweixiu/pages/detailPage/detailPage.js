// pages/detailPage/detailPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bzData: [
      { name: '全程服务', zt: 2, src: "/images/icon/fw.png" },
      { name: '线下直销', zt: 1,src:"/images/icon/zx.png"}, 
      { name: '京东商城', zt: 0, src: "/images/icon/jd.png" }, 
      { name: '授权书', zt: 4, src: "/images/icon/sqs.png" },
      { name: '三包保障', zt: 3, src:"/images/icon/sb.png"}, 
    ],
    imgList:[
      '/images/shohin.png' ,
      '/images/shohin.png' ,
      '/images/shohin.png'
    ],
    timeData: {},
    timeData1: {},
    time: 108000000,//倒计时
    time1:30*60*1000,
    data: [{
      id: 1,
      title: '制氧机3L家用吸氧机',
      image: '../../images/Commodity_images.png',
      pro_name: "2匹，白色",
      num: 1,
      price: 2180,
      deal: 200,
      numdeal: 200,
      selected: true,
      totalPrice: 1980,
      type:0
    }],
    data1: [{
      id: 1,
      title: '制氧机3L家用吸氧机',
      image: '../../images/Commodity_images.png',
      pro_name: "2匹，白色",
      num: 1,
      price: 2180,
      deal: 200,
      numdeal: 200,
      selected: true,
      totalPrice: 2180,
      type:1
    }],
    totalPrice: 2180,
    background_img: [
      '../../images/Commodity_images.png', '../../images/Commodity_images.png'
    ],
    details_and_evaluation: 0,
    image: [
      '../../images/xq.png',
    ],
    // user_img:[
    //   '../../images/user.png',
    //   '../../images/user.png',
    //   '../../images/user.png',
    // ]
    star: 4,
    show: false,
    discount: [
      { miae: '100', man: '1000', riqi: '2019.11.30 - 2019.12.30', liji: 0 },
      { miae: '100', man: '1000', riqi: '2019.11.30 - 2019.12.30', liji: 0 },
      { miae: '100', man: '1000', riqi: '2019.11.30 - 2019.12.30', liji: 0 }
    ],
    specification: ['1.5匹', '1.5匹', '1.5匹', '1.5匹', '1.5匹', '1.5匹'],
    iro: ['红色', '白色', '灰色', '红色', '白色', '灰色'],
    specification_null: '去选择',
    specification_null_data: 0,//选择规格
    specification_size: 0,
    specification_color: 0,
    specification_popup: 0,
    discounts_state: '立即领取',
    review: 0,//是否显示添加评论
    input_height: 0,//随着键盘上升的高度
    // comments_inpue: [
    //   { name: '商家回复', comments: '谢谢您对本店的支持' },
    //   { name: '商家回复', comments: '谢谢您对本店的支持' },
    // ],//评论内容
    tuoguan: ['拓冠科技', '拓冠科技'],
    tuoguan2: ['拓冠科技', '拓冠科技', '拓冠科技', '拓冠科技', '拓冠科技', '拓冠科技', '拓冠科技', '拓冠科技', '拓冠科技', '拓冠科技'],
    time_limit: 0, //是否为抢购商品
    group_purchase: 0,  //是否为团购商品
    isspelled_group: false,//是否显示参团弹窗
    total_payment: 0,
    collect: 0,//是否收藏
  },

  onLoad: function (options) {
    console.log(options)
    let that = this
    let time_limit = that.data.time_limit
    let group_purchase = that.data.group_purchase
    let total_payment = 0
    if (options.time_limit == 1) {
      time_limit = options.time_limit
      total_payment = 1
    } else if (options.group_purchase == 1) {
      group_purchase = options.group_purchase
      total_payment = 1
    }
    let data = that.data.data
    let specification = that.data.specification[0]
    let iro = that.data.iro[0]
    let sde = `${specification}, ${iro}`
    data[0].pro_name = sde
    that.setData({
      time_limit,
      group_purchase,
      total_payment,
      data,
      specification_null: `已选 ${sde}`,
      specification_null_data: sde,
    })
    console.log(time_limit,
      group_purchase,
      total_payment,
      data)

  },
  grade_image:function(e){//评论图片预览
    let index = e.currentTarget.dataset.index
    let imgList = this.data.imgList
    wx.previewImage({
      current: imgList[index], // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },

  comment_reply:function(e){
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/watchMessage/watchMessage',
    }) 
  },


  onChange1(e) {
    this.setData({
      timeData1: e.detail
    });
  },
  details: function () {
    this.setData({
      details_and_evaluation: 0
    })
  },

  collect: function () {
    this.setData({
      collect: !this.data.collect
    })
  },

  long: function () {
    let specification_null_data = this.data.specification_null_data
    if (specification_null_data == 0) {
      wx.showToast({
        title: '请选择颜色和大小',
        icon: 'none',
        duration: 2000
      })
    } else if (specification_null_data != 0) {
      wx.showToast({
        title: '加入成功',
        icon: 'none',
        duration: 2000
      })
    } 
  },

  evaluation: function () {
    this.setData({
      details_and_evaluation: 1
    })
  },

  specification_size: function (e) {//选择规格大小
    // console.log(e)
    let index = e.currentTarget.dataset.index
    console.log(this.data.specification[index])
    this.setData({
      specification_size: index
    })
  },

  specification_color: function (e) {//选择规格颜色
    console.log(e)
    let index = e.currentTarget.dataset.index
    console.log(this.data.iro[index])
    this.setData({ 
      specification_color: index 
    })
  },

  specification_affirm: function () {//规格确认选择
    let that = this
    let data = that.data.data
    let specification_size = that.data.specification_size
    let specification_color = that.data.specification_color
    let specification = that.data.specification[specification_size]
    let iro = that.data.iro[specification_color]
    let sde = `${specification}, ${iro}`
    data.pro_name = sde
    that.setData({
      data,
      specification_null_data: sde,
      specification_null: `已选 ${sde}`,
      show: false
    })

  },

  showPopup() {//弹窗
    this.setData({ show: true, specification_popup: 1, });
  },
  showPopup_discounts: function () {
    this.setData({ show: true, specification_popup: 0, });
  },

  onClose() {
    this.setData({ show: false });
  },

  discounts_state: function (e) {//优惠券领取
    console.log(e)
    let that = this
    let index = e.currentTarget.dataset.index
    let discount = that.data.discount
    discount.forEach((item, i) => {
      if (i == index) {
        item.liji = 1
      }
    })
    that.setData({
      discount
    })
  },

  discount_confirm: function () {//优惠确定
    this.setData({ show: false });
  },

  add_comments: function () {
    let that = this
    wx.onKeyboardHeightChange(res => {
      console.log(res.height)
      that.setData({
        input_height: res.height
      })
    })
    that.setData({
      review: 1
    })
  },

  blur_input: function (e) {
    this.setData({
      review: 0
    })
  },

  to_send_comments: function () {
    console.log("111")
    let that = this
    let input_value = that.data.input_value
    let comments_inpue = that.data.comments_inpue
    comments_inpue.push({ name: '商家', comments: input_value })
    that.setData({ comments_inpue })
  },

  comments_inpue: function (e) {
    let that = this
    let value = e.detail.value
    that.setData({ input_value: value })
  },

  purchase: function () {
    let that = this
    let totalPrice = that.data.totalPrice
    let data = JSON.stringify(that.data.data)
    let data1= JSON.stringify(that.data.data1)
    let time_limit = that.data.time_limit
    let group_purchase = that.data.group_purchase
    let total_payment = that.data.total_payment
    console.log(data)
    if (this.data.specification_null_data == 0) {
      wx.showToast({
        title: '请选择颜色和大小',
        icon: 'none',
        duration: 2000
      })
    }
    if (this.data.specification_null_data != 0) {
      if (total_payment == 0) {
        wx.navigateTo({
          url: '../indent/indent?arr=' + data1 + '&totalPrice=' + totalPrice + '&total_payment=' + total_payment + '&time_limit=' + time_limit + '&group_purchase=' + group_purchase,
        })

      } else if (total_payment==1){
        wx.navigateTo({
          url: '../indent/indent?arr=' + data1 + '&totalPrice=' + totalPrice + '&total_payment=' + total_payment + '&time_limit=' + time_limit + '&group_purchase=' + group_purchase,
        })
        
      }
    }

  },


  count_down(e) {//倒计时
    // console.log(e)
    this.setData({
      timeData: e.detail
    });
  },

  more_spell_group: function () {//更多拼团
    this.setData({
      isspelled_group: !this.data.isspelled_group
    })
  },


  safeguard:function(e){
    let zt = e.currentTarget.dataset.zt
    wx.navigateTo({
      url: '/pages/tabs/tabs?zt='+zt,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */


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