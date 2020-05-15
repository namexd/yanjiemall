<template>
  <el-page-header @back="goBack" :content="detail" style="margin-bottom: 20px">
  </el-page-header>
</template>

<script>
export default {
  name: 'BackToPrev',
  props: {
    detail: {
      type: String,
      default: '详情'
    }
  },
  data() {
    return {
    }
  },
  methods: {
    goBack()
    {
      this.$router.back()
    }
  }
}
</script>

