// pages/list/list.js
import {
  goodsCate,
  goodsList,
  tagsSpec
} from "../../utils/api";
import {
  msg
} from "../../utils/util";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [],
    current: 0,
    priceSort: '',
    saleSort: '',
    showPop: false,
    cateList: [],
    cate_choose: -1,
    list: [],
    isload: true,
    page: 0,
    loading: true,
    id: '',
    cate_id: '',
    tags_id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id,
      cate_id: options.cate_id
    });
    this.getCate();
  },
  //选择分类
  chooseTab: function(e) {
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
  //价格排序
  sortPrice: function() {
    let priceSort = this.data.priceSort;
    if (priceSort == 'desc') {
      priceSort = 'asc';
    } else {
      priceSort = 'desc';
    }
    this.setData({
      priceSort: priceSort,
      list: [],
      page: 0,
      isload: true,
      saleSort: '',
      showPop: false
    });
    this.getList();
  },
  //销量排序
  sortSale: function() {
    let saleSort = this.data.saleSort;
    if (saleSort == 'desc') {
      saleSort = 'asc';
    } else {
      saleSort = 'desc';
    }
    this.setData({
      saleSort: saleSort,
      list: [],
      page: 0,
      isload: true,
      priceSort: '',
      showPop: false
    });
    this.getList();
  },
  //打开筛选框
  openFilter: function() {
    let showPop = this.data.showPop;
    this.setData({
      showPop: !showPop
    }) 
  },
  //选择分类
  chooseCate: function(e) {
    let index = e.currentTarget.dataset.index;
    let cateList = this.data.cateList
    let cate_choose = this.data.cate_choose;
    let tags_id = '';
    let cate;
    cateList.forEach((item, i) => {
      if (i == index) {
        item.show = !item.show
      } else {
        item.show = false
      }
    })
    if (cate_choose == index) {
      cate = -1;
      tags_id = '';
    } else {
      cate = index;
      tags_id = e.currentTarget.id
    }
    this.setData({
      cate_choose: cate,
      cateList,
      int: index,
      page: 0,
      isload: true,
      tags_id: tags_id
    });

  },
  chooseItem: function(e) {
    let tags_id = this.data.tags_id
    if (tags_id == '') {
      tags_id = e.currentTarget.id
    } else if (tags_id == e.currentTarget.id) {
      tags_id = ''
    } else if (tags_id != '') {
      tags_id = e.currentTarget.id
    }
    this.setData({
      tags_id: tags_id,
      list: [],
      isload: true,
      page: 0
    })
    this.getList();
  },
  //关闭筛选弹窗
  closePop: function() {
    this.setData({
      showPop: false
    })
  },
  //获取分类
  getCate: function() {
    let that = this;
    goodsCate({
      data: {
        pid: this.data.cate_id
      },
      success: function(res) {
        let arr = res.data;
        let num = that.data.tabList.length;
        if (arr.length < 0) {
          return false
        }
        arr.forEach((e, index) => {
          let str = 'tabList[' + (index + num) + ']';
          that.setData({
            [str]: e
          });
        });
        that.getList();
      },
      fail: function() {
        msg("获取分类失败");
        that.setData({
          loading: false
        })
      }
    });
    //获取标签类别
    tagsSpec({
      success: function(res) {
        let cateList = res.data
        cateList.forEach(item => {
          item.show = false
        })
        that.setData({
          cateList: res.data
        })
      },
      fail: function() {
        msg("标签类别失败");
        that.setData({
          loading: false
        })
      }
    })
  },
  //获取列表
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
    goodsList({
      method: 'post',
      data: {
        page: page,
        size: size,
        cate_id: this.data.id,
        tags_id: this.data.tags_id,
        price_order: this.data.priceSort,
        sale_order: this.data.saleSort
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      path: '/pages/classify/classify'
    }
  }
})