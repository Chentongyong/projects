<template>
	<view class="wrap">
		<view class="content" v-if="userInfo.id && userInfo.identity != 1 && userInfo.identity != 2">
			<image class="head" src="/static/login_head.png" mode="widthFix" />
			<form @submit="submit">
				<view class="group">
					<view class="title">账号</view>
					<input name="number" value="admin" placeholder="请输入账号" />
					<view class="title">密码</view>
					<input name="password" value="admin" password="true" placeholder="请输入密码" />
					<button class="btn_block" form-type="submit">登录</button>
				</view>
			</form>
		</view>
		<!-- 闪屏页 -->
		<scroll-view class="mask start_box" v-show="isShowStartBox" scroll-y="true">
			<view class="txt">
				<jyf-parser :html="content" ref="article" @imgtap="nothing" @imglongtap="nothing"></jyf-parser>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import api from '../../utils/api.js';
import util from '../../utils/util.js';
export default {
	data() {
		return {
			userInfo: {},
			isShowStartBox: false,
			content: ''
		};
	},
	onLoad(options) {
		const that = this;
		api.userInfo({
			isLoading: true,
			success: function(res) {
				that.userInfo = res;
				let identity = res.identity;
				if (identity == 1 || identity == 2) {
					that.showMask(identity);
				}
				// 引导页
				api.rule({
					success: function(result) {
						let content = '';
						if (identity == 1) {
							content = result.student;
						} else if (identity == 2) {
							content = result.teacher;
						} else {
							content = result.keeper;
						}
						content = content.replace(/&lt;/g, '<');
						content = content.replace(/&gt;/g, '>');
						content = content.replace(/&quot;/g, '"');
						that.content = content;
					}
				});
			}
		});
	},
	methods: {
		submit(e) {
			const that = this;
			let data = e.detail.value;
			if (!data.number) {
				util.msg('请输入账号');
				return false;
			}
			if (!data.password) {
				util.msg('请输入密码');
				return false;
			}
			api.keeperLogin({
				method: 'post',
				data: data,
				success: function(res) {
					that.isShowStartBox = true;
					util.success(
						'登录成功',
						function() {
							let timer = setTimeout(function() {
								clearTimeout(timer);
								// 跳到家委首页
								uni.reLaunch({
									url: '../index/index'
								});
							}, 1500);
						},
						1000
					);
				}
			});
		},
		showMask(identity) {
			const that = this;
			this.isShowStartBox = true;
			let type = 0;
			if (identity == 1) {
				type = 4;
			} else if (identity == 2) {
				type = 3;
			}
			api.checkUpload({
				data: {
					type: type
				},
				success: function(res) {
					setTimeout(function() {
						if (res) {
							// 已经制作过相册了
							uni.reLaunch({
								url: '../albumList/albumList'
							});
						} else if (identity == 1) {
							// 学生制作相册
							uni.redirectTo({
								url: '../studentAdd/studentAdd'
							});
						} else if (identity == 2) {
							// 教师制作相册
							uni.redirectTo({
								url: '../teacherAdd/teacherAdd'
							});
						}
					}, 2000);
				}
			});
		},
		nothing() {}
	}
};
</script>

<style lang="less">
.wrap {
	background-color: #ffffff;
}
.head {
	width: 100%;
}
.group {
	margin: auto;
	width: 534rpx;
}
.title {
	margin-top: 18rpx;
	padding-left: 30rpx;
	height: 72rpx;
	line-height: 72rpx;
}
input {
	box-sizing: border-box;
	padding: 0 30rpx;
	width: 100%;
	height: 76rpx;
	border: 1rpx solid #fecdd8;
	border-radius: 10rpx;
}
.btn_block {
	margin: 180rpx 0 0;
}
.start_box {
	background-color: #ffffff;
	.txt {
		overflow: hidden;
	}
}
</style>
