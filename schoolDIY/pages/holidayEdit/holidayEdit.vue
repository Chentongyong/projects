<template>
	<view class="wrap">
		<view class="content">
			<!-- 模板图片 -->
			<view class="box">
				<image class="temp" :src="temp.url" mode="widthFix"></image>
				<!-- 显示区域 -->
				<block v-for="(vo, idx) in temp.box" :key="idx">
					<view class="image_box" :style="{ width: vo.w + 'px', height: vo.h + 'px', left: vo.x + 'px', top: vo.y + 'px' }">
						<image
							class="image"
							:src="vo.img.rotate_url || '/static/icon_add_white.png'"
							:style="{ width: vo.img.width + 'px', height: vo.img.height + 'px', left: vo.img.x + 'px', top: vo.img.y + 'px' }"
							mode="aspectFit"
							lazy-load="true"
						></image>
					</view>
					<!-- 手指触摸区域 -->
					<view
						class="tap_box"
						:data-idx="idx"
						@touchstart="touchS"
						@touchmove.stop="touchM"
						@click="clickImage"
						:style="{ width: vo.w + 'px', height: vo.h + 'px', left: vo.x + 'px', top: vo.y + 'px' }"
					></view>
				</block>
				<!-- 文字 -->
				<block v-for="(item, index) in temp.txt.list" :key="index">
					<view
						class="word"
						:class="{ border: wordTouch }"
						:style="{ fontSize: temp.txt.size + 'px', color: temp.txt.color, left: item.x + 'px', top: item.y + 'px' }"
						:data-index="index"
						@touchstart="TxtTouchS"
						@touchmove="TxtTouchM"
						@touchend="TxtTouchE"
					>
						{{ item.title }}
					</view>
				</block>
			</view>
		</view>
		<!-- 底部栏 -->
		<view class="footer">
			<view class="btn color_main" @click="back">返回重选</view>
			<view class="btn bg_main" @click="submit">完成设计</view>
		</view>
		<!-- 操作 -->
		<view id="operation" v-if="isShowOperation">
			<view class="btn" @click="changeImage"><image src="/static/operation1.jpg" mode="aspectFit"></image></view>
			<view class="btn" @click="rotateImage(0)"><image src="/static/operation2.jpg" mode="aspectFit"></image></view>
			<view class="btn" @click="rotateImage(1)"><image src="/static/operation3.jpg" mode="aspectFit"></image></view>
		</view>
		<!-- canvas -->
		<canvas canvas-id="myCanvas" class="canvas" :style="{ width: temp.width + 'px', height: temp.height + 'px' }"></canvas>
		<canvas canvas-id="coverCanvas" class="canvas" :style="{ width: cover.width + 'px', height: cover.height + 'px' }"></canvas>
	</view>
</template>

