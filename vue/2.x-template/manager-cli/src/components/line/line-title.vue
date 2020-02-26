<template>
	<div class="line-title">
		<div class="line_left"> 
			<i class='requireDel' v-if='tobj.left.length > 0 && tobj.left[0].require'></i>
			<span v-for='(item, index) in tobj.left' 
				v-text='item.text'
				:key='index'>
			</span>
			<span class="linkTo" 
				v-if='tobj.left.length > 0 && tobj.left[0].link'
				@click='$emit("linkTo", tobj.left)'
				v-text='tobj.left[0].link'>
			</span>
		</div>
		<div class="line_right"> 
			<button  class='line_button' 
				v-for='(item, index) in tobj.right'
				:key='index'
				v-text='item.text'
				@click="$emit('lineCk',item, index)"
				v-show='rightState === item.state || (item.state && item.state.indexOf(rightState) >= 0)'>
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'lineTitleComponent',
		props: {
			lineObj: {
				type: Object,
				default: function() {
					return {
						left: [],
						right: []
					}
				}
			},
			state: {
				type: String,
				default: function() {
					return ''
				}
			}
		},
		computed: {
			tobj: function() {
				return this.lineObj
			},
			rightState: function() {
				return this.state
			}
		}
	}
</script>
<style lang='scss'>
	.line-title {
		margin: 10px 0px;
		padding: 0 10px;
		height: 40px;
		line-height: 40px;
		background: #e2f0d9;
		font-size: 13px;
		.line_left {
			max-width: 50%;
			float: left;
		}
		.line_right {
			min-width: 50%;
			float: right;
			padding: 6px 0;
			.line_button {
				background: #8dc120;
				outline: none;
				border: 0;
				min-width: 60px;
				line-height: 26px;
				border-radius: 4px;
				float: right;
				color: #fff;
				margin-left: 10px;
				cursor: pointer;
				&:active {
					opacity: 0.6;
				}
			}
		}
		.requireDel {
			display: inline-block;
			width: 6px;
			height: 6px;
			border-radius: 6px;
			background: red;
			vertical-align: middle;
		}
		.linkTo {
			margin-left: 10px;
			color: #0066FF;
			text-decoration: underline;;
		}
	}
</style>