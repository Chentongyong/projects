// pages/commodity/commodity.js
import {
  getUserInfo,
  goodsCate,
  goodsList,
  tagsSpec,
  secondCate,
  storelists,
  storeGoodsStatus
} from "../../utils/api";
import util from "../../utils/util";
Page({

  /**
   * 页面的初始数据
   */
  data: {

    id: 0,
    tab_san: 0,
    current: 0,
    list: [],
    select: '',
    priceList: [],
    classify: [],
    title: '',
    status: 1,
    data: [],
    page:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  tab_san: function(e) { //已上架  待上架切换
    let that = this
    let type = e.currentTarget.dataset.type
    let tab_san = type
    let status = ''
    if (tab_san == 0) {
      status = 1
      this.setData({
        status: 1,
        data:[]
      })
    } else if (tab_san == 1) {
      status = 0
      this.setData({
        status: 0,
        data:[]
      })
    }

    this.setData({
      tab_san: type,
      list: []
    })
    this.getList()
  },

  select: function(e) { //选择商品
    let index = e.currentTarget.dataset.index
    let item = e.currentTarget.dataset.item
    let int = {
      "good_id": item.id,
      "status": item.status,
      "price": item.price
    }
    let data = this.data.data
    if (data.length == 0) {
      data.push(int)
    } else {
      let flag = false
      let num = null
      data.forEach((item, index) => {
        if (item.good_id == int.good_id) {
          flag = true
          num = index
        } else {
          // data.splice(index,1)
        }

      })
      if (!flag) {
        data.push(int)
      } else {
        data.splice(num, 1)
      }
    }


    let list = this.data.list
    list.forEach((item, i) => {
      if (index == i) {
        item.erabe = !item.erabe
      }
    })
    this.setData({
      list,
      select: index,
      data
    })
  },

  sold_out: function() { //下架
    let that = this
    let data = this.data.data
    data.forEach((item, i) => {
      if (item.status == 1) {
        item.status = 0
      }
    })
    storeGoodsStatus({
      method: 'put',
      data: {
        data
      },
      success: function(res) {
        util.msg('成功')
        that.getList()
      }
    })

  },

  putaway: function() {
    let that = this
    let data = this.data.data
    data.forEach((item, i) => {
      if (item.status == 0) {
        item.status = 1
      }
    })
    storeGoodsStatus({
      method: 'put',
      data: {
        data
      },
      success: function(res) {
        util.msg('成功')
        that.getList()
      }
    })

  },

  chooseTab: function(e) { //二级分类
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.id;
    this.setData({
      current: index,
      list: [],
      page: 0,
      isload: true,
      id: id
    });
    this.getList();
  },
  bindSearch: function(e) {
    var keyword = e.detail.value;
    this.setData({
      title: keyword,
      page: 0
    })
    this.getList();
  },

  amend: function(e) { //输入修改价格是触发
    let id = e.currentTarget.dataset.id;
    let value = e.detail.value
    let priceData = this.data.priceData
    priceData.forEach((item, i) => {
      if (item.good_id == id) {
        item.price = value
      } else {
      }
    })
    this.setData({
      data: priceData
    })

  },

  amend_confirm: function() {
    let that = this
    let data = this.data.data
    // data.forEach((item, i) => {
    //   if (item.status == 1) {
    //     item.status = 0
    //   }
    // })
    storeGoodsStatus({
      method: 'put',
      data: { 
        data
      },
      success: function(res) {
        that.setData({
          data:[]
        })
        that.getList()
      }
    })
  },

  getList: function() {
    const that = this;
    let id = this.data.id
    var page = that.data.page + 1;
    let size = 10;
    let list = this.data.list


    storelists({
      method: 'post',
      data: {
        page: page,
        size: size,
        cate_id: that.data.id,
        title: that.data.title,
        status: that.data.status
      },
      success: function(res) {
        list.push(...res.data)
        let int = []
        list.forEach(item => {
          item.erabe = 0
          int.push(
            {
              "good_id": item.id,
              "status": item.status,
              "price": item.price
            }
          )
        })
        that.setData({
          list: res.data,
          priceData:int
        })
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
    var that = this;
    //获取用户信息
    getUserInfo({
      success: function(res) {
        if (!res.data.headimg) {
          //判断是否已授权
          if (app.globalData.userInfo != null) {
            //后续进行保存用户信息等操作
            that.setData({
              login: true,
              member: {
                headimg: app.globalData.userInfo.avatarUrl,
                nickname: app.globalData.userInfo.nickName
              }
            });
            //保存用户信息
            saveUserInfo({
              method: 'post',
              data: {
                iv: app.globalData.rawData.iv,
                encryptedData: app.globalData.rawData.encryptedData
              },
              fail: function() {
                //如果失败
                that.setData({
                  login: false
                })
              }
            })
          } else {
            that.setData({
              login: false
            });
          }
        } else {
          //如果已授权
          that.setData({
            login: true,
            member: res.data,
            hasMsg: res.data.msg_remind
          });
        }
      },
      fail: function(res) {

      }
    });
    this.secondCate()
  },
  secondCate: function() {
    let tab_san = this.data.tab_san
    let that = this
    secondCate({
      success: function(res) {

        let classify = res.data
        let id = classify[0].id
        that.setData({
          classify,
          id
        })
        that.getList()
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

  }
})