<template>
  <!--在此处添加渲染的内容-->
  <div>
<!--    <el-upload-->
<!--      class="avatar-uploader"-->
<!--      action=""-->
<!--      :show-file-list="false"-->
<!--      :http-request="upload"-->
<!--      :on-success="handleImageSuccess"-->
<!--      :before-upload="beforeImageUpload">-->
<!--      <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
<!--      <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--    </el-upload>-->
    <input type="file" id="file">
    <button type="submit" @click="upload">开始上传</button>

  </div>
</template>

<script>
  import  baidubce from '@baiducloud/bos-uploader'
  import Axios from 'axios'
  import { getToken } from '../../api/upload'
  //将渲染的内容导出
  export default {
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    computed: {

      imageUrl() {
        return this.value
      }
    },
    mounted(){
      let uploader = new baidubce.bos.Uploader({
        browse_button: '#file',
        bos_bucket: 'yanjiemall',
        bos_endpoint: 'https://yanjiemall.su.bcebos.com',
        bos_ak: 'bed76fbe8a8311eaa992f176f1a3fc33',
        bos_sk: '993b8dd36ab64526b7f66b25ca30dfaa',
        uptoken: 'ZjkyZmQ2YmQxZTQ3NDcyNjk0ZTg1ZjYyYjlkZjNjODB8AAAAAHsCAAAap87cvSzk0FvvRWdCbpfP733QBTjSPjP6t36ir6GAJEJ41E1lMuXXOvpET0Rr6HvE6n1tUfBpoPA0/WRNPXfsvMNv8pVZtjmixof0rZkFumniAMDewtw9fjzH6987gScjtVawsTdUDUU+NTdQgGA6mok6N/aiz6GdPhfy5J70VZnZQjlU0Fv14yx0A9ZDQzablnYuZx3DgHL+68qHMqXIaYDx3dNUtdiQS70+2qHpgKW2xm9Z7CmpfX9L2rrzDVr0nkIp/hF3uRCBh9Yzvn0TRNksa8SLl6zTW2phgW42ZDCH0LScKuQABO7FinVbihe75gK9utn1NPu6RLx8VCHXwO3SBEi/hBI/SagSuUlsAum8hRM5gNusgBo1lngPZXcRcGagmcflhzb79lLVWbAPnjUjRRy1/s4Fd06PgWV3NloGK2YkEAMlETnpeADNXp2ZwE4ORoR04NP8JS0T2Dvu',
        auto_start:true,
        init: {
          FileUploaded: function (_, file, info) {
            var bucket = info.body.bucket;
            var object = info.body.object;
            var url = 'https://yanjiemall.su.bcebos.com/' + bucket + '/' + object;

            $(document.body).append($('<div><a href="' + url + '">' + url + '</a></div>'));
          },
          UploadComplete: function() {
            $(document.body).append('<div>上传结111111束！</div>');
          }
        }
      });
    },
    data() {
      return {
        uploader:{},
        dataObj: {},
        tempUrl: '',
        disabled: false
      }
    },
    methods: {
      upload(file, detail) {
        /**
         * bos 上传文件接口网站
         * https://cloud.baidu.com/doc/BOS/s/qjwvyseos#postobject%E6%8E%A5%E5%8F%A3
         */

        // let date = new Date()
        // let year = date.getFullYear()
        // let month = date.getMonth() + 1
        // // bos参数组装 key-文件存储位置和名称
        // let key =this.dataObj.bos_bucket + '/' + year + '/' + month + '/' + file.file.name
        // // policy 格式见网站 String
        // let expiration = {
        //   expiration: this.formate(date, 'yyyy-MM-ddThh:mm:ssZ'),
        //   conditions: [{ bucket: this.dataObj.bos_bucket }, { key: key }]
        // }
        // // let str = JSON.stringify(expiration)
        // // var basePolicy = Base64.encode(str)
        // // let signature = CryptoJS.HmacSHA256(basePolicy, this.dataObj.sk).toString()
        // let crypto = require('crypto');
        //
        // let sk = this.dataObj.secretAccessKey;
        // let policyBase64 = new Buffer(JSON.stringify(expiration)).toString('base64');
        // let sha256Hmac = crypto.createHmac('sha256', sk);
        // sha256Hmac.update(policyBase64);
        // let signature = sha256Hmac.digest('hex');
        // let formData = new FormData()
        // formData.append('key', key)
        // formData.append('accessKey', this.dataObj.accessKeyId)
        // formData.append('policy', policyBase64)
        // formData.append('signature', signature)
        // formData.append('file', file.file)
        // Axios.post(this.dataObj.endpoint, formData, {
        //   baseURL: '',
        //   headers: { 'content-type': 'multipart/form-data;' }
        // }).then(res => {
        //   console.log(res)
        // })
      },
      formate(time, fmt) {
        var o = {
          'M+': time.getMonth() + 1, //月份
          'd+': time.getDate(), //日
          'h+': time.getHours(), //小时
          'm+': time.getMinutes(), //分
          's+': time.getSeconds(), //秒
          'q+': Math.floor((time.getMonth() + 3) / 3), //季度
          S: time.getMilliseconds() //毫秒
        }
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (time.getFullYear() + '').substr(4 - RegExp.$1.length)
          )
        for (var k in o)
          if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ('00' + o[k]).substr(('' + o[k]).length)
            )
        return fmt
      },
      emitInput(val) {
        this.$emit('input', val)
      },
      handleImageSuccess(file) {
        // this.emitInput(this.tempUrl)
      },
      beforeImageUpload(file) {
        return new Promise((resolve, reject) => {
          getToken().then(response => {
           this.dataObj=response.data;
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })


      },
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
