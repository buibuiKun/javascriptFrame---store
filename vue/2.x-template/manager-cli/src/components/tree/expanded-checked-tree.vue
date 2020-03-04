<template>
  <div class='expanded-checked-tree'>
        <el-tree
            :data="treeList"
            show-checkbox
            node-key="id"
            :default-expanded-keys="idList"
            :default-checked-keys="idList"
            :props="defaultProps"
            @check-change='change'>
        </el-tree>
  </div>        
</template>

<script>
  export default {
    name: 'expandedCheckedTreeComponent',
    props: {
        options: {
            type: Object,
            default: function() {
                return {}
            }
        },
        id: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    computed: {
        treeList: function() {
            console.log(this.options,'-111---')
            return this.options.list
        },
        idList: function() {
            return this.id
        }
    },
    methods: {
        change(treeObj, isCheack, isNotCheck) {
            this.$emit('change', treeObj, isCheack, isNotCheck)
        }
    }
  }
</script>

<style lang='scss'>
.expanded-checked-tree {
    // min-width: 100px;
    overflow: auto;
}
</style>