<template>
	<view class="wrap">
		<!--  -->
		<view class="header">
			<view class="box">
				<image class="icon" src="../../static/icon_position.png" mode="aspectFit"></image>
				<view class="info">
					<view class="class">{{ grade }}</view>
					<view class="school">{{ school }}</view>
				</view>
			</view>
		</view>
		<!--  -->
		<view class="list">
			<block v-for="(item,index) in list" :key="index">
				<view class="item" @tap="navigator(item.id)">
					<image class="cover" :src="item.img" mode="aspectFill" lazy-load="true"></image>
					<view class="flex">
						<view class="name">{{item.name}}</view>
						<view class="btn bg_main">开始制作</view>
					</view>
				</view>
			</block>
		</view>
		<!--  -->
		<view class="footer">
			<navigator class="btn" url="../share/share" hover-class="none"><image src="../../static/btn1.png" mode="aspectFit"></image></navigator>
			<navigator class="btn" url="../shareAuth/shareAuth" hover-calss="none"><image src="../../static/btn2.png" mode="aspectFit"></image></navigator>
			<navigator class="btn" url="../albumList/albumList" hover-class="none"><image src="../../static/btn3.png" mode="aspectFit"></image></navigator>
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
			grade: '',
			school: '',
			list: []
		};
	},
	onLoad() {
		uni.hideTabBar();
	},
	onShow() {
		const that = this;
		api.keeperIndex({
			success: function(res) {
				that.grade = res.grade;
				that.school = res.school;
				that.list = res.list;
			}
		});
	},
	methods: {
		navigator(index) {
			index = parseInt(index);
			let url = '';
			switch (index) {
				case 1:
					url = '../addCover/addCover';
					break;
				case 2:
					url = '../addCampus/addCampus';
					break;
				case 3:
					url = '../studentPhotoList/studentPhotoList';
					break;
				case 4:
					url = '../teacherPhotoList/teacherPhotoList';
					break;
				case 5:
					url = '../addClassroom/addClassroom';
					break;
				case 6:
					url = '../addHoliday/addHoliday';
					break;
				case 7:
					url = '../addOriginality/addOriginality';
					break;
				default:
					break;
			}
			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>

<style lang="less">
.wrap {
	padding: var(--status-bar-height) 0 184rpx;
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
.list {
	margin-top: 120rpx;
	padding: 0 30rpx;
	overflow: hidden;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	.item {
		margin-top: 30rpx;
		background-color: #ffffff;
		border: 12rpx solid #ffffff;
		border-radius: 20rpx 70rpx 20rpx 20rpx;
		position: relative;
	}
	.cover {
		display: block;
		width: 306rpx;
		height: 330rpx;
		border-radius: 20rpx 70rpx 20rpx 20rpx;
	}
	.flex {
		margin: 12rpx 0 8rpx;
		height: 72rpx;
		display: flex;
		align-items: center;
	}
	.name {
		flex: 1;
		font-size: 26rpx;
	}
	.btn {
		width: 120rpx;
		height: 44rpx;
		line-height: 44rpx;
		border-radius: 22rpx;
		text-align: center;
		font-size: 22rpx;
	}
}
.footer {
	box-sizing: border-box;
	padding: 0 30rpx;
	width: 100%;
	height: 184rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 100;
	.btn {
		width: 214rpx;
		height: 124rpx;
		border-radius: 10rpx;
		box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
	}
	image {
		width: 214rpx;
		height: 124rpx;
	}
}
</style>
