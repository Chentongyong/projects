<template>
	<view class="wrap">
		<view class="header">
			<view class="school">{{school}}</view>
			<view class="class">{{grade}}教师</view>
			<view class="pages color_main">共{{ allNum }}页</view>
		</view>
		<view class="list">
			<block v-for="(item,index) in list" :key="index">
				<navigator class="item" :url="'../detail/detail?id='+item.id" hover-class="none">
					<image class="cover" :src="item.img" mode="aspectFill" lazy-load="true"></image>
					<view class="name">{{item.name}}</view>
				</navigator>
			</block>
		</view>
		<view class="nothing" v-if="list.length == 0 && isNoMore">
			<image mode="aspectFill" src="/static/nothing.png" lazy-load="true" />
			<view>暂无数据~</view>
		</view>
		<view class="no_more" v-else-if="list.length > 0 && isNoMore">暂无更多</view>
		<view class="loading" v-else><image src="/static/loading.gif" mode="aspectFill" /></view>
	</view>
</template>

<script>
import api from '../../utils/api.js';
import util from '../../utils/util.js';
export default {
	data() {
		return {
			school: '',
			grade: '',
			allNum: 0,
			list: [],
			page: 0,
			isNoMore: false,
			isLoading: false
		};
	},
	onLoad() {
		const that = this;
		api.index({
			success: function(res){
				that.school = res.school;
				that.grade = res.grade;
			}
		})
		this.getListData();
	},
	// 上拉触底
	onReachBottom() {
		this.getListData();
	},
	methods: {
		getListData(){
			const that = this;
			if(this.isNoMore || this.isLoading){
				return false;
			}
			let page = this.page + 1;
			let size = 10;
			api.photos({
				data:{
					type: 2,
					page: page,
					size: size
				},
				success: function(res){
					that.allNum = res.count;
					let list = res.list;
					if (list.length < size) {
						that.isNoMore = true;
					}
					that.list = that.list.concat(list);
					that.page = page;
				},
				fail: function(res){
					that.isNoMore = true;
				},
				complete: function(res){
					that.isLoading = false;
				}
			})
		}
	}
};
</script>

<style lang="less">
.wrap {
	padding: 118rpx 0 0;
}
.header {
	width: 100%;
	height: 118rpx;
	background-color: #ffffff;
	box-shadow: 0 0 20rpx #f2f2f2;
	text-align: center;
	font-size: 26rpx;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 100;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	.school {
		color: #666666;
	}
	.class {
		margin-top: 10rpx;
	}
	.pages {
		position: absolute;
		right: 30rpx;
		bottom: 20rpx;
	}
}
.list {
	padding: 0 20rpx;
	overflow: hidden;
	display: flex;
	flex-flow: row wrap;
	.item {
		margin-top: 24rpx;
		width: 33.3%;
		text-align: center;
		font-size: 26rpx;
		overflow: hidden;
	}
	.cover {
		display: block;
		margin: auto;
		width: 190rpx;
		height: 254rpx;
		border: 10rpx solid #ffffff;
		border-radius: 20rpx 70rpx 20rpx 20rpx;
	}
	.name {
		margin-top: 10rpx;
	}
}
</style>
