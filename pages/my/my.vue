<template>
	<div>
		<div class="photo">
			<image class="photo-img" :src="avatar" mode="aspectFill"></image>
			<text>{{nickname}}</text>
		</div>

		<div class="box list">
			<div class="box list-item" v-for="(item, index) in list" :key="index" @click="dump(item.link)">
				<image class="list-item-icon" :src="'/static/my_'+(index+1)+'.png'" mode="aspectFill"></image>
				<text class="list-item-text">{{item.title}}</text>
				<image class="right-icon" src="/static/right.png" mode="aspectFill"></image>
			</div>
		</div>

		<div @click="unLogin()" class="come">退出登录</div>
	</div>
</template>

<script>
	import {
		addRevealUserUrl
	} from "@/request/api.js"

	export default {
		data() {
			return {
				avatar: "/static/test.jpg",
				nickname: '自由自在',
				list: [{
						title: '抽奖信息',
						link: "/pages/activity/activity?type=1"
					},
					{
						title: '获奖信息',
						link: "/pages/activity/activity?type=2"
					},
					{
						title: '添加抽奖用户',
						link: 'ADD_REVEAL_USER'
					},
					{
						title: '填写店铺信息',
						link: "/pages/shop/shop"
					},
				]
			}
		},
		onShow() {
			if (!this.loginVerify()) return
			this.init()
		},

		methods: {
			// 初始化
			init() {
				let userInfo = uni.getStorageSync('userInfo')
				this.avatar = userInfo && userInfo.avatar ? userInfo.avatar : this.avatar
				this.nickname = userInfo && userInfo.nickname ? userInfo.nickname : this.nickname
			},

			// 登陆校验
			loginVerify() {
				if (!uni.getStorageSync('token')) {
					uni.showToast({
						icon: 'none',
						title: '尚未登陆'
					})
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}, 1000)
					return
				}
				return true
			},

			// 退出登陆
			unLogin() {
				uni.removeStorageSync('userInfo')
				uni.removeStorageSync('activityId')
				uni.removeStorageSync('shopInfo')
				uni.removeStorageSync('token')
				uni.showToast({
					icon: 'none',
					title: '操作成功'
				})
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/promote/promote'
					})
				}, 1000)
				return
			},

			//跳转
			dump(url) {
				if (url == 'ADD_REVEAL_USER') {
					this.comeAddRevealUser()
				}
				uni.navigateTo({
					url
				})
			},

			// 去添加抽奖用户
			async comeAddRevealUser() {
				let res = await addRevealUserUrl({
					activityId: uni.getStorageSync('activityId'),
					shopId: uni.getStorageSync('shopInfo').id
				})

				// #ifdef H5 || MP-WEIXIN  
				window.location.href = res.data
				// #endif

				// #ifdef APP-PLUS　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　
				if (plus.os.name == 'Android') {
					plus.runtime.openURL(res.data);
				} else if (plus.os.name == 'iOS') {
					plus.runtime.openURL(res.data);
				}
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F5F5F5 url('/static/my_bg.png') no-repeat;
		background-size: 100%;
	}
</style>
<style lang="scss" soped>
	.photo {
		height: 450rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 32rpx;
		font-weight: bold;
		color: #FFFFFF;

		&-img {
			border: 4rpx solid rgba(250, 250, 250, .5);
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			overflow: hidden;
			margin-bottom: 20rpx;
		}
	}

	.list {
		&-item {
			margin-bottom: 30rpx;
			height: 98rpx;
			background: #FFFFFF;
			border-radius: 12rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 32rpx;
			color: #333333;

			&-icon {
				width: 44rpx;
				height: 44rpx;
			}

			&-text {
				flex: 1;
				margin: 0 28rpx;
			}
		}
	}

	.come {
		text-align: center;
		color: #F74239;
	}
</style>
