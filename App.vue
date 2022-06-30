<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	page {
		font-size: 28rpx;
		font-weight: 400;
	}

	.box {
		padding: 0 30rpx;
	}

	.flex-footer {
		position: fixed;
		bottom: 0;
		/* #ifdef H5 */
		bottom: 100rpx;
		/* #endif */
		left: 0;
		width: 100%;
		height: 120rpx;
	}

	.flex-footer-box {
		height: 120rpx;
	}

	.placeholder {
		font-size: 32rpx;
		color: #CCCCCC;
	}

	.btn {
		height: 88rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		border: 2rpx solid #F74239;
		border-radius: 44rpx;
		font-size: 32rpx;
		font-weight: bold;
		box-sizing: border-box;
	}

	.btn1 {
		background: #FFFFFF;
		color: #F74239;
	}

	.btn2 {
		background: #F74239;
		color: #fff;
	}

	.right-icon {
		width: 14rpx;
		height: 24rpx;
	}

	.address-icon {
		width: 60rpx;
		height: 60rpx;
	}

	.reveal-icon {
		width: 38rpx;
		height: 38rpx;
	}

	.up-icon {
		width: 38rpx;
		height: 38rpx;
	}

	.down-icon {
		width: 38rpx;
		height: 38rpx;
	}
</style>
