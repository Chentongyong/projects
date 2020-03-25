// pages/confirmOrder/confirmOrder.js
import {
  msg,
  success
} from "../../utils/util";
import {
  orderConfirm,
  addressList,
  storeAddress,
  orderInfo,
  payOrder,
  getUserInfo,
  scoreMoneyRate,
  confimStore,
  infoStore,
  storeOrderDetail
} from "../../utils/api";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    send_type: 1,
    pay_type: 2,
    address: {},
    inType: 0,
    type: '',
    goods: [],
    account: '0.00',
    total: '0.00',
    storeAddress: {},
    isShow: false,
    showError: false,
    car_ids: '',
    disabled: false,
    desc: '',
    price_express: 0,
    score: '',
    ingPass: '', //余额支付密码
    balance: false, //余额支付密码弹窗
    ephemeralData: {},
    money: '',//余额
    score: '',//积分
    scores:'',//展示积分
    pt_id: 0,
    seckill_id: 0,
    order_id:'',//当前订单id
    showExecute:true,
    datalist:[],
    store_order_id:0,
    dataMap:{},
    showExecute:false
  },


  ing: function(e) {
    let value = e.detail.value
    this.setData({
      ingPass: value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */ 
  onLoad: function(options) {
    // storeOrderDetail({
    //   // order_id:
    // })
    let that = this
    let showExecute = wx.getStorageSync("showExecute")
    if (showExecute == false){
      this.setData({
        pay_type: 2,
        showExecute,
        
      })
    }
    let order_type= options.inType;
    if (showExecute == false){
      order_type = 0
    }
    // console.log(options)
    this.setData({
      type: options.type,
      inType: options.inType,
      order_type,
      pt_id: options.pt_id,
      store_order_id: options.store_order_id
    });
    if (options.type == 1) {
      this.setData({
        car_ids: options.id,
        pt_id:options.pt_id
      })
    }
    scoreMoneyRate({
      method:"get",
      success:function(res){
        that.setData({
          dikou:res.data,
        })
      }
    })
    this.getData();
    this.getUserInfo() 
  },
  getUserInfo: function() {//获取个人信息
    let that = this
    getUserInfo({
      success: function(res) {
        // console.log(res)
        that.setData({
          is_pwd: res.data.is_pwd,
          money: res.data.money,
          scores: res.data.score
        })
      },
      fail: function(res) {
        msg(res.msg)
      }
    })
  },
  getData: function() {
    var that = this;
    let type = this.data.type;
    let data = {};
    var order_type = this.data.order_type;
    let account = 0;
    if (type == 0){
      data = wx.getStorageSync('order');
      // console.log(data)
      let datalist = data
      // console.log(datalist)
      this.setData({
        datalist
      })
    }
    if (type == 2) {
      data = wx.getStorageSync('order');
    } else if (type == 1) {
      data = {
        type: type,
        car_ids: this.data.car_ids
      }
    }
    //收货地址
    addressList({
      success: function(res) {
        // console.log(res)
        let array = res.data;
        let address = [];
        if (array.length < 1) {
          return false
        }
        array.forEach(e => {
          if (e.is_default == 1) {
            address.push(e)
          }
        });
        //判断是否有默认地址
        if (address.length < 1) {
          //没有就取地址第一位
          address = array[0];
        } else {
          address = address[0];
        }
        that.setData({
          address: address
        })
      }
    });
    //订单信息
    if (type == 0) {//orderDetail
      confimStore({
        method: 'post',
        data: data,
        success: function (res) {
          // console.log(res)
          that.setData({
            goods: res.data
          });
          let arr = res.data;
          //运费
          let price_express = 0;
          //原始价格
          let total = 0;
          arr.forEach(e => {
            total += e.price * e.num;
            price_express += e.price_express;
          });
          total = total * 1000
          price_express = price_express * 1000
          account = total + price_express;
          total = total / 1000
          price_express = price_express / 1000
          account = account / 1000
          that.setData({
            account: account,
            isShow: true,
            price_express: price_express,
            total: total
          });
          wx.removeStorageSync('order');
        },
        fail: function (res) {
          that.setData({
            showError: true,
            isShow: false
          })
          if (res.msg) {
            msg(res.msg);
            setTimeout(() => {
              wx.navigateBack({
                delta: 1,
              })
            }, 2000)

            return false
          }
          msg("未知错误")
        }
      });
    }else{
      orderConfirm({
        method: 'post',
        data: data,
        success: function (res) {
          // console.log(res)
          that.setData({
            goods: res.data
          });
          let arr = res.data;
          //运费
          let price_express = 0;
          //原始价格
          let total = 0;
          arr.forEach(e => {
            total += e.price * e.num;
            price_express += e.price_express;
          });
          total = total * 1000
          price_express = price_express * 1000
          account = total + price_express;
          total = total / 1000
          price_express = price_express / 1000
          account = account / 1000
          that.setData({
            account: account,
            isShow: true,
            price_express: price_express,
            total: total
          });
          wx.removeStorageSync('order');
        },
        fail: function (res) {
          that.setData({
            showError: true,
            isShow: false
          })
          if (res.msg) {
            msg(res.msg);
            setTimeout(() => {
              wx.navigateBack({
                delta: 1,
              })
            }, 2000)

            return false
          }
          msg("未知错误")
        }
      });
    }
    
    //自提地址
    let lat = wx.getStorageSync('wei')
    let lng = wx.getStorageSync('jing')
    storeAddress({
      data: {
        page: 1,
        size: 6,
        lat,
        lng
      },
      success: function(res) {
        let storeArr = res.data;
        if (storeArr.length < 1) {
          return false
        }
        let storeAddress = storeArr[0];
        // console.log(storeAddress)
        that.setData({
          storeAddress: storeAddress
        })
      }
    })
  },

  score: function(e) {
    let score = e.detail.value
    this.setData({
      score
    })
  },
  //选择提货方式F
  chooseSend: function(e) {
    let type = e.currentTarget.dataset.type;
    //运费
    // console.log(type)
    let account = this.data.account
    let price_express = this.data.price_express;
    //总额
    let total = this.data.total;
    // console.log(price_express, total)
    //type=1送货 type=2自提
    // 如果是送货
    if (type == 1) {
      total = total*1000
      price_express = price_express*1000
      total = total+price_express;
      total = total/1000
    } 
    this.setData({
      send_type: type,
      account: total
    })
  },
  //选择支付方式
  choosePay: function(e) {
    let type = e.currentTarget.dataset.type;
    let send_type = this.data.send_type;
    //如果是线下支付 取货方式选为自提
    if (type == 2) {
      send_type = 2;
    }
    this.setData({
      pay_type: type,
      send_type: send_type
    });
  },
  //文本域输入事件
  bindTextarea: function(e) {
    this.setData({
      desc: e.detail.value
    });
  },
  bing_tas: function() {
    this.setData({
      balance: false
    })
  },
  confirm_password: function() { //密码确定
    let data = this.data.ephemeralData
    let ingPass = this.data.ingPass
    // console.log(data, ingPass)
    let that = this
    payOrder({
      method: 'post',
      data: {
        order_id: data.order_id,
        password: ingPass
      },
      success: function(res) {
        // 调用微信支付
        // console.log(res)
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
      fail: function(res) {
        that.setData({
          disabled: true
        })
        if (res.msg) {
          msg(res.msg);
        }
        setTimeout(function() {
          wx.navigateBack({
            delta: 1
          });
        }, 500);
      }
    });
  },
  //提交表单
  formSubmit: function(e) {
    //配送方式
    var send_type = this.data.send_type;
    //余额支付密码
    var ingPass = this.data.ingPass;
    //支付方式
    var pay_type = this.data.pay_type;
    //描述
    var desc = this.data.desc;
    //送货地址
    var address = this.data.address;

    var order_type = this.data.order_type;
    // console.log(order_type)
    var datalist = this.data.datalist;
    var store_order_id = this.data.store_order_id;

    var pt_id = this.data.pt_id;

    // 积分抵扣
    let score = this.data.score
    //自提地址
    var storeAddress = this.data.storeAddress;
    //订单type 1购物车,2商品详情,type参数来自前页面传参
    let type = this.data.type;
    let address_id;
    let that = this;
    let is_pwd = this.data.is_pwd
    if (pay_type == 3 && is_pwd == false) {
      wx.showToast({
        title: '你还没有设置余额支付的密码,正在前往设置',
        icon: 'none',
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/password/password'
        })
      }, 2000)

      return false
    }
    if (send_type == 2) {
      if (!storeAddress) {
        msg("暂无线下自提门店,请您选择送货方式配送");
        return false
      }
      address_id = storeAddress.id;
    } else if (send_type == 1) {
      //如果送货没有地址
      if (!address.name) {
        msg("请添加收货地址");
        return false
      }
      address_id = address.id;
    }
    let data = {}
    if(type == 0){
      data = {
        data:datalist.data,
        desc: desc,
        pay_type: pay_type,
        express_type: send_type,
        address_id: address_id,
        order_type:1,
        store_order_id: store_order_id,
        score: score
      };
    }else{
      data = {
        desc: desc,
        type: type,
        pay_type: pay_type,
        express_type: send_type,
        address_id: address_id,
        order_type,
        pt_id,
        spec_id: '',
        num: '',
        score: score
      };
    }
    //如果是购物车
    if (type == 1) {
      data.car_ids = this.data.car_ids;
    } else if (type == 2) {
      data.spec_id = this.data.goods[0].spec_id;
      data.num = this.data.goods[0].num;
    }
    that.setData({
      disabled: true
    })
    if(type == 0){
      infoStore({
        method: 'post',
        data: data,
        success: function (res) {
          //如果是微信支付
          that.setData({
            order_id: res.data.order_id
          })
          if (pay_type == 3) {
            that.setData({
              balance: true,
              ephemeralData: res.data
            })

            return false
          }
          if (that.data.showExecute == false && pay_type == 2) {
            msg('店主已经收到你的订单')
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/myOrder/myOrder'
              })
            }, 2000)


            return false
          }
          if (pay_type == 1) {
            //支付
            payOrder({
              method: 'post',
              data: {
                order_id: res.data.order_id
              },
              success: function (res) {
                // 调用微信支付
                wx.requestPayment({
                  timeStamp: res.data.timeStamp,
                  nonceStr: res.data.nonceStr,
                  package: res.data.package,
                  signType: res.data.signType,
                  paySign: res.data.paySign,
                  success: function (res) {
                    success("下单成功");
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
                    msg("支付失败");
                    that.setData({
                      disabled: true
                    });
                    setTimeout(function () {
                      wx.navigateBack({
                        delta: 1
                      });
                    }, 500);
                  }
                })
              },
              fail: function (res) {
                that.setData({
                  disabled: true
                })
                if (res.msg) {
                  msg(res.msg);
                }
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  });
                }, 500);
              }
            });
            return false
          }
          success("下单成功");
          wx.redirectTo({
            url: '/pages/order/order'
          })
        },
        fail: function (res) {
          that.setData({
            disabled: false
          })
          if (res.msg) {
            msg(res.msg);
          }
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            });
          }, 500);
        }
      })
    
    } else{
      orderInfo({
        method: 'post',
        data: data,
        success: function (res) {
          //如果是微信支付
          that.setData({
            order_id: res.data.order_id
          })
          if (pay_type == 3) {
            that.setData({
              balance: true,
              ephemeralData: res.data
            })

            return false
          }
          if (that.data.showExecute == false && pay_type == 2) {
            msg('店主已经收到你的订单')
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/myOrder/myOrder'
              })
            }, 2000)


            return false
          }
          if (pay_type == 1) {
            //支付
            payOrder({
              method: 'post',
              data: {
                order_id: res.data.order_id
              },
              success: function (res) {
                // 调用微信支付
                wx.requestPayment({
                  timeStamp: res.data.timeStamp,
                  nonceStr: res.data.nonceStr,
                  package: res.data.package,
                  signType: res.data.signType,
                  paySign: res.data.paySign,
                  success: function (res) {
                    success("下单成功");
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
                    msg("支付失败");
                    that.setData({
                      disabled: true
                    });
                    setTimeout(function () {
                      wx.navigateBack({
                        delta: 1
                      });
                    }, 500);
                  }
                })
              },
              fail: function (res) {
                that.setData({
                  disabled: true
                })
                if (res.msg) {
                  msg(res.msg);
                }
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  });
                }, 500);
              }
            });
            return false
          }
          success("下单成功");
          wx.redirectTo({
            url: '/pages/order/order'
          })
        },
        fail: function (res) {
          that.setData({
            disabled: false
          })
          if (res.msg) {
            msg(res.msg);
          }
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            });
          }, 500);
        }
      })
    }
    
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
    this.getUserInfo()
    this.setData({
      showExecute: wx.setStorageSync('showExecute')
    })
    if (this.data.showExecute == true) {
      storeOrderDetail({
        data: {
          order_id: options.store_order_id
        },
        success: (res) => {
          // console.log(res)
          this.setData({
            dataMap: res.data
          })
        }
      })
    }
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

  }
})