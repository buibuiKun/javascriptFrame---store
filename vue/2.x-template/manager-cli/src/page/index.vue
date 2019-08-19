<template>
    <div class="MBslidebar">
        <components 
          v-for='(_options, index) in list' 
          :is= '_options.component' 
          :key= 'index'
          :options= '_options'
          @valueChange= 'valueChange'
        ></components>
        <p>{{xxx}}</p>
    </div>
  </template>
<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
      //   list: [{
      //     component: 'select-search-component',
      //     type: 'test_1',
      //     title: '测试1',
      //     placeholder: '请选择测试列表',
      //     list: [{
      //       value: 123,
      //       label: '测试5',
      //       disabled: true,
      //     },{
      //       value: 333,
      //       label: '测试6',
      //       disabled: true,
      //     }],
      //     required: true,
      //     clear: true,
      //     disabled: true,
      //     value: ''
      //   },{
      //     component: 'select-search-component',
      //     type: 'test_2',
      //     title: '测试2',
      //     placeholder: '请选择测试列表',
      //     list: [{
      //       value: 123,
      //       label: '测试5'
      //     },{
      //       value: 333,
      //       label: '测试6'
      //     }],
      //     required: true,
      //     value: ''
      //   }],
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        setTimeout(() => {
          this.condition.dateCycle.list = [{
                  value: 123,
                  label: '测试5'
                },{
                  value: 333,
                  label: '测试6'
              }]
          this.condition.dateCycle.config.required = false
        },3000)
      },
      valueChange(obj) {
        console.log(obj)
      }
    },
    computed: {
      ...mapState({
        xxx: state => state.xxx,
        condition: state => state._pageMsg.condition,
        list: state => Object.keys(state._pageMsg.condition).map(key => {
          return state._pageMsg.condition[key]
        })
      })
    }
};
</script>
<style>

</style>