<template>
	<div>
		<div class="content">
			<div class="box shadow">
				<div class="tab">
					<div :class="{'tab-item': true, 'tab-item-s' :tempIndex == index }"
						v-for="(item, index) in tempList" :key="index" @click="handerChekcout(index)">模版{{index+1}}
					</div>
				</div>
			</div>

			<div class="form">
				<div class="form-item" v-for="(item, index) in tempList[tempIndex].variableList" :key="index">
					<div class="form-item-label">{{item.varName}}：</div>
					<div class="form-item-content">
						<input v-if="item.varType == 'string'" type="text" placeholder="请输入"
							placeholder-class="placeholder" v-model="item.value" />

						<input v-if="item.varType == 'num'" type="number" placeholder="请输入"
							placeholder-class="placeholder" v-model="item.value" />

						<div v-if="item.varType == 'image'">
							<div class="photo" v-if="item.value">
								<image :src="item.value" mode="aspectFill"></image>
								<span class="del" @click="delImg(index)">X</span>
							</div>
							<div v-else class="photo" @click="handleUploadImg(index)">
								<image src="/static/upload_photo.png" mode="aspectFill" class="lab"></image>
								<text>上传二维码图片</text>
							</div>
						</div>

						<div v-if="item.varType == 'images'" class="more-box">
							<div class="photo more" v-for="(v, k) in item.value ? item.value.split(',') : []" :key="k">
								<image :src="v" mode="aspectFill"></image>
								<span class="del" @click="delImg(index, k)">X</span>
							</div>
							<div class="photo more" @click="handleUploadImg(index, true)">
								<image src="/static/upload_photo.png" mode="aspectFill" class="lab"></image>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="come">
				<span @click="getTemp()">重置表单</span>
			</div>
		</div>

		<div v-if="tempList[tempIndex].ykTheme != null" class="link">
			<div class="link-url">
				<div><span class="link-url-tag">推广链接</span></div>
				<div @click="binderShare(tempList[tempIndex].ykTheme)">{{tempList[tempIndex].ykTheme.themeUrl}}
				</div>
			</div>
			<div class="link-copy" @click="copy(tempList[tempIndex].ykTheme.themeUrl)">
				复制
			</div>
		</div>

		<div class="flex-footer-box"></div>

		<div class="flex-footer">
			<div class="box sub">
				<Preview :content="tempList[tempIndex].finishTemplate">
					<div class="btn btn1">
						预览
					</div>
				</Preview>
				<div v-if="tempList[tempIndex].ykTheme == null" class="btn btn2" @click="submit()">提交</div>
				<div v-else class="btn btn2" @click="submit()">更新</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Preview from "./components/preview.vue"
	import {
		temp,
		addActivity
	} from "@/request/api.js"

	export default {
		components: {
			Preview
		},
		data() {
			return {
				tempList: [{
					variableList: null
				}],
				tempIndex: 0,
				theme: null,
				isUpdate: true
			}
		},
		onShow() {
			if (!this.loginVerify()) return
			if (this.isUpdate) {
				this.getTemp()
			}
		},
		methods: {
			// 分享到微信聊天
			binderShare(obj) {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: obj.themeUrl,
					title: obj.title,
					summary: obj.describe,
					imageUrl: obj.urlImage,
					fail: (err) => {
						uni.showToast({
							icon: 'error',
							title: '分享失败'
						})
					}
				});
			},

			// 登陆校验
			loginVerify() {
				if (!uni.getStorageSync('token')) {
					uni.showToast({
						icon: 'error',
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

			// 复制
			copy(url) {
				uni.setClipboardData({
					data: url
				})
			},

			// 获取模版
			async getTemp() {
				let res = await temp({
					shopId: uni.getStorageSync('shopInfo').id
				})
				this.tempList = res.data.templateList
				console.log(res.data.templateList)
				uni.setStorageSync('activityId', res.data.id)
				this.isUpdate = false
			},

			// 选择模版
			handerChekcout(index) {
				this.tempIndex = index
			},

			// 上传图片
			handleUploadImg(index, isMore = false) {
				var that = this
				wx.chooseImage({
					success(res) {
						const tempFilePaths = res.tempFilePaths
						wx.uploadFile({
							url: 'https://share.youkelb.com/whk/picture/upload',
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'user': 'test'
							},
							success(res) {
								let url = JSON.parse(res.data).data
								if (isMore) {
									if (that.tempList[that.tempIndex].variableList[index].value == null) {
										that.tempList[that.tempIndex].variableList[index].value = url
									} else {
										that.tempList[that.tempIndex].variableList[index].value +=
											`,${url}`
									}
								} else {
									that.tempList[that.tempIndex].variableList[index].value = url
								}

							}
						})
					}
				})
			},

			// 删除图片
			delImg(index, k = null) {
				if (k != null) {
					this.tempList[this.tempIndex].variableList[index].value.splice(k, 1)
				} else {
					this.tempList[this.tempIndex].variableList[index].value = null
				}

			},

			// 校验
			verify() {
				try {
					for (let i = 0; i < this.tempList[this.tempIndex].variableList.length; i++) {
						let item = this.tempList[this.tempIndex].variableList[i];
						if (!item.value) throw '请输入' + item.varName
					}
				} catch (e) {
					uni.showToast({
						icon: 'error',
						title: e
					})
					return false
				}
				return true
			},

			// 提交
			async submit() {
				if (!this.verify()) return
				this.theme = this.tempList[this.tempIndex].ykTheme

				if (this.theme == null) {
					let data = {
						templateId: this.tempList[this.tempIndex].id,
						activityId: uni.getStorageSync('activityId'),
						shopId: uni.getStorageSync('userInfo').id,
						ykVariableList: this.tempList[this.tempIndex].variableList
					}
					await addActivity(data)
					uni.showToast({
						icon: 'success',
						title: '提交完成'
					})
				} else {
					let data = {
						id: this.theme.id,
						templateId: this.tempList[this.tempIndex].id,
						activityId: uni.getStorageSync('activityId'),
						shopId: uni.getStorageSync('userInfo').id,
						ykVariableList: this.tempList[this.tempIndex].variableList
					}
					await addActivity(data)
					uni.showToast({
						icon: 'success',
						title: '更新完成'
					})
				}
				this.getTemp()
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F5F5F5;
	}
</style>

<style lang="scss" scoped>
	.shadow {
		box-shadow: 0px 4px 10px 0px rgba(255, 135, 28, 0.1);
	}

	.content {
		background: #fff;
		border-radius: 0 0 16px 16px;
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

	.form {
		padding: 40rpx 30rpx 0 30rpx;
	}

	.form-item {
		display: flex;
		justify-content: space-between;
		margin-bottom: 40rpx;
	}

	.form-item-label {
		width: 150rpx;
		font-size: 12px;
		height: 72rpx;
		line-height: 72rpx;
		padding-right: 20rpx;
		color: #999999;
	}

	.form-item-content {
		flex: 1;
	}

	.form-item-content>input {
		height: 72rpx !important;
		background: #F5F5F5 !important;
		border-radius: 12rpx !important;
		font-size: 30rpx !important;
		color: #333333 !important;
		padding: 0 30rpx;
	}

	.form-item-content .more-box {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.form-item-content .photo {
		width: 250rpx;
		height: 250rpx;
		background: #FFFFFF;
		border: 1rpx dashed #CCCCCC;
		border-radius: 12rpx;
		font-size: 30rpx;
		color: #CCCCCC;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		position: relative;

		overflow: hidden;
	}

	.form-item-content .del {
		content: "X";
		position: absolute;
		right: 0;
		top: 0;
		display: inline-block;
		width: 20px;
		height: 20px;
		background: #999;
		color: #fff;
		text-align: center;
		line-height: 20px;
		border-radius: 0 0 0 6px;
	}


	.form-item-content .more {
		width: 120rpx;
		height: 120rpx;
		margin: 0 20px 20px 0;
	}

	.form-item-content .photo image {
		width: 100%;
		height: 100%;
		margin-bottom: 10rpx;
	}

	.form-item-content .photo .lab {
		width: 48rpx;
		height: 48rpx;

	}

	.link {
		display: flex;
		align-items: center;
		padding: 0 30px;
		margin: 50px 0;
		box-sizing: border-box;
		justify-content: space-between;

		&-url {
			width: 85%;
			padding: 10px;
			box-sizing: border-box;
			border-radius: 10px;
			color: #fff;
			background: #F74239;
			word-break: break-all;

			&-tag {
				display: inline-block;
				background: #fff;
				color: #F74239;
				padding: 2px 5px;
				border-radius: 4px;
				margin-bottom: 6px;
			}
		}

		&-copy {
			color: #F74239;
		}
	}

	.sub {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.btn {
		width: 330rpx;
	}

	.come {
		padding: 50px 0;
		text-align: center;
		color: #F74239;
	}
</style>
