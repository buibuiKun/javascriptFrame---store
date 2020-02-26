<template>
	<div :class='["date-day-around-component", _obj.type]'
    v-show='!_obj.show'> 
    <condition-title-component
      v-if='!_obj.titleHide'
      :titleObj='_obj'
    ></condition-title-component>
    <el-date-picker
      v-if='!_obj.valueComponentHide'
      type="daterange"
      v-model.trim="_obj.value"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
      :class="{'is-error': _obj.ruleError}"
      :style='{width:_obj.v_wd + "%"}'
      @change.native='change(_obj, $event)' 
      @blur='blur(_obj, $event)'
      :disabled='_obj.disabled'
      :clearable='_obj.clear' 
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :placeholder="_obj.placeholder ? _obj.placeholder : '请选择' + _obj.title">
    </el-date-picker>
    <form-ruler-error
      v-if='_obj.ruleError'
      :style="{left: _obj.t_wd}"
      :options='_obj'>
    </form-ruler-error>
  </div>
</template>

<script>
  export default {
    name: 'dateDayAroundComponent',
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
.date-day-around-component{
  display: inline-block;
  position: relative;
  .is-error {
    .el-input__inner {
      border-color: #f56c6c;
    }
  }
}
</style>