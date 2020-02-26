<template>
	<div class="operate-button-list-component">
		<m-button-component 
			:list='btList'
			@btCk='btnCk'>
		</m-button-component>
	</div>
</template>

<script>
	export default {
		name: 'operateButtonListComponent',
		props: {
			list: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		computed: {
			btList: function() {
				return this.list
			}
		},
		methods: {
			btnCk(bt, index, event) {
				this.$emit('btnCk',bt, index, event)
			}
		}
	}
</script>

<style lang='scss'>
	.operate-button-list-component {
		line-height: 40px;
		margin: 4px 0;
		.m-button-component {
			padding-top: 4px;
			border-bottom: 0;
		}
	}
</style>