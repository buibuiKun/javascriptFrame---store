<template>
	<div class='condition-title-component' 
			:style="{width: _obj.config.t_wd}"> 
      <i class='_required' v-if='_obj.config.required'>*</i>
      <span class='_title' v-text='_obj.title'></span> 
    </div>
</template>

<script>
export default {
  name:'conditionTitleComponent',
  props:{
		titleObj: {
		  type: Object,
		  default: function() {
			  return null
		  }
		}
  },
  computed: {
		_obj: function() {
			return this.titleObj
		}
  }
}
</script>

<style lang='scss'>
.condition-title-component {
	display: inline-block;
	line-height: 40px;
	._required {
		display: inline-block;
		width: 15px;
	}
}
</style>