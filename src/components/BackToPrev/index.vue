<template>
  <el-page-header @back="goBack" :content="detail"  style="margin-bottom: 20px">
  </el-page-header>
</template>

<script>
export default {
  name: 'BackToPrev',
  props: {
    detail: {
      type: String,
      default: '详情'
    } ,
    pathName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  methods: {
    goBack()
    {
      if (this.pathName!=='')
      this.$router.push({name:this.pathName})
      else this.$router.back()
    }
  }
}
</script>

