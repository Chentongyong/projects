<template>
	<view class="wrap">
		<image class="bg" src="../../static/bg_share2.jpg" mode="widthFix" lazy-load="true"></image>
		<!--  -->
		<view class="box"><image class="qrcode" :src="qrcode" mode="aspectFit" lazy-load="true"></image></view>
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
			qrcode: '',
			painter_data: '',
			painter_img: '',
		};
	},
	onLoad() {
		const that = this;
		// 家委权限二维码
		api.keeperQrcode({
			data: {
				type: 3
			},
			success: function(res) {
				that.qrcode = res;
			}
		});
	},
	methods: {
		clickTab(e) {
			let index = e.currentTarget.dataset.index;
			this.tab_index = index;
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
			let qrcode = this.qrcode;
			this.painter_data = '';
			let painter_data = {
				width: '750px',
				height: '878px',
				views: [
					{
						type: 'image',
						url: '../../static/bg_share2.jpg',
						css: {
							top: '0px',
							left: '0px',
							width: '750px',
							height: '878px'
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
.box {
	margin: 178rpx auto 0;
	width: 550rpx;
	height: 540rpx;
	background-color: #ffffff;
	border-radius: 50rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.qrcode {
	width: 380rpx;
	height: 380rpx;
	border: 1rpx solid #ff3a51;
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
