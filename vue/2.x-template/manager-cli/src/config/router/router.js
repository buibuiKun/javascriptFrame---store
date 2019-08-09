import * as routerList from './routerConfig'

import Index from '@/page/index'
import UserInfo from '@/page/userInfo/userInfo'




export const index = {
	path: `/${routerList.INDEX}`,
	name: routerList.INDEX,
	component: Index
}

export const userInfo = {
	path: `/${routerList.USERINFO}`,
	name: routerList.USERINFO,
	component: UserInfo
}