


//条件校验(select, input, textarea, checkBox, radio, date)
export const conditionRulerTest = function(ruleData) {
		//若进来的是空的，中止
		if(!Array.isArray(ruleData) && !ruleData) return
		//若进来的对象
		if(!Array.isArray(ruleData) && ruleData && typeof ruleData === 'object') {
			ruleData = [ruleData]
		}
		ruleData.forEach(item => {
			let require = item.config.required
			let value = item.value
			let ruleError = item.config.ruleError
			let errorMessage = item.config.errorMessage
			//select 校验(只有空值校验)
			if (item.component.indexOf('select') >= 0) {
				if ((!value  || value === '' || (Array.isArray(value) && value.length === 0)) && require) {
						ruleError = true
						return errorMessage = `请选择${item.title}`
				}
				ruleError = false
			}

			//input 校验
			if (item.component.indexOf('input') >= 0) {
				if ((!value  || value === '') && require) {
						ruleError = true
						return errorMessage = `请输入${item.title}`
				}
				ruleError = false
			}


			//textarea
			if(item.component.indexOf('textarea') >= 0) {

			}


			//date
			if(item.component.indexOf('date') >= 0) {

			}
		})
}