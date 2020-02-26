<template>
	<div class='condition-title-component' 
			:style="{width: _obj.t_wd + '%'}"> 
      <span class='_title'>
				<span class='_required' v-if='_obj.required'>*</span>
				<span v-text='_obj.title' class='title_text'></span>
      </span> 
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
	text-align: left;
	height: 39px;
  line-height: 39px;
	min-height: 39px;
  overflow: hidden;
	vertical-align: top;
	font-size: 12px;
	background: #f2f2f2;
	border: 1px solid #ccc;
	border-top: 0;
	border-left: 0;
	box-sizing: border-box;
	padding: 0 4px;
	._title {
		._required {
			color: red;
		}
	}
}
</style>