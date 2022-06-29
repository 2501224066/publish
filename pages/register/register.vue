<template>
	<div>
		<div class="form">
			<div class="form-item">
				<div class="form-item-label">手机号：</div>
				<div class="form-item-content">
					<input type="text" placeholder="请输入手机号" v-model="form.phone" maxlength="11"
						placeholder-class="placeholder" />
				</div>
			</div>

			<div class="form-item">
				<div class="form-item-label">店铺名：</div>
				<div class="form-item-content">
					<input type="text" placeholder="请输入店铺名" v-model="form.storeName" maxlength="20"
						placeholder-class="placeholder" />
				</div>
			</div>

			<div class="form-item">
				<div class="form-item-label">地址：</div>
				<div class="form-item-content">
					<input type="text" placeholder="请输入地址" v-model="form.address" maxlength="100"
						placeholder-class="placeholder" />
					<span @click="openPicker()">
						<image class="address-icon" src="/static/address.png" mode="aspectFill"></image>
					</span>
				</div>
			</div>

			<div class="form-item">
				<div class="form-item-label">验证码：</div>
				<div class="form-item-content">
					<input type="text" placeholder="请输入验证码" v-model="form.code" maxlength="6"
						placeholder-class="placeholder" />
					<span class="code" @click="codeWait ? null : getCode()">获取验证码<span
							v-if="codeWait">({{codeWait}})</span></span>
				</div>
			</div>
		</div>

		<div @click="toLogin()" class="come">返回登陆</div>

		<div class="flex-footer-box"></div>

		<div class="flex-footer">
			<div class="box sub">
				<div class="btn btn2" @click="submit()">注册</div>
			</div>
		</div>

		<LotusAddress v-on:choseVal="choseValue" :lotusAddressData="lotusAddressData">
		</LotusAddress>
	</div>
</template>

<script>
	import {
		register,
		sendCode
	} from "@/request/api.js"
	import LotusAddress from "@/components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue";

	export default {
		components: {
			"LotusAddress": LotusAddress
		},
		data() {
			return {
				form: {
					phone: null,
					storeName: null,
					address: null,
					code: null,
				},
				codeWait: 0,
				lotusAddressData: {
					visible: false,
					provinceName: '',
					cityName: '',
					townName: '',
				},
			}
		},
		methods: {
			//打开picker
			openPicker() {
				this.lotusAddressData.visible = true;
				this.lotusAddressData.provinceName = '广东省';
				this.lotusAddressData.cityName = '广州市';
				this.lotusAddressData.townName = '白云区';
			},

			//回传已选的省市区的值
			choseValue(res) {
				this.lotusAddressData.visible = res.visible;
				if (res.isChose) {
					this.lotusAddressData.provinceName = res.province; //省
					this.lotusAddressData.cityName = res.city; //市
					this.lotusAddressData.townName = res.town; //区
					this.form.address = `${res.province}-${res.city}-${res.town} `; //region为已选的省市区的值
				}
			},

			// 返回登陆
			toLogin() {
				uni.navigateBack()
			},

			// 校验
			verify() {
				try {
					if (!this.form.phone) throw '请输入手机号'
					if (!this.form.storeName) throw '请输入店铺名'
					if (!this.form.address) throw '请输入地址'
					if (!this.form.code) throw '请输入验证码'
				} catch (e) {
					uni.showToast({
						icon: 'none',
						title: e
					})
					return false
				}
				return true
			},

			// 提交
			async submit() {
				if (!this.verify()) return
				await register({
					address: this.form.address,
					avatar: null,
					nickname: null,
					phoneNumber: this.form.phone,
					smsVerify: this.form.code,
					storeName: this.form.storeName,
					type: 1
				})
				this.toLogin();
			},

			// 获取验证码
			async getCode() {
				if (!this.form.phone) {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号'
					})
					return
				}
				await sendCode(null, `?phoneNumber=${this.form.phone}&type=1`)
				uni.showToast({
					icon: 'none',
					title: '验证码已发送'
				})
				this.codeWait = 60
				this.codeWaitCount()
			},

			// 递减验证码等待时间
			codeWaitCount() {
				if (this.codeWait > 0) {
					let that = this
					let time = setTimeout(() => {
						that.codeWait = that.codeWait - 1
						that.codeWaitCount()
						clearTimeout(time)
					}, 1000)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.form {
		padding: 40rpx 30rpx 0 30rpx;
	}

	.form-item {
		margin-bottom: 40rpx;
	}

	.form-item-label {
		width: 150rpx;
		height: 72rpx;
		line-height: 72rpx;
		padding-right: 20rpx;
		color: #999999;
	}

	.form-item-content {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1rpx solid #E6E6E6;
	}

	.form-item-content>input {
		flex: 1;
		height: 72rpx !important;
		font-size: 30rpx !important;
		color: #333333 !important;
	}

	.form-item-content .photo {
		width: 300rpx;
		height: 300rpx;
		background: #FFFFFF;
		border: 1rpx dashed #CCCCCC;
		border-radius: 12rpx;
		font-size: 30rpx;
		color: #CCCCCC;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}

	.form-item-content .photo image {
		width: 48rpx;
		height: 48rpx;
		margin-bottom: 10rpx;
	}

	.form-item-content .code {
		display: inline-block;
		width: 200rpx;
		height: 56rpx;
		line-height: 56rpx;
		text-align: center;
		border: 1px solid #F74239;
		border-radius: 12rpx;
		font-size: 28rpx;
		color: #F74239;
	}

	.come {
		text-align: center;
		color: #F74239;
	}

	.sub {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.btn {
		width: 100%;
	}
</style>
