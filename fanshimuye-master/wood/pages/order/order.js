// pages/order/order.js
import {
  msg,
  success
} from "../../utils/util";
import {
  orderList,
  payOrder,
  confirmOrder
} from "../../utils/api";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [{
        name: '全部',
        status: 0,
        type: 0
      }, {
        name: '拼团中',
        status: 2,
        type: 6
      },
      {
        name: '待付款',
        status: 1,
        type: 1
      }, {
        name: '待发货',
        status: 3,
        type: 2
      }, {
        name: '待自提',
        status: 6,
        type: 5
      }, {
        name: '待收货',
        status: 4,
        type: 3
      }, {
        name: '已完成',
        status: 5,
        type: 4
      }
    ],
    status: '',
    list: [],
    page: 0,
    isload: true,
    loading: false,
    balance: false,
    account: '',
    ingPass: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let status = options.status
    let type = options.type
    this.setData({
      status: options.status,
      type
    })
    // this.getList();
  },
  //切换订单列表
  chooseStatus: function(e) {
    let status = e.currentTarget.dataset.status;
    let type = e.currentTarget.dataset.type;
    this.setData({
      type,
      status: status,
      list: [],
      page: 0,
      isload: true,
    });
    this.getList();
  },
  //支付
  pay: function(e) {
    var id = e.currentTarget.id;
    var that = this;
    let index = e.currentTarget.dataset.index;
    let str = 'list[' + index + '].status';
    //支付
    payOrder({
      method: 'post',
      data: {
        order_id: id
      },
      success: function(res) {
        // 调用微信支付
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success: function(res) {
            success("支付成功");
            that.setData({
              [str]: 2
            })
          },
          fail: function(res) {
            msg("支付失败");
          }
        })
      },
      fail: function(res) {
        if (res.msg) {
          msg(res.msg);
        }
      }
    });
  },
  //确认收货
  confirmGoods: function(e) {
    var id = e.currentTarget.id;
    var that = this;
    let index = e.currentTarget.dataset.index;
    let str = 'list[' + index + '].status';
    wx.showModal({
      title: '提示',
      content: '是否确认收货?',
      confirmColor: '#333',
      cancelColor: '#999',
      confirmText: '确认',
      success: function(res) {
        if (res.confirm) {
          confirmOrder({
            method: 'put',
            data: {
              order_id: id
            },
            success: function() {
              success("收货成功");
              that.setData({
                [str]: 4
              });
            },
            fail: function() {
              msg("收货失败")
            }
          });
        }
      }
    });
  },
  getList: function() {
    const that = this;
    var isload = this.data.isload;
    var page = that.data.page + 1;
    let size = 10;
    if (!isload) {
      return false;
    }
    that.setData({
      loading: true
    });
    orderList({
      data: {
        page: page,
        size: size,
        status: that.data.type || 0
      },
      success: function(res) {
        if (res.code == 200) {
          let arr = res.data;
          let num = that.data.list.length;
          if (arr.length == 0) {
            that.setData({
              isload: false,
              loading: false
            })
            return false
          }
          if (arr.length < size) {
            that.setData({
              isload: false
            });
          }
          arr.forEach((e, index) => {
            let str = 'list[' + (index + num) + ']';
            that.setData({
              [str]: e
            });
          });
          that.setData({
            loading: false,
            page: page
          })
        } else {
          msg(res.msg);
        }
      }
    });
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
    let status = this.data.status;
    let type = this.data.type;
    this.setData({
      type,
      status: status,
      list: [],
      page: 0,
      isload: true,
    });
    this.getList();
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
    this.getList();
  },

  pay_tow: function (e) {
    let index = e.currentTarget.dataset.index
    let list = this.data.list
    let account = list[index].total_price
    var int_id = e.currentTarget.id;
    this.setData({
      int_id,
      balance: !this.data.balance,
      account
    })
  },
  ing: function (e) {
    let value = e.detail.value
    this.setData({
      ingPass: value
    })
  },

  bing_tas: function () {
    this.setData({
      balance: false
    })
  },
  confirm_password: function () { //密码确定
    let int_id = this.data.int_id
    let ingPass = this.data.ingPass
    let that = this
    this.setData({
      balance: !this.data.balance,
      ingPass:''
    })
    payOrder({
      method: 'post',
      data: {
        order_id: int_id,
        password: ingPass
      },
      success: function (res) {
        if (that.data.inType == 4) {
          wx.navigateTo({
            url: '/pages/invite/invite?order_id=' + that.data.order_id,
          })
        }
        if (that.data.inType == 1 || that.data.inType == 2 || that.data.inType == 3) {
          wx.redirectTo({
            url: '/pages/order/order'
          })
        }
      },
      fail: function (res) {
        that.setData({
          disabled: true
        })
        if (res.msg) {
          msg(res.msg);
        }
      }
    });
  },
})