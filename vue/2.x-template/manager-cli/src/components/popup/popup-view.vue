<template>
	<div class="popup-view-component">
		<div class="popup_view_popup" 
			v-show='popupShow'>
			<div :class='{bounceIn:popupShow,mainAndNotMainContainer:true}'>
			  	<p class='connectProdlist'>
			  		<span>{{title}}</span>
			  		<i class='el-icon-close' 
			  			@click='hidePopUp'>
			  		</i>
			  	</p>
			  	  <!-- 选择需要查询的信息 -->
			  	<div class="container">
			  	 	<slot name='baseInfoEdit'></slot>
				  <!-- 关闭弹窗按钮 -->
			  	</div>
			  	<div class="operateSubSel">
					<span class='showSubSel'>
					  <el-button type="primary" 
						 @click="sureChangeSubProd">
						  确 定
					  </el-button>
					  <el-button type='danger' 
					  	@click="hidePopUp">
						 关闭
					  </el-button>
					</span>
			  	</div>
		    </div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'popupViewComponent',
		props: {
			title: {
				type: String,
				default: '',
			}
		},
		data() {
			 return {
			 	popupShow: true,
			 }
		},
		methods: {
			sureChangeSubProd() {
				console.log(1)
				this.$emit('delSelect','sureButton')
			},
			hidePopUp() {
				console.log(2)
				this.$emit('delSelect','cancle')
			}
		}
	}
</script>

<style lang='scss'>
.popup-view-component {
	overflow: auto;
	padding-bottom: 35px;
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background:rgba(0,0,0,0.4);
	z-index: 100;
	.popup_view_popup {
		height: 1200px;
	    .mainAndNotMainContainer {
			width: 950px;
			overflow: hidden;
			background: #fff;
			margin: 2% auto;
			border-radius: 6px;
			.connectProdlist {
				width: 100%;
				text-align: left;
				font-size: 15px;
				background: #ccc;
				padding: 15px 15px;
				box-sizing: border-box;
				.el-icon-close {
					float: right;
					font-size: 20px;
					cursor: pointer;
				}
			}
			.container {
				width: 100%;
				padding:0 15px;
				box-sizing: border-box;
				margin-top: 12px;
				[prodtobaseinfo] {
					width: 100%;
					margin: 32px 0 0 0;
					.prodtoInfoList {
						width: 100%;
					}
				}
			}
			.operateSubSel {
				width: 100%;
				overflow: hidden;
				padding: 20px 0;
				margin-top: 40px;
				border-top: 1px solid #ccc;
				.showSubSel {
					display: block;
					max-width: 188px;
					margin: 0 auto;
					.el-button {
						width: 80px;
						height: 36px;
						line-height: 36px;
						padding: 0;
					}
					.el-button--danger {
						background-color: #e5536b !important;
					    border: 1px solid #e5536b !important;
					}
					.el-button--primary {
						background-color: #8dc120;
					    border-color: #8dc120;
					}
				}
			}
		}
	}
	// css3 动画库
	@keyframes bounceIn {
	  0% {
	  	 -webkit-transform: scale3d(0.5, 0.5, 0.5);
	    transform: scale3d(0.5, 0.5, 0.5);
	  }

	  100% {
	    opacity: 1;
	    -webkit-transform: scale3d(1.0, 1.0, 1.0);
	    transform: scale3d(1.0, 1.0, 1.0);
	  }
	}

	.bounceIn {
	  -webkit-animation-duration: 0.45s;
	  animation-duration: 0.45s;
	  -webkit-animation-name: bounceIn;
	  animation-name: bounceIn;
	}
}
	
</style>