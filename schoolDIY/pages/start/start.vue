<template>
	<view class="wrap">
		<image class="banner" src="../../static/login_head.png" mode="widthFix"></image>
		<view class="tips">开始页（仅测试用）</view>
		<view class="btn_block" data-ident="1" @tap="clickBtn">学生</view>
		<view class="btn_block" data-ident="2" @tap="clickBtn">教师</view>
		<view class="btn_block" data-ident="3" @tap="clickBtn">家委</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		clickBtn(e) {
			let ident = e.currentTarget.dataset.ident;
			// 登录
			let checkToken = new Promise(function(resolve, reject) {
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						//发起网络请求
						uni.request({
							method: 'POST',
							url: getApp().globalData.host + 'common/login',
							data: {
								code: loginRes.code,
								type: ident,
								class_id: 1
							},
							success: function(res) {
								if (res.data.code == '200') {
									const token = res.data.key;
									getApp().globalData.token = token;
									uni.navigateTo({
										url: '../login/login'
									});
									resolve && typeof resolve === 'function' && resolve();
								}
							}
						});
					}
				});
			});
			getApp().globalData.checkToken = checkToken;
		}
	}
};
</script>

<style lang="less">
.banner {
	width: 100%;
}
.tips {
	margin: 40rpx 0;
	width: 100%;
	text-align: center;
}
</style>
