<template>
	<div class="customize-condition">
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
			:key='index'>
				<components 
					v-for='(slotItem, idx) in item.slot' 
					:is='slotItem.component'
					:slotOptions='slotItem' 
					:slot='slotItem.slotName'
					@slotClick="slotClick"
					:key='idx'>
				</components>	
		</components>
	</div>
</template>

<script>
	export default {
		name: 'customizeConditionList',
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
				this.$emit("change", obj, event)
			},
			slotClick(parentObj, bt, slotOptionsObj, index, event) {
				this.$emit("slotClick", parentObj, bt, slotOptionsObj, index, event)
			},
		}
	}
</script>

<style lang='scss'>
.customize-condition {
	overflow: hidden;
	width: 100%;
	margin:1px 1px;
	position: relative;
	.conditioncell {
		font-size: 0;
		display: block;
		float: left;
		margin-bottom: 5px;
		box-sizing: border-box;
		min-height: 40px;
		* {
			font-size: 13px;
		}
		.el-input__inner {
			border: 0;
			border: 1px solid #ccc !important;
			border-radius: 0;
			box-sizing: border-box;
			height: 39px;
			line-height: 39px;
			box-sizing: border-box;
			color:#666 !important;
			font-family: PingFangSC-Regular, Microsoft YaHei, SimSun !important;
		}
		.el-textarea__inner {
			border: 0;
			border: 1px solid #ccc !important;
			height: 70px;
			border-radius: 0;
			box-sizing: border-box;
			color:#666 !important;
			font-family: PingFangSC-Regular, Microsoft YaHei, SimSun !important;
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
	.m-button-component {
		padding-top: 0;
		padding-bottom: 0;
		border-bottom: 0;
	}
}
</style>