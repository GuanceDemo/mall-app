import request from '@/utils/requestUtil'

export function fetchAddressList() {
	return request({
		method: 'GET',
		url: '/mall-portal/member/address/list'
	})
}

export function fetchAddressDetail(id) {
	return request({
		method: 'GET',
		url: `/mall-portal/member/address/${id}`
	})
}

export function addAddress(data) {
	return request({
		method: 'POST',
		url: '/mall-portal/member/address/add',
		data:data
	})
}

export function updateAddress(data) {
	return request({
		method: 'POST',
		url: `/mall-portal/member/address/update/${data.id}`,
		data:data
	})
}

export function deleteAddress(id) {
	return request({
		method: 'POST',
		url: `/mall-portal/member/address/delete/${id}`
	})
}

