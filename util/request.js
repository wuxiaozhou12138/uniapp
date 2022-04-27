const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
// const baseUrl = "https://www.fastmock.site/mock/fff335cfe7f797992733361b8d1ed546/uni"


export const myRequest = (options) => {
	return new Promise((resolve,reject) => {
		uni.showLoading({
			title:"加载中"
		})
		uni.request({
			url:baseUrl + options.url,
			method:options.method || 'GET',
			data:options.data || {},
			success:(res) => {
				if(res.statusCode !== 200){
					return uni.showToast({
						title:"数据请求失败"
					})
				}
				resolve(res)
				uni.hideLoading()
			},
			fail:(err) => {
				uni.showToast({
					title:"数据请求失败"
				})
				reject(err)
				uni.hideLoading()
			}
			
			
		})
	})
}