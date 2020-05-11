<template>
  <div>
    <el-menu
      :default-active="activeName"
      @select="handleClick"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#000"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="index">首页</el-menu-item>
      <el-menu-item index="users">会员</el-menu-item>
      <el-menu-item index="goods">商品</el-menu-item>
      <el-menu-item index="orders">订单</el-menu-item>
      <el-menu-item index="minerals">挖矿卷</el-menu-item>
      <el-menu-item index="consume">消费券</el-menu-item>
      <el-menu-item index="settings">设置</el-menu-item>
      <el-menu-item index="apps">应用</el-menu-item>
    </el-menu>


  </div>

</template>

<script>

  export default {
    data() {
      return {
        activeName: this.$route.name
      }
    },
    methods: {
      handleClick(key, event) {
        this.$router.push({ name: key, query: { type: key } })

      }
    },
    created() {
      const pathname = window.location.hash
      const route = (pathname.split('/'))[1]
      this.activeName = route
    }
  }
</script>

<style lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;

    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }

  .el-menu-item {
    height: 50px;
    line-height: 50px;
  }
</style>
