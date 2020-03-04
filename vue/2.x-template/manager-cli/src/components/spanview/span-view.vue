<template>
	<div :class='["span-view-component", _obj.type]'
    v-show='!_obj.show'> 
    <condition-title-component
      v-if='!_obj.titleHide'
      :titleObj='_obj'
    ></condition-title-component>
		<span v-text='_obj.value' :style='{width:_obj.v_wd + "%"}'></span>
  </div>
</template>

<script>
  export default {
    name: 'spanViewComponent',
    props:{
      options: {
        type: Object,
        default: function() {
          return null
        }
      }
    },
    data() {
      return {}
    },
    computed: {
      _obj() {
        return this.options ? this.options : {}
      }
    },
  }
</script>

<style lang='scss'>
.span-view-component {
  display: inline-block;
  position: relative;
  min-height: 40px;
}
</style>