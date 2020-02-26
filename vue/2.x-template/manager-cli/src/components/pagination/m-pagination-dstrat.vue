<template>
  <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="opt.page"
      :page-sizes="[10, 20, 30, 50, 100, 200, 500]"
      :page-size="opt.size"
      layout="sizes, prev, pager, next, jumper, total"
      :total="opt.total">
    </el-pagination>
</template>

<script>
	export default {
		name: 'mPaginationDstratComponent',
		props: {
			pageOpt: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		computed: {
			opt: {
				get: function() {
					return this.pageOpt
				},
				set: function(obj) {
					// this.opt = Object.assign(this.opt, obj)
				}
			}
		},
		methods: {
			sizeChange(size) {
				this.opt.size = size
				this.$emit('pgtChange')
			},
			currentChange(page) {
				this.opt.page = page
				this.$emit('pgtChange')
			}
		}
	}
</script>

<style lang='scss'>
.el-pagination {
    padding: 8px 5px;
    border: 1px solid #ccc;
    border-top: 0;
}
</style>