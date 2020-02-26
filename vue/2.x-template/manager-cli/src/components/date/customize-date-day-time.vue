<template>
	<div :class='["customize-date-day-time-component", _obj.type]'
    v-show='!_obj.show'> 
    <condition-title-var-component
      v-if='!_obj.titleHide'
      :titleObj='_obj'
    ></condition-title-var-component>
    <el-date-picker
      v-if='!_obj.valueComponentHide'
      type="datetime"
      v-model.trim="_obj.value"
      format="yyyy-MM-dd HH:mm"
      value-format="yyyy-MM-dd HH:mm"
      @change.native='change(_obj, $event)' 
      @blur='blur(_obj, $event)'
      :class="{'is-error': _obj.ruleError}"
      :style='{width:_obj.v_wd + "%"}'
      :disabled='_obj.disabled'
      :clearable='_obj.clear' 
      :picker-options="pickerOptions"
      :minTime='_obj.minTime'
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
    name: 'customizeDateDayTimeComponent',
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
      },
      pickerOptions(){
        let times = this._obj.disabledDate ? new Date(this._obj.disabledDate).getTime() : null
        let greater = this._obj.greater
        return {
          disabledDate(date) {
            // console.log(date, date.getTime(), times, 'date -----')
            if(times) {
              if(greater) {
                if(date.getTime() > times){
                  return true;
                }
              }
              if(!greater) {
                if(date.getTime() < times){
                  return true;
                }
              }
            }
            return false;
          }
        }
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
    }
  }
</script>

<style lang='scss'>
.customize-date-day-time-component {
  display: inline-block;
  position: relative;
  margin-top: 20px;
  .is-error {
    .el-input__inner {
      border-color: #f56c6c;
    }
  }
}
</style>