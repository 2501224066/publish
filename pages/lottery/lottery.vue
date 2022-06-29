<template>
	<div>
		<div class="content">
			<div class="qrcode">
				<image class="qrcode-box" src="/static/qrbox.png" mode="aspectFill"></image>
				<image class="qrcode-img" :src="base64" mode="aspectFill"></image>
			</div>
			<div class="label">扫一扫参与抽奖</div>

			<div>
				<div class="btn btn2" @click="getQrcode()">刷新</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		qrcode
	} from "@/request/api.js"

	export default {
		data() {
			return {
				base64: null
			}
		},
		onShow() {
			this.getQrcode()
		},
		methods: {
			// 获取二维码
			async getQrcode() {
				let res = await qrcode({
					activityId: uni.getStorageSync('activityId'),
					shopId: uni.getStorageSync('shopInfo').id
				})
				this.base64 = res.data
			}
		}

	}
</script>

<style lang="scss" scoped>
	.content {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
	}

	.qrcode {
		position: relative;
		left: 0;
		top: 0;

		&-box {
			width: 520rpx;
			height: 520rpx;
		}

		&-img {
			width: 480rpx;
			height: 480rpx;
			position: absolute;
			top: 20rpx;
			left: 20rpx;
		}
	}

	.label {
		font-size: 32rpx;
		color: #F74239;
		margin-bottom: 94rpx;
	}

	.btn {
		width: 330rpx;
		margin: auto;
	}
</style>
