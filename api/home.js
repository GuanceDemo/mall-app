import request from '@/utils/requestUtil'

export function fetchContent() {
	return request({
		method: 'GET',
		url: '/mall-portal/home/content'
	})
}

export function fetchRecommendProductList(params) {
	return request({
		method: 'GET',
		url: '/mall-portal/home/recommendProductList',
		params:params
	})
}

export function fetchProductCateList(parentId) {
	return request({
		method: 'GET',
		url: '/mall-portal/home/productCateList/'+parentId,
	})
}

export function fetchNewProductList(params) {
	return request({
		method: 'GET',
		url: '/mall-portal/home/newProductList',
		params:params
	})
}

export function fetchHotProductList(params) {
	return request({
		method: 'GET',
		url: '/mall-portal/home/hotProductList',
		params:params
	})
}
