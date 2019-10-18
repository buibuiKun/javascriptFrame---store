<template>
	<div :class='["textarea-maxlength-component", _obj.type]'
    v-show='!_obj.config.show'> 
    <condition-title-component
      v-if='!_obj.config.titleHide'
      :titleObj='_obj'
    ></condition-title-component>
		<el-input 
      type="textarea"
			:class="{'is-error': _obj.config.ruleError}"
      :style='{width:_obj.config.v_wd}'
      v-if='!_obj.config.valueComponentHide'
      v-model.trim="_obj.value"
      :maxlength="_obj.config.maxlength"
      show-word-limit
      :disabled='_obj.config.disabled'
      :clearable='_obj.config.clear' 
      :placeholder="_obj.placeholder"
      @change.native='change(_obj, $event)' 
      @blur='blur(_obj, $event)'>
		</el-input>
    <form-ruler-error
      v-if='_obj.config.ruleError'
      :style="{left: _obj.config.t_wd}"
      :options='_obj'>
    </form-ruler-error>
  </div>
</template>

<script>
  export default {
    name: 'textareaMaxlengthComponent',
    props:{
      options: {
        type: Object,
        default: function() {
          return null
        }
      }
    },
    data() {
      return {
      }
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
.textarea-maxlength-component {
  display: inline-block;
  position: relative;
  margin: 10px 0;
  .is-error {
    .el-input__inner {
      border-color: #f56c6c;
    }
  }
}
</style>