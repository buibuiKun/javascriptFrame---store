<template>
	<div class="m-button-component">
		<slot name='span-slot'></slot>
		<div class="btnlist">
			<button v-for='(bt, index) in btList' 
				@click='btnCk(bt, index, $event)'
				:class="bt.selectBt ? (index === selectbtnIndex ? 'bt-default' : 'bt-'+ bt.selectBt) : bt.type ? 'bt-'+ bt.type : 'bt-default'" 
				:key='index'
			    v-show='!bt.show' 
				v-text='bt.text'>
			</button>
		</div>
		<el-input 
		  style="width: 65%"
			v-if="parentObj.hasOwnProperty('inputValue')"
			v-model="parentObj.inputValue" 
			placeholder="请填写详情">
		</el-input>
	</div>
</template>

<script>
	export default {
		name:'mButtonComponent',
		props: {
			//button list 对象
			list: {
				type: Array,
				default: function() {
					return []
				}
			},
			parentObj: {
				default: function() {
					return {}
				}
			},
			//分发对象
			slotOptions: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data() {
			return {
				selectbtnIndex: -1
			}
		},
		computed: {
			btList: function() {
				return this.list.length > 0 ? this.list : this.slotOptions.list || []
			},
			ptObj: function() {
				return this.parentObj
			},
			slotOptionsObj: function() {
				return this.slotOptions
			}
		},
		methods: {
			btnCk(bt, index, event) {
				// if (bt.selectBt) {
				// 	this.selectbtnIndex = index
				// }
				if (JSON.stringify(this.slotOptions) !== '{}') {
					return this.$emit('slotClick', this.parentObj, bt, this.slotOptionsObj, index, event)
				}
				this.$emit('btCk', this.ptObj, bt, index, event)
			}
		}
	}
</script>

<style lang='scss'>
	.m-button-component {
		display: inline-block;
		vertical-align: middle;
		font-size: 0;
		border-bottom: 1px solid #ccc;
		padding: 2px;
		box-sizing: border-box;
		line-height: 34px;
		.btnlist {
			min-width: 34%;
			display: inline-block;
		}
		button {
			border: 0;
			outline: none;
			min-width: 60px;
			height: 30px;
			margin-right: 10px;
			color: #fff;
			border-radius: 4px;
			cursor: pointer;
			&:active {
				opacity: 0.6;
			}
		}
		button:hover {
			opacity: 0.7;
		}
		.bt-delete {
			background: #e5536b;
		}
		.bt-locked {
			background: #ccc;
		}
		.bt-default {
			background: #8dc120;
		}
		.el-input {
				height: 32px;
				line-height: 32px;
				border: 1px solid #ccc;
				vertical-align: top;
				float: right;
				.el-input__inner {
					height: 32px !important;
					line-height: 32px !important;
					border: 0;
				}
		}
	}
</style>