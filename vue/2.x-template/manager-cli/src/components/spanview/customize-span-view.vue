<template>
	<div :class='["customize-span-view-component", _obj.type]'
    v-show='!_obj.show'> 
    <condition-title-var-component
      v-if='!_obj.titleHide'
      :titleObj='_obj'
      @valueChange='change(_obj, $event)'
    ></condition-title-var-component>
		<span class="span-value" :style='{width:_obj.v_wd + "%"}'>
      <slot name='span-slot-before'></slot>
      <span v-text='_obj.value' v-if='!_obj.valueComponentHide'></span>   
      <slot name='span-slot-after'></slot>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'customizeSpanViewComponent',
    props:{
      options: {
        type: Object,
        default: function() {
          return null
        }
      }
    },
    computed: {
      _obj() {
        return this.options ? this.options : {}
      }
    },
    methods: {
      change(obj, event) {
        this.$emit('valueChange',obj, event)
      }
    }
  }
</script>

<style lang='scss'>
.customize-span-view-component {
  display: inline-block;
  position: relative;
  min-height: 40px;
  .span-value {
    min-height: 40px;
    line-height: 40px;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>