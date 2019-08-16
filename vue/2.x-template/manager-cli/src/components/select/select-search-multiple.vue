<template>
  <div :class='["select-search-multiple-component", _obj.type]' 
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
      :multiple= '_obj.config.multiple'
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
    }
  }
</script>

<style lang='scss'>
.select-search-multiple-component {
  margin: 10px 0;
}
</style>