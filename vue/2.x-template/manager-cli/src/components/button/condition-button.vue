<template>
	<div :class='["condition-button-component", _obj.type]'
    v-show='!_obj.show'> 
    <condition-title-component
      v-if='!_obj.titleHide'
      :titleObj='_obj'
    ></condition-title-component>
		<m-button-component 
      :list='_obj.list' 
      :parentObj='_obj'
      :style='{width:_obj.v_wd + "%"}'
      @btCk='btnCk'/>
  </div>
</template>

<script>
  export default {
    name: 'conditionButtonComponent',
    props:{
      options: {
        type: Object,
        default: function() {
          return {}
        }
      }
    },
    computed: {
      _obj() {
        return this.options
      },
    },
    methods: {
      btnCk(_obj, bt, index, event) {
        this.$emit('valueChange', _obj, bt, index, event)
      }
    }
  }
</script>

<style lang='scss'>
.condition-button-component {
  display: inline-block;
  position: relative;
  min-height: 39px;
  .m-button-component {
    height: 39px;
    line-height: 39px;
    button {
      min-width: 45px;
      height: 26px;
      border-radius: 2px;
    }
    button:hover {
      opacity: 0.7;
    }
  }
}
</style>