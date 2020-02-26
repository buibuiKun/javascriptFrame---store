<template>
  <div :class='["upload-view-component", _obj.type]' v-show='!_obj.show'>
    <condition-title-var-component
      v-if='!_obj.titleHide'
      :titleObj='_obj'
    ></condition-title-var-component>
    <!-- <el-upload 
      class='upload-view'
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :disabled='_obj.disabled'
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload> -->
     <el-upload 
          class='upload-view'
          :action="$store.state.loadUrl"
          :list-type="listType"
          :data="upImgData"
          :file-list="_obj.value" 
          :on-success="handleAvatarSuccess" 
          :before-upload="beforeAvatarUpload"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove" 
          :disabled='_obj.disabled'
          :limit="limitNum">
        <i class="el-icon-plus"></i>
    </el-upload> 
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import {uploadDownload, uploadBefore, removeIdxImg} from '@api/api'
  import {REQ_URL} from '@/api'
  export default {
    name:'uploadViewComponent',
    props:{
      options: {
        type: Object,
        default: function() {
          return null
        }
      },// 上传地址
      getUpLoadUrl:[String],
      // 文件列表的类型
      listType: {
          type: String,
          default:'picture-card'
      },
      // 上传最大大小
      sizeNum: {
          type: Number,
          default: 15
      },
      // 上传条数
      limitNum: {
          type: Number,
          default: 1000
      }
    },
    data() {
      return {
        REQ_URL: REQ_URL,
        upImgData: null,
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    computed: {
      _obj() {
         this.options.value.forEach(imgItem => {
          if(imgItem.downloadUrl && !imgItem.url) {
              let _url = ''
              if(imgItem.downloadUrl.indexOf('.mp4') >= 0 || imgItem.downloadUrl.indexOf('.avi') >= 0) {
                _url = './static/play.jpg'
              }
              if(imgItem.downloadUrl.indexOf('.zip') >= 0 || imgItem.downloadUrl.indexOf('.rar') >= 0) {
                _url = './static/rar.jpg'
              }
              if(imgItem.downloadUrl.indexOf('.doc') >= 0 || imgItem.downloadUrl.indexOf('.docx') >= 0) {
                _url = './static/worder.jpg'
              }
              if(imgItem.downloadUrl.indexOf('.xls') >= 0 || imgItem.downloadUrl.indexOf('.xlsx') >= 0) {
                _url = './static/excel.jpg'
              }
              if(imgItem.downloadUrl.indexOf('.ppt') >= 0 || imgItem.downloadUrl.indexOf('.pptx') >= 0) {
                  _url = './static/ppt.jpg'
              }
              imgItem.url = _url || imgItem.downloadUrl
          }
        })
        // this.options ? this.options.var_title = [this.options.value.length || 0] : ''
        return this.options ? this.options : {}
      }
    },
    methods:{
        // 上传前拦截
        beforeAvatarUpload(file){
          console.log(file,'file.type')
            const imgFormat = [
              ".jpeg", 
              ".jpg",
              ".png", 
              ".mp4", 
              ".avi",
              ".zip",
              ".rar",
              ".doc",
              ".docx",
              ".xls",
              ".xlsx",
              ".ppt",
              ".pptx"
            ];
            let splitList = file.name.split('.')
            let _name = "." + (splitList[splitList.length - 1 >= 0 ? (splitList.length - 1) : 0])
            console.log(_name,'_name')
            const isJPG = imgFormat.indexOf(_name) >= 0
            const is15M = file.size / 1024 / 1024 < this.sizeNum;
            if(!isJPG) {
              this.$message.warning("上传附件只能是图片（jpeg，jpg，png），视频(avi,mp4)，文档(word, excel，ppt)，压缩包（rar，zip）!");
              return false
            }
            if(!is15M) {
              this.$message.warning("单个上传附件大小不能超出15MB!");
              return false
            }
            return this.$http.post(REQ_URL + this.$store.state.complaintStore.loadUrl, {
              module: this._obj.module,
              fileName: file.name
            }).then(rest => {
                if (rest.data.state === "ok") {
                    this.upImgData = {
                        key: rest.data.key,
                        token: rest.data.uploadToken
                    };
                    document.querySelector(".el-upload").style.display = "none";
                } else {
                    this.$message.warning("上传附件失败!");
                }
            }).catch(() => {
                this.$message.warning("上传附件失败!");
            });
        },
        // 上传成功时回调
        handleAvatarSuccess(response, file){
            const isJPG = file.raw.type === "image/jpeg" || file.raw.type === "image/jpg" || file.raw.type === "image/png";
            uploadDownload({
                key: response.key
            }).then(rest => {
              console.log(rest)
                if (rest.data.state === "ok") {
                    let _url = ''
                    if(rest.data.url.indexOf('.mp4') >= 0 || rest.data.url.indexOf('.avi') >= 0) {
                      _url = './static/play.jpg'
                    }
                    if(rest.data.url.indexOf('.zip') >= 0 || rest.data.url.indexOf('.rar') >= 0) {
                      _url = './static/rar.jpg'
                    }
                    if(rest.data.url.indexOf('.doc') >= 0 || rest.data.url.indexOf('.docx') >= 0) {
                      _url = './static/worder.jpg'
                    }
                    if(rest.data.url.indexOf('.xls') >= 0 || rest.data.url.indexOf('.xlsx') >= 0) {
                      _url = './static/excel.jpg'
                    }
                    if(rest.data.url.indexOf('.ppt') >= 0 || rest.data.url.indexOf('.pptx') >= 0) {
                       _url = './static/ppt.jpg'
                    }
                    let images = {
                        accessoryCode: response.key,
                        accessoryType: file.name.split('.').pop(),   // 文件类型,
                        accessoryName: file.name,
                        accessoryModule: "PCSO-PC",
                        accessorySource: "PC",
                        downloadUrl: rest.data.url,
                        url: isJPG ? rest.data.url : _url,
                        name: file.name
                    };
                    this._obj.value.push(images);
                    this.$emit('input', this._obj.value);
                    if (this._obj.value.length >= this.limitNum) {
                        document.querySelector(".el-upload").style.display = "none";
                    } else {
                        document.querySelector(".el-upload").style.display = "";
                    }
                    this.$message.success("上传附件成功");
                } else {
                    this.$message.warning("上传附件失败");
                    document.querySelector(".el-upload").style.display = "";
                }
            }).catch(() => {
                this.$message.warning("上传附件失败");
                document.querySelector(".el-upload").style.display = "";
            });
        },
        // 上传图片成功预览
        handlePictureCardPreview(file){
            if (file.type === "image/jpg" || file.type === "image/png" || file.accessoryType === "image/jpeg") {
                this.$emit('ImgCardPrevies', {
                    dialogImageUrl: file.downloadUrl,
                    dialogVisible: true
                })
            } else {
                window.open(file.downloadUrl);
            }
        },
        // 删除图片
        handleRemove(file, fileList){
            this._obj.value = fileList;
            this.$emit('input',this._obj.value);
            if(this._obj.value.length < this.limitNum) {
                document.querySelector(".el-upload").style.display = "inline-block";
            }
            if (file.accessoryCode == undefined) {
                return;
            }
            const params = {
                key: file.accessoryCode,
            };
            removeIdxImg(params, file).then(rest => {
                if(rest.data.state === "ok"){
                    for (let i = 0, imgList = this._obj.value; i < imgList.length; i++) {
                        if(imgList[i].accessoryCode == file.accessoryCode){
                            this._obj.value.splice(i, 1);
                            this.$emit('input',this._obj.value);
                        }
                    }
                    this.$message.success(`删除附件 ${file.accessoryName} 成功`)
                }else{
                    this.$message.warning(`删除附件 ${file.accessoryName} 失败`);
                }
            }).catch(err => {
                this.$message.warning("删除附件失败");
            })
        }
    },
    watch: {
      '_obj.value': function(newData, oldData) {
        this._obj.var_title = [newData.length]
      }
    }
  }
</script>

<style lang='scss'>
.upload-view-component {
  .upload-view {
    min-height: 150px;
    padding: 16px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .el-upload--picture-card,
  .el-upload-list--picture-card .el-upload-list__item {
    height: 118px;
    width: 118px;
    line-height: 116px;
  }
  .el-upload-list__item {
    position: relative;
  }
  .el-upload-list--picture-card .el-upload-list__item-name {
    display: block !important;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    min-height: 20px;
    line-height: 20px !important;
    padding-left: 0;
    background: #fff;
    white-space: normal;
  }
}

</style>