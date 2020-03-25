/**
 * 
 */

const app = getApp();
const accessToken = app.globalData.accessToken;
// 发起带token的请求
const wxTokenRequest = (params, url) => {
  app.globalData.checkToken.then(function () {  //Promise请求
    let method = params.method || 'get';//默认为get请求，传入请求类型则替换
    method = method.toLocaleUpperCase();//将method的值改成大写字母
    let token = wx.getStorageSync('token');//token（登录有效期）
    let data = params.data || {};//默认为空值，传值则替换
    wx.request({
      url: app.globalData.host + url,
      method: method,
      data: data, 
      header: {//带参数请求，判断token是否超过有效期
        'Content-Type': 'application/json',
        'accessToken': accessToken,
        "token": token
      },
      dataType: params.dataType || 'json',//数据类型，默认为json
      responseType: params.responseType || 'text',//params 传参params的类型默认为文本类型
      success: res => {
        if (res.statusCode == 200 && res.data.code == 200) {//成功（正常返回）
          params.success && params.success(res.data)//只有params.success和params.success(res.data)的值都为true时，才执行后面的代码
        } else {
          params.fail && params.fail(res.data)
        }
      },
      fail: res => {
        wx.showToast({
          title: '网络错误或接口错误',
          icon: 'none'
        })
        params.fail && params.fail(res)
      },
      complete: res => {
        if (res.data.code == 4003) {
          wx.reLaunch({//跳转禁用页面
            url: '/pages/forbidden/forbidden'
          });
          return false;
        }
        if (res.data.code && res.data.code == 1009 || res.data.code == 1007) {
          // token过期重新登录
          // reLogin(function() {//调用登录方法，重新登录
          //   wxTokenRequest(params, url)
          // })
          reLogin()
          return false
        }
        params.complete && params.complete(res)
      }
    })
  })
};
// 小程序重新登录
const reLogin = callback => {
  wx.showLoading({
    title: '重新登录中',
  });
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      if (res.code) {
        //发起网络请求
        wx.request({
          url: app.globalData.host + 'common/login',
          method: 'POST',
          data: {
            code: res.code
          },
          header: {
            'Content-Type': 'application/json'
          },
          dataType: 'json',
          responseType: 'text',
          success: res => {
            if (res.data.code == 200) {
              wx.setStorageSync('token', res.data.key);//存储token值（用于判断登录是否超时）
              app.globalData.token = res.data.token;
              callback && typeof callback === 'function' && callback()
            }
          },
          fail: res => {
            wx.showToast({
              title: '登录失败',
              icon: 'none'
            })
          },
          complete: res => {
            wx.hideLoading();
          }
        })
      } else {
        wx.hideLoading()
        // console.log('登录失败！' + res.data.msg)
      }
    }
  })
};

// //上传图片
// const uploadImage = params => {
//   let token = wx.getStorageSync('token');
//   wx.chooseImage({
//     count: num || 9, // 默认9
//     sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
//     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
//     success: res => {
//       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
//       let tempFilePaths = res.tempFilePaths
//       let file_length = tempFilePaths.length
//       wx.showLoading({
//         title: '正在上传图片',
//       })
//       let arr = [];
//       let index = 0;
//       for (var i = 0; i < file_length; i++) {
//         let filePath = tempFilePaths[i]
//         wx.uploadFile({
//           url: app.globalData.host + 'common/upload',
//           filePath: filePath,
//           name: 'file',
//           header: {
//             'token': token
//           },
//           success: res => {
//             arr.push(JSON.parse(res.data).data);
//             index++
//             if (index == file_length) {
//               wx.hideLoading();
//               var result = []
//               for (var i = 0; i < arr.length; i++) {
//                 result.push(arr[i])
//               }
//               callback(result)
//             }
//           },
//           fail: function(res) {
//             wx.hideLoading();
//             wx.showToast({
//               title: '上传失败,请稍后重试',
//               icon: 'none'
//             })
//           }
//         })
//       }
//     }
//   })
// };
//  上传图片返回路径
const uploadImage = (params) => {
  wx.chooseImage({
    count: params.num || 9,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: function (res) {
      let tempFilePaths = res.tempFilePaths

      let file_length = tempFilePaths.length
      let arr = [];
      let index = 0;
      let num = 0;
      wx.showLoading({
        title: '正在上传图片',
      })
      tempFilePaths.forEach(element => {
        wx.uploadFile({
          url: app.globalData.host + 'common/upload',
          header: {
            'content-type': 'multipart/form-data',
            'token': app.globalData.token,
          },
          filePath: element,
          name: 'file',
          success: function (res) {
            let data = JSON.parse(res.data)
            if (res.statusCode == 200) {
              arr.push(data.data)
              num++
            }
          },
          fail: function (res) {
            // console.log(res)
          },
          complete: function (res) {
            index++
            if (index == file_length) {
              setTimeout(() => {
                wx.hideLoading()
                params.complete && params.complete({
                  success_num: num,
                  fail_num: file_length - num
                })
                params.success && params.success(arr)
              }, 500);
            }
          }
        })
      });
    }
  })
}
/** 
 * 会员
 **/
