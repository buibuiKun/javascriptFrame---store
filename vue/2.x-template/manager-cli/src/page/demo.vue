<template>
    <div class="MBslidebar">
        <components 
          v-for='(_options, index) in list' 
          :is= '_options.component' 
          :key= 'index'
          :options= '_options'
          @valueChange= 'valueChange'
          @searcForRemote= 'remoteSearch'
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
    computed: {
      ...mapState({
        xxx: state => state.xxx,
        condition: state => state._pageMsg.condition,
        list: state => Object.keys(state._pageMsg.condition).map(key => {
          return state._pageMsg.condition[key]
        })
      })
    },
    methods: {
      init() {
        this.http.get('/dev/getUser',{
          name: '李翔'
        }).then((response, error) => {
          // console.log(response, error,'response, error')
          if(response.data && response.data.length > 0) {
            this.condition.dateCycle.list = response.data.map((item, index) => {
              return {
                label: item.name + "   ",
                value: index + 1,
                disabled: false
              }
            })
            this.condition.cityGroup.list = [{
              label: '广东省',
              options:[{
                label: '肇庆',
                value: '1'
              },{
                label: '云浮',
                value: '2'
              }]
            }]
            this.condition.cityMulti.list = [{
                label: '肇庆',
                value: '1'
              },{
                label: '云浮',
                value: '2'
            }]
          }
        })
      },
      valueChange(obj) {
        // console.log(obj,'change')
      },
      remoteSearch(query, obj) {
        this.http.get('/dev/addUser',{
          name: '李豪',
          gender: '12345'
        }).then(({data}) => {
          console.log(data)
        })

        // this.http.get('/learn/user/getInfo',{
        //   name: query
        // }).then((response, error) => {
        //   obj.config.loading = false;
        //   if(response.data && response.data.length > 0) {
        //     obj.list = response.data.map((item, index) => {
        //       return {
        //         label: item.name,
        //         value: index,
        //         disabled: false
        //       }
        //     })
        //   }
        // })
      }
    },
};
</script>
<style>

</style>