import request from '@/utils/requestUtil'

export function fetchProductCouponList(productId) {
	return request({
		method: 'GET',
		url: `/mall-portal/member/coupon/listByProduct/${productId}`,
	})
}

export function addMemberCoupon(couponId) {
	return request({
		method: 'POST',
		url: `/mall-portal/member/coupon/add/${couponId}`,
	})
}

export function fetchMemberCouponList(useStatus) {
	return request({
		method: 'GET',
		url: '/mall-portal/member/coupon/list',
		params:{useStatus:useStatus}
	})
}