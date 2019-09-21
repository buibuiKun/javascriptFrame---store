<template>
	  <div :class='{"el-form-item__error": _obj.config.ruleError && _obj.config.required, rulerSlowDown: true}'>
      {{_obj.config.errorMessage}}
    </div>
</template>

<script>
	export default {
    name: 'formRulerError',
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
      _obj() {
        return this.options ? this.options : {}
      }
    }
  }
</script>

<style lang='scss'>
	.rulerSlowDown {
		padding-left: 10px;
	}
</style>