<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">
      上传
    </el-button>
    <el-dialog :visible.sync="dialogVisible" zIndex="2000">
      <el-upload
        :multiple="true"
        :file-list="fileList"
        :http-request="upload"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        action=" "
        list-type="picture-card"
      >
        <el-button size="small" type="primary">
          点击上传
        </el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">
        取消
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        确定
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
const baidubce = require('@baiducloud/bos-uploader');

import { getToken } from '../../../api/upload'
import { uuid } from '../../../utils'

export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: [],
      fileList: []
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
            const uid = file.uid
            const objKeyArr = Object.keys(this.listObj)
            for (let i = 0, len = objKeyArr.length; i < len; i++) {
              if (this.listObj[objKeyArr[i]].uid === uid) {
                this.listObj[objKeyArr[i]].url = endpoint + '/' + key
                this.listObj[objKeyArr[i]].hasSuccess = true
                return
              }
            }
          })
          .catch((error) => {
            console.log('失败')
            console.log(error)
          })
      }
    },

    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传完毕，如果出现网络问题，请重新上传!')
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.files.file
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
