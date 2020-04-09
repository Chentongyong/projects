//app.js
var QQMapWX = require('utils/qqmap-wx-jssdk.js');
// 实例化API核心类
var demo = new QQMapWX({
  key: 'XYHBZ-Y67CX-EN64R-TVI7L-M4URH-KXBO3' // 必填
});
App({
  globalData: {
    host: 'https://dqwx.my8m.com/api/',
    checkToken: '',
    token: '',
    type: '',
    class_id: '',
    templateData: {},
    isRefresh: false,
    map:[]
  },
  onLaunch: function (options) {
    const that = this;
    // 获取用户当前位置
    wx.getLocation({
      type: 'gcj02', //编码方式，
      success: function (res) {
        var latitude = res.latitude // wx.getLocation 获取当前的地理位置、速度   latitude(维度)  longitude（经度）
        var longitude = res.longitude
        let jwMap = []
        jwMap.push(longitude)
        jwMap.push(latitude)
        that.globalData.map = jwMap
        demo.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            console.log(res)
            // that.setData({
            //   cityName: res.result.address_component.city
            // })
            // wx: wx.setStorageSync('cityName', res.result.address_component.city)
          },
          fail: function (res) {
          },
        });
      }
    });



    // 登录
    // let checkToken = new Promise(function (resolve, reject) {
    //   wx.login({
    //     provider: 'weixin',
    //     success: function (loginRes) {
    //       //发起网络请求
    //       wx.request({
    //         method: 'POST',
    //         url: that.globalData.host + 'common/login',
    //         data: {
    //           code: loginRes.code,
    //           // type: options.type || '',
    //           // class_id: options.class_id || ''
    //         },
    //         success: function (res) {
    //           if (res.data.code == '200') {
    //             const token = res.data.key;
    //             that.globalData.token = token;
    //           }
    //           resolve && typeof resolve === 'function' && resolve();
    //         }
    //       });
    //     }
    //   });
    // });
    // this.globalData.checkToken = checkToken;
  }

})