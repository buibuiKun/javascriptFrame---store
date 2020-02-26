<template>
  <div :class='["select-group-component", _obj.type]'
    v-show='!_obj.show'> 
    <condition-title-component
      v-if='!_obj.titleHide'
      :titleObj='_obj'
    ></condition-title-component>
    <el-select 
      :class="{'is-error': _obj.ruleError}"
      :style='{width:_obj.v_wd + "%"}'
      v-if='!_obj.valueComponentHide'
      v-model.trim="_obj.value"
      @change='change(_obj, $event)' 
      @blur='blur(_obj, $event)'
      filterable
      :disabled='_obj.disabled'
      :clearable='_obj.clear' 
      :placeholder="_obj.placeholder ? _obj.placeholder : '请选择' + _obj.title">
      <el-option-group
        v-for="group in list"
        :key="group.label"
        :label="group.label">
        <el-option
          v-for="item in group.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled='item.disabled'>
        </el-option>
      </el-option-group>
    </el-select>
    <form-ruler-error
      v-if='_obj.ruleError'
      :style="{left: _obj.t_wd}"
      :options='_obj'>
    </form-ruler-error>
  </div>
</template>

<script>
  export default {
    name: 'selectGroupComponent',
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
      list() {
        return this.options ? this.options.list : []
      },
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
.select-group-component {
  display: inline-block;
  position: relative;
  .is-error {
    .el-input__inner {
      border-color: #f56c6c;
    }
  }
}
</style>