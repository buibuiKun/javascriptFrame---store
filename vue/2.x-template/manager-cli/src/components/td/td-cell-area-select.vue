<template>
	<el-table-column
	:type='column.type || null'
    :prop="column.props"
    :label="column.text"
    :width="column.wd"
    :fixed='column.fixed'
    :class-name='column.props'
    :render-header="renderHeader">
    <template slot-scope='scope'>
    	<div class="tdCellAreaSelectComponent" 
    		v-if='!(scope.row._select_input && !scope.row._select_input[scope.column.property].showText)'>
              <div class="select_groud">
                <el-select v-model="scope.row._select_input.provice.value" 
                    :placeholder='`省`'
                    :disabled='scope.row._select_input && !scope.row._select_input.provice.disabled'
                    :multiple='scope.column.multiple || false'
                    @change='$emit("valueChange",scope, $event, "prov")'
                    @focus='remoteMethod(scope, $event, "prov")'
                    filterable
                    remote
                    clearable>
                    <el-option
                    v-for="(item, index) in scope.row._select_input.provice.list"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled='!item.disabled'>
                    </el-option>
                </el-select>
                <el-select v-model="scope.row._select_input.city.value" 
                    :placeholder='`市`'
                    :disabled='scope.row._select_input && !scope.row._select_input.city.disabled'
                    :multiple='scope.column.multiple || false'
                     @change='$emit("valueChange",scope, $event, "city")'
                    @focus='remoteMethod(scope, $event, "city")'
                    filterable
                    remote
                    clearable>
                    <el-option
                    v-for="(item, index) in scope.row._select_input.city.list"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled='!item.disabled'>
                    </el-option>
                </el-select>
                <el-select v-model="scope.row._select_input.area.value" 
                    :placeholder='`区`'
                    :disabled='scope.row._select_input && !scope.row._select_input.area.disabled'
                    :multiple='scope.column.multiple || false'
                     @change='$emit("valueChange",scope, $event, "area")'
                    @focus='remoteMethod(scope, $event, "area")'
                    filterable
                    remote
                    clearable>
                    <el-option
                    v-for="(item, index) in scope.row._select_input.area.list"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled='!item.disabled'>
                    </el-option>
                </el-select>
              </div>

    		<el-input
	  			v-model="scope.row._select_input[scope.column.property].value"
                :disabled='scope.row._select_input && !scope.row._select_input[scope.column.property].disabled'
	  			:placeholder='`请输入${scope.column.label}`'
	  			@change='$emit("valueChange",scope, $event)'
	  			clearable>
	  		</el-input>
    	</div>
  		<span v-text='scope.row[scope.column.property]' 
  			v-if='scope.row._select_input && !scope.row._select_input[scope.column.property].showText'>
  		</span>
    </template>
  </el-table-column>
</template>

<script>
	//input单元格
	//通过表头的component 控制循环动态单元格组件
	//通过行的 cell_input属性 控制当前行的单元格是否禁用
	export default {
		name: 'tdCellAreaSelectComponent',
		props: {
			columnObj: {
				type: Object,
				default: function() {
					return {}
				}
			},
		},
		computed: {
			column: function() {
				return this.columnObj
            },
        },
        methods: {
            remoteMethod(scope, $event, place) {
                this.$emit('focusChange', scope, $event, place)
            },
            renderHeader(h, {column}) {
				return (
				       'span',
				       [ 
				         h('i',{
							domProps:{
								innerHTML:this.columnObj.required ? '*' : ''
							},
				            class:'_required_th'
						 }),
						 h('span', column.label),
					   ]
				)
			}
        }
	}
</script>  

<style lang='scss'>
.cell {
	.tdCellAreaSelectComponent {
		.select_groud {
            width: 100%;
            .el-select {
                line-height: 34px;
                width: 32%;
            }
		}
	}
}
.el-input.is-disabled .el-input__inner {
	color: #808080;
}
</style>   