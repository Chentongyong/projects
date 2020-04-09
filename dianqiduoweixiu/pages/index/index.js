//index.js
//获取应用实例
const app = getApp()
Page({
  
  data: {
    time: 30 * 60 * 60 * 1000,
    time1: 48 * 60 * 60 * 1000,
    zhisiIndex: 0,
    sortingIndex: 0,//底部商品优先tab栏
   location_img:"../../images/location.png",
    search_img:"../../images/icon-ss.png",
    check:"../../images/check_more.png",
   carousel:[
     "../../images/carousel.png",
     "../../images/carousel.png",
     "../../images/carousel.png",
   ],
  //  tabs栏
   tabs:[
    {
       src: "../../images/tabs1.png",
       name:"京东商城",
       url:'/pages/tabs/tabs'
    },
     {
       src: "../../images/tabs2.png",
       name: "线下直销",
       url: '/pages/tabs/tabs'
     },
     {
       src: "../../images/tabs3.png",
       name: "全程服务",
       url: '/pages/tabs/tabs'
     },
     {
       src: "../../images/tabs4.png",
       name: "三包保障",
       url: '/pages/appointment/appointment'
     },
   ],
  //  navigation栏
    naviList:[
      {
        src:'../../images/navi1.png',
        tabs:"弥散机",
      },
      {
        src: '../../images/navi2.png',
        tabs: "便携机",
      },
      {
        src: '../../images/navi3.png',
        tabs: "零配件",
      },
      {
        src: '../../images/navi4.png',
        tabs: "服务预约",
      },
    ],
    info:'近期我们公司将会有一个限时优惠抢购优惠活动，敬请期待。',
    // 立即购买推荐商品
    buy_soon_intro:[
      {
        src:'../../images/goods1.png',
        goods_name:"制氧机3L家用制氧机",
        goods_detail:"制氧+雾化，带雾化老人和孕妇医用分子筛氧气机 3L家用制氧机",
        before:'3000',
        num:'666',
        now:"2180",
      },
      // 排列方式
      
    ],
    // 立即购买商品列表
    buy_soon_list: [
      {
        src:'../../images/goods2.png',
        name:'制氧机3L家用吸氧机',
        price:"2180",
        num:"666",
    },
      {
        src: '../../images/goods2.png',
        name: '制氧机3L家用吸氧机',
        price: "2180",
        num: "666",
      },
    ],
    sorting:[
      "全部商品","销量优先","价格优先","好评优先"
    ],
    buy_soon_list2: [
      {
        src: '../../images/goods2.png',
        name: '制氧机3L家用吸氧机',
        price: "2180",
        num: "666",
      },
      {
        src: '../../images/goods2.png',
        name: '制氧机3L家用吸氧机',
        price: "2180",
        num: "666",
      }, {
        src: '../../images/goods2.png',
        name: '制氧机3L家用吸氧机',
        price: "2180",
        num: "666",
      },
      {
        src: '../../images/goods2.png',
        name: '制氧机3L家用吸氧机',
        price: "2180",
        num: "666",
      }, {
        src: '../../images/goods2.png',
        name: '制氧机3L家用吸氧机',
        price: "2180",
        num: "666",
      },
      {
        src: '../../images/goods2.png',
        name: '制氧机3L家用吸氧机',
        price: "2180",
        num: "666",
      }, {
        src: '../../images/goods2.png',
        name: '制氧机3L家用吸氧机',
        price: "2180",
        num: "666",
      },
      {
        src: '../../images/goods2.png',
        name: '制氧机3L家用吸氧机',
        price: "2180",
        num: "666",
      },
    ],
    sorting: [ 
      "全部商品", "销量优先", "价格优先", "好评优先"
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    console.log(app.globalData.map)
    // wx.request({
    //   url: 'https://dqwx.my8m.com/api/shop/index/store',
    //   data: {
    //     page:1,
    //     size:10,
    //     keyword: '',
    //     lng: "113.4025580000",	//	经纬度
    //     lat: "23.1142330000"	//	经纬度
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success(res) {
    //     console.log(res)
    //   }
    // })

    console.log(options)
    let name = wx.getStorageSync('name')
    this.setData({
      name
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },


  normal_zix:function(){
    wx.navigateTo({
      url: '/pages/InformationData/InformationData',
    })
  },

  zhisi:function(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      zhisiIndex:index
    })
  },

  chan:function(e){
    let zhisiIndex = e.detail.current
    this.setData({
      zhisiIndex
    })
  },


  location_box:function(){
    wx.navigateTo({
      url: '/pages/select_store/select_store',
    })
  },

  navi:function(e){//导航
    let that = this
    console.log(e)
    let index = e.currentTarget.dataset.index
    if (index == 0) {
      wx.setStorageSync('navIndex', '2')
      wx.reLaunch({
        url: '/pages/classify/classify'
      })
    } else if(index == 1){
      wx.setStorageSync('navIndex', '3')
      wx.reLaunch({
        url: '/pages/classify/classify'
      })
    } else if(index == 2){
      wx.setStorageSync('navIndex', '4')
      wx.reLaunch({
        url: '/pages/classify/classify'
      })
    }else if(index == 3){
      wx.navigateTo({
        url:'../appointment/appointment'
      })
    }
  },


  search:function(){
    wx.navigateTo({
      url: '../search/search'
    })
  },


  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  recommend_more:function(){ //推荐产品查看更多
    wx.navigateTo({
      url: '../moreRecommended/moreRecommended?zt='+0,
    })
  },
  check_more:function(){
    wx.navigateTo({
      url: '../moreRecommended/moreRecommended?zt=' + 1,
    })
  },
  dint_more: function () {
    wx.navigateTo({
      url: '../moreRecommended/moreRecommended?zt=' + 2,
    })
  },

  check_more_box:function(){
   wx.switchTab({
     url: '../information/information',
   })
  },

  product:function(){//跳转普通产品类型
    wx.navigateTo({
      url: '../detailPage/detailPage',
    })
  },
  time_limit: function () {//跳转限时产品类型
    wx.navigateTo({
      url: '../detailPage/detailPage?time_limit='+1,
    })
  },
  group: function () {//跳转团购产品类型
    wx.navigateTo({
      url: '../detailPage/detailPage?group_purchase=' + 1,
    })
  },

  sorting:function(e){
    let that = this
    let index = e.currentTarget.dataset.index
    that.setData({
      sortingIndex:index
    })
  }
})
