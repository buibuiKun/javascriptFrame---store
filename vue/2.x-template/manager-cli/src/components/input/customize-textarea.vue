<template>
  <div :class='["customize-textarea-component", _obj.type]'
    v-show='!_obj.show'> 
    <condition-title-var-component
      v-if='!_obj.titleHide'
      :titleObj='_obj'
    ></condition-title-var-component>
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
      @keyup='textChange'
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
    name: 'customizeTextareaComponent',
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
        let op = this.options
        if(op && op.value) {
          op.var_title = [op.value.length]
        }
        return op ? op : {}
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
      },
      textChange() {
        _obj.var_title = [_obj.value.length || 0]
      }
    }
  }
</script>

<style lang='scss'>
.customize-textarea-component {
  display: inline-block;
  position: relative;
  .is-error {
    .el-input__inner {
      border-color: #f56c6c;
    }
  }
}
</style>