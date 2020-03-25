// pages/orderForm/orderForm.js
import {
  storeMoney,
  storeOrderList
} from "../../utils/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_tonh: 0,
    list1: [
      {
        create_at: "2020-02-12 14:59:49",
        goods: [
          {
            good_id: 257,
            num: 1,
            order_good_id: 282,
            price: "35.00",
            spec_img: "https://wood.my8m.com/upload/thumb/21ab241f23e1f4bf94ee746d5433fd06276x276.jpg",
            spec_name: "型号:超级C,厚度:12mm,计价单位:㎡",
            title: "超级C 强化复合木地板",
          }
        ],

        id: 282,
        order_no: "2019-11-27 12:00:00",
        pay_type: 3,
        pt_id: 0,
        spell_num: 0,
        status: 1,
        total_price: "35.00",
        type: null,
      },
      {
        create_at: "2020-02-12 14:59:49",
        goods: [
          {
            good_id: 257,
            num: 1,
            order_good_id: 283,
            price: "35.00",
            spec_img: "https://wood.my8m.com/upload/thumb/21ab241f23e1f4bf94ee746d5433fd06276x276.jpg",
            spec_name: "型号:超级C,厚度:12mm,计价单位:㎡",
            title: "超级C 强化复合木地板",
          }
        ],
        id: 283,
        order_no: "2019-11-27 12:00:00",
        pay_type: 3,
        pt_id: 0,
        spell_num: 0,
        status: 2,
        total_price: "35.00",
        type: null,
        list:[]
      }
    ],
    list: [],
    turnover: '',
    time: '',
    time2: '',
    page: 1,
    size: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



  },

  storeOrderList: function () {
    let that = this
    let page = this.data.page
    let size = this.data.size
    let tab_tonh = +this.data.tab_tonh + 1
    let time = this.data.time
    let time2 = this.data.time2
    let list = this.data.list
    storeOrderList({
      data: {
        page,
        size,
        status: tab_tonh,
        start_date: '',
        end_date: ''
      },
      success: function (res) {
        list.push(...res.data) 
        console.log(list)
        that.setData({
          list,
          page: page + 1
        })
      }
    })
  },

  bindDateChange: function (e) {
    this.setData({
      time: e.detail.value
    })
    this.storeOrderList()
  },
  bindDateChange2: function (e) {
    this.setData({
      time2: e.detail.value
    })
    this.storeOrderList()
  },

  tab_tonh: function (e) {
    let type = e.currentTarget.dataset.type
    let tab_tonh = type
    this.setData({
      tab_tonh: type,
      list:[],
      page: 1
    })
    this.storeOrderList()
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
    let that = this
    storeMoney({
      success: function (res) {
        that.setData({
          turnover: res.data
        })
      }
    })
    this.storeOrderList()
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
    this.storeOrderList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})