// pages/group/group.js
import {
  activityBanner,
  spellGood,
  seckillGood
} from "../../utils/api";
import {
  msg,
} from "../../utils/util";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    size:8,
    list:[],
    tab:0,
    tab_aeo: 0,
    activity_time:'',
    time:'',
    seckill_id:0,
    img:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let that = this
    let page = this.data.page
    let size = this.data.size
     activityBanner({
       data:{
         type:1
       },
       success:function(res){
        //  console.log(res)
         that.setData({
           img: res.data
         })
       }
    })
    if (options.type == 0){
      this.spellGood()
    } else if (options.type == 1){
      this.seckillGood()
    }
    
    this.setData({
      tab:options.type
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  tab_0:function(e){
    let that =this 
    let type = e.currentTarget.dataset.type
    let page = 1
    let size = this.data.size
    activityBanner({
      data: {
        type: (+type+1)
      },
      success: function (res) {
        // console.log(res)
        that.setData({
          img: res.data
        })
      }
    })
    this.setData({
      tab: type,
      page: 1,
      list:[]
    })
    // console.log(this.data.list)
    if(type == 0){
      this.spellGood()
    }else if(type == 1){
      this.seckillGood()
    }
    
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
  spellGood:function(){
    let that = this
    let tab = this.data.tab
    let page = this.data.page
    let list = this.data.list
    spellGood({
      data:{
        page,
        size:8
      },
      success:function(res){
        if(res.data.length == 0){
          msg('没有更多了');
        }
        list = list.concat(res.data)
        that.setData({
          list,
          page: page+1
        })
      }
    })
  },
  seckillGood:function(){
    let that = this
    let page = this.data.page
    let tab_aeo = this.data.tab_aeo
    let list = this.data.list
    clearInterval(this.data.times)
    seckillGood({
      data: {
        type: (+tab_aeo+1),
        page:page,
        size: this.data.size
      },
      success: function (res) {
        if (res.data.good.length == 0) {
          msg('没有更多了');
          
        }
        list = list.concat(res.data.good)
        that.setData({
          list,
          activity_time: res.data.activity_time,
          seckill_id: res.data.seckill_id,
          page: page + 1,
        })
        // console.log(that.data.seckill_id)
        that.timeOut()
      }
    })
  },
  stanto:function(e){
    

    this.setData({
      tab_aeo: e.currentTarget.dataset.tab,
      page:1,
      list:[],
    })
    this.seckillGood()
    
  },
  timeOut:function(){
    let activity_time = this.data.activity_time.replace(/-/g, '/')
    // console.log(activity_time)
    let date = new Date()
    date = date.getTime()
    let activityDate = new Date(activity_time)
    let dateTime = activityDate.getTime()
    let count_down = dateTime - date
    let down = count_down
    let time = ''

    this.data.times = setInterval(() => {
      if (count_down > 0) {
        count_down -= 1000
        time = this.countdown(count_down)

        this.setData({
          time
        })
      } else {
        clearInterval(this.data.times)
        
        
      }
    }, 1000)
  },

  countdown: function (_t) {

    var _result = {


      hour: 0,

      minue: 0,

      sec: 0

    }

    if (_t > 0) {

      _result.hour = Math.floor(_t / 1000 / 60 / 60 ) < 10 ? '0' + Math.floor(_t / 1000 / 60 / 60 % 24).toString() : Math.floor(_t / 1000 / 60 / 60 ).toString();

      _result.minue = Math.floor(_t / 1000 / 60 % 60) < 10 ? '0' + Math.floor(_t / 1000 / 60 % 60).toString() : Math.floor(_t / 1000 / 60 % 60).toString();

      _result.sec = Math.floor(_t / 1000 % 60) < 10 ? '0' + Math.floor(_t / 1000 % 60).toString() : Math.floor(_t / 1000 % 60).toString();

    }

    return _result;

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
    let tab = this.data.tab
    if(tab == 0){
      this.spellGood()
    } else if (tab == 1){
      this.seckillGood()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})