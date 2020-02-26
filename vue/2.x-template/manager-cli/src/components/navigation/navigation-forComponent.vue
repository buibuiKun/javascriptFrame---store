<template>
	<ul class='navigation-forComponent' v-if='currentPageComponent'>
    <li v-for='(currntTab, index) in tabComponList'
      :class='currntTab.complainNo === currentPageComponent.complainNo ? "currentActive" : "currentStyle"'
      @click='tabChange(currntTab)'
      :key='index'>
      <span>{{currntTab.tabName}}<i class='el-icon-error' @click.stop='deleteTab(currntTab, index)'></i></span>
    </li>
  </ul>
</template>

<script>
	export default {
		name: 'navigationForComponent',
		props: {
			tabComponList: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data() {
			return {}
		},
		computed: {
			componList: function() {
				return this.tabComponList
			},
      currentPageComponent: function() {
        return this.$store.state.complaintStore.currentPageComponent
      }
		},
    methods: {
      tabChange(tab) {
        this.$store.state.complaintStore.currentPageComponent = tab
      },
      deleteTab(tab, index) {
        this.tabComponList.splice(index, 1)
        this.$store.state.complaintStore.currentPageComponent = this.tabComponList[index - 1]
      }
    }
	}
</script>

<style lang='scss'>
.navigation-forComponent {
  width: 100%;
  margin-top: 5px;
  background: #f9f9fa;
  min-height: 30px;
  overflow: hidden;
  padding:0 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #e7e7e7;
  border-top: 1px solid #e7e7e7;
  >li {
    float: left;
    border-right: 1px solid #dadada;
    cursor: pointer;
    >span {
	    position: relative;
	    display: block;
	    height: 30px;
	    padding: 0 20px;
	    font-size: 13px;
	    line-height: 30px;
	    text-align: center;
	    >i {
	        position: absolute;
	        right: 2px;
	        top: 50%;
	        transform: translateY(-50%);
	        z-index: 100;
	        color: #e5536b;
	        display: none;
          font-size: 15px;
	    }
	    >.el-icon-error:before {
	        position: relative;
	        top:0;
	    }
    }
  }
  >li:hover span >i {
      display: block;
  }
  >li:nth-child(1):hover span >i {
      display: none;
  }
  >li:last-child {
      border-right: 1px solid #e7e7e7;
  }
  .currentActive {
    background: #8dc120;
    >span {
        color: #fff;
    }
  }
  .currentStyle {
    background: #e7e7e7;
    >span {
        color: #000;
    }
  }
}
</style>