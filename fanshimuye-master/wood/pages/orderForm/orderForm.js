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
    // tab_tonh: 0,
    tab_tonh: 1,
    list1: [
      {
        create_at: "2020-02-12 14:59:49",
        goods: [
          {
            good_id: 257,
            num: 1,
            order_good_id: 109,
            price: "35.00",
            spec_img: "https://wood.my8m.com/upload/thumb/21ab241f23e1f4bf94ee746d5433fd06276x276.jpg",
            spec_name: "型号:超级C,厚度:12mm,计价单位:㎡",
            title: "超级C 强化复合木地板",
            }
        ],
        
        id: 109,
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
            order_good_id: 109,
            price: "35.00",
            spec_img: "https://wood.my8m.com/upload/thumb/21ab241f23e1f4bf94ee746d5433fd06276x276.jpg",
            spec_name: "型号:超级C,厚度:12mm,计价单位:㎡",
            title: "超级C 强化复合木地板",
          }
        ],
        id: 109,
        order_no: "2019-11-27 12:00:00",
        pay_type: 3,
        pt_id: 0,
        spell_num: 0,
        status: 2,
        total_price: "35.00",
        type: null,
      }
    ],
    list: [],
    turnover:'',
    time:'',
    time2:'',
    page:1,
    size:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    
  },

  storeOrderList:function(){
    let that = this
    let page = this.data.page
    let size = this.data.size
    let tab_tonh = this.data.tab_tonh
    let time = this.data.time
    let time2 = this.data.time2
    storeOrderList({
      data:{
        page,
        size,
        status: tab_tonh,
        start_date: time,
        end_date: time2
      },
      success:function(res){
        that.setData({
          list:res.data
        })
      }
    })
  },
  pay:function(e){

    let goods = e.currentTarget.dataset.goods
    let id = e.currentTarget.dataset.id
    let list = []
    goods.forEach(item=>{
      list.push({ spec_id: item.spec_id,num:item.num})
    })
    
    wx.setStorageSync('order', {
     data:list
    });
    wx.navigateTo({
      url: '/pages/confirmOrder/confirmOrder?type=' + 0 +'&store_order_id=' +id,
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
    this.setData({//切换订单状态，清空list
      list:[]
    })
    let type = e.currentTarget.dataset.type
    let tab_tonh = type
    this.setData({
      tab_tonh: type,
      page:1
    })
    this.storeOrderList()
  },
  onShow: function () {
    let that = this
    that.setData({
      page:1
    })
    that.storeOrderList()
    storeMoney({
      success:function(res){
        that.setData({
          turnover: res.data
        })
      }
    })
  }
})