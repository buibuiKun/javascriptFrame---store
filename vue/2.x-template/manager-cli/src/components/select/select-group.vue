<template>
  <div :class='["select-group-component", _obj.type]'
    v-show='!_obj.config.show'> 
    <condition-title-component
      :titleObj='_obj'
    ></condition-title-component>
    <el-select 
      :style='{width:_obj.config.v_wd}'
      v-if='!_obj.config.valueConponentHide'
      v-model="_obj.value"
      @change='$emit("valueChange", _obj, $event)' 
      filterable
      :disabled='_obj.config.disabled'
      :clearable='_obj.config.clear' 
      :placeholder="_obj.placeholder">
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
    }
  }
</script>

<style lang='scss'>
.select-search-component {
  margin: 10px 0;
}
</style>