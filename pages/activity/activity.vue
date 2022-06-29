<template>
	<div>
		<div class="item" v-for="(item,index) in list" :key="index" @click="toReveal(item.id)">
			<div>{{item.activityTitle}}</div>
			<image class="right-icon" src="/static/right.png" mode="aspectFill"></image>
		</div>
	</div>
</template>

<script>
	import {
		activityList
	} from '@/request/api.js'

	export default {
		data() {
			return {
				list: [],
				type: null
			}
		},
		onLoad(options) {
			this.type = options.type
			this.getList()
		},
		methods: {
			// 活动列表
			async getList() {
				let res = await activityList({
					shopId: uni.getStorageSync('userInfo').id
				})
				this.list = res.data
			},

			// 去奖品信息
			toReveal(id) {
				uni.navigateTo({
					url: `/pages/reveal/reveal?type=${this.type}&activityId=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		padding: 16px 20px;
		border-bottom: 1px solid #ddd;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
