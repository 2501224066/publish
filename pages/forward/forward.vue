<template>
	<div>
		<div class="box shadow">
			<div class="tab">
				<div :class="{'tab-item': true, 'tab-item-s' :tabIndex == index }" v-for="(item, index) in list"
					:key="index" @click="tabIndex = index">{{item.name}}
				</div>
			</div>
		</div>

		<div class="box">
			<div class="card" v-for="(item, index) in list[tabIndex].momentsList" :key="index">
				<div class="card-text">
					{{item.wxContent}}
				</div>
				<div class="card-img">
					<image class="img" :src="v" v-for="(v, k) in item.wxImagesList" :key="k"></image>
				</div>

				<div class="card-footer">
					<button class="btn btn1" @click="copyText(item.wxContent)">复制文本</button>
					<button class="btn btn1" @click="downloadImg(item.wxImagesList)">下载图片</button>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import {
		transList
	} from "@/request/api.js"

	export default {
		data() {
			return {
				tabIndex: 0,
				list: []
			}
		},
		onShow() {
			this.getList()
		},
		methods: {
			// 获取列表
			async getList() {
				let res = await transList({
					activityId: uni.getStorageSync('activityId'),
				})
				this.list = res.data
			},

			// 复制文本
			copyText(content) {
				uni.setClipboardData({
					data: content,
					success: function() {
						uni.showToast({
							icon: 'success',
							title: '复制完成'
						})
					}
				})
			},

			// 下载图片
			downloadImg(imgs) {
				imgs.forEach(item => {
					uni.downloadFile({
						url: item,
						success: (res) => {
							console.log(res.tempFilePath)
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: "保存中",
										icon: "loading"
									});
								},
							});
						}
					})
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #F5F5F5;
		padding-bottom: 40rpx;
	}
</style>

<style lang="scss" scoped>
	.shadow {
		background: #fff;
		box-shadow: 0px 4px 10px 0px rgba(255, 135, 28, 0.1);
	}

	.tab {
		height: 88rpx;
		display: flex;
		align-items: center;
		overflow-x: auto;
	}

	.tab-item {
		flex-shrink: 1;
		white-space: nowrap;
		height: 56rpx;
		line-height: 56rpx;
		border-radius: 28rpx;
		padding: 0 28rpx;
		margin-right: 30rpx;
		background: rgba(247, 66, 57, 0.05);
		border: 1px solid #F74239;
		border-radius: 28px;
		color: #F74239;
		box-sizing: border-box;
	}

	.tab-item-s {
		background: #F74239;
		color: #fff;
	}

	.card {
		background: #FFFFFF;
		border-radius: 24rpx;
		margin-top: 30rpx;
		padding: 37rpx 30rpx;
	}

	.card-text {
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		margin-bottom: 17rpx;
	}

	.card-img {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
	}

	.card-img>.img {
		margin-top: 20rpx;
		width: 200rpx;
		height: 200rpx;
		border-radius: 20rpx;
	}

	.card-footer {
		display: flex;
	}

	.btn {
		width: 40% !important;
		margin-top: 30rpx;
	}
</style>
