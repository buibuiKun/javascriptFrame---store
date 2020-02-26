<template>
	<el-table-column
		:type='column.type || null'
	    :prop="column.props"
	    :label="column.text"
	    :width="column.wd"
	    :fixed='column.fixed'
	    :class-name='column.props'>
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top" 
                    v-if='scope.row[scope.column.property]'>
                    <p v-for='(text, index) in scope.row[column.popoverType]' 
                       :key='index' v-text='text'
                       @click='popoverCk(scope, text)'
                       class='poverLink'>
                    </p>
                    <div slot="reference" class="name-wrapper sele-popover">
                        <el-tag size="medium">{{ scope.row[scope.column.property] }}</el-tag>
                    </div>
                </el-popover>
        </template>
        </el-table-column>
</template>

<script>
	// 基础单元格
	export default {
		name: 'tdCellPopoverComponent',
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
            popoverCk(scope, text) {
                this.$emit('popoverCk', scope, text)
            }
        }
	}
</script>     

<style lang="scss">
.poverLink {
    color: #8dc120 !important;
    cursor: pointer;
}
.sele-popover {
    // .el-tag {
    //     color: #8dc120 !important;
    //     background-color: #e2f0d9 !important; 
    //     border: 0;
    // }
}

</style>