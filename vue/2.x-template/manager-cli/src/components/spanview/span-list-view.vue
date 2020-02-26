<template>
	<div :class='["span-list-view-component", _obj.type]'
    v-show='!_obj.show'> 
    <condition-title-var-component
      v-if='!_obj.titleHide'
      :titleObj='_obj'
    ></condition-title-var-component>
    <ul class='customize-text-list'>
      <li v-for="(item, index) in list" :key='index'>
        <span v-text="index+ 1 +', '+ item.text"></span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'spanListViewComponent',
    props:{
      options: {
        type: Object,
        default: function() {
          return null
        }
      }
    },
    data() {
      return {}
    },
    computed: {
      _obj() {
        return this.options ? this.options : {}
      },
      list() {
        return this.options.list || []
      }
    },
  }
</script>

<style lang='scss'>
.span-list-view-component {
  display: inline-block;
  position: relative;
  min-height: 40px;
  .customize-text-list {
    min-height: 40px;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    li {
      span {
        line-height: 18px;
        color: #666666;
      }
    }
  }
}
</style>