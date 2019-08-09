
import componentList from './components'
export const global_component = function global_component (Vue) {
	if (global_component.installed) return
	Object.keys(componentList).forEach(key => {
		Vue.component(componentList[key].name, componentList[key])
	})
}
