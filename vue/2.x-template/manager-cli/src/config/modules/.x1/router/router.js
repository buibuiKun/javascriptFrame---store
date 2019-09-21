import * as routerList from './routerConfig'

import Demo from '@/page/demo'
import UserInfo from '@/page/userInfo/userInfo'




export const demo = {
	path: `/${routerList.DEMO}`,
	name: routerList.DEMO,
	component: Demo
}

export const userInfo = {
	path: `/${routerList.USERINFO}`,
	name: routerList.USERINFO,
	component: UserInfo
}