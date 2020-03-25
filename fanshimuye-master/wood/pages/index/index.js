import {
  msg
} from "../../utils/util";
import {
  getUserInfo,
  saveUserInfo,
  index,
  friendsList,
  bindStore,
  loginAt,
  friendsLike
} from "../../utils/api";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    cateList: [{
      logo: '../../static/icons/index_01.png',
      title: '拼团热区',
      link: '/pages/group/group?type=0'
    }, {
      logo: '../../static/icons/index_02.png',
      title: '新品发布',
      link: ''
    }, {
      logo: '../../static/icons/index_03.png',
      title: '购物清单',
      link: '/pages/cart/cart'
    }, {
      logo: '../../static/icons/index_04.png',
      title: '推荐有礼',
      link: '/pages/poster/poster'
    },
    {
      logo: '../../static/icons/index_05.png',
      title: '限时秒杀',
      link: '/pages/group/group?type=1'
    }
    ],
    toView: '',
    list: [],
    login: false,
    status: 1,
    isShow: false,
    hideHeader: true,
    delBtnWidth: 120,
    isRefresh: false,
    startY: 0,
    scrollTop: 0,
    swiper: 0,
    module_cate: [], //首页模块  如新品发布台,
    goods_cate: [], //首页商品分类  如全品类
    showExecute: true,
    title: "木小凡商城",
    shopState: false
  },
  sesa: function () {
    wx.switchTab({
      url: '/pages/discover/discover',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   * @options.scene 扫码进入小程序，传参
   */
  onLoad: function (options) {
    let that = this
    let scene = wx.getStorageSync("scene")
    // if (scene == '') {
    //   wx.setStorageSync('showExecute', this.data.showExecute)
    // }
    if (options.scene) {
      // wx.setNavigationBarTitle({//替换店铺名称
      //   title: '趣味表情'
      // })
      wx.setStorageSync("scene", options.scene)
      this.setData({
        showExecute: false
      })
      wx.setStorageSync("scene", options.scene)
      wx: wx.setStorageSync("accss", false)
      bindStore({
        method: 'post',
        data: {
          store_id: options.scene
        },
        success: function (res) {
          msg(res.msg)
          getUserInfo({
            success: function (res) {
              wx.setStorageSync('shopTitle', res.data.store_name) //获取店铺名称，修改titel值
              if (res.data.status == 1) {
                that.setData({
                  status: res.data.status
                });
                that.setData({
                  login: true
                });
                that.getData();
                wx.setStorageSync("login", true)
                return false
              } else if (res.data.status == 0) {
                that.setData({
                  status: res.data.status
                });
                that.setData({
                  login: true
                });
                wx.hideTabBar();
                return false
              }
            },
          })
        }
      })

    } else {
      this.setData({
        showExecute: true
      })
      wx: wx.setStorageSync("accss", true)
    }
    setTimeout(() => {
      // console.log(this.data.showExecute)

    }, 2000)
    if (options.goods_id) {
      wx.setStorageSync('goods_id', options.goods_id)
    }
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        // console.log(res)
        wx.setStorageSync('wei', res.latitude) //纬度
        wx.setStorageSync('jing', res.longitude) //经度

      }
    })

  },
  more: function (e) {
    // console.log(e)
    let id = e.currentTarget.dataset.id
    let cate_id = e.currentTarget.dataset.cate_id
    wx.navigateTo({
      url: '/pages/list/list?id=' + id + '&cate_id=' + cate_id,
    })
  },
  //搜索
  bindSearch1: function (e) {
    this.setData({
      keyword: e.detail.value
    })
  },

  banners_mo: function (e) { //
    let index = e.currentTarget.dataset.index
    let module_cate = this.data.module_cate
    module_cate[index].num = e.detail.current + 1
    this.setData({
      module_cate
    })
  },

  bindSearch: function (e) {
    var keyword = this.data.keyword


    var login = this.data.login;
    if (!login) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
      return false
    }
    wx.navigateTo({
      url: '/pages/search/search?keyword=' + keyword
    })
  },
  //跳转新品
  jump: function (e) {
    var index = e.currentTarget.dataset.index;
    if (index == 0) {
      wx: wx.navigateTo({
        url: this.data.cateList[index].link,
      })
    }
    if (index == 1) {
      this.setData({
        toView: 'new',
        isRefresh: false,
        startY: 0
      })
    }
    if (index == 2) {
      wx: wx.navigateTo({
        url: this.data.cateList[index].link,
      })
    }
    if (index == 3) {
      if (this.data.shopState == 1) { //申请过我的小店通过
        wx: wx.navigateTo({
          url: this.data.cateList[index].link,
        })
      } else if (this.data.shopState == 0) { //小店申请审核中
        wx.showToast({
          title: '正在审核中',
          icon: 'success',
          duration: 2000
        })
      } else {//未申请
        wx.navigateTo({
          url: '/pages/audit/audit'
        })
      }
    }
    if (index == 4) {
      wx: wx.navigateTo({
        url: this.data.cateList[index].link,
      })
    }
  },
  //获取数据
  getData: function () {
    var that = this;
    index({
      success: function (res) {
        // console.log(res.data.broadcast_list)
        that.setData({
          banner: res.data.banner,
          list: res.data.goods_tags,
          isShow: true,
          hideHeader: true,
          module_cate: res.data.module_cate, //首页模块  如新品发布台
          goods_cate: res.data.goods_cate,
          broadcast_list: res.data.broadcast_list
        })
      },
      fail: function () {
        msg("获取失败");
      }
    })
  },

  love_boxOne: function (e) {
    let index = e.currentTarget.dataset.index
    let baskOne = this.data.baskOne
    let that = this
    let id = baskOne[index].id
    friendsLike({
      method: 'post',
      data: {
        id
      },
      success: function (res) {
        // console.log(res)
        that.friendsList()
      }
    })
  },
  love_boxtow: function (e) {
    let index = e.currentTarget.dataset.index
    let baskTwo = this.data.baskTwo
    let that = this
    let id = baskTwo[index].id
    friendsLike({
      method: 'post',
      data: {
        id
      },
      success: function (res) {
        // console.log(res)
        that.friendsList()
      }
    })
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
    saveUserInfo({//获取小店状态
      success: (res) => {
        this.setData({
          shopState: res.data.store_status
        })
      },
      fail: function (res) {
      }
    })

    if (wx.getStorageSync("scene")) {
      wx.setNavigationBarTitle({
        title: this.data.shopState
      })
    } else {
      wx.setNavigationBarTitle({
        title: this.data.title
      })
    }

    // if (this.data.showExecute == true) {
    //   this.show()
    // }
    // let showExecute = wx.getStorageSync("showExecute")
    // this.setData({
    //   showExecute
    // })

    this.show()

    // console.log(this.data.showExecute)
    let that = this
    this.friendsList()
  },
  friendsList: function () {
    let that = this
    friendsList({
      data: {
        type: 1,
        page: 1,
        size: 4
      },
      success: function (res) {
        let baskList = res.data
        let baskOne = []
        let baskTwo = []
        baskList.forEach((item, index) => {
          if (index % 2 == 0) {
            baskOne.push(item)
          } else if (index % 2 == 1) {
            baskTwo.push(item)
          }
        })
        that.setData({
          baskOne,
          baskTwo
        })

      },
      fail: function (res) {
        msg(res.msg)
      }
    })
  },
  show: function () {
    var that = this;
    var goods_id = wx.getStorageSync('goods_id');
    let isLogin = wx.getStorageSync('login');
    // console.log(isLogin)
    //获取用户信息
    getUserInfo({
      success: function (res) {

        wx.setNavigationBarTitle({
          title: res.data.store_name
        })

        //1.判断是否注册过
        if (res.data.status == 0) {
          that.setData({
            status: res.data.status
          });
          wx.hideTabBar();
          return false
        }
        if (res.data.type == 1) {
          let showExecute = true
          that.setData({
            showExecute
          })
          wx.setStorageSync('showExecute', showExecute)
        } else if (res.data.type == 2) {
          let showExecute = false
          that.setData({
            showExecute
          })
          wx.setStorageSync('showExecute', showExecute)
          wx.setStorageSync('login', true)
          isLogin = true
        }
        //2.判断是否登录
        // console.log(isLogin)
        if (!isLogin) {
          //未登录
          that.setData({
            status: 0
          });
          wx.hideTabBar();
          return false
        }
        wx.showTabBar();
        //如果未保存用户信息
        if (!res.data.headimg) {
          //判断是否已授权
          if (app.globalData.userInfo != null) {
            //后续进行保存用户信息等操作
            that.setData({
              login: true
            });
            //保存用户信息
            saveUserInfo({
              method: 'post',
              data: {
                iv: app.globalData.rawData.iv,
                encryptedData: app.globalData.rawData.encryptedData
              },
              success: function () {
                that.getData();
              },
              fail: function (res) {
                msg(res.msg);
                //如果失败
                that.setData({
                  login: false
                })
              }
            })
          } else {
            if (goods_id) {
              wx.navigateTo({
                url: '/pages/login/login'
              })
            }
            that.getData();
          }
        } else {
          that.setData({
            login: true
          });
          that.getData();
          if (goods_id) {
            wx.navigateTo({
              url: '/pages/goodsDetail/goodsDetail?id=' + goods_id
            })
          }
        }
      },
      fail: function (res) {

      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    let time = this.getNowFormatDate()
    // console.log(time)
    loginAt({
      method: 'put',
      data: {
        login_at: time
      },
      success: function (res) {
        // console.log(res)
      }
    })

  },
  getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var Hours = date.getHours();
    var Minutes = date.getMinutes();
    var Seconds = date.getSeconds();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    if (Hours >= 0 && Hours <= 9) {
      Hours = "0" + Hours;
    }
    if (Minutes >= 0 && Minutes <= 9) {
      Minutes = "0" + Minutes;
    }
    if (Seconds >= 0 && Seconds <= 9) {
      Seconds = "0" + Seconds;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
      " " + Hours + seperator2 + Minutes +
      seperator2 + Seconds;
    return currentdate;
  },
  onUnload: function () {

  },
  touchS: function (e) {
    // 设置触摸起始点水平方向位置
    // this.setData({
    //     startY: e.touches[0].clientY,
    //     isRefresh: true
    // })
  },
  touchM: function (e) {
    //手指移动时水平方向位置
    var moveY = e.touches[0].clientY;
    //手指起始点位置与移动期间的差值
    // console.log(this.data.startY)
    var disY = this.data.startY - moveY;
    var delBtnWidth = this.data.delBtnWidth;
    var that = this;
  },
  touchE: function (e) {
    // console.log(e)
    //手指移动结束后水平位置
    var endY = e.changedTouches[0].clientY;
    //触摸开始与结束，手指移动的距离
    var disY = this.data.startY - endY;
    var scrollTop = this.data.scrollTop;
    if (scrollTop <= 0) {
      if (disY < 0) {
        return false
        this.setData({
          banner: [],
          list: [],
          hideHeader: false,
          isShow: false,
          toView: ''
        });
        this.getData();
      }
    }
  },
  scrollToTop: function (e) {
    let scrollTop = e.detail.scrollTop;
    this.setData({
      scrollTop: scrollTop,
      toView: ''
    })
  },
  change: function (e) {
    let swiper = e.detail.current
    this.setData({
      swiper
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
