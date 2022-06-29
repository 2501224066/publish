<template>
	<div>
		<div class="box">
			<div class="card" v-for="(item, index) in list" :key="index">
				<div class="card-text">
					{{item.wxContent}}
				</div>
				<div class="card-img">
					<image class="img" :src="v" v-for="(v, k) in item.wxImagesList" :key="k"></image>
				</div>

				<div class="card-footer">
					<button class="btn btn1" style="width: 40%;" @click="save(item.wxImagesList)">保存</button>
					<button class="btn btn1" style="width: 40%;"
						@click=" binderShare(item.wxContent, item.wxImagesList[0], item.type)">一键发送</button>
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

			// 保存
			save(imgs) {
				imgs.forEach(item => {
					uni.saveImageToPhotosAlbum({
						filePath: item,
					});
				})
			},

			// 分享
			binderShare(content, url, type) {
				uni.setClipboardData({
					data: content,
					success: function() {
						uni.share({
							provider: "weixin",
							scene: "WXSceneTimeline",
							type: type || 2,
							title: content,
							summary: content,
							imageUrl: url,
							mediaUrl: url
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #F5F5F5;
		padding-bottom: 40rpx;
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
		margin-top: 30rpx;
	}
</style>
