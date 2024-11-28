<template>
	<view class="container">
		<view class="list-cell b-b m-t" @click="navTo(global.language.personalData)" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{global.language.personalData}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/address/address')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{global.language.Addresses}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell" @click="navTo(global.language.authentication)" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{global.language.authentication}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		
		<view class="list-cell m-t">
			<text class="cell-tit">{{global.language.messagePush}}</text>
			<switch checked color="#fa436a" @change="switchChange" />
		</view>
		<view class="list-cell m-t b-b" @click="navTo(global.language.clearCache)" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{global.language.clearCache}}</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navToOuter('https://github.com/macrozheng/mall')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">{{global.language.about}}mall-app-web</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell">
			<text class="cell-tit">{{global.language.checkForUpdates}}</text>
			<text class="cell-tip">{{global.language.currentVersion}} 1.0.0</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell log-out-btn" @click="toLogout">
			<text class="cell-tit">{{global.language.logout}}</text>
		</view>
	</view>
</template>

<script>
	import {  
	    mapMutations  
	} from 'vuex';
	const global = getApp().globalData;
	export default {
		data() {
			return {
				global: global,
			};
		},
		methods:{
			...mapMutations(['logout']),

			navTo(url){
				if(url.indexOf("pages")!=-1){
					uni.navigateTo({
						url:url
					});
				}
				this.$api.msg(`${global.language.jumpTo}${url}`);
			},
			navToOuter(url){
				window.location.href = url;
			},
			//退出登录
			toLogout(){
				uni.showModal({
				    content: global.language.sureLogout,
				    success: (e)=>{
				    	if(e.confirm){
				    		this.logout();
				    		setTimeout(()=>{
				    			uni.navigateBack();
				    		}, 200)
				    	}
				    }
				});
			},
			//switch
			switchChange(e){
				let statusTip = e.detail.value ? global.language.open: global.language.close;
				this.$api.msg(`${statusTip}${global.language.messagePush}`);
			},

		}
	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:60upx;
		position:relative;
		background: #fff;
		justify-content: center;
		&.log-out-btn{
			margin-top: 40upx;
			.cell-tit{
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30upx;
		}
		&.m-t{
			margin-top: 16upx; 
		}
		.cell-more{
			align-self: baseline;
			font-size:$font-lg;
			color:$font-color-light;
			margin-left:10upx;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right:10upx;
		}
		.cell-tip{
			font-size: $font-base;
			color: $font-color-light;
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
	}
</style>
