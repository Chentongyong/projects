// pages/poster/poster.js
import {
  imageShare,
  getUserInfo,
} from '../../utils/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:'',
    data:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    setTimeout(()=>{
    },2000)
  },
  // postSave(e) {
  //   let images = this.data.images
  //    wx.showLoading({
  //     title: '保存中...'
  //   })
  //   wx.downloadFile({
  //     url: images,
  //     success: function(res) {
  //       //图片保存到本地
  //       wx.saveImageToPhotosAlbum({
  //         filePath: res.tempFilePath,
  //         success: function(data) {
  //           console.log(res.tempFilePath)
  //           console.log(images)
  //           wx.hideLoading()
  //           wx.showModal({
  //             title: '提示',
  //             content: '您的推广海报已存入手机相册，赶快分享给好友吧',
  //             showCancel: false,
  //           })
  //         },
  //         fail: function(err) {
  //           if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
  //             // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
  //             wx.showModal({
  //               title: '提示',
  //               content: '需要您授权保存相册',
  //               showCancel: false,
  //               success: modalSuccess => {
  //                 wx.openSetting({
  //                   success(settingdata) {
  //                     // console.log("settingdata", settingdata)
  //                     if (settingdata.authSetting['scope.writePhotosAlbum']) {
  //                       wx.showModal({
  //                         title: '提示',
  //                         content: '获取权限成功,再次点击图片即可保存',
  //                         showCancel: false,
  //                       })
  //                     } else {
  //                       wx.showModal({
  //                         title: '提示',
  //                         content: '获取权限失败，将无法保存到相册哦~',
  //                         showCancel: false,
  //                       })
  //                     }
  //                   },
  //                   fail(failData) {
  //                     // console.log("failData", failData)
  //                   },
  //                   complete(finishData) {
  //                     // console.log("finishData", finishData)
  //                   }
  //                 })
  //               }
  //             })
  //           }
  //         },
  //         complete(res) {
  //           wx.hideLoading()
  //         }
  //       })
  //     }
  //   })
  // },
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
      success: function (res) {
        
        imageShare({
          data: {
            uid: res.data.id
          },
          success: function (res) {
            that.setData({
              images: res.data
            })
          }
        })
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
    let uid = this.data.uid
    return {
      path: '/pages/index/index?scene='+uid
    }
  }
})