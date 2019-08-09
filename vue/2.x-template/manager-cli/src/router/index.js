import Vue from 'vue'
import Router from 'vue-router'
import * as routerList from '@/config/router/router'

Vue.use(Router)

export default new Router({
  routes: [
    ...Object.keys(routerList).map( key => {
      return routerList[key]
    })
  ]
})
