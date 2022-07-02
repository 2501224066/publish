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
		font-size: 14px;
		font-weight: 400;
	}

	.box {
		padding: 0 15px;
	}

	.flex-footer {
		position: fixed;
		bottom: 0;
		/* #ifdef H5 */
		bottom: 50px;
		/* #endif */
		left: 0;
		width: 100%;
		height: 60px;
		background: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.flex-footer-box {
		height: 60px;
	}

	.placeholder {
		font-size: 16px;
		color: #CCCCCC;
	}

	.btn {
		height: 44px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		border: 1px solid #F74239;
		border-radius: 22px;
		font-size: 16px;
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
		width: 7px;
		height: 12px;
	}

	.address-icon {
		width: 30px;
		height: 30px;
	}

	.reveal-icon {
		width: 19px;
		height: 19px;
	}

	.up-icon {
		width: 19px;
		height: 19px;
	}

	.down-icon {
		width: 19px;
		height: 19px;
	}
</style>
