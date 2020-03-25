import {
  msg,
  success
} from "../../utils/util";
import {
  deal,
  register,
  getSms,
  areaData,
  shopParticipate
} from "../../utils/api";
import {
  wxParse
} from "../../wxParse/wxParse.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDeal: false,
    isCheck: false,
    name: '',
    phone: '',
    poster: ''
  },
  onShow: function() {
    let that = this;
    shopParticipate({//加盟协议、描述
      success: function (res) {
        console.log(res)
        that.setData({
          poster: res.data.shop_join_poster
        })
        wxParse('content', 'html', res.data.shop_join_agreement, that, 10);//小店加盟协议
        wxParse('contents', 'html', res.data.shop_join_desc, that, 10); //小店加盟描述
      },
      fail: function (e) {
      }
    })
    // deal({
    //   success: function(res) {
    //     console.log(res)
    //     wxParse('content', 'html', res.data, that, 10);
    //   },
    //   fail: function(e) {
    //     wxParse('content', 'html', '<p>暂无数据</p>', that, 10);
    //   }
    // });
  },
  openDeal: function() { //进入协议
    this.setData({
      showDeal: true
    })
  },
  offDeal: function() { //关闭协议
    this.setData({
      showDeal: false
    })
  },
  confirm: function(e) { //同意协议
    this.setData({
      isCheck: true,
      showDeal: true
    })
  },
  cancel: function() { //不同意用户协议
    this.setData({
      isCheck: false,
      showDeal: false
    })
  },
  phoneFun(e) {//输入电话号码
    this.setData({
      phone: e.detail.value
    })
  },
  protocol(){
    this.setData({
      isCheck: !this.data.isCheck
    })
  },
  nameFun(e) {//输入姓名
    this.setData({
      name: e.detail.value
    })
  },
  submit() {
    if (!(/^1[3456789]\d{9}$/.test(this.data.phone))) {//匹配输入的是否为手机号码格式
      msg("手机号码有误，请重填");
      return false;
    }
    if (this.data.isCheck == true) {
      let data = {
        phone: this.data.phone,
        name: this.data.name
      }
      shopParticipate({
        method: "POST",
        data: data,
        success: function(res) {
          if (res.code == 200) {
            wx.showLoading({
              title: '提交成功',
            })
            setTimeout(function() {
              wx.hideLoading();
              wx.switchTab({
                url: '/pages/mine/mine',
              })
            }, 2000)
          }
        },
        fail: function(e) {
          console.log(e)
        }
      })
    }else{
      msg("必须同意协议才能申请小店服务");
    }
  },
})