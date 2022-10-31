import {
	baseUrl
} from '@/common/config.js'

export const topList = () => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${baseUrl}/toplist/detail`,
			method: 'GET',
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

export const list = (id) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${baseUrl}/playlist/detail?id=${id}`,
			method: 'GET',
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			},
			complete: () => {

			}
		})
	})


}
