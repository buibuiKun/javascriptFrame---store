<template>
	<div class="slow-down-component">
		<div class="slowContainer">
			<slot name='slot-slowContainer'></slot>
			<div class="slowTag" @click='$emit("stateSlowDown", id)'>
				<span>
					<i class='el-icon-d-arrow-right' v-if='!downState[id]'></i>
					<i class='el-icon-d-arrow-left' v-if='downState[id]'></i>
					<span v-text='downState[id] ? "收起" : "展开"'></span>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'slowDownComponent',
		props: {
			slowId: {
				type: String,
				default: function() {
					return ''
				}
			},
			slowDownState: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		computed: {
			downState: function() {
				return this.slowDownState
			},
			id: function() {
				return this.slowId
			}
		},
		methods: {

		}
	}
</script>

<style lang='scss'>
	.slowTag {
		width: 100%;
		height: 26px;
		position: relative;
		border-top: 1px solid #ccc;
		margin-top: 5px;
		[class*=" el-icon-"], [class^=el-icon-] {
			    transform: rotate(90deg);
		}
		>span {
		    position: absolute;
		    left: 50%;
		    top: -1px;
		    transform: translateX(-50%);
		    width: 61px;
		    height: 27px;
		    line-height: 27px;
		    background: #fff;
		    text-align: center;
		    border: 1px solid #ccc;
		    border-top: 0;
		    color: #8d8d8d;
		    font-size: 13px;
		    cursor: pointer;
		    i {
		    	margin-right: 3px;
		    }
		}
	}
</style>