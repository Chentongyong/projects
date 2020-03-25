<template>
	<view class="wrap">
		<scroll-view class="scroll_view" scroll-x="true">
			<view class="list">
				<block v-for="(item, index) in list" :key="index">
					<image class="cover" :src="item.img" mode="aspectFill" lazy-load="true"></image>
				</block>
			</view>
		</scroll-view>
		<!--  -->
		<view class="group">
			<view class="flex border_bottom" v-for="(item, index) in data.images" :key="index">
				<image class="cover" :src="item.cover || '../../static/btn_addimage.png'" :data-index="index" @tap="upImage" mode="aspectFill" lazy-load="true"></image>
				<text class="txt">图片{{ index + 1 }}:</text>
				<input type="text" v-model="item.name" maxlength="20" />
			</view>
		</view>
		<!--  -->
		<view class="tips">
			<text class="color_main">*</text>
			请按要求填写并上传（文字不能漏填，照片张数不能少，否则无法为您提供设计服务）
		</view>
		<!--  -->
		<cover-view class="btns">
			<cover-view class="btn color_main" @tap="upTemp">自己上传</cover-view>
			<cover-view class="btn bg_main" @click="start">开始设计</cover-view>
		</cover-view>
	</view>
</template>

<script>
import api from '../../utils/api.js';
import util from '../../utils/util.js';
const app = getApp();
export default {
	data() {
		return {
			type: 6,
			list: [],
			data: {
				type: 6,
				action: '',
				name: '节日祝福',
				images: [],
				word: '',
				file: '',
				f_id: '',
				id: ''
			},
			maxNum: 7
		};
	},
	onLoad(options) {
		const that = this;
		// 添加还是编辑
		if (options.id) {
			// api.photoDetail({
			// 	data: {
			// 		id: options.id
			// 	},
			// 	success: function(res) {
			// 		res.action = 'edit';
			// 		res.type = that.type;
			// 		res.word = JSON.parse(res.word);
			// 		res.images = [];
			// 		that.data = res;
			// 	}
			// });
			this.data = {
				type: 6,
				action: 'add',
				name: '节日祝福',
				images: [{
					cover: '../../static/t_cover2.png',
					name: '图片1'
				},{
					cover: '../../static/t_cover2.png',
					name: '图片2'
				},{
					cover: '../../static/t_cover2.png',
					name: '图片3'
				},{
					cover: '../../static/t_cover2.png',
					name: '图片4'
				},{
					cover: '../../static/t_cover2.png',
					name: '图片5'
				},{
					cover: '../../static/t_cover2.png',
					name: '图片6'
				},{
					cover: '../../static/t_cover2.png',
					name: '图片7'
				}],
				word: '',
				file: '',
				f_id: '',
				id: ''
			}
		} else {
			this.data.action = 'add';
			let images = [];
			for (var i = 0; i < this.maxNum; i++) {
				images.push({
					cover: '',
					name: ''
				});
			}
			this.data.images = images;
		}
		api.index({
			success: function(res) {
				that.school = res.school;
				that.grade = res.grade;
			}
		});
		// 获取模板数据
		api.keeperCover({
			data: {
				id: this.type
			},
			success: function(res) {
				that.list = res.list;
			}
		});
	},
	methods: {
		upImage(e) {
			const that = this;
			let index = e.currentTarget.dataset.index;
			api.uploadImage({
				num: 1,
				success: function(res) {
					that.data.images[index].cover = res[0];
				}
			});
		},
		upTemp() {
			const that = this;
			api.uploadImage({
				num: 1,
				success: function(result) {
					wx.uploadFile({
						url: app.globalData.host + 'common/upload',
						header: {
							'content-type': 'multipart/form-data',
							token: app.globalData.token
						},
						filePath: result[0],
						name: 'file',
						formData: {
							type: that.type,
							action: that.data.action,
							name: '节日祝福',
							word: '',
							f_id: ''
						},
						success: function(res) {
							let data = JSON.parse(res.data);
							if (data.code == 200) {
								util.success(
									'上传成功',
									function() {
										uni.redirectTo({
											url: '../albumList/albumList'
										});
									},
									1200
								);
							} else {
								util.msg(data.msg);
							}
						},
						fail: function(res) {
							console.log(res);
						}
					});
				}
			});
		},
		start() {
			let img_num = 0;
			let name_num = 0;
			this.data.images.forEach(item => {
				if (item.cover) {
					img_num++;
				}
				if (item.name) {
					name_num++;
				}
			});
			if (img_num < this.maxNum) {
				util.msg('还需要上传' + (this.maxNum - img_num) + '张图片');
				return false;
			}
			if (name_num < this.maxNum) {
				util.msg('还需填写' + (this.maxNum - img_num) + '张图片名');
				return false;
			}
			app.globalData.templateData = this.data;
			// 开始设计
			uni.navigateTo({
				url: '../templateList/templateList?id=' + this.type
			});
		}
	},
	onUnload() {
		app.globalData.templateData = {};
	}
};
</script>

<style lang="less">
.wrap {
	padding-bottom: 120rpx;
	background-color: #ffffff;
}
.scroll_view {
	width: 100%;
	height: 300rpx;
	.list {
		padding: 20rpx 0 0 30rpx;
		white-space: nowrap;
	}
	.cover {
		display: inline-block;
		margin-right: 30rpx;
		width: 230rpx;
		height: 250rpx;
		background-color: #ffffff;
		border-radius: 20rpx 70rpx 20rpx 20rpx;
	}
}
.group {
	padding: 0 30rpx;
	.flex {
		padding: 28rpx 0;
		display: flex;
		align-items: center;
	}
	.cover {
		width: 106rpx;
		height: 106rpx;
	}
	.txt {
		margin: 0 12rpx 0 24rpx;
	}
	input {
		flex: 1;
		height: 90rpx;
		overflow: hidden;
	}
}
.tips {
	margin: 40rpx 30rpx;
	font-size: 24rpx;
	color: #999999;
}
.btns {
	box-sizing: border-box;
	margin: 40rpx 0;
	padding: 0 30rpx;
	width: 100%;
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 100;
	display: flex;
	justify-content: space-around;
	.btn {
		width: 266rpx;
		height: 78rpx;
		line-height: 78rpx;
		border-radius: 40rpx;
		border: 1rpx solid #ff3a51;
		text-align: center;
		&:not(.bg_main) {
			background-color: #ffffff;
		}
	}
}
</style>
