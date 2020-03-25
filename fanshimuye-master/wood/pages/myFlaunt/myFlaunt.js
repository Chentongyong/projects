// pages/issue/issue.js
import {
  uploadImage,
  friendsInfo
} from "../../utils/api.js";
import {
  msg,
  success,
} from "../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {

    title: '',
    content: '',
    imgs_url: [],
    issue: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  title_inp: function (e) {
    let value = e.detail.value
    this.setData({
      title: value
    })
  },

  txt_inp: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  // chooseimage: function () {
  //   var that = this;
  //   wx.showActionSheet({
  //     itemList: ['从相册中选择'],
  //     itemColor: "#a3a2a2",
  //     success: function (res) {
  //       if (!res.cancel) {
  //         if (res.tapIndex == 0) {
  //           that.addImage(['album', 'camera'])
  //         }
  //       }
  //     }
  //   })

  // },

  addImage: function (type) {
    let that = this;
    let num = this.data.imgs_url.length;
    let imgs_url = this.data.imgs_url;
    // uploadImage(3 - num, function (res) {
    //   imgs_url = imgs_url.concat(res);
    //   that.setData({
    //     imgs_url
    //   })
    // });
    uploadImage({
      num: 9 - num,
      success: function (res) {
        imgs_url = imgs_url.concat(res);
        that.setData({
          imgs_url
        })
      }
    })

  },
  del(e) {
    var imgs_url = this.data.imgs_url;
    var index = e.currentTarget.dataset.index;
    imgs_url.splice(index, 1); //删除对应的下标
    this.setData({
      imgs_url

    })
  },

  issue: function () {
    let title = this.data.title
    let content = this.data.content
    let imgs_url = this.data.imgs_url
    if (title == '') {
      msg("标题不能为空")
      return false
    }
    if (content == '') {
      msg('请输入内容')
      return false
    }
    if (imgs_url.length == 0) {
      msg('请至少选择一张图片')
      return false
    }
    this.setData({
      issue: true
    })
    friendsInfo({
      method: 'post',
      data: {
        title,
        content,
        imgs_url,
      },
      success: function (res) {
        success("发布成功")
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,
          })
        }, 2000)
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