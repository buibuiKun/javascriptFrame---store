import Vue from 'vue'
import Router from 'vue-router'
import routerList from '@/config/routerList'
import store from '../store/store'

Vue.use(Router)

const router = new Router({
  routes: [
    ...Object.keys(routerList).map( key => {
      return routerList[key]
    })
  ]
})

//路由拦截

router.beforeEach((to, from , next) => {
	store.dispatch('router_page_config',to.name)
	next()

})

export default router
