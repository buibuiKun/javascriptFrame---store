import * as routerCofig from '../router/routerConfig'
import * as condition from '../condition/conditionConfig'
console.log(condition,'condition')

let {

	dateCycle,
	cityGroup,
	cityMulti,
	cityRemote,
	myName,
	textareaText

} = condition


//首页路由
const  demo = {
		condition: {
			dateCycle,
			cityGroup,
			cityMulti,
			cityRemote,
			myName,
			textareaText
		}
} 




export default {
	[routerCofig.DEMO]: demo
}