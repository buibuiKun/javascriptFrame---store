<template>
	<div prodtoBaseInfoPage class="prodtoBaseInfoOptions">
		<ul class="prodtoInfoList" v-if="prodInitData && prodInitData.length > 0">
			<template v-for="(prodItem , index) in prodInitData">
				<li  v-if="prodItem.isShow" :style="{width:prodItem.width +'%'}" :key="index" :class="['form_item-li',prodItem.rowType+'_li']">
					<!-- 行名称 -->
					<label :class="['formBaseInfo_label', prodItem.rowType+'_span', prodItem.TYPES == 'input-textarea' ? 'textarea-span' : null]" 
						:style="{width: prodItem.labelWidth ? prodItem.labelWidth + '%' : '50%'}"
						v-if='prodItem.ishideTitle'>
						<span class="title" v-if="prodItem.ishideTitle">
							<!--是否显示必填-->
							<i class='nessRequire' v-if="prodItem.required"></i>
							{{prodItem.NAMES}}
						</span>
					</label>

					<!-- 基础input输入框 -->
					<div class="div_lineBlock" 
						:style="{width: setWidth(prodItem), background:prodItem.disabled ? bgColor: '#fff'}"
						v-if="prodItem.TYPES == 'input' && prodItem.isShow">
						<el-input v-if='prodItem.ishideValue' :clearable='prodItem.isclear'
							v-model.trim= "prodItem.saveProdInfo" :maxlength="prodItem.maxlength ? prodItem.maxlength : null"
							:disabled='prodItem.disabled' :placeholder="prodItem.placeholder"
							@change="$emit('changeEvent', prodItem, $event)"
							@keyup.native="$emit('keyupEvent', prodItem, $event)" 
							@focus="$emit('focusEvent', prodItem, $event)"
							@blur.native="$emit('blurEvent', prodItem, $event)">
							<template v-if="prodItem.append">
								<template slot="append">
									<slot name="input-append"></slot>
								</template>
							</template>
						</el-input>
					</div>

					<!-- 基础input 计数器输入框 -->
					<div class="div_lineBlock" 
						:style="{width: setWidth(prodItem),background:prodItem.disabled ? bgColor: '#fff'}"
						v-if="prodItem.TYPES == 'input-num' && prodItem.isShow">
						<el-input-number v-if='prodItem.ishideValue' v-model.trim="prodItem.saveProdInfo" 
							controls-position="right" @change="$emit('inputNumChange', $event,prodItem)"
							@focus="$emit('focusEvent', prodItem, $event)"
							@blur.native="$emit('blurEvent', prodItem, $event)"
							:disabled='prodItem.disabled' :step='prodItem.numAddDec' :min="prodItem.minNum" 
							:max="prodItem.maxNum" :placeholder="prodItem.placeholder"/>
					</div>

					<!-- input 文本输入框 textarea -->
					<div class="div_textareaBlock"
						:style="{width: setWidth(prodItem),background:prodItem.disabled ? bgColor: '#fff'}"
						v-if="prodItem.TYPES == 'input-textarea' && prodItem.isShow">
						<div class="input-textarea" v-if="prodItem.ishideValue">
							<div class="damage-textarea">
								<textarea rows="3" :disabled="prodItem.disabled" :readonly="prodItem.disabled"
										:style="{'backgroundColor': prodItem.disabled ? '#f5f7fa': ''}" v-model="prodItem.saveProdInfo"
										@input="inputTextAreaLength(prodItem, 'saveProdInfo', 'addTextLength', $event, prodItem.maxLength, prodItem.limitText)"
										:placeholder="prodItem.placeholder"
										@keydown="prodItem.isNotEnter ? keydownEnter($event) : prodItem.isNotEnter && (prodItem.keyDownName && prodItem.keyDownName!='') ? $emit(prodItem.keyDownName, event, prodItem.saveProdInfo, prodItem) : null "
										class="el-textarea el-textarea__inner">
								</textarea>
								<div class="textLength" v-if="prodItem.showTextLength">
									<span>{{changeText(prodItem)}}</span> / {{prodItem.maxLength || 500}}
								</div>
							</div>
						</div>
					</div>

					<!-- select-search 下拉选择输入框 -->
					<div class="div_lineBlock" 
						:style="{width: setWidth(prodItem),background:prodItem.disabled ? bgColor: '#fff'}"
						v-if="prodItem.TYPES == 'select-search' && prodItem.isShow">
						<el-select v-if='prodItem.ishideValue' v-model="prodItem.saveProdInfo" 
							:clearable='prodItem.isclear' :filterable="prodItem.filterable" 
							:disabled="prodItem.disabled" :maxlength="prodItem.maxlength ? prodItem.maxlength : null"
							@change="!prodItem.disabled ? $emit('changeEvent', prodItem, $event) : null"
							@focus="$emit('focusEvent', prodItem, $event)"
							@blur="$emit('blurEvent', prodItem, $event)"
							:readonly="prodItem.disabled"
							:placeholder="prodItem.placeholder">
								<el-option v-for="(item, indexs) in prodItem.initThisData"
										:key="indexs"
										:disabled="prodItem.disabled || item.disabled ? true : false"
										:label="item.label"
										:value="item.value">
								</el-option>
						</el-select>
					</div>

					<!-- select-search 下拉选择输入框（多选） -->
					<div class="div_lineBlock" 
						:style="{width: setWidth(prodItem),background:prodItem.disabled ? bgColor: '#fff'}"
						v-if="prodItem.TYPES == 'select-search-multiple' && prodItem.isShow">
						<el-select v-if='prodItem.ishideValue'
							v-model.trim="prodItem.saveProdInfo" multiple
							:clearable='prodItem.isclear' filterable :disabled='prodItem.disabled'
							@change="!prodItem.disabled ? $emit('changeEvent', prodItem, $event) : null"
							@focus="$emit('focusEvent', prodItem, $event)" @blur="$emit('blurEvent', prodItem, $event)" 
							:placeholder="prodItem.placeholder">
							<el-option v-for="(item, indexs) in prodItem.initThisData"
								:key="indexs" :label="item.label" :value="item.value"/>
						</el-select>
					</div>

					<!-- span显示框 -->
					<div class="div_lineBlock" :style="{width: setWidth(prodItem)}"
						v-if="prodItem.TYPES == 'span' && prodItem.isShow">
						<span class='justShowText' v-if='prodItem.ishideValue'>{{prodItem.saveProdInfo}}</span>
					</div>

					<!-- date日期显示框 -->
					<div class="div_lineBlock" 
						:style="{width: setWidth(prodItem),background:prodItem.disabled ? bgColor: '#fff'}"
						v-if="prodItem.TYPES == 'date-day' && prodItem.isShow">
						<el-date-picker v-if='prodItem.ishideValue' :disabled='prodItem.disabled' type="date" v-model="prodItem.saveProdInfo"
							@change="!prodItem.disabled ? $emit('changeEvent', prodItem, $event) : null"
							@focus="$emit('focusEvent', prodItem, $event)" @blur="$emit('blurEvent', prodItem, $event)" 
							:placeholder="prodItem.placeholder">
						</el-date-picker>
					</div>

					<!-- date日期显示框 -->
					<div class="div_lineBlock" 
						:style="{width: setWidth(prodItem),background:prodItem.disabled ? bgColor: '#fff'}"
						v-if="prodItem.TYPES == 'date-day-mine' && prodItem.isShow">
						<el-date-picker
							type="datetime"
							v-if='prodItem.ishideValue'
							v-model="prodItem.saveProdInfo"
							format="yyyy-MM-dd HH:mm"
							value-format="yyyy-MM-dd HH:mm"
							@change="!prodItem.disabled ? $emit('changeEvent', prodItem, $event) : null"
							@focus="$emit('focusEvent', prodItem, $event)" @blur="$emit('blurEvent', prodItem, $event)"
							:disabled='prodItem.disabled' :placeholder="prodItem.placeholder">
						</el-date-picker>
					</div>

					<!-- date日期显示范围 -->
					<div class="div_lineBlock daterange" 
						:style="{width: setWidth(prodItem),background:prodItem.disabled ? bgColor: '#fff'}"
						v-if="prodItem.TYPES == 'data-daterange' && prodItem.isShow">
						<el-date-picker type="daterange" v-if='prodItem.ishideValue' v-model="prodItem.saveProdInfo"
							:format="prodItem.format ? prodItem.format : 'yyyy-MM-dd HH:mm'"
							:value-format="prodItem.valFormat ? prodItem.valFormat : 'yyyy-MM-dd HH:mm'"
							:range-separator="prodItem.rangePlaceholder ? prodItem.rangePlaceholder : '至'"
							:start-placeholder="prodItem.startPlaceholder ? prodItem.startPlaceholder :'开始日期'"
							:end-placeholder="prodItem.endPlaceholder ? prodItem.endPlaceholder : '结束日期'"
							@change="!prodItem.disabled ? $emit('changeEvent', prodItem, $event) : null"
							:disabled='prodItem.disabled' :placeholder="prodItem.placeholder" :picker-options="prodItem.pickerOptions || null">
						</el-date-picker>
					</div>

					<!-- date 日期（月） -->
					<div class="div_lineBlock dateMonth" 
						:style="{width: setWidth(prodItem),background:prodItem.disabled ? bgColor: '#fff'}"
						v-if="prodItem.TYPES == 'month' && prodItem.isShow">
						<el-date-picker type="month" v-if='prodItem.ishideValue'
							v-model="prodItem.saveProdInfo"
							:format="prodItem.format ? prodItem.format : 'yyyy-MM-dd HH:mm'"
							:value-format="prodItem.valFormat ? prodItem.valFormat : 'yyyy-MM-dd HH:mm'"
							@change="!prodItem.disabled ? $emit('changeEvent', prodItem, $event) : null"
							:disabled='prodItem.disabled'
							:placeholder="prodItem.placeH"
							:picker-options="prodItem.pickerOptions || null">
						</el-date-picker>
					</div>

					<!-- radio-group 单选框组 -->
					<div class="div_lineBlock" :class="prodItem.className"
						:style="{width: setWidth(prodItem),background:prodItem.disabled ? bgColor: '#fff'}"
						v-if="prodItem.TYPES == 'radio-group' && prodItem.isShow">
						<template v-if='prodItem.ishideValue'>
							<div class="radio-group">
								<el-radio v-model="prodItem.saveProdInfo"
									v-for="(item, indexs) in prodItem.initThisData" :key="indexs"
									@change="!prodItem.disabled ? $emit('changeEvent', prodItem, $event, item, indexs) : null"
									:disabled='item.disabled' 
									:label="item.value">
									{{item.label}}
								</el-radio>
							</div>
						</template>
					</div>

					<!-- 含有图片单选框组 -->
					<div class="div_lineBlock" :class="prodItem.className"
						:style="{width: setWidth(prodItem),background:prodItem.disabled ? bgColor: '#fff'}"
						v-if="prodItem.TYPES == 'radio-border-group' && prodItem.isShow">
						<template v-if='prodItem.ishideValue'>
							<div class="radio-border-group">
								<el-radio border v-model="prodItem.saveProdInfo"
									v-for="(item, indexs) in prodItem.initThisData" :key="indexs"
									@change="!prodItem.disabled ? $emit('changeEvent', prodItem, $event, item, indexs) : null"
									:disabled='item.disabled || prodItem.disabled' 
									:label="item.value">
									{{item.label}}
								</el-radio>
							</div>
						</template>
					</div>

					<!-- radio-group 多选框组 -->
					<div class="div_lineBlock" 
						:style="{width: setWidth(prodItem),background:prodItem.disabled ? bgColor: '#fff'}"
						v-if="prodItem.TYPES == 'checkbox-group' && prodItem.isShow">
						<el-checkbox-group v-model="prodItem.saveProdInfo" v-if='prodItem.ishideValue' :disabled='prodItem.disabled'>
							<el-checkbox v-for='(item, indexs) in prodItem.initThisData' :key='indexs'
								@change="!prodItem.disabled ? $emit('changeEvent', prodItem, $event, item, indexs) : null"
								@focus="$emit('focusEvent', prodItem, $event)" @blur="$emit('blurEvent', prodItem, $event)"
								:disabled='item.disabled' :label="item.value">{{item.label}}</el-checkbox>
						</el-checkbox-group>
					</div>

					<!-- 不含group checkbox 多选-->
					<div :class="['div_lineBlock', prodItem.className]"
						:style="{width: setWidth(prodItem), background:prodItem.disabled ? bgColor || '#f5f7fa': '#fff',
								height: prodItem.height || '40px'}"
						v-if="prodItem.TYPES == 'checkbox' && prodItem.isShow">
						<template v-if="prodItem.ishideValue">
							<el-checkbox v-for='(item, indexs) in prodItem.initThisData' :key='indexs'
										@change="!item.disabled ? $emit('changeEvent', prodItem, $event, item, indexs) : null"
										:disabled="item.disabled"
										v-model="item.check" 
										:label="item.value">{{item.label}}
							</el-checkbox>
						</template>
					</div>

					<!-- text静态文本 -->
					<div class="div_lineBlock" :class="prodItem.className"
						:style="{width: setWidth(prodItem),background:prodItem.disabled ? bgColor: '#fff'}"
						v-if="prodItem.TYPES == 'text' && prodItem.isShow">
						<span class="text" v-if="!prodItem.valueNotShow">{{prodItem.saveProdInfo}}</span>
						<em v-if="prodItem.append" class="text-append" :class="prodItem.appendClassName || null" @click="prodItem.appendHandle ? $emit(prodItem.appendHandle, prodItem, $event) : null">{{prodItem.appendText}}</em>
					</div>	

					<!-- 上传图片、附件 -->
					<!-- <div class="div_uploadBlock"
						:style="{width: setWidth(prodItem),background:prodItem.disabled ? bgColor: '#fff'}"
						v-if="prodItem.TYPES == 'upload' && prodItem.isShow">
						<uploadFile v-model="prodItem.saveProdInfo" :paramsObj="prodItem"></uploadFile>
					</div> -->

					<!-- 省市区(县) 三级为一体 -->
					<div class="div_lineBlock"
						:style="{width: setWidth(prodItem),background:prodItem.disabled ? bgColor: '#fff'}"
						v-if="prodItem.TYPES == 'city-cascader' && prodItem.isShow">
						<el-cascader :options="prodItem.initThisData"
									v-model="prodItem.saveProdInfo"
									:separator="prodItem.separator || '/'"
									:clearable="prodItem.clearable || false"
									:disabled="prodItem.disabled"
									:popper-class="prodItem.popperClass"
									@active-item-change="activeItemChange"
									:props="prodItem.props">
						</el-cascader>
					</div>

					<!-- 操作 -->
					<div class="div_lineBlock"
						:style="{width: setWidth(prodItem),background:prodItem.disabled ? bgColor: '#fff'}"
						v-if="prodItem.TYPES == 'btnOperate' && prodItem.isShow">
						<div class="btnOperate">
							<template v-for="(btnItem, btnIndex) in prodItem.operateArr">
								<el-button :key="btnIndex"
											v-if="btnItem.initShow"
											:class="{[btnItem.className + '-button'] : true, 'disable-button-opacity': btnItem.disabled || prodItem.disabled}"
											@click.stop.native="btnItem.handled ? (!btnItem.disabled || !prodItem.disabled) ? $emit(btnItem.handled, btnItem, btnIndex, prodItem, index, $event, btnItem.tempKeys || null) : null : null"
											:disabled="btnItem.disabled || prodItem.disabled"
											:type="btnItem.type || 'default'"
											:size="btnItem.size || 'small'">{{btnItem.name}}</el-button>
							</template>
						</div>
					</div>

					<!-- 其他-->
					<div class="div_lineBlock" :style="{width: setWidth(prodItem),background:prodItem.disabled ? bgColor: '#fff'}"
						v-if="prodItem.TYPES == 'other' && prodItem.isShow">
						<slot name="other"></slot>
					</div>
				</li>
			</template>
		</ul>
	</div>
