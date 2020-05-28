<template>
  <div>
    <el-upload
      action=""
      :http-request="upload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :file-list="imgList"
      :show-file-list="true"
      :limit="10"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import { uuid } from '../../utils'
  const baidubce = require('@baiducloud/bos-uploader')
  import { getToken } from '../../api/upload'
  export default {
    props: {
      value: ''
    },
    created() {
       this.imageUrl()
    },
    data() {
      return {
        imgList: [],
        valueList: [],
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    methods: {
      imageUrl() {
        this.value.forEach((i)=>{
          this.imgList.push({url:i})
        })
        this.valueList=this.value
      },
      upload(file, detail) {
        getToken().then(response => {
          this.uploadImage(response.data, file.file)
        })

      },
      uploadImage(param, file) {
        let config = {
          credentials: {
            ak: param.accessKeyId,
            sk: param.secretAccessKey
          },
          sessionToken: param.sessionToken,
          endpoint: param.endpoint
        }
        let client = new baidubce.sdk.BosClient(config)

        let suffexs = file.name.split('.')
        let suffex = ''
        if (suffexs.length > 0) {
          suffex = suffexs[suffexs.length - 1]
        }

        let key = uuid() + '.' + suffex
        let endpoint = param.endpoint
        let bos_bucket = param.bos_bucket

        let reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onload = (e) => {
          client
            .putObject(bos_bucket, key, new Buffer(e.target.result))
            .then((response) => {
              const url=endpoint + '/' + key
              const image = { name: file.name, url: url }
              this.imgList.push(image)
              this.valueList.push(url)
              this.emitInput(this.valueList)
            })
            .catch((error) => {
              console.log('失败')
              console.log(error)
            })
        }
      },
      emitInput(val) {
        this.$emit('input', val)
      },
      handleRemove(file, fileList) {
        this.imgList = fileList
        const url=[];
        fileList.forEach((item)=>{
          url.push(item.url)
        })
        console.log(url)
        this.valueList=url
        this.emitInput(url)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      }
    }
  }
</script>
<style>

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
