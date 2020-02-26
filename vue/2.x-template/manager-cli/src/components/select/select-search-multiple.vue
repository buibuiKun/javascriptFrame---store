<template>
  <div :class='["select-search-multiple-component", _obj.type]' 
    v-show='!_obj.config.show'> 
    <condition-title-component
      v-if='!_obj.config.titleHide'
      :titleObj='_obj'
    ></condition-title-component>
    <el-select 
      :class="{'is-error': _obj.config.ruleError}"
      :style='{width:_obj.config.v_wd}'
      v-if='!_obj.config.valueComponentHide'
      v-model.trim="_obj.value"
      :multiple= '_obj.config.multiple'
      @change='change(_obj, $event)'
      @visible-change='blur(_obj, $event)' 
      filterable
      :disabled='_obj.config.disabled'
      :clearable='_obj.config.clear' 
      :placeholder="_obj.placeholder">
      <el-option
        v-for="item in list"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled='item.disabled'>
      </el-option>
    </el-select>
    <form-ruler-error
      v-if='_obj.config.ruleError'
      :style="{left: _obj.config.t_wd}"
      :options='_obj'>
    </form-ruler-error>
  </div>
</template>

<script>
  export default {
    name: 'selectSearchMultipleComponent',
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
        if (!event) {
          this.utils.conditionRulerTest(obj)
          this.$emit("onbluer",obj, event)
        }
      },
      change(obj, event) {
        this.utils.conditionRulerTest(obj)
        this.$emit("valueChange", obj, event)
      }
    }
  }
</script>

<style lang='scss'>
.select-search-multiple-component {
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