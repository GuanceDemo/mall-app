import request from '@/utils/requestUtil'

export function createReadHistory(data) {
	return request({
		method: 'POST',
		url: '/mall-portal/member/readHistory/create',
		data: data
	})
}

export function fetchReadHistoryList(params) {
	return request({
		method: 'GET',
		url: '/mall-portal/member/readHistory/list',
		params: params
	})
}

export function clearReadHistory() {
	return request({
		method: 'POST',
		url: '/mall-portal/member/readHistory/clear'
	})
}