//首次更新会员信息
const saveUserInfo = params => wxTokenRequest(params, 'user/info');
//获取个人信息
const getUserInfo = params => wxTokenRequest(params, 'user/info');
//修改个人信息
const editUserInfo = params => wxTokenRequest(params, 'user/info');

//系统消息
const messageList = params => wxTokenRequest(params, 'shop/message/list');
//消息详情
const messageDetail = params => wxTokenRequest(params, 'shop/message/info');

//聊天
const chat = params => wxTokenRequest(params, 'shop/index/chat');

//地址
//添加地址
const addAddress = params => wxTokenRequest(params, 'shop/address/info');
//删除地址
const delAddress = params => wxTokenRequest(params, 'shop/address/info');
//地址列表
const addressList = params => wxTokenRequest(params, 'shop/address/info');
//地址详情
const addressDetail = params => wxTokenRequest(params, 'shop/address/detail');
//门店地址
const storeAddress = params => wxTokenRequest(params, 'shop/address/service');

//线下支付文本
const payRule = params => wxTokenRequest(params, 'shop/index/offlinePayment');

//首页
const index = params => wxTokenRequest(params, 'shop/index/index');

//商品分类
const goodsCate = params => wxTokenRequest(params, 'shop/goods/cate');
//商品列表
const goodsList = params => wxTokenRequest(params, 'shop/goods/list');
//商品详情
const goodsDetail = params => wxTokenRequest(params, 'shop/goods/detail');
//获取规格详情
const specDetail = params => wxTokenRequest(params, 'shop/goods/spec');
//标签类别
const tagsSpec = params => wxTokenRequest(params, 'shop/goods/tags');

//收藏
const collectGoods = params => wxTokenRequest(params, 'shop/collect/info');
//收藏列表
const collectList = params => wxTokenRequest(params, 'shop/collect/info');

/**
 * 订单
 * */
//订单确认
const orderConfirm = params => wxTokenRequest(params, 'shop/order/confim');
//下单
const orderInfo = params => wxTokenRequest(params, 'shop/order/info');
//支付订单
const payOrder = params => wxTokenRequest(params, 'shop/order/pay');
//订单列表
const orderList = params => wxTokenRequest(params, 'shop/order/info');
//订单详情
const orderDetail = params => wxTokenRequest(params, 'shop/order/detail');
//取消订单
const cancelOrder = params => wxTokenRequest(params, 'shop/order/cancel');
//确认收货
const confirmOrder = params => wxTokenRequest(params, 'shop/order/confirm');
//提醒发货
const remindOrder = params => wxTokenRequest(params, 'shop/order/remind');
//查看物流
const expressOrder = params => wxTokenRequest(params, 'shop/order/express');

// 订单提醒数量
const orderSum = params => wxTokenRequest(params,'shop/order/num')
/**
 * 售后
 */
//售后申请页面
const orderRefund = params => wxTokenRequest(params, 'shop/orderRefund/apply');
//提交售后
const postRefund = params => wxTokenRequest(params, 'shop/orderRefund/apply');
//售后订单列表
const refundList = params => wxTokenRequest(params, 'shop/orderRefund/info');
//售后订单详情
const refundDetail = params => wxTokenRequest(params, 'shop/orderRefund/detail');
//取消售后
const cancelRefund = params => wxTokenRequest(params, 'shop/orderRefund/cancel');
//填写换货物流
const changeRefund = params => wxTokenRequest(params, 'shop/orderRefund/change');

/**
 * 购物车
 **/
//添加购物车
const addCart = params => wxTokenRequest(params, 'shop/cart/info');
//购物车列表
const cartList = params => wxTokenRequest(params, 'shop/cart/info');
//删除购物车
const delCart = params => wxTokenRequest(params, 'shop/cart/info');
//编辑购物车
const editCart = params => wxTokenRequest(params, 'shop/cart/info');


/**
 * 登录注册
 **/
//登录
const login = params => wxTokenRequest(params, 'user/login');
//注册
const register = params => wxTokenRequest(params, 'user/register');
//获取手机验证码
const getSms = params => wxTokenRequest(params, 'user/sms');
//注册协议
const deal = params => wxTokenRequest(params, 'shop/index/registerText');

//地区数据
const areaData = params => wxTokenRequest(params, 'shop/index/areaData');

//二期
//拼团 / 秒杀
const activityBanner = params => wxTokenRequest(params, 'shop/activity/banner'); //GET 广告图banner

const seckillGood = params => wxTokenRequest(params, 'shop/activity/seckillGood'); //秒杀商品列表（分页）

const spellGood = params => wxTokenRequest(params, 'shop/activity/spellGood'); //GET 拼团商品列表（分页）

const spellUser = params => wxTokenRequest(params, 'shop/goods/spellUser'); //GET 正在拼团列表（分页）

