
<template>
	<el-table-column
		:type='column.type || null'
	    :prop="column.props"
	    :label="column.text"
	    :width="column.wd"
	    :fixed='column.fixed'
	    :class-name='column.props'>
	    <template slot-scope='scope'>
			<m-button-component 
		      :list='scope.row.cell_button[scope.column.property]'
		      :parentObj='scope'
		      @btCk='btnCk'/>
	    </template>
  </el-table-column>
</template>

<script>
	// 基础单元格
	export default {
		name: 'tdCellButtonComponent',
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
			btnCk(scope, bt, btIdx, event) {
	        this.$emit('btnCk',scope, bt, btIdx, event)
	      }
		}
	}
</script>   

<style lang='scss'>
.el-table td {
	.cell {
		padding: 0 4px;
		min-height: 32px;
		.m-button-component {
			border: 0;
			height: 30px;
			button {
				min-width: 48px;
				height: 26px;
				margin-right: 8px;
			}
		}
	}
}
</style>  