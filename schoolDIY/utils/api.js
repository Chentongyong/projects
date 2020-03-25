const app = getApp();
// 发起请求
const wxRequest = (params, url) => {
	if (params.isLoading) {
		let str = params.isLoading
		if (str == true) {
			str = '加载中'
		}
		wx.showLoading({
			title: str,
			mask: true
		});
	}
	let method = params.method || 'get';
	method = method.toLocaleUpperCase();//转化成大写字母
	wx.request({
		url: app.globalData.host + url,
		method: method,
		data: params.data || {},
		header: {
			'Content-Type': params.ContentType || 'application/json',
			'token': app.globalData.token,
			'version': params.version || "v1"
		},
		dataType: params.dataType || 'json',
		responseType: params.responseType || 'text',
		success: function(res) {
			if (params.isLoading) {
				wx.hideLoading()
			}
			if (res.data.code == 200) {
				params.success && params.success(res.data.data)
			} else {
				wx.showToast({
					title: res.data.msg,
					icon: 'none'
				})
				params.fail && params.fail(res.data)
			}
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
const wxTokenRequest = (params, url) => {
	if (params.isLoading) {
		let str = params.isLoading
		if (str == true) {
			str = '加载中'
		}
		wx.showLoading({
			title: str,
			mask: true
		});
	}
	app.globalData.checkToken.then(function() {
		let method = params.method || 'get';
		method = method.toLocaleUpperCase();
		wx.request({
			url: app.globalData.host + url,
			method: method,
			data: params.data || {},
			header: {
				'Content-Type': params.ContentType || 'application/json',
				'token': app.globalData.token,
				'version': params.version || "v1"
			},
			dataType: params.dataType || 'json',
			responseType: params.responseType || 'text',
			success: function(res) {
				if (params.isLoading) {
					wx.hideLoading();
				}
				if (res.data.code == 200) {
					params.success && params.success(res.data.data)
				} else if (res.data.code == 4000 || res.data.code == 4001) {
					// token过期重新登录
					reLogin(function() {
						wxTokenRequest(params, url);
					});
				} else {	
					wx.showToast({
						title: res.data.msg,
						icon: 'none'
					});
					params.fail && params.fail(res.data);
				}
			},
			fail: res => {
				if (params.isLoading) {
					wx.hideLoading();
				}
				params.fail && params.fail(res);
			},
			complete: res => {
				params.complete && params.complete(res);
			}
		});
	});
}

// 小程序重新登录
const reLogin = callback => {
	wx.showLoading({
		title: '登录中',
	})
	wx.login({
		success: function(res) {
			if (res.code) {
				//发起网络请求
				wx.request({
					url: app.globalData.host + 'common/login',
					method: 'POST',
					data: {
						code: res.code
					},
					success: function(res) {
						wx.hideLoading();
						if (res.data.code == 200) {
							const token = res.data.key;
							app.globalData.token = token;
							callback && typeof callback === "function" && callback();
						} else {
							console.log('登录失败！' + res.data.msg);
						}
					}
				})
			} else {
				wx.hideLoading();
				console.log('登录失败！' + res.errMsg);
			}
		}
	})
}
// 上传图片
const uploadImage = params => {
	wx.chooseImage({
		count: params.num || 9,
		sizeType: ['compressed'],
		sourceType: ['album'],
		success: function(res) {
			params.success && params.success(res.tempFilePaths);
		}
	})
}

// 引导页数据
const rule = params => wxRequest(params, "common/rule");
// 检测学生/老师是否已上传
const checkUpload = params => wxTokenRequest(params, "common/checkUpload");
// 获取用户信息
const userInfo = params => wxTokenRequest(params, "user/info");
// 家委登录
const keeperLogin = params => wxTokenRequest(params, "keeper/login");
// 家委首页
const keeperIndex = params => wxTokenRequest(params, "keeper/index");
// 获取二维码
const keeperQrcode = params => wxTokenRequest(params, "keeper/qrcode");
// 获取当前绑定班级数据
const index = params => wxTokenRequest(params, "index/index");
// 对应板块数据
const keeperCover = params => wxTokenRequest(params, "keeper/cover");
// 选择板块
const templateDetail = params => wxTokenRequest(params, "keeper/templateDetail");
// 班级列表数据(分页)
const photos = params => wxTokenRequest(params, "common/photos");
// 班级相册详情
const photoDetail = params => wxTokenRequest(params, "common/photoDetail");
// 删除
const deletePhoto = params => wxTokenRequest(params, "common/deletePhoto");

module.exports = {
	uploadImage,
	rule,
	checkUpload,
	userInfo,
	keeperLogin,
	keeperIndex,
	keeperQrcode,
	index,
	keeperCover,
	templateDetail,
	photos,
	photoDetail,
	deletePhoto
}
