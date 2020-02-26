<template>
	<div class="status-navigation-component">
		<ul class='status-list'>
			<li v-for='(item, index) in list' 
				:key='index' 
				:class="{active: item.active}">
				<span v-text='index + 1 + "." + item.text'></span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'statusNavigationComponent',
		props: {
			options: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		computed: {
			list: function() {
				return Object.keys(this.options).map(key => {
					return this.options[key]
				})
			}
		}
	}
</script>

<style lang='scss'>
.status-navigation-component {
	.status-list {
		li {
			height: 36px;
			line-height: 36px;
			float: left;
			padding: 0 45px;
			background: #ccc;
			color: #666666;
		}
		.active {
			background: #8dc120;
			color: #fff;
		}
	}
}
</style>