
import baiducloud from '@baiducloud/bos-uploader'

export default function Client(data) {
  return new baiducloud.bos.Uploader({
    browse_button: '#file',
    bos_bucket: 'yanjiemall',
    bos_endpoint:data.endpoint,
    bos_ak:data.accessKeyId,
    bos_sk:data.secretAccessKey,
    // uptoken:data.sessionToken,
    max_file_size: '1Gb',
    auto_start:true,
    init: {
      FileUploaded: function (_, file, info) {
        console.log(file)
        console.log(info)
      },
      UploadComplete: function() {
        console.log(2122)

      }
    }
    // init: {
    //   FilesAdded: function(_, files) {
    //     _this.isDasabled = true;
    //     let ext = getFileExtension(files[files.length-1]).toLowerCase();
    //     if(ext && _this.fileType.indexOf(ext) == -1) {
    //       _this.$Message.info('仅支持'+_this.fileType+"格式的文件");
    //       _this.uploader.remove(files[files.length-1].uuid);
    //     } else {
    //       _this.fileUuid = files[files.length-1].uuid;
    //       let time = new Date().format('yyyy-MM-dd h:m:s');
    //       _this.uploading = true;
    //       if(time > _this.tokenTime) {
    //         getASk(_this.uploader, _this);
    //       } else {
    //         _this.uploader.start()
    //       }
    //     }
    //   },
    //   PostInit: function () {
    //     // uploader 初始化完毕之后，调用这个函数
    //   },
    //
    //   // 文件上传成功后，调用这个函数
    //   FileUploaded: function(_, file, info) {
    //     _this.isDasabled = false;
    //     //文件上传成功后
    //     let enclosureList = {};
    //     _this.fileUuid = '';
    //     file.__done(file, info, _this,enclosureList);
    //     if(file.__mediaId){
    //       enclosureList.baiduCloud = file.__mediaId;
    //       _this.__mediaId = file.__mediaId;
    //     }
    //     enclosureList.enclosureName = file.name;
    //     enclosureList.enclosureSize = file.size;
    //     enclosureList.belongType = "1",
    //       enclosureList.enclosureState = "0";
    //     _this.formValidate.enclosureList.push(enclosureList);
    //     _this.formValidate.catalogName = file.name;
    //     _this.uploading = false;
    //     _this.$set(_this, "percent",0);
    //     _this.$refs.file.value="";
    //   },
    //
    // }
  });
}
