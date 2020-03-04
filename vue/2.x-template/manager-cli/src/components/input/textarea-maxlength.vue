<template>
	<div :class='["textarea-maxlength-component", _obj.type]'
    v-show='!_obj.show'> 
    <condition-title-component
      v-if='!_obj.titleHide'
      :titleObj='_obj'
    ></condition-title-component>
		<el-input 
      type="textarea"
			:class="{'is-error': _obj.ruleError}"
      :style='{width:_obj.v_wd + "%"}'
      v-if='!_obj.valueComponentHide'
      v-model.trim="_obj.value"
      :maxlength="_obj.maxlength"
      show-word-limit
      :disabled='_obj.disabled'
      :clearable='_obj.clear' 
      @change.native='change(_obj, $event)' 
      @blur='blur(_obj, $event)'
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
  .condition-title-component {
    height: 56px;
    line-height: 56px;
  }
  .el-textarea__inner {
    min-height: 56px !important;
    border-radius: 0 !important;
    border-right: 0 !important;
    border-left: 0 !important;
    border-top: 0 !important;
    border-color: #ccc !important;
  }
  .is-error {
    .el-input__inner {
      border-color: #f56c6c;
    }
  }
}
</style>