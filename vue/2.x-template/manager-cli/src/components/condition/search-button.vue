<template>
	<div class="search-button">
		<div class="searchBtnBox">
			<button class="ckButton" 
				v-for='(bt, index) in btnList'
				:class='bt.class || "default"' 
				v-text='bt.text'
				@click='buttonCk(bt, index, $event)'>
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'searchButtonComponent',
		props: {
			list: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		computed: {
			btnList: function() {
				return this.list
			}
		},
		methods: {
			buttonCk(bt, index, event) {
				this.$emit('buttonCk', bt, index, event)
			}
		}
	}
</script>

<style lang='scss'>
	.search-button {
		width: 100%;
		height: 40px;
		margin: 20px 0;
		.searchBtnBox {
			text-align: center;
			line-height: 40px;
			margin: 5px 0;
			.ckButton {
				border: 0;
				outline: none;
				background: #8dc120;
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
			.ckButton:last-child {
				margin-right: 0;
			}
			.delete {
				background: #e5536b;
			}
		}
	}
</style>