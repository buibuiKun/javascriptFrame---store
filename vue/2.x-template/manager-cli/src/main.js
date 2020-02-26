// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import http from '@/http/http'
import utils from '@/utils/interface'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import { global_component } from '@/components/installComponents.js'
Vue.use(global_component)

Vue.config.productionTip = false
Vue.prototype.http = http
Vue.prototype.utils = utils

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  beforeCreate() {
  	console.log('根实例', 'beforeCreate','$el--', this.$el,this.$store.state.xxx,'store', this.$route.path)
  	console.log('根实例', 'beforeCreate', '$el--',this.$el)
  },
  created() {
  	console.log('根实例', 'created', '$el--', this.$el)
  },
  beforeMount() {
  	console.log('根实例', 'beforeMount', '$el--', JSON.stringify(this.$el))
  },
  mounted() {
  	console.log('根实例', 'mounted', this.$el)
  },
  components: { App },
  template: '<App/>'
})
