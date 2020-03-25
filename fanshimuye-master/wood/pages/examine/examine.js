// pages/orderDetail/orderDetail.js
import {
  msg,
  success
} from "../../utils/util";
import { 
  orderDetail,
  payOrder,
  cancelOrder,
  confirmOrder,
  remindOrder,
  refundDetail,
  cancelRefund,
  changeRefund,
  storeOrderDetail
} from "../../utils/api";
var interval;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: '',
    countHour: '00',
    countMinute: '00',
    countSecond: '00',
    showForm: false,
    isShow: false,
    showError: false,
    detail: {},
    disabled: false,
    type: '',
    refund: {},
    user_img: [
      '/static/images/avatar.jpg',
      '/static/images/wen.png',
      '/static/images/wen.png',
      '/static/images/wen.png',
      '/static/images/wen.png',
    ],
    stype:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let showExecute = wx.getStorageSync('showExecute')
    this.setData({
      id: options.id,
      type: options.type,
      showExecute,
      stype: options.stype //判断显示
    });
  },
  getDetail: function () {
    let that = this;
    let type = this.data.type;
    if (type == 2) {
      refundDetail({
        data: {
          id: this.data.id
        },
        success: function (res) {
          that.setData({
            status: res.data.refund.status,
            isShow: true,
            detail: res.data.order,
            refund: res.data.refund
          });
        },
        fail: function () {
          that.setData({
            showError: true
          })
        }
      })
      return false
    }
    storeOrderDetail({
      data: {
        order_id: this.data.id
      },
      success: function (res) {
        that.setData({
          status: res.data.status,
          isShow: true,
          detail: res.data,
          id: res.data.id,
          goods: res.data.goods
        });
        //待收货调用倒计时
        if (res.data.status == 3) {
          let end_time = res.data.confim_time;
          end_time = Date.parse(end_time.replace(/[-]/g, '/'));
          that.countDown(end_time);
        }
      },
      fail: function () {
        that.setData({
          showError: true
        })
      }
    })
  },

  pay: function (e) {

    let goods = this.data.goods
    let id = this.data.id
    let list = []
    goods.forEach(item => {
      list.push({ spec_id: item.spec_id, num: item.num })
    })

    wx.setStorageSync('order', {
      data: list
    });
    wx.navigateTo({
      url: '/pages/confirmOrder/confirmOrder?type=' + 0 + '&store_order_id=' + id,
    })
  },

  //取消订单
  cancelOrder: function () {
    var id = this.data.id;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否确认取消?',
      confirmColor: '#333',
      cancelColor: '#999',
      confirmText: '确认',
      success: function (res) {
        if (res.confirm) {
          cancelOrder({
            method: 'put',
            data: {
              order_id: id
            },
            success: function () {
              success("取消成功");
              that.setData({
                status: -1
              });
            },
            fail: function (res) {
              if (res.msg) {
                msg(res.msg);
                return false
              }
              msg("未知错误")
            }
          });
        }
      }
    });
  },
  //支付
  // pay: function (e) {
  //   var id = this.data.id;
  //   var that = this;
  //   that.setData({
  //     disabled: true
  //   });
  //   //支付
  //   payOrder({
  //     method: 'post',
  //     data: {
  //       order_id: id
  //     },
  //     success: function (res) {
  //       // 调用微信支付
  //       wx.requestPayment({
  //         timeStamp: res.data.timeStamp,
  //         nonceStr: res.data.nonceStr,
  //         package: res.data.package,
  //         signType: res.data.signType,
  //         paySign: res.data.paySign,
  //         success: function (res) {
  //           success("支付成功");
  //           that.setData({
  //             status: 2
  //           })
  //         },
  //         fail: function (res) {
  //           msg("支付失败");
  //           that.setData({
  //             disabled: false
  //           });
  //         }
  //       })
  //     },
  //     fail: function (res) {
  //       if (res.msg) {
  //         msg(res.msg);
  //         that.setData({
  //           disabled: false
  //         });
  //         return false
  //       }
  //       msg("未知错误");
  //     }
  //   });
  // },
  //确认收货
  confirmGoods: function (e) {
    var id = this.data.id;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否确认收货?',
      confirmColor: '#333',
      cancelColor: '#999',
      confirmText: '确认',
      success: function (res) {
        if (res.confirm) {
          confirmOrder({
            method: 'put',
            data: {
              order_id: id
            },
            success: function () {
              success("收货成功");
              that.setData({
                status: 4
              });
            },
            fail: function (res) {
              if (res.msg) {
                msg(res.msg);
                return false
              }
              msg("未知错误")
            }
          })
        }
      }
    });
  },
  //提醒发货
  notice: function () {
    var id = this.data.id;
    var that = this;
    remindOrder({
      method: 'put',
      data: {
        order_id: id
      },
      success: function () {
        success("提醒成功");
      },
      fail: function (res) {
        if (res.msg) {
          msg(res.msg);
          return false
        }
        msg("未知错误")
      }
    });
  },
  //拨打电话
  call: function (e) {
    let phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  //取消售后
  cancelPost: function () {
    var id = this.data.id;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否取消售后?',
      confirmColor: '#333',
      cancelColor: '#999',
      confirmText: '确认',
      success: function (res) {
        if (res.confirm) {
          cancelRefund({
            method: 'put',
            data: {
              id: id
            },
            success: function () {
              success("取消成功");
              that.setData({
                status: -1
              });
            },
            fail: function (res) {
              if (res.msg) {
                msg(res.msg);
                return false
              }
              msg("未知错误")
            }
          });
        }
      }
    });
  },
  //打开填写物流
  writeLogistic: function () {
    this.setData({
      showForm: true
    })
  },
  //提交物流信息
  logistic_submit: function (e) {
    let that = this;
    let data = e.detail.value;
    if (data.company == '') {
      msg("请输入物流公司");
      return false
    }
    if (data.code == '') {
      msg("请输入物流单号");
      return false
    }
    changeRefund({
      method: 'put',
      data: {
        id: this.data.id,
        express_number: data.code,
        express_compay: data.company
      },
      success: function () {
        that.setData({
          showForm: false,
          status: 3
        });
        success("提交成功");
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
  //取消提交
  logistic_reset: function () {
    this.setData({
      showForm: false
    })
  },
  //倒计时
  countDown: function (end_time) {
    //传入时间
    //Date.parse(new Date()) 获取当前时间的时间戳
    //(Date.parse(new Date()) - 300)当前时间减去的秒数既得倒计时时间
    var totalSecond = (end_time - Date.parse(new Date())) / 1000;
    interval = setInterval(function () {
      // 秒数
      var second = totalSecond;
      // 天数
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();

      if (dayStr.length == 1) dayStr = '0' + dayStr;
      // 小时
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;
      // 分钟
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;
      // 秒
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;

      this.setData({
        countDay: dayStr,
        countHour: hrStr,
        countMinute: minStr,
        countSecond: secStr,
        totalSecond: totalSecond
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        this.setData({
          countDay: '00',
          countHour: '00',
          countMinute: '00',
          countSecond: '00',
        });
      }
    }.bind(this), 1000);
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
    this.getDetail();
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