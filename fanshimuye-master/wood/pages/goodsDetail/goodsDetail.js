// pages/goodsDetail/goodsDetail.js
import {
  msg,
  success
} from "../../utils/util";
import {
  goodsDetail,
  specDetail,
  collectGoods,
  addCart,
  spellUser,
  spellInvite,
  getUserInfo,
} from "../../utils/api";
import {
  wxParse
} from "../../wxParse/wxParse.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    group: false, //显示去拼团弹窗
    collect: false,
    current: 0,
    isFixed: false,
    tabTop: 0,
    detailTop: 0,
    saleTop: 0,
    recommedTop: 0,
    toView: '',
    specsList: [],
    sepcArr: [],
    isChoose: false,
    mask: false,
    num: 1,
    cartType: '',
    is_collect: false,
    id: '',
    isShow: false,
    showError: false,
    detail: {},
    content: '',
    sale: '',
    specData: {},
    inType: 1,
    type: 0,
    groupList: [],
    pt_id: 0,
    pt: false,
    seckill_id: 0,
    time: {},
    dating: 0,
    t_data: {}, //拼团数据
    noLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let seckill_id = 0;
    if (options.pt_id) {
      this.setData({
        pt_id: options.pt_id,
        pt: true
      })
    }
    if (options.seckill_id) {
      this.setData({
        seckill_id: options.seckill_id
      })
    }
    if (options.type) {
      this.setData({
        inType: options.type
      })
    }
    this.setData({
      id: options.id,
    });
    this.getData();
    wx.removeStorageSync('goods_id');

  },
  //获取数据
  getData: function() {
    let that = this;
    let seckill_id = this.data.seckill_id
    let inType = +this.data.inType
    let data = {}
    if (seckill_id == 0 && inType == 1) {
      inType = inType
      data = {
        id: this.data.id,
        type: 0,
      }
    } else if (seckill_id != 0 && inType == 1) {
      inType = inType 
      data = {
        id: this.data.id,
        type: inType,
      }
    }else if (seckill_id != 0) {
      inType = inType - 2
      data = {
        id: this.data.id,
        seckill_id,
        type: inType,
      }
    } else if (seckill_id == 0) {
      inType = inType - 2
      data = {
        id: this.data.id,
        type: inType,
      }
    }

    goodsDetail({
      data: data,
      success: function(res) {
        //获取tab的距离顶部高度
        const query = wx.createSelectorQuery();
        that.setData({
          detail: res.data,
          isShow: true,
          is_collect: res.data.is_collect,
          specsList: res.data.spec
        }); 
        that.init();
        that.tantlist()
        if (res.data.activity_time!=null){
          that.time(res.data.activity_time)
        }
        
        //详情
        
        wxParse('content', 'html', res.data.content, that, 10, function() {
          //获取详情到顶部的高度
          query.select('#detail').boundingClientRect(function(res) {
            that.setData({
              detailTop: res.top,
              tabTop: res.top
            });
          }).exec();
        });
        //售后文本
        wxParse('sale', 'html', res.data.refund_sale_text, that, 10, function() {
          //获取售后到顶部的高度
          query.select('#sale').boundingClientRect(function(res) {
            that.setData({
              saleTop: res.top
            });
          }).exec();
          //获取推荐到顶部的高度
          query.select('#recommed').boundingClientRect(function(res) {
            that.setData({
              recommedTop: res.top
            });
          }).exec();
        });
      },
      fail: function() {
        that.setData({
          showError: true
        })
      }
    })
  },
  //监听滚动
  goodsScroll: function(e) {
    let that = this;
    let tabTop = that.data.tabTop;
    let isFixed = that.data.isFixed;
    //详情高度
    let detailTop = that.data.detailTop;
    //售后高度
    let saleTop = that.data.saleTop;
    //推荐高度
    let recommedTop = that.data.recommedTop;
    let scrollTop = e.detail.scrollTop;
    let current = that.data.current;
    if (scrollTop > tabTop) {
      if (isFixed) {
        //判断是否大于售后高度
        if (scrollTop > detailTop && scrollTop < saleTop) {
          current = 0;
        } else if (scrollTop > saleTop && scrollTop < recommedTop) {
          current = 1;
        } else if (scrollTop > recommedTop) {
          current = 2;
        }

        that.setData({
          current: current
        })
        return
      } else {
        that.setData({
          isFixed: true
        })
      }

    } else {
      that.setData({
        isFixed: false
      })
    }
  },
  //切换分类
  chooseTap: function(e) {
    var index = e.currentTarget.dataset.index;
    var type = e.currentTarget.dataset.type;
    this.setData({
      current: index,
      toView: type
    })
  },
  go_group: function(e) { //切换显示拼团弹窗
    let that = this
    let pt_id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    spellInvite({
      data: {
        id: pt_id
      },
      success: function(res) {
        that.setData({
          t_data: res.data
        })
      }
    })
    this.setData({
      dating: index,
      group: !this.data.group,
      pt_id
    })
  },

  join: function(e) {
    this.setData({
      mask: true,
      cartType: e.currentTarget.dataset.type
    });
  },
  //收藏
  collectGoods: function() {
    var is_collect = this.data.is_collect;
    var id = this.data.id;
    let that = this;
    if (this.data.noLogin == true) {
      msg("你需要先授权")
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }, 2000)
      return false
    }
    collectGoods({
      method: 'put',
      data: {
        good_id: id
      },
      success: function() {
        if (!is_collect) {
          msg("收藏成功")
        }
        that.setData({
          is_collect: !is_collect
        })
      },
      fail: function() {
        msg("收藏失败")
      }
    });
  },
  //初始化规格
  init: function() {
    var specs = this.data.specsList;
    specs.forEach(e => {
      e.current = 0;
    });
    this.setData({
      specsList: specs
    });
    this.getSpec();
  },

  tantlist: function() {
    let that = this
    let detail = this.data.detail
    spellUser({
      data: {
        good_id: detail.id,
        page: 1,
        size: 3
      },
      success: function(res) {
        that.setData({
          groupList: res.data
        })
      },
      fail: function(res) {
        that.setData({
          showError: true
        })
      }
    })
  },
  //打开规格选择
  chooseSpec: function(e) {
    if (this.data.noLogin == true) {
      msg("你需要先授权")
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }, 2000)
      return false
    }


    this.setData({
      pt_id: 0,
      mask: true,
      cartType: e.currentTarget.dataset.type
    });
  },

  chooseSpec_pt: function(e) {
    if (this.data.noLogin == true) {
      msg("你需要先授权")
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      }, 2000)
      return false
    }
    this.setData({
      mask: true,
      cartType: e.currentTarget.dataset.type
    });
  },
  //获取规格信息
  getSpec: function() {
    let that = this;
    //拿到所有已选的规格
    let specsList = this.data.specsList;
    let specArr = [];
    specsList.forEach(e => {
      specArr.push(e.value[e.current]);
    });
    specArr = specArr.toString().replace(/[,]/g, '-');
    specDetail({
      method: 'post',
      data: {
        good_id: this.data.id,
        spec_group: specArr
      },
      success: function(res) {
        if (!res.data) {
          that.setData({
            disabled: true
          })
          return false
        }
        that.setData({
          specData: res.data
        });
      },
      fail: function() {
        msg("获取规格信息失败");
      }
    })
  },
  //关闭规格选择
  closeSpec: function() {
    this.setData({
      mask: false
    })
  },
  //选择规格
  choice: function(e) {
    var index = e.currentTarget.dataset.index;
    var idx = e.currentTarget.dataset.idx;
    let str = 'specsList[' + index + '].current';
    this.setData({
      [str]: idx
    });
    this.getSpec();
  },
  //选择数量
  chooseNum: function(e) {
    let specData = this.data.specData
    let val = specData.stock - specData.sale
    var type = e.currentTarget.dataset.type;
    let num = this.data.num;
    if (type == "release") {
      // -
      if (num == 1) {
        msg("已是最小数量");
      } else {
        num--;
      }
    } else {
      // +
      if (num == val) {
        msg("已是最大库存");
      } else {
        num++;
      };
    }
    this.setData({
      num: num
    })
  },
  //输入数量
  changeIpt: function(e) {
    let specData = this.data.specData
    var value = e.detail.value;
    if (value < 1) {
      this.setData({
        num: 1
      })
    } else if (value > (specData.stock - specData.sale)) {
      msg('超过库存数量')
      this.setData({
        num: specData.stock - specData.sale
      })
    } else {
      this.setData({
        num: parseInt(value)
      })
    }
  },
  //提交
  confirm: function() {
    setTimeout(() => {
      let detail = this.data.detail
      let showError = this.data.showError
      if (detail.stock_count - detail.sale_count == 0) {
        msg('该商品没有库存了')
        return false
      }
      if (showError) {
        msg('该商品没有库存了')
        
        return false
      }
      var specsList = this.data.specsList;
      var specArr = [];
      var num = this.data.num;
      if ((detail.stock_count - detail.sale_count) - num < 0) {
        msg('超过库存数量')
        return false
      }
      let specData = this.data.specData
      if (num > specData.stock) {
        msg('超过库存数量')
        this.setData({
          num: specData.stock
        })
        return false
      }
      var that = this;
      var type = this.data.type;
      var inType = this.data.inType;
      var cartType = this.data.cartType;
      var spec_id = this.data.specData.id;
      var pt_id = this.data.pt_id;
      //拿到所有已选的规格
      specsList.forEach(e => {
        specArr.push(e.value[e.current]);
      });

      specArr = specArr.toString().replace(/[,]/g, '-');
      this.setData({
        specArr: specArr
      });
      //如果是立即购买
      if (cartType == 'buy') {
        //存储数据去下单
        wx.setStorageSync('order', {
          type: 2,
          num: num,
          spec_id: spec_id,
          order_type: this.data.inType,
          pt_id: this.data.pt_id,
          seckill_id: this.data.seckill_id
        });
        this.setData({
          mask: false
        });
        wx.navigateTo({
          url: '/pages/confirmOrder/confirmOrder?type=2&inType=' + inType + '&pt_id=' + pt_id
        });
        return false
      }
      //加入购物车
      addCart({
        method: 'post',
        data: {
          good_id: this.data.id,
          spec_id: spec_id,
          num: num
        },
        success: function() {
          that.setData({
            mask: false,
            isChoose: true
          });
          success("加入成功")
        },
        fail: function(res) {
          if (res.msg) {
            msg(res.msg);
            return false
          }
          msg("未知错误");
        }
      })
    }, 500)

  },
  //联系客服
  call: function() {
    wx.makePhoneCall({
      phoneNumber: this.data.detail.customer_tel
    })
  },

  time: function(e) {
    e = e.replace(/-/g, '/')
    let nowDate = new Date()
    let nowTimestamp = nowDate.getTime()
    let targetDate = new Date(e)
    let targetTimestamp = targetDate.getTime()
    let count_down = targetTimestamp - nowTimestamp
    let time = {}
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

  countdown: function(_t) {
    var _result = {
      hour: 0,
      minue: 0,
      sec: 0
    }
    if (_t > 0) {
      _result.hour = Math.floor(_t / 1000 / 60 / 60) < 10 ? '0' + Math.floor(_t / 1000 / 60 / 60 % 24).toString() : Math.floor(_t / 1000 / 60 / 60).toString();
      _result.minue = Math.floor(_t / 1000 / 60 % 60) < 10 ? '0' + Math.floor(_t / 1000 / 60 % 60).toString() : Math.floor(_t / 1000 / 60 % 60).toString();
      _result.sec = Math.floor(_t / 1000 % 60) < 10 ? '0' + Math.floor(_t / 1000 % 60).toString() : Math.floor(_t / 1000 % 60).toString();
    }
    return _result;
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
    let that = this
    getUserInfo({
      success: function(res) {
        if (res.data.nickname == null) {
          that.setData({
            noLogin: true
          })
        } else {
          that.setData({
            noLogin: false
          })
        }
      }
    })

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
    return {
      path: '/pages/index/index?goods_id=' + this.data.id,
      title: this.data.detail.title
    }
  }
})