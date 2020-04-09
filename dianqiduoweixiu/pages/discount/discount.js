 // pages/discount/discount.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:0,
    tab:['全部','待使用','已使用','已过期'],
    dataList: [
      { jine: '100', yaoqiu: '1000', qixian: '2019.11.30 - 2019.12.30', zt: 0 },
      { jine: '100', yaoqiu: '1000', qixian: '2019.11.30 - 2019.12.30', zt: 0 },
      { jine: '100', yaoqiu: '1000', qixian: '2019.11.30 - 2019.12.30', zt: 0 },
      { jine: '100', yaoqiu: '1000', qixian: '2019.11.30 - 2019.12.30', zt: 2 },
      { jine: '100', yaoqiu: '1000', qixian: '2019.11.30 - 2019.12.30', zt: 1 },
      { jine: '100', yaoqiu: '1000', qixian: '2019.11.30 - 2019.12.30', zt: 1 },
      { jine: '100', yaoqiu: '1000', qixian: '2019.11.30 - 2019.12.30', zt: 2 }
    ],
    data: [
      { jine: '80', yaoqiu: '800', qixian: '2019.11.30 - 2019.12.30', zt: 0 },
      { jine: '80', yaoqiu: '500', qixian: '2019.11.30 - 2019.12.30', zt: 0 },
      { jine: '100', yaoqiu: '1000', qixian: '2019.11.30 - 2019.12.30', zt: 0 },
      { jine: '100', yaoqiu: '1000', qixian: '2019.11.30 - 2019.12.30', zt: 2 },
      { jine: '100', yaoqiu: '1000', qixian: '2019.11.30 - 2019.12.30', zt: 1 },
      { jine: '100', yaoqiu: '1000', qixian: '2019.11.30 - 2019.12.30', zt: 1 },
      { jine: '100', yaoqiu: '1000', qixian: '2019.11.30 - 2019.12.30', zt: 2 }
    ],
    tabIndex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type
    this.setData({
      type
    })
  },
  
  tab:function(e){
    let that = this
    let index = e.currentTarget.dataset.index
    let data = [...that.data.dataList]
    let dataList = that.data.dataList
    let arr=[]
    if(index == 0){
      that.setData({
        data:dataList
      })
    }else if (index == 1){
      data.forEach(function(item){
        if(item.zt==0){
          arr.push(item)
        }
      })
      that.setData({
        data:arr
      })
    }else if (index == 2) {
      data.forEach(function (item) {
        if (item.zt == 1) {
          arr.push(item)
        }
      })
      that.setData({
        data: arr
      })
    } else if (index == 3) {
      data.forEach(function (item) {
        if (item.zt == 2) {
          arr.push(item)
        }
      })
      that.setData({
        data: arr
      })
    }
    that.setData({
      tabIndex:index
    })
  },
  type: function (e) {//选择优惠
    let type = this.data.type
    let index = e.currentTarget.dataset.index
    let data = this.data.data
    let jine = data[index].jine
    let zt = data[index].zt
    if (type != 0 && zt == 0) {
      console.log(index)
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
        discounts: jine,
        discount_coupon:1
      })
      console.log(pages, prevPage)
      wx.navigateBack({
        delta: 1
      })
    }else{
      wx.showToast({
        title: '请选择有效的优惠卷',
        icon: 'none',
        duration: 2000,
        
      })
    }
  },

  no_use:function(){
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
      discounts: 0,
      discount_coupon: 0
    })
    console.log(pages, prevPage)
    wx.navigateBack({
      delta: 1
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