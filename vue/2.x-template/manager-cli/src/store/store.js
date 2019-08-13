import Vue from 'vue'
import Vuex from 'vuex'
import pageConfig from '@/config/pages/pageConfig'

Vue.use(Vuex)

const Store = new Vuex.Store({
	state:{
		xxx: '卡卡卡啊卡卡',
		_pageMsg: null,
	},
	getters: {
		getMation() {
			return '卡卡卡卡卡卡卡'
		}

	},
	mutations: {
		set_page_params(state, _router) {
			state._pageMsg = pageConfig[_router]
			console.log(state,'state')
		}
	},
	actions: {
		router_page_config(conetxt, routerName) {
			conetxt.commit('set_page_params',routerName)
		}
	},
	modules: {

	}
})

export default Store