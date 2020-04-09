// pages/select_store/select_store.js
const app = getApp()
import {
  shopList,
  shop
} from '../../utils/http'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inp: 0,
    search_img: "../../images/search.png",
    store: [{
        src: "../../images/store/store1.png",
        name: "门店名称",
        location: "广州市天河区前进街道东营商务园D栋211-212",
        distance: "距离345米",
      },
      {
        src: "../../images/store/store2.png",
        name: "门店名称",
        location: "广州市天河区前进街道东营商务园D栋211-212",
        distance: "距离345米",
      },
      {
        src: "../../images/store/store3.png",
        name: "门店名称",
        location: "广州市天河区前进街道东营商务园D栋211-212",
        distance: "距离345米",
      },
      {
        src: "../../images/store/store4.png",
        name: "门店名称",
        location: "广州市天河区前进街道东营商务园D栋211-212",
        distance: "距离345米",
      },
    ],
    mapJw: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.setData({
      mapJw: app.globalData.map
    })
    console.log(that.data.mapJw)
    shopList({
      data: {
        page: 1,
        size: 1,
        keyword: '',
        lng: that.data.mapJw[0], //经度
        lat: that.data.mapJw[1] //维度
      },
      success: function(res) {
        console.log(res)
      }
    })
  },
  store_list: function(e) {
    console.log(e)
    let that = this
    let index = e.currentTarget.dataset.index
    wx.setStorageSync('name', that.data.store[index].name)
    wx.reLaunch({
      url: '../index/index?storeData',
    })
  },


  inp: function() {
    this.setData({
      inp: !this.data.inp
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})