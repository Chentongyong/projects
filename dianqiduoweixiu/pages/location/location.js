// pages/location/location.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wimgIndex:0,
    list: [
      { name: '拓冠科技1',chiku:'广东省 - 广州市 - 天河区', phone: '17656464656', dizi: '广州市天河区前进街道东英商务园D栋211-212',index:'' },
      { name: '拓冠科技2',chiku:'广东省 - 广州市 - 天河区', phone: '17656464656', dizi: '广州市天河区前进街道东英商务园D栋211-212',index:'' },
      { name: '拓冠科技3',chiku:'广东省 - 广州市 - 天河区', phone: '17656464656', dizi: '广州市天河区前进街道东英商务园D栋211-212',index:'' },
      { name: '拓冠科技4',chiku:'广东省 - 广州市 - 天河区', phone: '17656464656', dizi: '广州市天河区前进街道东英商务园D栋211-212',index:'' },
      { name: '拓冠科技5',chiku:'广东省 - 广州市 - 天河区', phone: '17656464656', dizi: '广州市天河区前进街道东英商务园D栋211-212',index:'' }
    ],
    img: ['/images/icon/select.png', '/images/my-icon/accomplish.png'],
    ding: 0,//是否从购物车跳转选取
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let ding=0
    if(options.ding){ding = options.ding}
    this.setData({ding})
  },

  tanjia: function () {
    let list = this.data.list
    list = JSON.stringify(list)
    wx.navigateTo({
      url: '../addLocation/addLocation?list='+list+'&zt='+0,
    })
  },

  wimg:function(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      wimgIndex:index
    })
  },

  del:function(e){
    let index = e.currentTarget.dataset.index
    let list = this.data.list
    list.splice(index,1)
    this.setData({
      list
    })
  },

  bianji:function(e){
    let index = e.currentTarget.dataset.index
    let list = this.data.list
    let data = list[index]
    data.index = index
    list = JSON.stringify(list)
    data = JSON.stringify(data)
    wx.navigateTo({
      url: '/pages/addLocation/addLocation?data='+data+"&list="+list+'&zt='+1,
    })
  },

  ding:function(e){
    let ding = this.data.ding
    if(ding != 0){
      let index = e.currentTarget.dataset.index
      let list = this.data.list
      let data = list[index]
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
        data: data
      })
      console.log(pages, prevPage)
      wx.navigateBack({
        delta: 1
      })
    }
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