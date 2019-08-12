import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Store = new Vuex.Store({
	state:{
		xxx: '卡卡卡啊卡卡'
	},
	getters: {
		getMation() {
			return '卡卡卡卡卡卡卡'
		}

	},
	mutations: {

	},
	actions: {

	},
	modules: {

	}
})

export default Store