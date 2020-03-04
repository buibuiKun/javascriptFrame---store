<template>
	<div class="table-base-component">
		<el-table v-bind="$attrs"
	      :data="tableData"
	      :border='border'
		  @cell-click='cellClick'
	      style="width: 100%" @selection-change="(selection) => $emit('selectChange', selection)"
	      highlight-current-row>
	      <components
	      	v-for='(thObj, index) in headData'
	      	:is='thObj.component || "tdCellComponent"' 
	      	:columnObj='thObj' 
	      	:key='index'
	      	@valueChange='valueChange'
			@focusChange='focusChange'
			@popoverCk='popoverCk'
	      	@btnCk='celBtnClick'/>
	    </el-table>
	</div>
</template>

<script>
	
	export default {
		name:'tableBaseComponent',
		props: {
			headList:{
				type: Array,
				default: function() {
					return []
				}
			},
			tableData: {
				type: Array,
				default: function() {
					return []
				}
			},
			border: {
				type: Boolean,
				default: function() {
					return true
				}
			}
		},
		data() {
			return {}
		},
		computed: {
			headData: function() {
				return this.headList
			},
			dataSet: function() {
				return this.tableData
			}
		},
		methods: {
			valueChange(scope, value, type) {
				console.log(scope, value, type)
				this.$emit('valueChange',scope, value, type)
			},
			focusChange(scope, value, type) {
				console.log(888)
				this.$emit('focusChange',scope, value, type)
			},
			celBtnClick(scope, bt, idx, event) {
				this.$emit('celBtnClick', scope, bt, idx, event)
			},
			cellClick(row, column, event) {
				this.$emit('cellClick', row, column, event)
			},
			popoverCk(scope, text) {
				this.$emit('popoverCk', scope, text)
			}
		}
	}
</script>

<style lang='scss'>
.el-table {
	th {
		background: #f2f2f2;
		color: #666;
		font-weight: 540;
		font-size: 13px;
	}
	td, th.is-leaf {
		border-bottom: 1px solid #ccc !important;
		font-size: 13px;
	}
	td {
		padding: 3px 0 !important;
		.el-input__inner {
			height: 32px;
			line-height: 32px;
		}
	}
}
.el-table::before {
	background: #fff !important;
	height: 0;
}

.el-table--border {
	border: 1px solid #ccc !important;
	border-bottom: 0 !important;
	th, td {
		border-right: 1px solid #ccc !important;
	}
}
.el-table__fixed-right::before, 
.el-table__fixed::before {
	background-color: #ccc;
}
</style>

<!-- // headList: [{
// 	props: 'number',
// 	text: '年龄',
// 	type: 'selection'
// },{
// 	props: 'name',
// 	text: '姓名',
// 	component: 'tdCellInputComponent',

// },{
// 	props: 'downList',
// 	text: '下拉',
// 	component: 'tdCellSelectComponent',

// }],
// dataSet: [{
// 	number: '2882828',
// 	name: '梁政',
// 	select_list: {
// 		downList:[{
// 			label: '下拉一',
// 			value: 1,
// 			disabled: true
// 		}]
// 	},
	// cell_select: {
	// 	downList: false
	// },
	// cell_input: {
	// 	name: false
	// }
// }] -->