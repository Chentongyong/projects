// pages/discover/discover.js
import {
  friendsList,
  friendsLike,
  deleteMessage

} from "../../utils/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist: [{
        src: '/static/images/case_01.jpg',
        txt: '有设计感又有舒适感。对于一体型沙发来说这个价格性价...',
        name: "拓冠科技",
        img: "/static/images/avatar.jpg",
        hent: 66
      },
      {
        src: '/static/images/case_01.jpg',
        txt: '有设计感又有舒适感。对于一体型沙发来说这个价格性价...',
        name: "拓冠科技",
        img: "/static/images/avatar.jpg",
        hent: 66
      },
      {
        src: '/static/images/case_01.jpg',
        txt: '有设计感又有舒适感。对于一体型沙发来说这个价格性价...',
        name: "拓冠科技",
        img: "/static/images/avatar.jpg",
        hent: 66
      },
      {
        src: '/static/images/case_01.jpg',
        txt: '有设计感又有舒适感。对于一体型沙发来说这个价格性价...',
        name: "拓冠科技",
        img: "/static/images/avatar.jpg",
        hent: 66
      },
      {
        src: '/static/images/case_01.jpg',
        txt: '有设计感又有舒适感。对于一体型沙发来说这个价格性价...',
        name: "拓冠科技",
        img: "/static/images/avatar.jpg",
        hent: 66
      },
      {
        src: '/static/images/case_01.jpg',
        txt: '有设计感又有舒适感。对于一体型沙发来说这个价格性价...',
        name: "拓冠科技",
        img: "/static/images/avatar.jpg",
        hent: 66
      },
      {
        src: '/static/images/case_01.jpg',
        txt: '有设计感又有舒适感。对于一体型沙发来说这个价格性价...',
        name: "拓冠科技",
        img: "/static/images/avatar.jpg",
        hent: 66
      },
      {
        src: '/static/images/case_01.jpg',
        txt: '有设计感又有舒适感。对于一体型沙发来说这个价格性价...',
        name: "拓冠科技",
        img: "/static/images/avatar.jpg",
        hent: 66
      },
    ],
    list1: [],
    list2: [],
    tab: 0,
    page:1,
    size:8,
    datalist:[],
    showExecute:true,
    issue:true,
    scene:true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let scene = wx.getStorageSync('showExecute')
    if (scene==true) {//判断是否通过扫码进入
      this.setData({
        scene:true
      })
    }else{
      this.setData({
        scene: false
      })
    }
  },
  friendsList:function(){
    let that = this
    let tab = this.data.tab
    if (tab == 0){
      tab = 1
    } else if (tab == 1){
      tab = 0
    }
    let page = that.data.page
    friendsList({
      data:{
        type:tab,
        page,
        size:that.data.size
      },
      success:function(res){
        let datalist = res.data
        let list1 = []
        let list2 = []
        datalist.forEach((item, index) => {
          if (index % 2 == 0) {
            list1.push(item)
          } else if (index % 2 == 1) {
            list2.push(item)
          }
        })
        that.setData({
          datalist,
          list1,
          list2,
          page:page+1
        })
      }
    })
  },
  discover: function(e) {
    let type = e.currentTarget.dataset.type
    this.setData({
      datalist: [],
      list1:[],
      list2:[],
      page: 1,
      tab: type,
    })
    this.friendsList()
    
  },
  l_img: function(e) {
    let index = e.currentTarget.dataset.index
    let datalist = this.data.datalist
    let that = this
    let id = datalist[index].id
    friendsLike({
      method: 'post',
      data: {
        id
      },
      success: function (res) {
        that.setData({
          page: 1
        })
        that.friendsList()
      }
    })
  },
  issue: function() {
    if (this.data.issue){
      this.setData({
        issue: false
      })
      wx.navigateTo({
        url: '/pages/issue/issue',
      })
    }
    
  },
  love_boxOne: function (e) {
    let index = e.currentTarget.dataset.index
    let list1 = this.data.list1
    let that = this
    let id = list1[index].id
    friendsLike({
      method: 'post',
      data: {
        id
      },
      success: function (res) {
        that.setData({
          page:1
        })
        that.friendsList()
      }
    })
  },
  love_boxtow: function (e) {
    let index = e.currentTarget.dataset.index
    let list2 = this.data.list2
    let that = this
    let id = list2[index].id
    friendsLike({
      method: 'post',
      data: {
        id
      },
      success: function (res) {
        that.setData({
          page: 1
        })
        that.friendsList()
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // let showExecute = wx.getStorageSync('showExecute')
    // this.setData({
    //   showExecute
    // })
    // this.setData({
    //   page:1,
    //   issue:true
    // })
    this.friendsList()
  },
  remove(e){//店主删除朋友圈消息
  let _this = this
    // console.log(e.currentTarget.dataset.id)
    let ind = e.currentTarget.dataset.ind;
    // let datalist = this.data.datalist
    deleteMessage({
      method: 'delete',
      data: {
        id: e.currentTarget.dataset.id
      },
      success: function (res) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })
        // datalist.splice(ind,1)
        _this.setData({
          datalist: res.data
        })
        console.log(res)
      }
    })
  }
})