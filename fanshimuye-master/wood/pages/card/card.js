// pages/card/card.js
import {
  storeInfo
} from "../../utils/api.js"
import {
  msg
} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: '',
    time: '',
    time_end: '',
    business: {},
    store_name: '',
    name: '',
    phone: '',
    wechat: '',
    address: '',
    province: '',
    city: '',
    area: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  store_name: function(e) { //店铺名称
    this.setData({
      store_name: e.detail.value
    })
  },

  name: function(e) { //名字
    this.setData({
      name: e.detail.value
    })
  },

  phone: function(e) { //联系方式
    this.setData({
      phone: e.detail.value
    })
  },

  wechat: function(e) { //联系方式
    this.setData({
      wechat: e.detail.value
    })
  },

  address: function(e) {
    this.setData({
      address: e.detail.value
    })
  },

  storeInfo: function() { //请求名片数据
    let that = this
    let region = this.data.region
    let time = this.data.time
    let time_end = this.data.time_end
    storeInfo({
      success: function(res) {
        time = res.data.business_time
        time_end = res.data.close_store_time
        region = [res.data.province, res.data.city, res.data.area]
        that.setData({
          business: res.data,
          region,
          time,
          time_end
        })
      },
      fail: function(res) {
        msg(res.msg)
      }
    })
  },


  bindRegionChange: function(e) {
    let province = e.detail.value[0]
    let city = e.detail.value[1]
    let area = e.detail.value[2]
    this.setData({
      region: e.detail.value,
      province,
      city,
      area
    })
  },

  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value,
    })
  },

  bindTimeChange_end: function(e) {
    this.setData({
      time_end: e.detail.value
    })
  },


  affirm: function() {
    let time = this.data.time
    let time_end = this.data.time_end
    let store_name = this.data.store_name
    let name = this.data.name
    let phone = this.data.phone
    let wechat = this.data.wechat
    let address = this.data.address
    let province = this.data.province
    let city = this.data.city
    let area = this.data.area
    let business_time = time + '-' + time_end
    let close_store_time = time_end + '-' + time
    if (phone!=''){
      if (!(/^1[3456789]\d{9}$/.test(phone))) {//匹配输入的是否为手机号码格式
        msg("手机号码有误，请重填");
        return false;
      }
    }
    storeInfo({
      method: 'post',
      data: {
        store_name,
        name,
        phone,
        wechat,
        business_time,
        close_store_time,
        province,
        city,
        area,
        address
      },
      success: function(res) {
        console.log(res)
        msg(res.msg)
        wx: wx.navigateBack()
      },
      fail: function (e) {
        console.log('出错了')
      }
    })
  },
  onShow: function() {
    this.storeInfo()
  }
})