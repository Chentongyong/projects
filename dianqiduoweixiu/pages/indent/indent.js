// pages/indent/indent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: { name: '拓冠科技1', chiku: '广东省 - 广州市 - 天河区', phone: '17656464656', dizi: '广州市天河区前进街道东英商务园D栋211-212', index: ''},
    arr:[],
    discounts:0,//优惠券金额
    location: 1,//是否第一次填写地址
    total_price: 2180,//单项金额
    price: 2180,//应付金额
    payment_amount: 200,//单项定金
    amount: 200,//应付定金
    final_payment: 1980,//单项尾款
    payment: 1980,//应付尾款
    discount_coupon: 0,//是否有优惠券
    integral: 1,//是否有积分
    integral_botton: false,//是否使用积分抵扣
    detail: 1,//购买数量
    submit_order: 0,//提交订单与去支付
    total_payment: 0,//是否为0分期1限时,1团购,2全款
    group_purchase: 0,//团购
    time_limit: 0,//限时
    totalPrice: 0,//总价格
    deal: 0,//应付
    youhui:60
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(options)
    let total_payment = this.data.total_payment
    if (options.total_payment == 1) {
      total_payment = options.total_payment
    }
    console.log(total_payment)
    let arr = JSON.parse(options.arr)
    console.log(arr)
    this.setData({
      arr,
      totalPrice: options.totalPrice,
      total_payment,
      group_purchase: options.group_purchase,
      time_limit: options.time_limit
    })
    console.log(total_payment)


    if (this.data.total_payment == 0) {
      let arr = this.data.arr;
      console.log(arr)
      // 声明一个变量接收数组列表price
      let total = 0;
      let total1 = 0;
      let total2 = 0;
      let deal = 0;
      // 循环列表得到每个数据
      for (let i = 0; i < arr.length; i++) {
        // 判断选中计算价格
        if (arr[i].selected && arr[i].type == 0) {
          // 所有价格加起来 count_money
          deal += arr[i].num * arr[i].deal
          total1 += arr[i].num * arr[i].price;
          total1 = total1 - deal
        } else if (arr[i].selected && arr[i].type == 1){
          total2 += arr[i].num * arr[i].price;
          console.log(total2)
        }
      }
       
      
      // 最后赋值到data中渲染到页面
      console.log(deal)
      this.setData({
        arr: arr,
        totalPrice: total.toFixed(2),
        deal: deal + total2,
        totalPrice: deal + total2
      });
    }
  },

  onChange: function (e) {
    // let that = this
    // let detail = e.detail
    // let payment_amount = that.data.payment_amount
    // let total_price = that.data.total_price
    // let final_payment = that.data.final_payment
    // let price = total_price * detail
    // let amount = payment_amount * detail
    // let payment = final_payment * detail
    // that.setData({
    //   price,
    //   amount,
    //   payment,
    //   detail
    // })

    console.log(e)
    let arr = this.data.arr;
    let detail = e.detail
    let index = e.currentTarget.dataset.index;
    let total_payment = this.data.total_payment
    let deal = arr[index].deal
    if (total_payment == 0) {
      arr[index].num = detail;
      arr[index].deal = arr[index].numdeal*detail
      if (arr[index].type==0){
        arr[index].totalPrice = (arr[index].price - arr[index].numdeal) * detail;
      } else if (arr[index].type == 1){
        arr[index].totalPrice = arr[index].price * detail;
      }
      
      this.setData({
        arr
      });
      this.count_price();
    } else if (total_payment == 1){
      arr[index].num = detail;
      arr[index].totalPrice = arr[index].price * detail;
      this.setData({
        arr
      });
      this.count_price();
    }


  },


  count_price() {//计算总价格
    // 获取商品列表数据
    if (this.data.total_payment == 1) {
      let arr = this.data.arr;
      // 声明一个变量接收数组列表price
      let total = 0;
      // 循环列表得到每个数据
      for (let i = 0; i < arr.length; i++) {
        // 判断选中计算价格
        if (arr[i].selected) {
          // 所有价格加起来 count_money

          total += arr[i].num * arr[i].price;
        }
      }
      // 最后赋值到data中渲染到页面
      this.setData({
        arr: arr,
        totalPrice: total.toFixed(2)
      });
    } else if (this.data.total_payment == 0) {
      let arr = this.data.arr;
      console.log(arr)
      // 声明一个变量接收数组列表price
      let total = 0;
      let total1 = 0;
      let total2 = 0;
      let deal = 0;
      // 循环列表得到每个数据
      for (let i = 0; i < arr.length; i++) {
        // 判断选中计算价格
        if (arr[i].selected && arr[i].type == 0) {
          // 所有价格加起来 count_money
          deal += arr[i].num * arr[i].numdeal
          total1 += arr[i].num * arr[i].price;
          total1 = total1 - deal
        } else if (arr[i].selected && arr[i].type == 1) {
          total2 += arr[i].num * arr[i].price;
          console.log(total2)
        }
      }


      // 最后赋值到data中渲染到页面
      console.log(deal)
      this.setData({
        arr: arr,
        totalPrice: total.toFixed(2),
        deal: deal + total2
      });
    }

  },


  submit_order: function () {
    let that = this
    let totalPrice = this.data.totalPrice
    let deal = this.data.deal
    console.log(deal)
    let submit_order = that.data.submit_order
    let discounts = that.data.discounts
    let integral = 0
    let integral_botton = that.data.integral_botton
    if (integral_botton){
      integral = 10
    }
    let arr = that.data.arr
    let arrList = []
    let max = {price:0,index:0}
    arr.forEach((item,index)=>{
      arrList.push(item.totalPrice)
    })
    arrList.map((item,index)=>{
      if (item > max.price){
        max = { price: item, index }
      }
    })
    arr[max.index].totalPrice = arr[max.index].totalPrice - integral - discounts
    console.log(arr)

    // arr.forEach((item, index) => {
    //   if (max == item.totalPrice){
    //     item.totalPrice = item.totalPrice-60
    //     console.log(item)
    //   }
    // })
    
    console.log(arrList)
    wx.setNavigationBarTitle({
      title: '确认订单'
    })
    
    console.log(deal)
    that.setData({
      deal,
      totalPrice: totalPrice ,
      submit_order: 1,
      arr
    })
  },

  integral_button: function () {
    this.setData({
      integral_botton: !this.data.integral_botton
    })
    let integral_botton = this.data.integral_botton
    if (integral_botton==true){
      this.setData({
        deal: this.data.deal - 10,
        totalPrice: this.data.totalPrice-10
      })
    } else if (integral_botton == false){
      this.setData({
        totalPrice: this.data.totalPrice + 10,
        deal: this.data.deal + 10
      })
    }
  },

  payment_button: function () {
    let that = this
    let total_payment = that.data.total_payment
    let group_purchase = that.data.group_purchase
    if (total_payment == 1 && group_purchase == 1) {
      wx.navigateTo({
        url: '../inviteFriend/inviteFriend',
      })
    } else if (total_payment == 1 || total_payment == 0 || group_purchase == 0) {
      wx.navigateTo({
        url: '../paid/paid',
      })
    }

  },

  diszi: function () {
    if (this.data.submit_order == 0) {
      wx.navigateTo({
        url: '../location/location?ding='+1,
      })
    }


  },


  discount: function () {
    wx.navigateTo({
      url: '/pages/discount/discount?type='+1,
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
    let discounts = this.data.discounts
    this.setData({
      deal: this.data.totalPrice - discounts
    })
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