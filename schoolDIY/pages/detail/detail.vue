<template>
	<view class="wrap">
		<view class="content"><image :src="detail.img" mode="widthFix" style="width: 100%;" lazy-load="true"></image></view>
		<view class="footer">
			<navigator class="btn bg_main" open-type="navigateBack" delta="1" hover-class="none">返回相册</navigator>
			<view class="btn bg_main" v-if="userInfo.identity == 3 || detail.uid == userInfo.id" @tap="changeDetail">修改调整</view>
			<view class="btn bg_secondary" v-if="userInfo.identity == 3" @tap="del">删除</view>
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
			detail: {},
			userInfo: {}
		};
	},
	onLoad(options) {
		const that = this;
		api.userInfo({
			success: function(res) {
				that.userInfo = res;
			}
		});
		api.photoDetail({
			data: {
				id: options.id
			},
			success: function(res) {
				that.detail = res;
				uni.setNavigationBarTitle({
					title: res.name
				});
			}
		});
	},
	methods: {
		changeDetail() {
			let url = '';
			if (this.detail.type == 4) {
				// 同学
				url = '../studentAdd/studentAdd?id=' + this.detail.id;
			} else if (this.detail.type == 3) {
				// 教师
				url = '../teacherAdd/teacherAdd?id=' + this.detail.id;
			} else if (this.detail.type == 1) {
				// 封面情怀版
				url = '../addCover/addCover?id=' + this.detail.id;
			} else if (this.detail.type == 2) {
				// 校园一角版
				url = '../addCampus/addCampus?id=' + this.detail.id;
			} else if (this.detail.type == 5) {
				// 精彩课堂版
				url = '../addClassroom/addClassroom?id=' + this.detail.id;
			} else if (this.detail.type == 6) {
				// 节日祝福版
				url = '../addHoliday/addHoliday?id=' + this.detail.id;
			} else if (this.detail.type == 7) {
				// 多图创意版
				url = '../addOriginality/addOriginality?id=' + this.detail.id;
			} else {
				url = '';
			}
			uni.navigateTo({
				url: url
			});
		},
		del() {
			const that = this;
			util.confirm('确定要删除？', function() {
				api.deletePhoto({
					metohd: 'post',
					data: {
						id: that.detail.id
					},
					success: function(res) {
						app.globalData.isRefresh = true;
						util.msg(
							'已删除',
							function() {
								uni.navigateBack();
							},
							1000
						);
					}
				});
			});
		}
	}
};
</script>

<style lang="less">
.wrap {
	padding-bottom: 118rpx;
}
.footer {
	box-sizing: border-box;
	padding: 0 16rpx;
	width: 100%;
	height: 118rpx;
	background-color: #ffffff;
	box-shadow: 0 0 20rpx #f2f2f2;
	display: flex;
	align-items: center;
	justify-content: space-around;
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 100;
	.btn {
		flex: 1;
		margin: 0 16rpx;
		height: 78rpx;
		line-height: 78rpx;
		border-radius: 40rpx;
		text-align: center;
		font-size: 30rpx;
	}
}
</style>
