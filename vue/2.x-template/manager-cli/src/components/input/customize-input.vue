<template>
	<div :class='["customize-input-component", _obj.type]'
    v-show='!_obj.show'> 
    <condition-title-var-component
      v-if='!_obj.titleHide'
      :titleObj='_obj'
    ></condition-title-var-component>
		<el-input 
			:class="{'is-error': _obj.ruleError}"
      :style='{width:_obj.v_wd + "%"}'
      v-if='!_obj.valueComponentHide'
      v-model.trim="_obj.value"
      @change.native='change(_obj, $event)' 
      @blur='blur(_obj, $event)'
      :disabled='_obj.disabled'
      :clearable='_obj.clear' 
      :placeholder="_obj.placeholder ? _obj.placeholder : '请输入' + _obj.title">
		</el-input>
    <form-ruler-error
      v-if='_obj.ruleError'
      :style="{left: _obj.t_wd}"
      :options='_obj'>
    </form-ruler-error>
  </div>
</template>

<script>
  export default {
    name: 'customizeInputComponent',
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
     methods: {
      blur(obj, event) {
        this.utils.conditionRulerTest(obj)
        this.$emit("onbluer",obj, event)
      },
      change(obj, event) {
        this.utils.conditionRulerTest(obj)
        this.$emit("valueChange", obj, event)
      }
    }
  }
</script>

<style lang='scss'>
.customize-input-component {
  display: inline-block;
  position: relative;
  .is-error {
    .el-input__inner {
      border-color: #f56c6c;
    }
  }
}
</style>