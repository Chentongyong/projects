// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history_data:[],
    hotSearch_data:[
      '空气净化器',
      '空调',
      '电视',
      '洗衣机',
      '电脑',
      '洗衣机',
      '空气净化器',
      '空调',
      '电视',
      '电脑',
    ],
    searchData:[
      { titlo: '制氧机3L家用吸氧机', describe: "制氧+雾化，带雾化老人孕妇医用分子筛氧气机 3L家用制氧机",src:'../../images/goods1.png', money: '2180', sales: '666' },
      { titlo: '制氧机3L家用吸氧机', describe: "制氧+雾化，带雾化老人孕妇医用分子筛氧气机 3L家用制氧机", src: '../../images/goods1.png', money: '2180', sales: '666' },
      { titlo: '制氧机3L家用吸氧机', describe: "制氧+雾化，带雾化老人孕妇医用分子筛氧气机 3L家用制氧机", src: '../../images/goods1.png', money: '2180', sales: '666' },
      { titlo: '制氧机3L家用吸氧机', describe: "制氧+雾化，带雾化老人孕妇医用分子筛氧气机 3L家用制氧机", src: '../../images/goods1.png', money: '2180', sales: '666' },
      { titlo: '制氧机3L家用吸氧机', describe: "制氧+雾化，带雾化老人孕妇医用分子筛氧气机 3L家用制氧机", src: '../../images/goods1.png', money: '2180', sales: '666' },
      { titlo: '制氧机3L家用吸氧机', describe: "制氧+雾化，带雾化老人孕妇医用分子筛氧气机 3L家用制氧机", src: '../../images/goods1.png', money: '2180', sales: '666' },
      { titlo: '制氧机3L家用吸氧机', describe: "制氧+雾化，带雾化老人孕妇医用分子筛氧气机 3L家用制氧机", src: '../../images/goods1.png', money: '2180', sales: '666' },
      { titlo: '制氧机3L家用吸氧机', describe: "制氧+雾化，带雾化老人孕妇医用分子筛氧气机 3L家用制氧机", src: '../../images/goods1.png', money: '2180', sales: '666' },
      { titlo: '制氧机3L家用吸氧机', describe: "制氧+雾化，带雾化老人孕妇医用分子筛氧气机 3L家用制氧机", src: '../../images/goods1.png', money: '2180', sales: '666' },
    ],
    search:0,
    search_val:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let history_data = wx.getStorageSync("history_data")
    if (history_data!==''){
      this.setData({
        history_data
      })
    }
    
    
  },

  search_start:function(e){//确认搜索
    let that = this
    let value = ''
    console.log(e)
    if(typeof(e)=="string"){
      value = e 
      console.log(value)
    }else{
      value = e.detail.value
    }
    
    let search = that.data.search
    let history_data = that.data.history_data
    if(value!=""){
      that.setData({
        search: 1
      })
    }
    if (history_data.length<=10){
      history_data.unshift(value)
      history_data = [...new Set(history_data)]
      wx.setStorageSync('history_data', history_data)

      that.setData({
        history_data
      })
      console.log(that.data.history_data)
    }
    if (history_data.length>=9){
      history_data.pop()
      history_data.unshift(value)
      history_data=[...new Set(history_data)]
      wx.setStorageSync('history_data', history_data)
      that.setData({
        history_data
      })
    }
  },

  search_import:function(){
    this.setData({
      search:0,
      search_val:''
    })
  },


  recommend:function(e){//推荐搜索
    let that = this 
    let index = e.currentTarget.dataset.index
    let hotSearch_data = that.data.hotSearch_data
    let search_val = hotSearch_data[index]
    that.setData({
      search_val
    })
    that.search_start(search_val)
  },

  history:function(e){
    let that = this
    let index = e.currentTarget.dataset.index
    let history_data = that.data.history_data
    let search_val = history_data[index]
    that.setData({
      search_val
    })
    that.search_start(search_val)
  },

  result:function(){
    wx.navigateTo({
      url: '../detailPage/detailPage',
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