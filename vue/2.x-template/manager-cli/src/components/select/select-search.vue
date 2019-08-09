<template>
  <div class="select-search-component" 
    v-show='!_obj.show'>
    <condition-title-component
      :titleObj='_obj'
    ></condition-title-component>
    <el-select 
      v-model="_obj.value"
      @change='$emit("valueChange", _obj, $event)' 
      filterable
      :disabled='_obj.disabled'
      :clearable='_obj.clear' 
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
    name: 'selectSearchComponent',
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