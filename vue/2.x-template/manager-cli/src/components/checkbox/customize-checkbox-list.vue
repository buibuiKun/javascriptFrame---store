<template>
  <div :class='["customize-checkbox-group-list-component", _obj.type]'
    v-show='!_obj.show'> 
    <condition-title-var-component
      v-if='!_obj.titleHide'
      :titleObj='_obj'>
    </condition-title-var-component>
    <el-checkbox-group       
      :class="{'is-error': _obj.ruleError}"
      :style='{width:_obj.v_wd + "%"}'
      v-if='!_obj.valueComponentHide'
      v-model.trim="_obj.value"
      @change='change(_obj, $event)'>
      <el-checkbox v-for="(item, index) in list" 
        :label="item.label" 
        :disabled='item.disabled' 
        :key='index'>
        </el-checkbox>
    </el-checkbox-group>
    <form-ruler-error
      v-if='_obj.ruleError'
      :style="{left: _obj.t_wd}"
      :options='_obj'>
    </form-ruler-error>
  </div>
</template>

<script>
  export default {
    name: 'customizeCheckboxListComponent',
    props:{
      options: {
        type: Object,
        default: function() {
          return null
        }
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
      change(obj, event) {
        console.log(obj,'-----188')
        this.utils.conditionRulerTest(obj)
        this.$emit("valueChange", obj, event)
      }
    }
  }
</script>

<style lang='scss'>
.customize-checkbox-group-list-component {
  display: inline-block;
  position: relative;
  .el-checkbox-group {
    min-height: 39px;
    line-height: 39px;
    border: 1px solid #ccc;
    padding: 0 12px;
    box-sizing: border-box;
  }
  .is-error {
    .el-input__inner {
      border-color: #f56c6c;
    }
  }
}
</style>