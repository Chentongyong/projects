//app.js
App({
    globalData: {
        userInfo: null,
        rawData: null,
        accessToken: '54f4bb4a14f50c78da61b1aa1bc5a81d8fd9f38d',
        checkToken: null,
        host: 'https://fanshi.my8m.com/api/',
        token: '',
    },
    onLaunch: function() {
        // 展示本地存储能力
        var token = '';
        wx.setStorageSync('token', token)
        let that = this;
        // 登录获取token
        var checkToken = new Promise(function(resolve, reject) {
            wx.login({
                success: function(res) {
                    if (res.code) {
                        wx.request({
                            url: that.globalData.host + 'common/login',
                            method: 'POST',
                            data: {
                                code: res.code
                            },
                            header: {
                                'content-type': 'application/json', // 默认值
                            },
                            success: function(res) {
                                if (res.data.code == 200) {
                                    // 存入缓存
                                    wx.setStorageSync('token', res.data.key);
                                    // 保存为全局
                                    that.globalData.token = res.data.key;
                                } else {
                                    console.log(res.data.msg)
                                }
                                resolve && typeof resolve === 'function' && resolve();
                            },
                            fail: function() {
                                wx.showToast({
                                    title: '网络无响应,请稍后再试',
                                    icon: 'none'
                                })
                            }
                        })
                    } else {
                        reject && typeof reject === 'function' && reject()
                    }
                }
            });
        })
        this.globalData.checkToken = checkToken;
        //判断是否有新版本
        wx.getSystemInfo({
            success: function(res) {
                let sdk = res.SDKVersion
                sdk.toString()
                sdk = sdk.replace(/[.]/g, '')
                sdk = Number(sdk)
                if (sdk <= 199) {
                    wx.showModal({
                        title: '提示',
                        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
                    })
                    return false
                }
                const updateManager = wx.getUpdateManager()
                updateManager.onCheckForUpdate(function(res) {

                })
                updateManager.onUpdateReady(function() {
                    wx.showModal({
                        title: '更新提示',
                        content: '新版本已经准备好，是否重启应用？',
                        confirmColor: '#FF3C3C',
                        success: function(res) {
                            if (res.confirm) {
                                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                updateManager.applyUpdate()
                            }
                        }
                    })
                });

                updateManager.onUpdateFailed(function() {
                    // 新版本下载失败
                });
            }
        });
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        lang: 'zh_CN',
                        success: res => {
                            that.globalData.userInfo = res.userInfo;
                            that.globalData.rawData = res;
                        }
                    })
                }
            }
        })
    }
})