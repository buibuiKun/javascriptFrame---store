<template>
	<div class='condition-title-var-component' 
			:style="{width: _obj.t_wd + '%'}"> 
        <span class='_title'>
			<span class='_required' v-if='_obj.required'>*</span>
			<span v-html='text' class='title_var_text'></span>
			<el-checkbox 
				v-model="_obj.t_checked" 
				:disabled="_obj.t_disabled"
				v-if='_obj.hasOwnProperty("t_checked")'
				@change='valueChange(_obj, $event)'>
			</el-checkbox>
		</span> 
    </div>
</template>

<script>
export default {
  name:'conditionTitleVarComponent',
  props:{
	titleObj: {
		type: Object,
		default: function() {
			return null
		}
	}
  },
  computed: {
	_obj: function() {
		return this.titleObj
	},
	text: function() {
		if (this.titleObj.title.indexOf("$@$") >= 0) {
			return this.titleObj.title.split("$@$").map((text, index) => {
					if(index < this.titleObj.title.split("$@$").length - 1) {
						let _text = this.titleObj.title.indexOf('$@$/') >= 0 ? this.titleObj.var_title[index] || 0 : this.titleObj.var_title[index] || ''
						return text + "<span class=var_title>"+ _text +"</span>"
					}
					return text
			}).join('')
		}
		return this.titleObj.title
	}
  },
  methods: {
	valueChange( _obj, event) {
		this.$emit("valueChange", _obj, event)
	}
  },
  watch: {
	  "_obj.value": function(newData, oldData) {
		  if(this._obj.component === 'customize-textarea-component' && this._obj.title.indexOf("$@$") >= 0) {
			  if(!newData) {
				  this._obj.var_title = [0]
			  }
		  }
	  }
  }
}
</script>

<style lang='scss'>
.condition-title-var-component {
	display: inline-block;
	text-align: left;
	height: 39px;
  line-height: 39px;
	min-height: 39px;
  overflow: hidden;
	vertical-align: top;
	font-size: 12px;
	// background: #f2f2f2;
	// border: 1px solid #ccc;
	border-top: 0;
	border-left: 0;
	box-sizing: border-box;
	padding: 0 4px;
	color: #333;
	._title {
		._required {
			color: red;
		}
	}
	.var_title {
		color: #8DC120;
	}
}
</style>