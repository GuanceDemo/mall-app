import Vue from 'vue'
import VueI18n from 'vue-i18n'// v8.x
import store from './store'
import App from './App'
import en from './locale/en.json'
import zhHans from './locale/zh-Hans.json'
const messages = {
	en,
	'zh-Hans': zhHans
}
let i18nConfig = {
	locale: uni.getLocale(),// 获取已设置的语言
	messages
}
const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}
Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)
Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {msg, prePage};

App.mpType = 'app'
const app = new Vue({
	i18n,
    ...App
})
app.$mount()