<template>
	<div :class='["input-select-component", _obj.type]'
    v-show='!_obj.show'> 
    <condition-title-component
      v-if='!_obj.titleHide'
      :titleObj='_obj'
    ></condition-title-component>
    <div class="input_select" :style='{width:_obj.v_wd + "%"}'>
      <el-input 
        :class="{'is-error': _obj.ruleError}"
        :style='{width:_obj.v_wd + "%"}'
        v-if='!_obj.valueComponentHide'
        v-model.trim="_obj.value"
        @change='change(_obj, $event)' 
        @blur='blur(_obj, $event)'
        :disabled='_obj.disabled'
        :clearable='_obj.clear' 
        :placeholder="_obj.placeholder ? _obj.placeholder : '请输入' + _obj.title">
      </el-input>
      <el-select 
        :class="{'is-error': _obj.ruleError}"
        v-if='!_obj.valueComponentHide'
        v-model.trim="_obj.selectValue"
        @change='change(_obj, $event)'
        @blur='blur(_obj, $event)' 
        filterable
        :disabled='_obj.selectDisable'
        :clearable='_obj.clear' 
        :placeholder="_obj.selectPlaceHolder ? _obj.selectPlaceHolder : '请选择' + _obj.title">
        <el-option
          v-for="item in list"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled='item.selectDisable'>
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'inputSelectComponent',
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
      },
      list() {
        return this.options ? this.options.list || [] : []
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
.input-select-component {
  display: inline-block;
  position: relative;
  min-height: 40px;
  .input_select {
    display: inline-block;
    border-bottom: 1px solid #ccc;
    font-size: 0;
    >span {
      width: 55%;
      line-height: 38px;
      font-size: 12px;
      display: inline-block;
      vertical-align: top;
      padding: 0 3px;
      box-sizing: border-box;
    }
    .el-select {
      width: 45%;
      vertical-align: top;
      .el-input__inner {
        border: 0;
        height: 38px;
        line-height: 38px;
        border: 0 !important;
      }
    }
  }
}
</style>