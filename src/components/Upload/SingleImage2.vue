<template>
  <div>
    <el-upload
      class="avatar-uploader2"
      action=""
      :show-file-list="false"
      :http-request="upload"
      :on-success="handleImageSuccess"
      :on-error="handleImageError"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar2">
      <i v-else class="el-icon-plus avatar-uploader2-icon"></i>
    </el-upload>
  </div>
</template>

<script>
  import { uuid } from '../../utils'
  const baidubce = require('@baiducloud/bos-uploader');
  import { getToken } from '../../api/upload'
  export default {
    props: {
      value: ''
    },
    computed: {
      imageUrl() {
        return this.value
      }
    },
    data() {
      return {
        dataObj: {},
        tempUrl: '',
      }
    },
    methods: {
      upload(file, detail) {
        getToken().then(response => {
          this.dataObj=response.data;
          this.uploadImage(response.data,file.file)
        })

      },
      uploadImage(param,file)
      {
        let config = {
          credentials: {
            ak: param.accessKeyId,
            sk: param.secretAccessKey,
          },
          sessionToken: param.sessionToken,
          endpoint: param.endpoint,
        }
        let client = new baidubce.sdk.BosClient(config)

        let suffexs = file.name.split('.')
        let suffex = ''
        if (suffexs.length > 0) {
          suffex = suffexs[suffexs.length - 1]
        }

        let key =uuid() + '.' + suffex
        let endpoint = param.endpoint
        let bos_bucket = param.bos_bucket

        let reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onload = (e) => {
          client
            .putObject(bos_bucket, key, new Buffer(e.target.result))
            .then((response) => {
              this.emitInput(endpoint + '/' + key)
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
      handleImageSuccess(file) {
      },
      handleImageError(err, file, fileList) {
        console.log(err)
      },
    }
  }
</script>
<style>
  .avatar-uploader2 .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader2 .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader2-icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .avatar2 {
    width: 60px;
    height: 60px;
    display: block;
  }
</style>
