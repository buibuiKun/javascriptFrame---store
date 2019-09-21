import * as component from '@/config/component/componentConfig'


export const dateCycle = {
	type: 'dateCycle',
  title: '日期周期',
  placeholder: '请选择日期周期',
	...component.select_search_component,
}

export const cityGroup = {
	type: 'cityGroup',
  title: '城市分组',
  placeholder: '请选择城市分组',
	...component.select_group_component,
}

export const cityMulti = {
	type: 'cityMulti',
  title: '城市多选',
  placeholder: '请选择城市多选',
	...component.select_search_multiple_component,
}

export const cityRemote = {
	type: 'cityRemote',
  title: '城市远程查询',
  placeholder: '请输入城市远程查询',
	...component.select_remote_search_component,
}

export const myName = {
	type: 'myName',
  title: '名字',
  placeholder: '请输入名字',
	...component.input_component,
}

export const textareaText = {
	type: 'textareaText',
  title: '文本输入框',
  placeholder: '请输入文本',
	...component.textarea_maxlength_component,
}