<template>
  <div :class='["radio-group-list-component", _obj.type]'
    v-show='!_obj.show'> 
    <condition-title-component
      v-if='!_obj.titleHide'
      :titleObj='_obj'>
    </condition-title-component>
    <el-radio-group 
      :class="{'is-error': _obj.ruleError}"
      :style='{width:_obj.v_wd + "%"}'
      v-if='!_obj.valueComponentHide'
      v-model.trim="_obj.value"
      @change='change(_obj, $event)'> 
      <el-radio v-for="(item, index) in list" 
        :label="item.value" :disabled='item.disabled' :key='index'>
        {{item.label}}
      </el-radio>
    </el-radio-group>
    <form-ruler-error
      v-if='_obj.ruleError'
      :style="{left: _obj.t_wd}"
      :options='_obj'>
    </form-ruler-error>
  </div>
</template>

<script>
  export default {
    name: 'radioListComponent',
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
        this.utils.conditionRulerTest(obj)
        this.$emit("valueChange", obj, event)
      }
    }
  }
</script>

<style lang='scss'>
.radio-group-list-component {
  display: inline-block;
  position: relative;
  .el-radio-group {
    height: 39px;
    line-height: 39px;
    border-bottom: 1px solid #ccc;
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