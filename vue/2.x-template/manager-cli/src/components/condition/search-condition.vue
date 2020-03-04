<template>
	<div class="search-condition">
		<i class='el-icon-remove' 
			v-if='deleteRowShow' 
			@click='$emit("deletArrayRow", rowIndex)'>
		</i>
		<components 
			v-for='(item, index) in componentList' 
			:is='item.component'
			:options='item' 
			:style="{width: item.componentWidth + '%'}"
			class='conditioncell'
			@valueChange='change'
			:key='index'/>
		<slot name='after'></slot>
	</div>
</template>

<script>
	export default {
		name: 'searchConditionList',
		props: {
			conditionList: {
				default: function() {
					return {}
				}
			},
			deleteRow: {
				type: Boolean,
				default: false
			},
			rowIndex: {
				type: Number,
				default: -1
			}
		},
		computed: {
			componentList() {
				if (Array.isArray(this.conditionList)) {
					 return this.conditionList
				}
				return Object.keys(this.conditionList).map(key => {
					return this.conditionList[key]
				})
			},
			deleteRowShow() {
				return this.deleteRow
			},
			currentRowIndex() {
				return this.rowIndex
			}
		},
		methods: {
			change(obj, event) {
				console.log(obj)
				this.$emit("change", obj, event)
			}
		}
	}
</script>

<style lang='scss'>
.search-condition {
	overflow: hidden;
	border-top: 1px solid #ccc;
	border-left: 1px solid #ccc;
	// margin:1px 1px;
	position: relative;
	.conditioncell {
		font-size: 0;
		display: block;
		float: left;
		border-right: 1px solid #ccc;
		box-sizing: border-box;
		* {
			font-size: 13px;
		}
		.el-input__inner {
			border: 0;
			border-bottom: 1px solid #ccc !important;
			border-radius: 0;
			box-sizing: border-box;
			height: 39px !important;
			line-height: 39px;
			box-sizing: border-box;
		}
	}
	.el-icon-remove {
		position: absolute;
		left: -1px;
		top: -1px;
		z-index: 1000;
		font-size: 16px;
		color: red;
		cursor: pointer;
	}
}
</style>