import request from '@/utils/requestUtil'

export function clearAll() {
	return request({
		method: 'POST',
		url: '/mall-search/esProduct/clearAll',
	})
}

export function importAll() {
	return request({
		method: 'POST',
		url: '/mall-search/esProduct/importAll',
	})
}

export function searchEsProductList(params) {
	return request({
		method: 'GET',
		url: '/mall-search/esProduct/search/simple',
		params: params
	})
}
