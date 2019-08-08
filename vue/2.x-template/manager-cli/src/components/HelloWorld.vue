<template>
        <div class="MBslidebar">
            <div class="Mitem" v-for="(item,index) in mydata">
                <div class="MitemTitle" @click="MitemT(item,index)">
                    <span>{{item.name}}</span>
                    <span>{{item.names}}</span>
                    <span class='el-icon-arrow-down myicon' :class="[item.isshow?'go':'aa']">45</span>
                </div>

                <div class="MitemChildren" ref="mychild">
                    <div class="culldown">
                        <div class="MitemChildrenLis" v-for="events in item.madataC">
                            <span>{{events.age}}</span>
                            <span>8</span>
                        </div>
                    </div>
                </div>


            </div>

            </div>
  </template>
  <script>
export default {
  data() {
    return {
      isshow: false,
      IconRotate: false,
      mydata:[{
        name: '122',
        names: '144',
        isshow: false,
        madataC: [{
          age: 122
        },{
          age: 122
        },{
          age: 122
        },{
          age: 122
        },{
          age: 122
        },{
          age: 122
        },{
          age: 122
        },{
          age: 122
        },{
          age: 122
        },{
          age: 122
        },{
          age: 122
        }]
      }]
    };
  },
  methods: {
    MitemT(item, index) {
      let AllHiden = this.$refs.mychild;
      let eleBack = this.$refs.mychild[index];
      let eleMore = this.$refs.mychild[index].childNodes[0];
      let eleMoreHeight = eleMore.offsetHeight;
      for (var i = 0; i < AllHiden.length; i++) {
        AllHiden[i].style.height = "0px";
        this.mydata[i].isshow = false;
      }
      //  每次点击时都要记录上次点击的状态，然后设置与上次相反的状态，就是为了再次点击nav的时候可以关闭。
      item.isshow = true;
      item.isshow = item.IconRotate == item.isshow ? false : true;
      item.IconRotate = item.isshow;
      // 在这判断如果当前记录下的状态与数据中的状态不同，就关闭当前下拉框
      if (!item.IconRotate) {
        eleMoreHeight = 0;
      }
      eleBack.style.height = eleMoreHeight + "px";
    }
  }
};
</script>
  <style>
.MBslidebar {
  width: 200px;
  height: 100%;
  border: 1px solid;
}

.myicon {
  color: red;
}

.Mitem {
  width: 210px;
}

.MitemTitle {
  width: 200px;
  height: 50px;
  border: 1px solid blue;
  display: flex;
  align-items: center;
}

.MitemChildren {
  width: 200px;
  /*border: 1px solid red;*/
  height: 0;
  position: relative;
  overflow: hidden;
  -webkit-transition: height 0.6s;
  -moz-transition: height 0.6s;
  -o-transition: height 0.6s;
  transition: height 0.6s;
}

.MitemChildrenLis {
  width: 200px;
  height: 50px;
  border: 1px solid green;
  display: flex;
  align-items: center;
}

.aa {
  transition: all 1s;
}

.go {
  transform: rotate(-180deg);
  transition: all 1s;
}
</style>