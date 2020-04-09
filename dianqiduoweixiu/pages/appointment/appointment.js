
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    none_category:0,
    arrow:'../../images/order_server/server_arrow.png',
    app:'../../images/order_server/app.png',
    no_app:'../../images/order_server/no_app.png',
    underline:'../../images/order_server/underline.png',
    tel_ph:"请输入电话号码",
    add_ph:"请输入地址信息",
    electricityId:0,//选择电器的键
    showMask:false, //显示蒙版
    showElectric:false,//显示电器选择弹窗
    showDate:false,//显示选择日期弹窗
    // 电器弹窗列表
    appliance_list:[
      {
        name:"电视",
        num:"kljglakjfs",
        date:"2011/11/22"
      },
      {
        name: "洗衣机",
        num: "kljglakjfs",
        date: "2011/11/22"
      },
      {
        name: "电视",
        num: "kljglakjfs",
        date: "2011/11/22"
      },
      {
        name: "电视",
        num: "kljglakjfs",
        date: "2011/11/22"
      },
      {
        name: "洗衣机",
        num: "kljglakjfs",
        date: "2011/11/22"
      },
      {
        name: "电视",
        num: "kljglakjfs",
        date: "2011/11/22"
      },
      {
        name: "电视",
        num: "kljglakjfs",
        date: "2011/11/22"
      },
      {
        name: "电视",
        num: "kljglakjfs",
        date: "2011/11/22"
      },
      {
        name: "电视",
        num: "kljglakjfs",
        date: "2011/11/22"
      },
      {
        name: "电视",
        num: "kljglakjfs",
        date: "2011/11/22"
      },
      {
        name: "电视",
        num: "kljglakjfs",
        date: "2011/11/22"
      },
      {
        name: "电视",
        num: "kljglakjfs",
        date: "2011/11/22"
      },
      {
        name: "电视",
        num: "kljglakjfs",
        date: "2011/11/22"
      },
      {
        name: "电视",
        num: "kljglakjfs",
        date: "2011/11/22"
      },

     
    ], 
    appliance_list2: [
        "家电",
        "厨具",
    ],
    arrlist:[
      [
        "电视",
        "电脑显示屏",
      ],
      [
        "洗衣机",
        "电饭锅",
      ],
    ],
    none_category: 0,//无订单选择类别
    none_product: 0,//无订单选择产品
    choice:"../../images/order_server/choice.png",
    no_choice:"../../images/order_server/no_choice.png",
    cancel:'../../images/order_server/cancel.png',
    page:1,
    pagesize:5,
    reserveData: ['订单预约','无订单预约'],
    reserveTabIndex:0,//是否有预约订单
    

    servicingTime: 0,//服务时间  上午  下午
    phone_num:"",//手机号码
    electricity: '',//电器选择
    dateSelected: '',//日期
    site:'',//地址
    remark:'',//备注
    tempFilePaths: "",//图片选择后的数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    let dateStart = `${year}-${month+1}-${day}`
    let dateEnd = `${year+2}-${month+1}-${day}`
    that.setData({
      dateStart,
      dateEnd
    })
    
  },

  reserveTab:function(e){//切换订单预约类型
    let that = this
    let index = e.currentTarget.dataset.index
    that.setData({
      reserveTabIndex:index,
    })
    console.log(that.data.reserveTabIndex)
  },

  choice_application:function(){//显示选择电器弹窗
    this.setData({
      showMask: true,
      showElectric:true
    })
  },

 

  select_cancel:function(){//取消选择
    this.setData({
      showMask:false,
      showElectric:false,
      showDate:false
    })
  },

  dateChange:function(e){//日期选择 
    let that = this 

    console.log(e)
    let value = e.detail.value
    that.setData({
      dateSelected:value
    })
  },
  
  bindChange:function(e){//电器选择滚动时触发
    console.log(e)
    let index = e.detail.value[0]
    this.setData({
      electricityId:index
    })
  },
  noChange: function (e) {//无订单电器选择滚动时触发
    console.log(e)
    let value = e.detail.value
    let index = value[0]
    let index2 = value[1]
    this.setData({
      none_category : index,//选择类别
      none_product :index2//选择产品
    })
  },
  affirm:function(){//选择电器点击确定
    let that = this
    let reserveTabIndex = that.data.reserveTabIndex //是否有订单参数
    let appliance_list = that.data.appliance_list //有订单数组
    let appliance_list2 = that.data.appliance_list2//无订单类别数组
    let arrlist = that.data.arrlist //无订单 产品数组
    let none_category = that.data.none_category//无订单 类别参数
    let none_product = that.data.none_product//无订单 产品参数
    let electricityId = that.data.electricityId//有订单 选择电器
    let list_index = appliance_list[electricityId].name
    let list2_index = appliance_list2[none_category]
    let category_index = arrlist[none_category]
    let product_index = category_index[none_product]
    console.log(category_index,product_index)
    if (reserveTabIndex == 0){
      that.setData({
        electricity: list_index,
        showMask: false,
        showElectric: false,
      })
    } else if (reserveTabIndex == 1){
      that.setData({
        electricity: product_index,
        showMask: false,
        showElectric: false,
      })
    }

    
  },

  forenoon:function(){//选择上午
    this.setData({
      servicingTime:0
    })
  },

  afternoon:function(){//选择下午
    this.setData({
      servicingTime:1
    })
  },

  phone_num:function(e){//手机号码
    let that = this
    console.log(e)
    let value = e.detail.value
    let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
    if (value.length == 11 && reg.test(value)){
      console.log(value)
      that.setData({
        
      })
    } else if (value.length == 11 && reg.test(value) == false){
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
        duration: 2000
      })
    }
  },


  site:function(e){//地址信息
    let value = e.detail.value
    this.setData({
      site:value
    })
  },  


  remark:function(e){
    let value = e.detail.value
    this.setData({
      remark:value
    })
  },


  cilik_img_up:function(){//选择本地图片
    let that = this 
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          tempFilePaths
        })
      }
    })
    
  },


  img_preview:function(e){//点击预览图片
    let that = this
    let tempFilePaths = that.data.tempFilePaths
    let index = e.currentTarget.dataset.index
    wx.previewImage({
      current: tempFilePaths[index], // 当前显示图片的http链接
      urls: tempFilePaths // 需要预览的图片http链接列表
    })
  },
  

  submit:function(){

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