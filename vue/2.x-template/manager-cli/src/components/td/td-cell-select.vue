<template>
	<el-table-column
	:type='column.type || null'
    :prop="column.props"
    :label="column.text"
    :width="column.wd"
    :fixed='column.fixed'
    :class-name='column.props'
	:render-header="renderHeader">
    <template slot-scope='scope'>
  		<el-select v-model="scope.row[scope.column.property]" 
  			:placeholder='`${scope.column.label}`'
  			:disabled='scope.row._select_input && !scope.row._select_input[scope.column.property].disabled'
  			:multiple='scope.row._select_input[scope.column.property].multiple || false'
			@change='$emit("valueChange",scope, $event)'
  			clearable>
		    <el-option
		      v-for="(item, index) in scope.row._select_input[scope.column.property].list"
		      :key="index"
		      :label="item.label"
		      :value="item.value"
		      :disabled='!item.disabled'>
		    </el-option>
		  </el-select>
    </template>
  </el-table-column>
</template>

<script>
	//select单元格
	//通过表头的component 控制循环动态单元格组件
	//通过行的 cell_select属性 控制当前行的单元格是否禁用
	export default {
		name: 'tdCellSelectComponent',
		props: {
			columnObj: {
				type: Object,
				default: function() {
					return {}
				}
			},
		},
		computed: {
			column: function() {
				return this.columnObj
			}
		},
		methods: {
			renderHeader(h, {column}) {
				return (
				       'span',
				       [ 
				         h('i',{
							domProps:{
								innerHTML:this.columnObj.required ? '*' : ''
							},
				            class:'_required_th'
						 }),
						 h('span', column.label),
					   ]
				)
			}
		}
	}
</script>     
<style lang='scss'>
._required_th {
	font-style: normal;
	color: #FF0000;
	margin-right: 3px;
}
</style>