<template>
	<div>
		<div class="title">{{this.type == 1 ? '待抽奖名单' : '中奖名单'}}</div>

		<div class="item" v-for="(item,index) in list" :key="index">
			<div class="header">
				<image class="reveal-icon" src="/static/reveal.png" mode="aspectFill"></image>
				<span class="header-title">{{item.userName}} 【{{item.phoneNum}}】</span>
				<image v-show="item._open" @click="item._open = !item._open" class="up-icon" src="/static/down.png"
					mode="aspectFill"></image>
				<image v-show="!item._open" @click="item._open = !item._open" class="up-icon" src="/static/up.png"
					mode="aspectFill"></image>
			</div>

			<div class="content" v-if="item._open">
				<div class="content-item" v-for="(v,k) in item.queObj.variableList" :key="k">
					<div class="content-item-label">{{v.varName}}</div>
					<div class="content-item-content">
						<input type="text" v-model="v.value" />
					</div>
				</div>
				<button @click="sub(index)" class="btn btn2" style="width: 50%;">编辑</button>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		prize,
		editRevea
	} from '@/request/api.js'

	export default {
		data() {
			return {
				list: [],
				activityId: null,
				type: null
			}
		},
		onLoad(options) {
			this.activityId = options.activityId
			this.type = options.type
			this.getPrize()
		},
		methods: {
			// 抽中奖信息
			async getPrize() {
				let res = await prize({
					activityId: this.activityId,
					shopId: uni.getStorageSync('shopInfo').id,
					type: this.type == 1 ? 0 : 2
				})
				res.data.list.map(item => {
					item._open = false
				})
				this.list = res.data.list
			},

			// 编辑
			async sub(index) {
				await editRevea(this.list[index])
				uni.showToast({
					icon: 'success',
					title: '操作成功'
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.title {
		width: 50%;
		text-align: center;
		color: #fff;
		background: #F74239;
		height: 30px;
		line-height: 30px;
		margin: 0 auto;
		border-radius: 0 0 10px 10px;
		margin-bottom: 10px;
	}

	.item {
		padding: 16px 20px;
		border-bottom: 1px solid #e6e6e6;
	}

	.header {
		display: flex;
		align-items: center;

		&-title {
			flex: 1;
			margin-left: 10px;
		}
	}

	.content {
		background: #e6e6e6;
		margin-top: 10px;
		padding: 10px 20px;
		border-radius: 0 0 10px 10px;

		&-item {
			display: flex;
			align-items: center;
			margin-bottom: 10px;

			&-label {
				width: 170rpx;
				height: 50rpx;
				line-height: 50rpx;
				padding-right: 20rpx;
				color: #999999;
			}

			&-content {
				flex: 1;
			}
		}

		input {
			height: 50rpx;
			line-height: 50rpx;
			background: #fff;
			padding: 0 10px;
			border-radius: 6px;
		}
	}
</style>
