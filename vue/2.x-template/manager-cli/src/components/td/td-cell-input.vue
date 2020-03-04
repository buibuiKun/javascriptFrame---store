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
			<el-input
				:disabled='scope.row._select_input && !scope.row._select_input[scope.column.property]' 
				v-model="scope.row[scope.column.property]" 
				:placeholder='`请输入${scope.column.label}`'
				@change='$emit("valueChange",scope, $event)'
				clearable>
			</el-input>
		</template>
  </el-table-column>
</template>

<script>
	//input单元格
	//通过表头的component 控制循环动态单元格组件
	//通过行的 cell_input属性 控制当前行的单元格是否禁用
	export default {
		name: 'tdCellInputComponent',
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
.el-input.is-disabled .el-input__inner {
	color: #808080;
}
</style>   