import * as routerCofig from '../router/routerConfig'
import * as condition from '../condition/conditionConfig'
console.log(condition,'condition')


const  index = {
		condition: {
			dateCycle: condition.dateCycle
		}
} 

export default {
	[routerCofig.INDEX]: index
}