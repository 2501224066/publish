import send from "./send.js"

// 注册
export function register(data) {
	return send('post', '/ykShop/doRegister', data)
}

// 登陆
export function login(data) {
	return send('post', '/ykShop/phoneLogin', data)
}

// 发送验证码
export function sendCode(data, params) {
	return send('post', '/ykShop/smsVerify', data, params)
}

// 模版
export function temp(data) {
	return send('get', '/ykActivity/getActivityByShopId', data)
}

// 提交活动
export function addActivity(data) {
	return send('post', '/hddz/ykTheme/addOrUpdate', data)
}

// 今日转发
export function transList(data) {
	return send('get', '/hddz/wxMoments/listByActivityId', data)
}

// 抽奖二维码
export function qrcode(data) {
	return send('get', '/qrcode/getQuestionUrl', data)
}

// 抽中奖信息
export function prize(data) {
	return send('post', '/lotteryUser/Applist', data)
}

// 活动
export function activityList(data) {
	return send('get', '/ykActivity/getActivitysByShopId', data)
}

// 店铺更新
export function shopUpdate(data) {
	return send('put', '/ykShop/renewShop', data)
}

// 获取用户信息
export function userInfo(data, params) {
	return send('post', '/ykShop/token', data, params)
}

// 获取店铺信息
export function shopInfo(data, params) {
	return send('post', '/ykShop/token', data, params)
}

// 新增抽奖用户链接
export function addRevealUserUrl(data, params) {
	return send('get', '/qrcode/getQueUrl', data, params)
}

// 编辑抽中奖表单
export function editRevea(data, params) {
	return send('put', '/lotteryUser/renew', data, params)
}
