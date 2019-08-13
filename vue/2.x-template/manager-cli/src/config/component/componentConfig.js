
/**
 * 配置说明
 * required ： 当前项是否可必填项（*）
 * clear ： 当前项是否可可清除项( 出现清除小按钮, 点击可清除当前项 )
 * disabled : 当前项是否可编辑
 * show: 整个条件隐藏
 * valueConponentHide： 隐藏条件值
 * t_wd: 标题宽度
 * v_wd: 值得宽度
 * 
 * 
 *
 *
 */

const config = {
	required: true, 
  clear: true,
  disabled: false,
  show: false,
  valueConponentHide: false,
  t_wd: '100px',
  v_wd: '230px',
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