import * as routerCofig from '../router/routerConfig'
import * as condition from '../condition/conditionConfig'
console.log(condition,'condition')

let {

	dateCycle,
	cityGroup,
	cityMulti,
	cityRemote

} = condition


//首页路由
const  index = {
		condition: {
			dateCycle,
			cityGroup,
			cityMulti,
			cityRemote
		}
} 

export default {
	[routerCofig.INDEX]: index
}