</template>

<script>
// import uploadFile from '../navList/uploadFile'
export default{
	name: 'prodBaseInfo-Options',
	inheritAttrs: false,
	components:{
		// uploadFile
	},
	props: {
		formInfoList: {
			type: Array,
			default:() => []
		}
	},
	data() {
		return {
			bgColor:'#f5f7fa',
			// prodInitData: [],//初始化数据
			restaurants: [],//输入框下拉列表数据,点击动态切换每个row的数据
			addTextLength: 0,
			activeIdx: null
		}
	},
	computed: {
		prodInitData() {
			return this.formInfoList;
		}
	},
	methods: {
		uploadRequest(file) {
			console.log('http[file]:', file)
		},
		monthRangeChange(val) {
			this.$emit('monthRangeChange', val);
		},
		activeItemChange(val) {
			this.$emit('activeItemChange', val);
		},
		setWidth(prodItem) {
			return prodItem.labelWidth ? `calc(100% - ${prodItem.labelWidth}%)` : '100%'
		},
		// infofuncList(datalist) {
		// 	// 父组件传递数据到子组件初始化数据
		// 	this.prodInitData = datalist;
		// 	try {
		// 		if(this.prodInitData && this.prodInitData.length > 0) {
		// 			this.prodInitData.forEach(item => {
		// 				if(item.TYPES && item.TYPES === 'input-textarea') {
		// 					item.textLength = 0;
		// 				}
		// 			})
		// 		}
		// 	} catch (error) {
				
		// 	}
		// },
		getCurrentSaveMsg(e, item, initData) {
			this.$emit('currentChange',e, item, initData, this.prodInitData)
		},
		filterCurrentSaveMsg(e, item) {
			this.$emit('filterCurrentInput', e, item)
		},
		inputNumCouDel(item, type) {
			if(item.saveProdInfo) {
				let toFixedStr = String(item.numAddDec).split('.')[1]
				if(type === 'count') {
					item.saveProdInfo =  (Number(item.saveProdInfo) + item.numAddDec).toFixed(toFixedStr ? toFixedStr.length : 0 )
				}
				if(type === 'del') {
					let currentVal = Number(item.saveProdInfo) - item.numAddDec
					item.saveProdInfo =  currentVal > 0 ? currentVal.toFixed(toFixedStr ? toFixedStr.length : 0 ) : 0
				}
			} else {
				if(type === 'count') {
					item.saveProdInfo = item.numAddDec
				}
			}
		},
		addTheBorder(e) {
			// if(e.target) {
			// 	e.target.classList.add('borderActive')
			// } else if(e.$el.className.toLowerCase().indexOf('el-date-editor') >= 0) {
			// 	 let el = e.$el.querySelector('.el-input__inner')
			// 	el.target.classList.add('borderActive')
			// }
		},
		removeBorder(e) {
			// if(e.target) {
			// 	e.target.classList.remove('borderActive')
			// } else if(e.$el.className.toLowerCase().indexOf('el-date-editor') >= 0) {
			// 	 let el = e.$el.querySelector('.el-input__inner')
			// 	el.target.classList.remove('borderActive')
			// }
		},
		inputTextAreaLength(item, itemKey, lenVal, event, maxLength = 500, limitText = null) {
			let $self = this;
			let $value = event.target.value;
			item[itemKey] = $value.replace(/[^\S]/g,'');
			// 限制数字
			if(limitText && limitText == 'number') {
				item[itemKey] = item[itemKey].replace(/[^\D]/g, '').substr(0, maxLength);
				if(item.handled && item.handled!= '') {
					this.$emit(item.handled , item[itemKey].replace(/[^\D]/g, '').substr(0, maxLength), event)
				}
			}else{
				item[itemKey] = item[itemKey].substr(0, maxLength);
				if(item.handled && item.handled!= '') {
					this.$emit(item.handled , item[itemKey].substr(0, maxLength), event)
				}
			}
			item.textLength = $value.length;
			if(item[itemKey].length >= maxLength){
				item.textLength = maxLength;
			}
		},
		// 单选
		activeOperate(objItem, item, index) {
			if(this.activeIdx == index) {
				this.activeIdx = null;
				objItem.saveProdInfo = null;
			}else{
				this.activeIdx = index;
				objItem.saveProdInfo = item.label;					
			}
		},
		// 文本框长度
		changeText(item) {
			if(item.saveProdInfo && item.saveProdInfo != '') {
				return item.textLength = item.saveProdInfo.length;
			}
			return 0;
		},
		onChange(handleName, file, fileList, name = null) {
			this.uploadAutoHeight();
			this.$emit(handleName, file, fileList, name);
		},
		// 上传前拦截
		beforeUpload(handleName, item, file) {
			console.log('itenm:', handleName, item, file);
			this.$emit(handleName, file);
			this.uploadAutoHeight();
		},
		// 高度自适应
		uploadAutoHeight() {
			this.$nextTick(() => {
				let upLoadSpan = document.querySelector('.upLoadData_span');
				let uploadBlock = document.querySelector('.div_uploadBlock');
				uploadBlock.style.height = null;
				upLoadSpan.style.height = null;
				if(upLoadSpan && uploadBlock) {
					let height = uploadBlock.offsetHeight;
					upLoadSpan.style.height = height + 'px';
				}
			})
		},
		// 成功上传
		onSuccessLoad(handleName, item, response, file, fileList) {
			this.uploadAutoHeight();
			this.$emit(handleName, response, file, fileList);
		},
		// 删除列表指定文件
		removeLoad(handleName, item,  file, fileList, event) {
			console.log('删除后:', handleName, item,  file, fileList, event)
			this.$emit(handleName, file, fileList);
			setTimeout(() => {
				this.uploadAutoHeight();
			}, 500)
		},
		// 删除文件前钩子
		beforeRemove(file, fileList) {
			console.log('删除前:', file, fileList)
		}
	}
}
</script>
<style lang="scss">
.prodtoBaseInfoOptions::after {
	content:"";
	display:block;
	clear:both;
	visibility:hidden;
	height:0;
}
[prodtoBaseInfoPage] {
	.prodtoInfoList {
		width: 100%;
		display: inline-flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		box-sizing: border-box;
		border-left: 1px solid #ccc;
		border-top: 1px solid #ccc;
		>li.form_item-li {
			min-height: 42px;
			display: inline-flex;
			justify-content: flex-start;
			box-sizing: border-box;
			.el-input__inner {
				border: 0 none !important;
			}
			>label.formBaseInfo_label {
				display: table;
				user-select: none;
				min-height: 42px;
				height: 100%;
				font-size: 14px;
				border-bottom: 1px solid #ccc;
				border-right: 1px solid #ccc;
				padding-left: 6px;
				box-sizing: border-box;
				background: #f2f2f2;
				.nessRequire::after{
					content: "*";
					font-style: normal;
					color: red;
				}
				.title {
					display: table-cell;
					vertical-align: middle;
					line-height: 18px;
					font-size: 13px !important;
				}
			}
			.div_lineBlock {
				display: inline-block;
				min-height: 42px;
				vertical-align: middle;
				position: relative;
				overflow: hidden;
				border-bottom: 1px solid #ccc;
				border-right: 1px solid #ccc;
				box-sizing: border-box;
				font-size: 0;
				height: 100%;
				& > div:first-child {
					width: 100%;
				}
				// 下拉
				.el-select,
				.el-input-group {
					min-height: 42px;
					height: 100%;
					.el-input, .el-input__inner {
						height: 100%;
					}
				}
				// 多选
				.el-checkbox-group,
				.radio-group {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					flex-wrap: wrap;
					vertical-align: top;
					height: 100%;
					padding-left: 8px;
					overflow: hidden;
					min-height: 42px;
				}
				.el-checkbox__input.is-checked .el-checkbox__inner, 
				.el-checkbox__input.is-indeterminate .el-checkbox__inner,
				.el-radio__input.is-checked .el-radio__inner {
					background-color: #8dc120;
					border-color: #8dc120;
				}
				.div_lineBlock .el-radio__label {
					padding-left: 5px;
				}
				.el-checkbox__input.is-checked+.el-checkbox__label,
				.el-radio__input.is-checked+.el-radio__label {
					color: #8dc120;
				}
				.el-input-number {
					width: 100%;
					.el-input__inner {
						text-align: left !important;
					}
				}
			}
		}
	}
}
</style>