// pages/password/password.js
import {
  getSms,
  payPwd,
  getUserInfo
} from "../../utils/api"
import {
  msg,
} from "../../utils/util";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    verification: true,
    phone:'',
    code:'',
    password:'',
    password_confirm:'',
    time:0,
    phone:'',
    save:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    getUserInfo({
      success:function(res){
        that.setData({
           phone : res.data.phone
        })
      }
    })
  },
  phone_inp: function(e) {

    let value = e.detail.value
    this.setData({
      phone: value
    })
  },
  verification: function() {//获取验证码
    let phone = this.data.phone
    let that = this
    var reg = /^1[3456789][0-9]{9}$/;
    if (phone == '') {
      msg('请输入手机号码');
      return false
    }
    if (!reg.test(phone)) {
      msg("手机号码格式错误");
      return false
    }
    this.setData({
      verification: false
    })
    getSms({
      method:'post',
      data:{
        phone,
        type:4
      },
      success:function(res){
        let time = 60
        this.data.times = setInterval(()=>{
          time--
          that.setData({
            time
          })
          if (time==0){
            clearInterval(this.data.times)
          }
        },1000)
      }
    })
  },
  inp_verification:function(e){//验证码
    let value = e.detail.value
    this.setData({
      code:value
    })
  },
  password:function(e){//密码
    let value = e.detail.value
    this.setData({
      password: value
    })
  },
  password_confirm:function(e){//确认密码
    let value = e.detail.value
    this.setData({
      password_confirm: value
    })
  },

  save:function(){
    let phone = this.data.phone
    let code = this.data.code
    let password = this.data.password
    let password_confirm = this.data.password_confirm
    if (phone == '') {
      msg('请输入手机号码');
      return false
    }else if (code == '') {
        msg('请输入验证码');
        return false
    } else if (password == '') {
      msg('请输入密码');
      return false
    } else if (password_confirm == '') {
      msg('请再次输入密码');
      return false
    }
    this.setData({
      save:true
    })
    payPwd({
      method:'post',
      data:{
        code,
        password,
        password_confirm,
      },
      success:function(res){
        msg(res.msg);
        setTimeout(()=>{
          wx.navigateBack({
            delta: 1,
          })
        },2000)
        
      },
      fail: function (res) {
        
        if (res.msg) {
          msg(res.msg);
          return false
        }
        msg("未知错误");
      }
    })
  },
  service: function() {
    wx.navigateTo({
      url: '',
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