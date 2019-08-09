<template>
    <div class="MBslidebar">
        <components 
          v-for='(_options, index) in list' 
          :is= '_options.component' 
          :key= 'index'
          :options= '_options'
          @valueChange= 'valueChange'
        ></components>
    </div>
  </template>
  <script>
export default {
  data() {
    return {
      list: [{
        component: 'select-search-component',
        type: 'test_1',
        title: '测试1',
        placeholder: '请选择测试列表',
        list: [{
          value: 123,
          label: '测试5',
          disabled: true,
        },{
          value: 333,
          label: '测试6',
          disabled: true,
        }],
        required: true,
        clear: true,
        disabled: true,
        value: ''
      },{
        component: 'select-search-component',
        type: 'test_2',
        title: '测试2',
        placeholder: '请选择测试列表',
        list: [{
          value: 123,
          label: '测试5'
        },{
          value: 333,
          label: '测试6'
        }],
        required: true,
        value: ''
      }],
    };
  },
  methods: {
    valueChange(obj) {
      console.log(obj)
    }
  }
};
</script>
<style>

</style>