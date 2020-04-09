/**
 * app.js中存储的
 * 
 * @wxReques  获取token值
 * @host   域名
 * 
 */
const app = getApp();
// 发起请求
const wxRequest = (params, url) => {
  let method = params.method || 'get';
  method = method.toLocaleUpperCase();//转化成大写字母
  wx.request({
    url: app.globalData.host + url,
    method: method,
    data: params.data || {},
    header:{
      'Content-Type': params.ContentType || 'application/json',
    },
    dataType: params.dataType || 'json',
    responseType: params.responseType || 'text',
    success: function (res) {
      console.log(res)
    },
    fail: res => {
      if (params.isLoading) {
        wx.hideLoading()
      }
      params.fail && params.fail(res)
    },
    complete: res => {
      params.complete && params.complete(res)
    }
  })
}
// 发起带token的请求
// const wxTokenRequest = (params, url) => {
//   if (params.isLoading) {
//     let str = params.isLoading
//     if (str == true) {
//       str = '加载中'
//     }
//     wx.showLoading({
//       title: str,
//       mask: true
//     });
//   }
//   app.globalData.checkToken.then(function () {
//     let method = params.method || 'get';
//     method = method.toLocaleUpperCase();
//     wx.request({
//       url: app.globalData.host + url,
//       method: method,
//       data: params.data || {},
//       header: {
//         'Content-Type': params.ContentType || 'application/json',
//         'token': app.globalData.token,
//         'version': params.version || "v1"
//       },
//       dataType: params.dataType || 'json',
//       responseType: params.responseType || 'text',
//       success: function (res) {
//         if (params.isLoading) {
//           wx.hideLoading();
//         }
//         if (res.data.code == 200) {
//           params.success && params.success(res.data.data)
//         } else if (res.data.code == 4000 || res.data.code == 4001) {
//           // token过期重新登录
//           reLogin(function () {
//             wxTokenRequest(params, url);
//           });
//         } else {
//           wx.showToast({
//             title: res.data.msg,
//             icon: 'none'
//           });
//           params.fail && params.fail(res.data);
//         }
//       },
//       fail: res => {
//         if (params.isLoading) {
//           wx.hideLoading();
//         }
//         params.fail && params.fail(res);
//       },
//       complete: res => {
//         params.complete && params.complete(res);
//       }
//     });
//   });
// }

// // 小程序重新登录
// const reLogin = callback => {
//   wx.showLoading({
//     title: '登录中',
//   })
//   wx.login({
//     success: function (res) {
//       if (res.code) {
//         //发起网络请求
//         wx.request({
//           url: app.globalData.host + 'common/login',
//           method: 'POST',
//           data: {
//             code: res.code
//           },
//           success: function (res) {
//             console.log(res)
//             wx.hideLoading();
//             if (res.data.code == 200) {
//               const token = res.data.key;
//               app.globalData.token = token;
//               callback && typeof callback === "function" && callback();
//             } else {
//               console.log('登录失败！' + res.data.msg);
//             }
//           }
//         })
//       } else {
//         wx.hideLoading();
//         console.log('登录失败！' + res.errMsg);
//       }
//     }
//   })
// }
const shopList = params => wxRequest(params, "shop/index/store")
const shop = params => {console.log(params)}

module.exports = {
  shopList,
  shop
}