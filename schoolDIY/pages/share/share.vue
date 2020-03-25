<template>
	<view class="wrap">
		<image class="bg" src="../../static/bg_share.jpg" mode="widthFix"></image>
		<!--  -->
		<view class="tab_box">
			<view class="tab">
				<view class="tab_item" :class="tab_index == 0 ? 'bg_main' : 'color_main'" data-index="0" @click="clickTab">邀请老师设计版面</view>
				<view class="tab_item" :class="tab_index == 1 ? 'bg_main' : 'color_main'" data-index="1" @click="clickTab">邀请同学设计版面</view>
			</view>
			<view class="tab_content" v-if="tab_index == 0"><image class="qrcode" :src="teacher_qrcode" mode="aspectFit" lazy-load="true"></image></view>
			<view class="tab_content" v-if="tab_index == 1"><image class="qrcode" :src="student_qrcode" mode="aspectFit" lazy-load="true"></image></view>
		</view>
		<!--  -->
		<view class="btn_block" @tap="save">保存</view>
		<navigator class="btn color_main" open-type="navigateBack" delta="1">返回首页</navigator>
		<painter class="painter" :palette="painter_data" @imgOK="onImgOK" />
	</view>
</template>

<script>
import api from '../../utils/api.js';
import util from '../../utils/util.js';
export default {
	data() {
		return {
			tab_index: 0,
			student_qrcode: '',
			teacher_qrcode: '',
			painter_data: '',
			painter_img: ''
		};
	},
	onLoad() {
		const that = this;
		// 学生二维码
		api.keeperQrcode({
			data: {
				type: 1
			},
			success: function(res) {
				that.student_qrcode = res;
			}
		});
		// 老师二维码
		api.keeperQrcode({
			data: {
				type: 2
			},
			success: function(res) {
				that.teacher_qrcode = res;
			}
		});
	},
	methods: {
		clickTab(e) {
			let index = e.currentTarget.dataset.index;
			this.tab_index = index;
			this.painter_img = '';
		},
		onImgOK(e) {
			uni.hideLoading();
			let imagePath = this.painter_img || e.detail.path;
			this.painter_img = imagePath;
			wx.getSetting({
				success(res) {
					if (res.authSetting['scope.writePhotosAlbum']) {
						wx.saveImageToPhotosAlbum({
							filePath: imagePath,
							success: function(){
								util.success("已保存到相册");
							}
						});
					} else if (res.authSetting['scope.writePhotosAlbum'] === false) {
						util.confirm('您还未授权访问相册,请移步设置授权。', function() {
							wx.openSetting();
						});
					} else {
						wx.authorize({
							scope: 'scope.writePhotosAlbum',
							success: function() {
								wx.saveImageToPhotosAlbum({
									filePath: imagePath,
									success: function(){
										util.success("已保存到相册");
									}
								});
							}
						});
					}
				}
			});
		},
		save() {
			const that = this;
			if(this.painter_img){
				this.onImgOK();
				return false
			}
			uni.showLoading({
				title: '正在生成海报'
			});
			let title = "";
			let qrcode = "";
			if(this.tab_index == 0){
				title = "邀请老师设计版面";
				qrcode = this.student_qrcode;
			}else if(this.tab_index == 1){
				title = "邀请同学设计版面";
				qrcode = this.teacher_qrcode;
			}
			let painter_data = {
				width: '750px',
				height: '878px',
				views: [
					{
						type: 'image',
						url: '../../static/bg_share.jpg',
						css: {
							top: '0px',
							left: '0px',
							width: '750px',
							height: '878px'
						}
					},
					{
						type: 'text',
						text: title,
						css: {
							width: '552px',
							fontSize: '26px',
							textAlign: 'center',
							color: '#fff',
							left: '99px',
							top: '147px'
						}
					},
					{
						type: 'image',
						url: qrcode,
						css: {
							width: '380px',
							height: '380px',
							borderWidth: '1px',
							borderColor: '#ffc9ce',
							borderRadius: '30px',
							top: '266px',
							left: '184px'
						}
					}
				]
			};
			this.painter_data = painter_data;
		}
	}
};
</script>

<style lang="less">
.wrap {
	background-color: #ffffff;
	position: relative;
	z-index: 0;
}
.bg {
	width: 100%;
	position: absolute;
	left: 0;
	top: 0;
	z-index: -1;
}
.tab_box {
	margin: 115rpx auto;
	width: 552rpx;
	height: 592rpx;
	background-color: #ffffff;
	border-radius: 50rpx;
	overflow: hidden;
	display: flex;
	flex-flow: column nowrap;
}
.tab {
	height: 88rpx;
	background-color: #fff4f4;
	display: flex;
}
.tab_item {
	flex: 1;
	height: 88rpx;
	line-height: 88rpx;
	text-align: center;
	font-size: 26rpx;
	overflow: hidden;
}
.tab_content {
	flex: 1;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
}
.qrcode {
	width: 380rpx;
	height: 380rpx;
	border: 1px solid #ff3a51;
	border-radius: 30rpx;
}
.btn_block {
	margin: 260rpx 150rpx 0;
	border-radius: 40rpx;
}
.btn {
	margin: 20rpx auto;
	padding: 20rpx 0;
	width: 140rpx;
	font-size: 30rpx;
	text-align: center;
}
.painter {
	position: fixed;
	left: 100%;
	top: 100%;
}
</style>
