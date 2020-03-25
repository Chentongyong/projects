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
		<view class="up_img_title">
			上传图片
			<text class="small">/限10张</text>
		</view>
		<view class="image_list">
			<view class="item" v-for="(item, index) in data.images" :key="index">
				<image class="cover" :src="item" mode="aspectFill" lazy-load="true"></image>
				<image class="del" :data-index="index" @tap="del" src="../../static/icon_del.png" mode="aspectFit"></image>
			</view>
			<view class="item" v-if="data.images.length < maxNum" @tap="upImage"><image class="cover" src="../../static/btn_addimage.png" mode="aspectFill"></image></view>
		</view>
		<!--  -->
		<view class="tips">
			<text class="color_main">*</text>
			请按要求填写并上传（文字不能漏填，照片张数不能少，否则无法为您提供设计服务）
		</view>
		<!--  -->
		<view class="btns">
			<view class="btn color_main" @tap="upTemp">自己上传</view>
			<view class="btn bg_main" @click="start">开始设计</view>
		</view>
	</view>
</template>

<script>
import api from '../../utils/api.js';
import util from '../../utils/util.js';
const app = getApp();
export default {
	data() {
		return {
			type: 7,
			list: [],
			data: {
				type: 7,
				action: '',
				name: '多图创意',
				images: [],
				word: {
					txt: ''
				},
				file: '',
				f_id: '',
				id: ''
			},
			maxNum: 10
		};
	},
	onLoad(options) {
		const that = this;
		// 添加还是编辑
		if (options.id) {
			api.photoDetail({
				data: {
					id: options.id
				},
				success: function(res) {
					res.action = "edit";
					res.type = that.type;
					res.word = JSON.parse(res.word);
					res.images = [];
					that.data = res;
				}
			});
		}else{
			this.data.action = "add";
		}
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
		upImage() {
			const that = this;
			let num = this.maxNum - this.data.images.length;
			api.uploadImage({
				num: num,
				success: function(res) {
					that.data.images = that.data.images.concat(res);
				}
			});
		},
		del(e) {
			let index = e.currentTarget.dataset.index;
			this.data.images.splice(index, 1);
		},
		upTemp(){
			const that = this;
			let data = JSON.parse(JSON.stringify(that.data));
			data.word = JSON.stringify(data.word);
			api.uploadImage({
				num: 1,
				success: function(result) {
					wx.uploadFile({
						url: app.globalData.host + 'common/upload',
						header: {
							'content-type': 'multipart/form-data',
							'token': app.globalData.token
						},
						filePath: result[0],
						name: 'file',
						formData: data,
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
			if(this.data.images.length < this.maxNum){
				util.msg('还需要上传' + (this.maxNum - this.data.images.length) + '张图片');
				return false
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
.wrap{
	padding-bottom: 120rpx;
	background-color: #FFFFFF;
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
.up_img_title {
	margin-top: 40rpx;
	padding: 0 30rpx;
	.small {
		font-size: 24rpx;
	}
}
.image_list {
	display: flex;
	flex-flow: row wrap;
	.item {
		margin: 46rpx 16rpx 0 30rpx;
		width: 180rpx;
		height: 180rpx;
		position: relative;
	}
	.cover {
		width: 180rpx;
		height: 180rpx;
	}
	.del {
		width: 34rpx;
		height: 34rpx;
		position: absolute;
		right: -16rpx;
		top: -16rpx;
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
	display: flex;
	justify-content: space-around;
	.btn {
		width: 266rpx;
		height: 78rpx;
		line-height: 78rpx;
		border-radius: 40rpx;
		border: 1rpx solid #ff3a51;
		text-align: center;
		&:not(.bg_main){
			background-color: #FFFFFF;
		}
	}
}
</style>