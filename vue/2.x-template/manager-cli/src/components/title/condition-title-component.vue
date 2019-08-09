<template>
	<div class='condition-title-component'> 
      <i class='_required' v-if='_obj.required'>*</i>
      <span class='_title' 
        v-text='_obj.title'
      ></span>
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