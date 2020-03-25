<template>
	<view class="wrap">
		<view class="list">
			<view class="item" v-for="(item, index) in list" :key="index" :data-index="index" @click="clickItem">
				<image class="cover" :src="item.img" mode="aspectFill" lazy-load="true"></image>
				<image class="checked" v-if="check_index == index" src="../../static/icon_checked.png" mode="aspectFit"></image>
			</view>
		</view>
		<view class="nothing" v-if="list.length == 0">
			<image mode="aspectFill" src="/static/nothing.png" lazy-load="true" />
			<view>暂无模板~</view>
		</view>
		<view class="no_more" v-else-if="list.length > 0">暂无更多</view>
		<view class="footer">
			<view class="btn color_main" @click="back">返回修改</view>
			<view class="btn bg_main" @click="submit">确定模板</view>
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
			list: [],
			check_index: 0,
			data: {}
		};
	},
	onLoad(options) {
		const that = this;
		this.data = app.globalData.templateData;
		api.keeperCover({
			data: {
				id: options.id
			},
			success: function(res) {
				if(res.list.length > 0){
					that.list = res.list;
					that.data.f_id = res.list[0].id;
				}
			},
			complete: function(res) {
				that.isNoMore = true;
			}
		});
	},
	methods: {
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		clickItem(e) {
			let index = e.currentTarget.dataset.index;
			this.check_index = index;
			let id = this.list[index].id;
			this.data.f_id = id;
		},
		submit() {
			app.globalData.templateData = this.data;
			if(this.data.type == 6){
				uni.navigateTo({
					url: '../holidayEdit/holidayEdit'
				});
			}else{
				uni.navigateTo({
					url: '../edit/edit'
				});
			}
		}
	}
};
</script>

<style lang="less">
.wrap {
	padding-bottom: 118rpx;
}
.list {
	padding: 0 30rpx;
	overflow: hidden;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	.item {
		margin-top: 30rpx;
		position: relative;
	}
	.cover {
		width: 306rpx;
		height: 330rpx;
		border: 12rpx solid #ffffff;
		border-radius: 20rpx 70rpx 20rpx 20rpx;
	}
	.checked {
		width: 36rpx;
		height: 36rpx;
		position: absolute;
		left: 26rpx;
		top: 26rpx;
	}
}
.footer {
	box-sizing: border-box;
	padding: 0 10rpx;
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
		width: 264rpx;
		height: 78rpx;
		line-height: 78rpx;
		border: 1rpx solid #ff3a51;
		border-radius: 40rpx;
		text-align: center;
		font-size: 30rpx;
	}
}
</style>
