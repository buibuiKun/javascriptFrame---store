<template>
	<el-table-column
		:type='column.type || null'
	    :prop="column.props"
	    :label="column.text"
	    :width="column.wd"
	    :fixed='column.fixed'
	    :class-name='column.props'/>
</template>

<script>
	// 基础单元格
	export default {
		name: 'tdCellComponent',
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