const spellInvite = params => wxTokenRequest(params, 'shop/goods/spellInvite'); //GET 邀请好友拼团页面

//设置支付密码
const payPwd = params => wxTokenRequest(params, 'user/payPwd'); //POST 设置支付密码

//发现/晒单
const scoreList = params => wxTokenRequest(params, 'shop/score/list'); //GET 积分记录（分页）

const friendsList = params => wxTokenRequest(params, 'shop/friends/list'); //GET 精选晒单/朋友圈（分页）

const friendsInfo = params => wxTokenRequest(params, 'shop/friends/info'); //POST 发布朋友圈 GET 文章详情

const friendsLike = params => wxTokenRequest(params, 'shop/friends/like'); //POST 点赞

const deleteMessage = params => wxTokenRequest(params, 'shop/friends/info'); //发现，(店主删除朋友圈)

const friendsCenter = params => wxTokenRequest(params, 'shop/friends/center'); // GET 晒单中心

const userList = params => wxTokenRequest(params, 'shop/friends/userList'); //GET 我的晒单记录

//我的小店

// 小店加盟申请/协议
const shopParticipate = params => wxTokenRequest(params, '/shop/JoinStore/info');//get为协议，post为申请

// // 小店加盟申请
// const shopParticipate = params =>wxTokenRequest(params,'')

//商品管理
const secondCate = params => wxTokenRequest(params, 'shop/goods/secondCate'); //GET 二级商品分类

const storelists = params => wxTokenRequest(params, 'shop/goods/storelists'); //POST 商品列表（分页）

const storeGoodsStatus = params => wxTokenRequest(params, 'shop/goods/StoreGoodsStatus'); //PUT 批量修改商品价格和上下架状态

//个人名片
const storeInfo = params => wxTokenRequest(params, 'user/StoreInfo'); //GET 名片详情 POST 修改名片\

// const storeInfos = params => wxTokenRequest(params, '/user/StoreInfo')

//我的钱包
const rewardRecord = params => wxTokenRequest(params, 'user/rewardRecord'); //POST 来源记录（分页）

const withdrawal = params => wxTokenRequest(params, 'shop/withdrawal/info'); //GET 申请提现页面 POST 申请提现

const withdrawalList = params => wxTokenRequest(params, 'shop/withdrawal/list'); //POST 提现记录（分页）

//小店订单
const storeOrderList = params => wxTokenRequest(params, 'shop/order/storeOrderList'); //GET 订单列表

const storeOrderDetail = params => wxTokenRequest(params, 'shop/order/storeOrderDetail'); //GET 订单详情

const storeMoney = params => wxTokenRequest(params, 'user/storeMoney'); //GET 营业额

//其他用处
const imageShare = params => wxTokenRequest(params, 'shop/Share/image'); //GET 我的海报（直接把这个接口链接放到加载图片）

const activityText = params => wxTokenRequest(params, 'shop/index/activityText'); //GET 活动介绍

const bindStore = params => wxTokenRequest(params, 'user/bindStore'); //POST 绑定供应商

const loginAt = params => wxTokenRequest(params, 'user/loginAt'); //put 绑定供应商

const scoreMoneyRate = params => wxTokenRequest(params, 'shop/index/ScoreMoneyRate'); //GET 积分比例

const confimStore = params => wxTokenRequest(params, 'shop/order/confimStore'); //POST 订单确认

const infoStore = params => wxTokenRequest(params, 'shop/order/infoStore'); //POST 下单



module.exports = {
  uploadImage,
  getUserInfo,
  saveUserInfo,
  editUserInfo,
  messageList,
  messageDetail,
  chat,
  addAddress,
  delAddress,
  addressList,
  addressDetail,
  storeAddress,
  payRule,
  index,
  goodsCate,
  goodsList,
  goodsDetail,
  specDetail,
  collectGoods,
  collectList,
  orderConfirm,
  orderInfo,
  payOrder,
  orderList,
  orderDetail,
  cancelOrder,
  confirmOrder,
  remindOrder,
  expressOrder,
  orderRefund,
  postRefund,
  refundList,
  refundDetail,
  cancelRefund,
  changeRefund,
  delCart,
  cartList,
  addCart,
  editCart,
  tagsSpec,
  login,
  register,
  getSms,
  deal,
  areaData,
  activityBanner,
  spellGood,
  spellUser,
  spellInvite,
  activityBanner,
  seckillGood,
  spellGood,
  spellUser,
  spellInvite,
  payPwd,
  scoreList,
  friendsList,
  friendsInfo,
  friendsCenter,
  userList,
  secondCate,
  storelists,
  storeGoodsStatus,
  storeInfo,
  rewardRecord,
  withdrawal,
  withdrawalList,
  storeOrderList,
  storeOrderDetail,
  storeMoney,
  imageShare,
  activityText,
  bindStore,
  friendsLike,
  loginAt,
  scoreMoneyRate,
  confimStore,
  infoStore,
  orderSum,
  shopParticipate,
  deleteMessage
}