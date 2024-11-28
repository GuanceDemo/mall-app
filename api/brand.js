import request from '@/utils/requestUtil'

export function getBrandDetail(id) {
	return request({
		method: 'GET',
		url: `/mall-portal/brand/detail/${id}`,
	})
}

export function fetchBrandProductList(params) {
	return request({
		method: 'GET',
		url: '/mall-portal/brand/productList',
		params:params
	})
}

export function fetchBrandRecommendList(params) {
	return request({
		method: 'GET',
		url: '/mall-portal/brand/recommendList',
		params:params
	})
}