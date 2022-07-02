const domain = 'https://share.youkelb.com/whk'

const send = (method, url, data, params = "") => {
	uni.showLoading({
		title: '加载中',
		duration: 2000,
		mask: true
	})
	return new Promise((resolve, reject) => {
		uni.request({
			url: domain + url + params,
			method: method,
			data: data,
			timeout: 10000,
			header: {
				'token': uni.getStorageSync('token') || null,
				'content-type': 'application/json'
			},
			success: (res) => {
				uni.hideLoading()
				if (res.data.code === 200) {
					resolve(res.data)
				} else if (res.data.code === 203) {
					uni.showToast({
						icon: 'error',
						title: '登录已过期'
					})
					setTimeout(() => {
						uni.navigateTo({
							url: "/pages/login/login"
						})
					}, 1000)
				} else {
					uni.showToast({
						icon: 'error',
						title: res.data.msg
					})
				}
			},
			fail: (e) => {
				uni.hideLoading()
				uni.showToast({
					icon: 'error',
					title: '网络请求超时，请退出重试',
					duration: 4000,
				})
				reject(e)
			},
		})
	})
}

export default send
