<template>
  <div>
<!--      <el-breadcrumb class="app-breadcrumb" separator="/">-->
<!--        <transition-group name="breadcrumb">-->
<!--          <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">-->
<!--            <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>-->
<!--            <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>-->
<!--          </el-breadcrumb-item>-->
<!--        </transition-group>-->
<!--      </el-breadcrumb>-->
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
        this.$router.push({ name: key ,query:{type:key}})

      }
    },
    created() {
      const pathname = window.location.hash
      const route=(pathname.split('/'))[1]
      this.activeName= route
    }
  }
  // import * as pathToRegexp from 'path-to-regexp'
  //
  // export default {
  //   data() {
  //     return {
  //       levelList: null
  //     }
  //   },
  //   watch: {
  //     $route(route) {
  //       // if you go to the redirect page, do not update the breadcrumbs
  //       if (route.path.startsWith('/redirect/')) {
  //         return
  //       }
  //       this.getBreadcrumb()
  //     }
  //   },
  //   created() {
  //     this.getBreadcrumb()
  //   },
  //   methods: {
  //     getBreadcrumb() {
  //       // only show routes with meta.title
  //       let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
  //       const first = matched[0]
  //
  //       if (!this.isDashboard(first)) {
  //         matched = [{ path: '/index', meta: { title: '首页' }}].concat(matched)
  //       }
  //
  //       this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
  //     },
  //     isDashboard(route) {
  //       const name = route && route.name
  //       if (!name) {
  //         return false
  //       }
  //       return name.trim().toLocaleLowerCase() === 'index'.toLocaleLowerCase()
  //     },
  //     pathCompile(path) {
  //       // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
  //       const { params } = this.$route
  //       var toPath = pathToRegexp.compile(path)
  //       return toPath(params)
  //     },
  //     handleLink(item) {
  //       const { redirect, path } = item
  //       if (redirect) {
  //         this.$router.push(redirect)
  //         return
  //       }
  //       this.$router.push(this.pathCompile(path))
  //     }
  //   }
  // }
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

  .el-menu-item{
    height: 50px;
    line-height: 50px;
  }
</style>