<script>
import api from '../../utils/api.js';
import util from '../../utils/util.js';
let currentIndex = '';
let images_arr = '';
let old_x = '';
let old_y = '';
let startX = '';
let startY = '';
let old_width = '';
let startDistance = '';
const app = getApp();
export default {
	data() {
		return {
			id: '',
			type: '',
			temp: {},
			scale: 0,
			isShowOperation: false,
			cover: {
				width: 0,
				height: 0
			},
			data: {},
			wordTouch: false
		};
	},
	onLoad(options) {
		const that = this;
		// 获取屏幕宽度
		const device = uni.getSystemInfoSync();
		let screen_width = device.screenWidth;
		//
		let data = app.globalData.templateData;
		this.data = data;
		// 获取模板数据
		api.templateDetail({
			data: {
				cate_id: data.f_id
			},
			success: function(res) {
				if (!res.photo || res.photo.length == 0) {
					return false;
				}
				let temp = res.photo[0].template;
				// 设置缩放比例
				let scale = parseInt(temp.width) / screen_width;
				that.scale = scale;
				// 缩放数据大小
				temp.width = temp.width / scale;
				temp.height = temp.height / scale;
				// 图片
				if (temp.box && temp.box.length > 0) {
					temp.box.forEach((el, idx) => {
						el.w = el.w / scale;
						el.h = el.h / scale;
						el.x = el.x / scale;
						el.y = el.y / scale;
						el.img = {
							url: '',
							rotate_url: '',
							w: el.w,
							h: el.h,
							x: 0,
							y: 0,
							isfixed: 'w',
							rotate: 0
						};
					});
				}
				// 文字
				let list = [];
				data.images.forEach((item, index) => {
					list.push({
						title: item.name,
						x: temp.box[index].x,
						y: temp.box[index].y + temp.box[index].h + (res.size / scale) * 0.1
					});
				});
				temp.txt = {
					size: res.size / scale,
					color: res.color,
					list: list
				};
				uni.getImageInfo({
					src: temp.url,
					success: function(res) {
						temp.url = res.path;
						that.$set(that, 'temp', temp);
						data.images.forEach((item, index) => {
							that.getImageData(item.cover, index);
						});
					}
				});
			}
		});
	},
	methods: {
		// 旋转图片
		rotateImage(index) {
			// 旋转图片
			const that = this;
			let rotate = parseInt(this.temp.box[currentIndex].img.rotate) || 0;
			if (index == 0) {
				// 逆时针90°
				rotate -= 90;
			} else {
				// 顺时针90°
				rotate += 90;
			}
			if (rotate % 360 == 0) {
				rotate = 0;
			}
			let box = this.temp.box[currentIndex];
			let width = box.img.height;
			let height = box.img.width;
			let w = 0;
			let h = 0;
			let x = 0;
			let y = 0;
			let ratios = box.w / box.h;
			let isfixed = '';
			if (width / height <= ratios) {
				// 当前图片宽高比 >= 显示区域宽高比 ，图片宽 == 显示区域宽
				w = box.w;
				h = (w * height) / width;
				y = -(h - box.h) / 2;
				isfixed = 'w';
			} else {
				// 当前图片宽高比 < 显示区域宽高比 ，图片高 == 显示区域高
				h = box.h;
				w = (h * width) / height;
				x = -(w - box.w) / 2;
				isfixed = 'y';
			}
			let url = this.temp.box[currentIndex].img.url;
			let rotate_url = '';
			let deg = (360 + rotate) % 360;
			let img_w = w;
			let img_h = h;
			const ctx = uni.createCanvasContext('myCanvas');
			ctx.clearRect(0, 0, w, h);
			ctx.translate(img_w / 2, img_h / 2);
			ctx.rotate((deg * Math.PI) / 180);
			if (deg == 90 || deg == 270) {
				img_w = h;
				img_h = w;
			}
			ctx.drawImage(url, -img_w / 2, -img_h / 2, img_w, img_h);
			ctx.draw();
			setTimeout(function() {
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					width: w,
					height: h,
					destWidth: w,
					destHeight: h,
					canvasId: 'myCanvas',
					success: function(res) {
						that.temp.box[currentIndex].img = {
							url: url,
							rotate_url: res.tempFilePath,
							width: w,
							height: h,
							x: x,
							y: y,
							isfixed: isfixed,
							rotate: rotate
						};
						that.isShowOperation = false;
					}
				});
			}, 400);
		},
		// 获取图片信息并放到模板中
		getImageData(photo, index) {
			const that = this;
			let box = that.temp.box[index];
			uni.getImageInfo({
				src: photo,
				success: function(res) {
					let w = 0;
					let h = 0;
					let x = 0;
					let y = 0;
					let ratios = box.w / box.h;
					let isfixed = '';
					if (res.width / res.height <= ratios) {
						// 当前图片宽高比 >= 显示区域宽高比 ，图片宽 == 显示区域宽
						w = box.w;
						h = (w * res.height) / res.width;
						y = -(h - box.h) / 2;
						isfixed = 'w';
					} else {
						// 当前图片宽高比 < 显示区域宽高比 ，图片高 == 显示区域高
						h = box.h;
						w = (h * res.width) / res.height;
						x = -(w - box.w) / 2;
						isfixed = 'y';
					}
					box.img = {
						url: photo,
						rotate_url: photo,
						width: w,
						height: h,
						x: x,
						y: y,
						isfixed: isfixed,
						rotate: 0
					};
					that.$set(that.temp.box, index, box);
				}
			});
		},
		// 点击图片区域
		clickImage(e) {
			const that = this;
			let idx = e.currentTarget.dataset.idx;
			if (this.temp.box[idx].img.url) {
				// 显示操作
				this.isShowOperation = !this.isShowOperation;
			} else {
				// 添加图片
				api.uploadImage({
					num: 1,
					success: function(result) {
						let photo = result[0];
						let box = that.temp.box[idx];
						uni.getImageInfo({
							src: photo,
							success: function(res) {
								let w = 0;
								let h = 0;
								let x = 0;
								let y = 0;
								let ratios = box.w / box.h;
								let isfixed = '';
								if (res.width / res.height <= ratios) {
									// 当前图片宽高比 >= 显示区域宽高比 ，图片宽 == 显示区域宽
									w = box.w;
									h = (w * res.height) / res.width;
									y = -(h - box.h) / 2;
									isfixed = 'w';
								} else {
									// 当前图片宽高比 < 显示区域宽高比 ，图片高 == 显示区域高
									h = box.h;
									w = (h * res.width) / res.height;
									x = -(w - box.w) / 2;
									isfixed = 'y';
								}
								box.img = {
									url: photo,
									rotate_url: photo,
									width: w,
									height: h,
									x: x,
									y: y,
									isfixed: isfixed,
									rotate: 0
								};
								that.$set(that.temp.box, idx, box);
								that.isShowOperation = false;
							}
						});
					}
				});
			}
		},
		// 更换图片
		changeImage() {
			const that = this;
			api.uploadImage({
				num: 1,
				success: function(result) {
					let photo = result[0];
					let box = that.temp.box[currentIndex];
					uni.getImageInfo({
						src: photo,
						success: function(res) {
							let w = 0;
							let h = 0;
							let x = 0;
							let y = 0;
							let ratios = box.w / box.h;
							let isfixed = '';
							if (res.width / res.height <= ratios) {
								// 当前图片宽高比 >= 显示区域宽高比 ，图片宽 == 显示区域宽
								w = box.w;
								h = (w * res.height) / res.width;
								y = -(h - box.h) / 2;
								isfixed = 'w';
							} else {
								// 当前图片宽高比 < 显示区域宽高比 ，图片高 == 显示区域高
								h = box.h;
								w = (h * res.width) / res.height;
								x = -(w - box.w) / 2;
								isfixed = 'y';
							}
							box.img = {
								url: photo,
								rotate_url: photo,
								width: w,
								height: h,
								x: x,
								y: y,
								isfixed: isfixed,
								rotate: 0
							};
							that.$set(that.temp.box, currentIndex, box);
							that.isShowOperation = false;
						}
					});
				}
			});
		},
		touchS(e) {
			if (e.touches.length == 1) {
				//触摸起始点位置
				currentIndex = e.currentTarget.dataset.idx;
				startX = e.touches[0].clientX;
				startY = e.touches[0].clientY;
				old_x = this.temp.box[currentIndex].img.x;
				old_y = this.temp.box[currentIndex].img.y;
			}
		},
		touchM(e) {
			if (e.touches.length == 1) {
				//手指移动时位置
				var moveX = e.touches[0].clientX;
				var moveY = e.touches[0].clientY;
				//手指起始点位置与移动期间的差值
				var disX = moveX - startX;
				var disY = moveY - startY;
				let box = this.temp.box[currentIndex];
				if (box.img.isfixed == 'w') {
					// 固定不可左右移动，只能上下移动
					let y = old_y + disY;
					if (y > 0) {
						y = 0;
					} else if (y < -box.img.height + box.h) {
						y = -box.img.height + box.h;
					}
					box.img.y = y;
					this.$set(this.temp.box, currentIndex, box);
				} else if (this.temp.box[currentIndex].img.isfixed == 'y') {
					// 固定不可上下移动，只能左右移动
					let x = old_x + disX;
					if (x > 0) {
						x = 0;
					} else if (x < -box.img.width + box.w) {
						x = -box.img.width + box.w;
					}
					box.img.x = x;
					this.$set(this.temp.box, currentIndex, box);
				}
			}
		},
		TxtTouchS(e) {
			//触摸起始点位置
			if (e.touches.length == 1) {
				startX = e.touches[0].clientX;
				startY = e.touches[0].clientY;
				let index = e.currentTarget.dataset.index;
				old_x = this.temp.txt.list[index].x;
				old_y = this.temp.txt.list[index].y;
				this.wordTouch = true;
			}
		},
		TxtTouchM(e) {
			if (e.touches.length == 1) {
				//手指移动时位置
				var moveX = e.touches[0].clientX;
				var moveY = e.touches[0].clientY;
				//手指起始点位置与移动期间的差值
				var disX = moveX - startX;
				var disY = moveY - startY;
				let x = old_x + disX;
				let y = old_y + disY;
				let index = e.currentTarget.dataset.index;
				this.temp.txt.list[index].x = x;
				this.temp.txt.list[index].y = y;
			}
		},
		TxtTouchE() {
			this.wordTouch = false;
		},
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		submit() {
			const that = this;
			let num = 0;
			uni.showLoading({
				title: '正在保存数据'
			});
			// 整理数据,还原数据原来大小
			let scale = this.scale;
			let temp = {
				url: this.temp.url,
				width: this.temp.width * scale,
				height: this.temp.height * scale,
				txt: {
					width: this.temp.txt.width * scale,
					size: this.temp.txt.size * scale,
					color: this.temp.txt.color,
					x: this.temp.txt.x * scale,
					y: this.temp.txt.y * scale
				},
				word: this.temp.word
			};
			// 图片
			if (this.temp.box) {
				temp.box = [];
				this.temp.box.forEach(item => {
					temp.box.push({
						w: item.w * scale,
						h: item.h * scale,
						x: item.x * scale,
						y: item.y * scale,
						img: {
							url: item.img.url,
							rotate_url: item.img.rotate_url,
							isfixed: item.img.isfixed,
							rotate: item.img.rotate,
							width: item.img.width * scale,
							height: item.img.height * scale,
							x: item.img.x * scale,
							y: item.img.y * scale
						}
					});
				});
			}
			// 文字
			if (this.temp.txt && this.temp.txt.list.length > 0) {
				let list = [];
				this.temp.txt.list.forEach((item, index) => {
					list.push({
						title: item.title,
						x: item.x * scale,
						y: item.y * scale
					});
				});
				temp.txt = {
					size: this.temp.txt.size * scale,
					color: this.temp.txt.color,
					list: list
				};
			}
			// 画预览图
			this.cover = {
				width: temp.width,
				height: temp.height
			};
			const ctx = uni.createCanvasContext('coverCanvas');
			ctx.clearRect(0, 0, temp.width, temp.height); // 清空画布
			if (temp.box) {
				// 绘制图片
				temp.box.forEach(item => {
					ctx.save();
					ctx.fillRect(item.x, item.y, item.w, item.h);
					ctx.clip();
					ctx.translate(item.x, item.y);
					ctx.drawImage(item.img.rotate_url, item.img.x, item.img.y, item.img.width, item.img.height);
					ctx.restore();
				});
			}
			ctx.drawImage(temp.url, 0, 0, temp.width, temp.height);
			// 绘制文字
			if (temp.txt && temp.txt.list.length > 0) {
				let num = 0.74;
				let size = temp.txt.size;
				let color = temp.txt.color;
				let m_t = size * 1.7;
				ctx.setFontSize(size);
				ctx.setFillStyle(color);
				temp.txt.list.forEach(item => {
					ctx.fillText(item.title, item.x, item.y + m_t * num, item.title.length * size);
				});
			}
			ctx.draw();
			setTimeout(function() {
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					width: temp.width,
					height: temp.height,
					destWidth: temp.width,
					destHeight: temp.height,
					canvasId: 'coverCanvas',
					success: function(result) {
						uni.hideLoading();
						let url = result.tempFilePath;
						that.data.word = JSON.stringify(that.data.word);
						uni.uploadFile({
							url: app.globalData.host + 'common/upload',
							header: {
								'content-type': 'multipart/form-data',
								token: app.globalData.token
							},
							filePath: url,
							name: 'file',
							formData: that.data,
							success: function(res) {
								let data = JSON.parse(res.data);
								if (data.code == 200) {
									util.success(
										'保存成功',
										function() {
											uni.reLaunch({
												url: '../index/index'
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
			}, 2000);
		}
	}
};
</script>

<style lang="less">
.wrap {
	padding-bottom: 118rpx;
}
.canvas {
	position: fixed;
	left: 110%;
	top: 110%;
}
.content {
	overflow: hidden;
	.box {
		margin: 0 auto;
		width: 100%;
		overflow: hidden;
		position: relative;
		z-index: 0;
		.temp {
			display: block;
			width: 100%;
		}
		.image_box {
			background-color: #dbdbdb;
			overflow: hidden;
			position: absolute;
			left: 0;
			top: 0;
			z-index: -1;
			.image {
				position: absolute;
				left: 0;
				top: 0;

				image {
					width: 100%;
					height: 100%;
				}
			}
			.inter_box {
				position: absolute;
				left: 0;
				top: 0;
			}
		}
		.tap_box {
			position: absolute;
			left: 0;
			top: 0;
			z-index: 10;
		}
		.word {
			line-height: 1.8;
			position: absolute;
			z-index: 20;
			&::after {
				content: '';
				box-sizing: border-box;
				width: 100%;
				height: 100%;
				border: 1px solid rgba(0, 0, 0, 0);
				position: absolute;
				left: 0;
				top: 0;
			}
			&.border::after {
				border: 1px solid #000000;
			}
		}
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
#operation {
	width: 96rpx;
	background-color: #d3d3d3;
	border: 2rpx solid #fff;
	border-radius: 10rpx;
	overflow: hidden;
	position: fixed;
	left: 0;
	top: 50%;
	transform: translateY(-50%);

	.btn {
		width: 96rpx;
		height: 96rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	image {
		display: block;
		width: 80rpx;
		height: 80rpx;
	}

	&::before {
		content: '';
		width: 72rpx;
		height: 0;
		border-bottom: 2rpx solid #fff;
		position: absolute;
		top: 33.33%;
		left: 0;
		right: 0;
		margin: auto;
	}

	&::after {
		content: '';
		width: 72rpx;
		height: 0;
		border-bottom: 2rpx solid #fff;
		position: absolute;
		top: 66.66%;
		left: 0;
		right: 0;
		margin: auto;
	}
}
</style>
