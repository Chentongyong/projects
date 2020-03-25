<template>
	<view class="wrap">
		<!--  -->
		<view class="paper_box">
			<image class="bg" src="../../static/page_content.png" mode="widthFix"></image>
			<view class="paper_content">
				<view class="float_item">
					<text class="label">姓名：</text>
					<input type="text" value="" />
				</view>
				<view class="float_item">
					<text class="label">生日：</text>
					<input type="text" value="" />
				</view>
				<view class="float_item">
					<text class="label">QQ：</text>
					<input type="number" value="" />
				</view>
				<view class="float_item">
					<text class="label">父母电话：</text>
					<input type="number" value="" />
				</view>
				<view class="float_item">
					<text class="label">我家的地址：</text>
					<input type="text" value="" />
				</view>
				<view class="float_item">
					<text class="label">我的爱好：</text>
					<input type="text" value="" />
				</view>
				<view class="float_item">
					<text class="label">人生座右铭：</text>
					<input type="text" value="" />
				</view>
				<view class="float_item">
					<text class="label">写给十年后的自己：</text>
					<input type="text" value="" />
				</view>
			</view>
		</view>
		<!--  -->
		<view class="btn_block" @click="save">保存</view>
	</view>
</template>

<script>
import util from '../../utils/util.js'
export default {
	data() {
		return {
			list: []
		};
	},
	onLoad() {
		this.list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
	},
	methods: {
		save() {
			util.success("保存成功",function(){
				uni.navigateBack({
					delta: 1
				})
			})
		}
	}
};
</script>

<style lang="less">
.wrap {
	background-color: #ffffff;
}
.paper_box {
	margin: 60rpx auto;
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
	}
}
.btn_block{
	margin: 100rpx 30rpx;
}
</style>
