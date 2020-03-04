<template>
	<div class="slowDownModule">
		<div class="slowButton">
			<span class='el-icon-d-arrow-right'></span>
			<span class="buttonText"></span>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'slowDwonModuleComponent',
		props: {
			slowDownState: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			}
		}
	}
</script>

<style lang='scss'>
	.slowDownModule {
		overflow: hidden;
		border-top: 1px solid #ccc;
	}
</style>