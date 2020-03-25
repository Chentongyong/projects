// pages/withdraw/withdraw.js
import {
  withdrawal, 
  getSms,
} from "../../utils/api.js"
import {
  msg
} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{},
    count_down:0,
    money:'',
    code:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  money_inp:function(e){
    this.setData({
      money:e.detail.value
    })
  },

  phone_inp: function (e) {
    this.setData({
      code: e.detail.value
    })
  },


  confirm:function(){
    let money = this.data.money
    let code = this.data.code
    console.log(money, code)
    withdrawal({
      method:'post',
      data:{
        money,
        code
      },
      success:function(res){
        if (res.code == 200){
          msg(res.msg)
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1,
            },2000)
          })
        }else{
          msg(res.msg)
          
        }
      }
    })
  },

  count_down:function(){
    let that = this
    let data = this.data.data
    let count_down = 60
    getSms({
      method:'post',
      data:{
        phone: data.phone,
        type:3
      },
      success:function(res){

      }
    })
    this.data.times = setInterval(()=>{
      count_down-=1
      this.setData({
        count_down
      })
      if (count_down == 0){
        clearInterval(this.data.times)
      }
    },1000)

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
    withdrawal({
      success:function(res){
        that.setData({
          data: res.data
        })
      }
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