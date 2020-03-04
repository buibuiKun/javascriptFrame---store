<template>
	<el-table-column
	:type='column.type || null'
    :prop="column.props"
    :label="column.text"
    :width="column.wd"
    :fixed='column.fixed'
    :class-name='column.props'>
    <template slot-scope='scope'>
    	<div class="cell_cascader_input" 
    		v-if='!(scope.row._select_input && !scope.row._select_input[scope.column.property].showText)'>
    		<el-cascader
    		  :options="scope.row._select_input[scope.column.property].list"
		      v-model="scope.row._select_input[scope.column.property].c_value"
		      @change='$emit("valueChange",scope, $event)'>
			  </el-cascader>
    		<el-input
	  			v-model="scope.row._select_input[scope.column.property].i_value"
	  			:placeholder='`请输入${scope.column.label}`'
	  			@change='$emit("valueChange",scope, $event)'
	  			clearable>
	  		</el-input>
    	</div>
  		<span v-text='scope.row[scope.column.property]' 
  			v-if='scope.row._select_input && !scope.row._select_input[scope.column.property].showText'>
  		</span>
    </template>
  </el-table-column>
</template>

<script>
	//input单元格
	//通过表头的component 控制循环动态单元格组件
	//通过行的 cell_input属性 控制当前行的单元格是否禁用
	export default {
		name: 'tdCellCascaderInputComponent',
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
		}
	}
</script>  

<style lang='scss'>
.cell {
	.cell_cascader_input {
		.el-cascader {
			line-height: 34px;
		}
	}
}
.el-input.is-disabled .el-input__inner {
	color: #808080;
}
</style>   