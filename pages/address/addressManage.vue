<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">{{ global.language.name }}</text>
			<input class="input" type="text" v-model="addressData.name" :placeholder="global.language.nameDes" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">{{ global.language.number }}</text>
			<input class="input" type="number" v-model="addressData.phoneNumber" :placeholder="global.language.numberDes" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">{{ global.language.postalCode }}</text>
			<input class="input" type="number" v-model="addressData.postCode" :placeholder="global.language.postalCodeDes" placeholder-class="placeholder" />
		</view>
<!-- 		<view class="row b-b">
			<text class="tit">所在区域</text>
			<text @click="chooseLocation" class="input">
				{{addressData.province}} {{addressData.city}} {{addressData.region}}
			</text>
			<text class="yticon icon-shouhuodizhi" @click="chooseLocation"></text>
		</view> -->
		<view class="row b-b">
			<text class="tit">{{ global.language.region }}</text>
			<input class="input" type="text" v-model="addressData.prefixAddress" :placeholder="global.language.region" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">{{ global.language.detailedAddress }}</text>
			<input class="input" type="text" v-model="addressData.detailAddress" :placeholder="global.language.detailedAddress" placeholder-class="placeholder" />
		</view>

		<view class="row default-row">
			<text class="tit">{{ global.language.setDefault }}</text>
			<switch :checked="addressData.defaultStatus==1" color="#fa436a" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm">{{ global.language.submit }}</button>
	</view>
</template>

<script>
	import {
		addAddress,
		updateAddress,
		fetchAddressDetail
	} from '@/api/address.js';
  const global = getApp().globalData;
	export default {
		data() {
			return {
				addressData: {
					name: '',
					phoneNumber: '',
					postCode: '',
					detailAddress: '',
					default: false,
					province: '',
					city: '',
					region: '',
					prefixAddress: ''
				},
        global: global
			}
		},
		onLoad(option) {
			let title = global.language.addAddress;
			if (option.type === 'edit') {
				title = global.language.editAddress
				fetchAddressDetail(option.id).then(response=>{
					this.addressData = response.data;
					this.addressData.prefixAddress = this.addressData.province+this.addressData.city+this.addressData.region;
				});
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			switchChange(e) {
				this.addressData.defaultStatus = e.detail.value ? 1 : 0;
			},
			//地图选择地址
			chooseLocation() {
				uni.chooseLocation({
					success: (data) => {
						this.covertAdderss(data.address);
						this.addressData.detailAddress = data.name;
					}
				})
			},
			//将地址转化为省市区
			covertAdderss(address) {
				console.log("covertAdderss", address);
				if (address.indexOf(global.language.province) != -1) {
					this.addressData.province = address.substr(0, address.indexOf(global.language.province) + 1);
					address = address.replace(this.addressData.province, "");
					this.addressData.city = address.substr(0, address.indexOf(global.language.city) + 1);
					address = address.replace(this.addressData.city, "");
					this.addressData.region = address.substr(0, address.indexOf(global.language.district) + 1);
				} else {
					this.addressData.province = address.substr(0, address.indexOf(global.language.city) + 1);
					address = address.replace(this.addressData.province, "");
					this.addressData.city = "";
					this.addressData.region = address.substr(0, address.indexOf(global.language.district) + 1);
				}
			},
			//提交
			confirm() {
				let data = this.addressData;
				if (!data.name) {
					this.$api.msg(global.language.addressDataName);
					return;
				}
				if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.phoneNumber)) {
					this.$api.msg(global.language.addressDataNumber);
					return;
				}
				if (!data.prefixAddress) {
					this.$api.msg(global.language.addressDataRegion);
					return;
				}
				this.covertAdderss(data.prefixAddress);
				if (!data.province) {
					this.$api.msg(global.language.addressDataProvince);
					return;
				}
				if (!data.detailAddress) {
					this.$api.msg(global.language.addressDataAddress);
					return;
				}
				if(this.manageType=='edit'){
					updateAddress(this.addressData).then(response=>{
						//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
						this.$api.prePage().refreshList(data, this.manageType);
						this.$api.msg(global.language.addressDataAddressUpdateSuccess);
						setTimeout(() => {
							uni.navigateBack()
						}, 800)
					});
				}else{
					addAddress(this.addressData).then(response=>{
						//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
						this.$api.prePage().refreshList(data, this.manageType);
						this.$api.msg(global.language.addressDataAddressAddSuccess);
						setTimeout(() => {
							uni.navigateBack()
						}, 800)
					});
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.tit {
			flex-shrink: 0;
			width: 150upx;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.icon-shouhuodizhi {
			font-size: 36upx;
			color: $font-color-light;
		}
	}

	.default-row {
		margin-top: 16upx;

		.tit {
			flex: 1;
		}

		switch {
			transform: translateX(16upx) scale(.9);
		}
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
