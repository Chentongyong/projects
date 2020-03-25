<template>
	<view class="wrap">
		<view class="header">
			<view class="box">
				<image class="icon" src="../../static/icon_position.png" mode="aspectFit"></image>
				<view class="info">
					<view class="class">{{grade}}</view>
					<view class="school">{{school}}</view>
				</view>
			</view>
		</view>
		<!--  -->
		<view class="content">
			<scroll-view class="scroll_view" scroll-x="true">
				<view class="list">
					<block v-for="(item, index) in list" :key="index"><image class="cover" :src="item.img" mode="aspectFill" lazy-load="true"></image></block>
				</view>
			</scroll-view>
			<view class="paper_box">
				<image class="bg" src="../../static/page_content.png" mode="widthFix"></image>
				<view class="paper_content">
					<view class="float_item">
						<text class="label">姓名：</text>
						<input type="text" v-model="data.word.name" />
					</view>
					<view class="float_item">
						<text class="label">电话：</text>
						<input type="number" v-model="data.word.phone" />
					</view>
					<view class="float_item">
						<text class="label">任教科目：</text>
						<input type="text" v-model="data.word.subjects" />
					</view>
					<view class="float_item"><text class="label">毕业寄语：</text></view>
					<textarea v-model="data.word.message" placeholder="300字以内" maxlength="300" />
				</view>
			</view>
			<!--  -->
			<view class="up_img_title">
				上传图片
				<text class="small">/限4张</text>
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
				请按要求填写并上传（文字不能漏填，照片张数不能少，否则 无法为您提供设计服务）
			</view>
			<!--  -->
			<view class="btns">
				<view class="btn color_main" @tap="upTemp">自己上传</view>
				<view class="btn bg_main" @click="start">开始设计</view>
			</view>
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
			type: 4,
			school: '',
			grade: '',
			list: [],
			data: {
				type: 4,
				action: '',
				name: '教师',
				images: [],
				word: {
					name: '',
					phone: '',
					subjects:'',
					message: ''
				},
				file: '',
				f_id: '',
				id: ''
			},
			maxNum: 4
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
		api.index({
			success: function(res) {
				that.school = res.school;
				that.grade = res.grade;
			}
		});
		// 获取模板列表
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
			if (!this.data.word.name) {
				util.msg('自己上传需要填写您的姓名');
				return false;
			}
			that.data.name = this.data.word.name;
			let data = JSON.parse(JSON.stringify(that.data));
			data.word = JSON.stringify(data.word);
			api.uploadImage({
				num: 1,
				success: function(result) {
					uni.uploadFile({
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
			if (!this.data.word.name) {
				util.msg('请填写您的姓名');
				return false;
			}
			if (!this.data.word.phone) {
				util.msg('请填写您的手机号');
				return false;
			}
			if (!this.data.word.subjects) {
				util.msg('请填写您的任教科目');
				return false;
			}
			if (!this.data.word.message) {
				util.msg('请填写毕业寄语');
				return false;
			}
			if(this.data.images.length < this.maxNum){
				util.msg('还需要上传' + (this.maxNum - this.data.images.length) + '张图片');
				return false
			}
			this.data.name = this.data.word.name;
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
	padding-top: var(--status-bar-height);
	padding-bottom: 120rpx;
	background-color: #ffffff;
}
.header {
	padding-top: var(--status-bar-height);
	width: 100%;
	height: 120rpx;
	background-color: #ffffff;
	box-shadow: 0 0 20rpx #f2f2f2;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 100;
	display: flex;
	align-items: center;
	.box {
		box-sizing: border-box;
		padding: 0 30rpx;
		width: 100%;
		display: flex;
	}
	.icon {
		margin: 4rpx 10rpx 0 0;
		width: 30rpx;
		height: 30rpx;
	}
	.info {
		flex: 1;
		overflow: hidden;
	}
	.class {
		font-weight: bold;
	}
	.school {
		font-size: 24rpx;
		color: #999999;
	}
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
		border-radius: 20rpx 70rpx 20rpx 20rpx;
	}
}
.content {
	padding-top: 120rpx;
}
.paper_box {
	margin: auto;
	width: 690rpx;
	overflow: hidden;
	position: relative;
	z-index: 0;
	.bg {
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
	}
	.paper_content {
		padding: 50rpx 30rpx;
		color: #813e19;
		position: relative;
		z-index: 0;
		.float_item {
			margin-top: 12rpx;
			overflow: hidden;
		}
		.label {
			height: 60rpx;
			line-height: 60rpx;
			float: left;
		}
		input {
			height: 60rpx;
			border-bottom: 1rpx dashed #efc0a7;
		}
		textarea {
			box-sizing: border-box;
			padding: 20rpx;
			width: 100%;
			height: 450rpx;
			border: 1rpx dashed #efc0a7;
		}
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
