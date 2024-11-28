import request from '@/utils/requestUtil'

export function queryNoticeList(params) {
	return request({
		method: 'GET',
		url: '/mall-notice/notice/query',
		params: params
	})
}