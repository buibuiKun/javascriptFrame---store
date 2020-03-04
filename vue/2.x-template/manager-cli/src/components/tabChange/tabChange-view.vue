<template>
	<div class="prodTabChange">
		<div class="panel-heading">
			<ul class="prodTabChangeList">
				<li v-for='(item, index) in tabChangeList'  
					:key='index'
					:class = '{isClickTabActive:selectIndex === index}'
					@mouseenter = 'tabenter($event)'
					@mouseleave = 'tableave($event)'
					@click='tabChange(item , index)' 
					v-text='item.text'>
				</li>
				<li class="tab_operate">
					<slot name='operate'></slot>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name:'tabChangeViewComponent',
		props: {
			tabChangeList:{
				type: Array,
				default: []
			}
		},
		data() {
			return {
				selectIndex: 0,
			}
		},
		methods: {
			tabChange(item, index) {
				this.selectIndex = index
				this.$emit('getTabChangeName',item, index)
			},
			tabenter(e) {
				e.target.classList.add('istabActive')
			},
			tableave(e) {
				e.target.classList.remove('istabActive')
			}
		}
	}
</script>

<style lang='scss' scoped>
.prodTabChange {
	width: 100%;
	.panel-heading {
    height: 45px;
    padding-top: 2.5px;
    margin:10px 0;
    background-color: #e0edfe;
		.prodTabChangeList {
			width: 100%;
			height: 40px;
			>li {
				float: left;
		    margin: 0 7px;
		    font-size: 14px;
		    padding: 0 6px;
		    height: 40px;
		    line-height: 40px;
		    white-space: nowrap;
		    text-align: center;
		    min-width: 4.5%;
		    position:relative;
		    cursor: pointer;
		    &:active {
		    	opacity: 0.6;
		    }
			}
			>li:before {
				content: "";
				display: block;
		    position: absolute;
		    top: 5px;
		    height: 30px;
		    width: 2px;
		    right: -8px;
		    box-sizing: border-box;
		    background: -webkit-linear-gradient(top,rgba(255,255,255,0),rgba(255,255,255,1) 50%,rgba(255,255,255,0));
			}
			>li:after {
				content: "";
				display: block;
		    position: absolute;
		    top: 5px;
		    height: 30px;
		    width: 2px;
		    right: -8px;
				box-sizing: border-box;
				background: -webkit-linear-gradient(top,rgba(255,255,255,0),rgba(255,255,255,1) 50%,rgba(255,255,255,0));
			}
			.tab_operate {
				width: 170px;
				height: 40px;
				padding:0 8px;
				float: right;
				box-sizing: border-box;
				.el-button--danger {
					min-width: 72px;
					height: 30px;
					line-height: 30px;
					padding: 0;
					margin-top: 2px;
					font-size: 12px;
					background-color: #0ae !important;
				  border: 2px solid #0ae !important;
					vertical-align: middle;
			    >span {
			    	vertical-align: middle;
			    }
    		}
    		.el-button--primary {
    			float: right;
    			width: 60px;
					height: 30px;
					line-height: 30px;
					padding: 0;
					margin-top: 7px;
					font-size: 12px;
					vertical-align: middle;
					background-color: #0ae !important;
			    border: 2px solid #0ae !important;
			    >span {
			    	vertical-align: middle;
			    }
	    	}
    		.el-button--danger:focus, 
    		.el-button--danger:hover {
				  background-color: #0ae !important;
			    border: 2px solid #0ae !important;
			    color: #fff;
			    opacity: 0.8;
    		}
    		.el-button--primary:focus, 
    		.el-button--primary:hover {
				  background-color: #0ae !important;
			    border: 2px solid #0ae !important;
			    color: #fff;
			    opacity: 0.8;
    		}
			}

			.istabActive {
				color: #fff;
				background-color: #4da1ff;
			    border-radius: 5px!important;
			    border-bottom: 0 solid #01aaef;
			}
			.isClickTabActive {
				color: #fff;
				background-color: #4da1ff;
			    border-radius: 5px!important;
			    border-bottom: 0 solid #01aaef;
			}
		}
	}
}
</style>