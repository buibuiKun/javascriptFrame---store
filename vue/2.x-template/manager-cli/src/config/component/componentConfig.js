
/**
 * 配置说明
 * required ： 当前项是否可必填项（*）
 * clear ： 当前项是否可可清除项( 出现清除小按钮, 点击可清除当前项 )
 * disabled : 当前项是否可编辑
 * show: 整个条件隐藏
 * valueComponentHide 隐藏条件值
 * t_wd: 标题宽度
 * v_wd: 值得宽度
 * multiple: 下拉选择框多选
 * ruleError 校验是否出错
 * errorMessage 校验显示的信息
 * maxlength 限制文本长度
 *
 *
 */

const config = {
	required: true, 
  clear: true,
  disabled: false,
  show: false,
  titleHide: false,
  valueComponentHide: false,
  t_wd: '100px',
  v_wd: '230px',
  ruleError: false,
  errorMessage: ''
}



/**
 * 下拉查询组件配置，可搜索(非远程)
 * 
 * @type {Object}
 */
export const select_search_component = {
		component: 'select-search-component',
	  list: [],
	  value: '',
		config: {
			...config,
		}
}

/**
 * 下拉查询组件配置，可搜索(远程)
 * loading 查询的时候loading 状态
 * @type {Object}
 */
export const select_remote_search_component = {
		component: 'select-remote-search-component',
	  list: [],
	  value: '',
		config: {
			...config,
			loading: false
		}
}

/**
 * 下拉查询组件配置，可搜索(非远程), 多选
 * 
 * @type {Object}
 */
export const select_search_multiple_component = {
		component: 'select-search-multiple-component',
	  list: [],
	  value: [],
		config: {
			...config,
			multiple: true
		}
}

/**
 * 下拉组件配置，分组组件
 * list 数据配置
 * list[{
 * 	label: xx,
 * 	options: [{
 * 		label: xx,
 * 		value: yy
 * 	}]
 * }]
 * @type {Object}
 */
export const select_group_component = {
		component: 'select-group-component',
	  list: [],
	  value: '',
		config: {
			...config,
		}
}

/**
 *常规input 输入框
 * 
 */
export const input_component = {
	component: 'input-component',
  value: '',
	config: {
		...config,
	}
}


/**
 *常规textarea-input 文本输入框
 *maxlength 限制文本长度
 * 
 */
export const textarea_maxlength_component = {
	component: 'textarea-maxlength-component',
  value: '',
	config: {
		...config,
		maxlength: 256,
	}
}