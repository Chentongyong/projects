<script>
export default {
	onLaunch: function(options) {
		const that = this;
		// 登录
		// let checkToken = new Promise(function(resolve, reject) {
		// 	uni.login({
		// 		provider: 'weixin',
		// 		success: function(loginRes) {
		// 			//发起网络请求
		// 			uni.request({
		// 				method: 'POST',
		// 				url: that.globalData.host + 'common/login',
		// 				data: {
		// 					code: loginRes.code,
		// 					type: options.type || '',
		// 					class_id: options.class_id || ''
		// 				},
		// 				success: function(res) {
		// 					if (res.data.code == '200') {
		// 						const token = res.data.key;
		// 						that.globalData.token = token;
		// 					}
		// 					resolve && typeof resolve === 'function' && resolve();
		// 				}
		// 			});
		// 		}
		// 	});
		// });
		// this.globalData.checkToken = checkToken;
	},
	onShow: function() {
		// console.log('App Show');
	},
	onHide: function() {
		// console.log('App Hide');
	},
	globalData: {
		host: 'https://diyxc.my8m.com/api/',
		checkToken: '',
		token: '',
		type: '',
		class_id: '',
		templateData: {},
		isRefresh: false
	}
};
</script>

<style>
/*每个页面公共css */
.wrap {
	box-sizing: border-box;
	min-height: 100vh;
	background-color: #f9f9f9;
	font-size: 28rpx;
	color: #333333;
	overflow: hidden;
}
.color_main {
	color: #ff3a51;
}
.bg_main {
	background-color: #ff3a51;
	color: #ffffff;
}
.bg_secondary {
	background-color: #ffebed;
	color: #ff3a51;
}
.btn_block {
	margin: 30rpx;
	height: 80rpx;
	line-height: 80rpx;
	background-color: #ff3a51;
	border: none;
	border-radius: 10rpx;
	font-size: 30rpx;
	font-weight: bold;
	text-align: center;
	color: #fff;
}
.mask {
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	position: fixed;
	left: 0;
	top: 0;
	z-index: 200;
}
/* 一行 */
.a_row {
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
/*多行换行*/
.more_row {
	word-break: break-all;
	word-wrap: break-word;
}
/* 两行 */
.two_row {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
}
.border_bottom {
	position: relative;
}
.border_bottom::after {
	content: '';
	width: 100%;
	height: 0;
	border-bottom: 1px solid #e6e6e6;
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	position: absolute;
	left: 0;
	bottom: 0;
}
.hide {
	display: none;
}
.no_more {
    margin-top: 20rpx;
    padding-bottom: 20rpx;
    text-align: center;
    font-size: 24rpx;
    color: #999;
}

.nothing {
    padding-bottom: 20rpx;
    text-align: center;
    font-size: 24rpx;
    color: #999;
}

.nothing image {
    width: 100%;
    height: 400rpx;
}

.loading {
    padding: 20rpx 0;
}

.loading image {
    display: block;
    margin: auto;
    width: 48rpx;
    height: 48rpx;
}
</style>
