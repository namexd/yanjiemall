<template>
  <div>
    <el-menu
      :default-active="activeName"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#000"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="index" @click="goHome()">首页</el-menu-item>
      <el-menu-item v-for="menu in parentMenu" :index="getName(menu.menu_url)" @click="handleClick(menu)">{{menu.menu_name}}</el-menu-item>
    </el-menu>
  </div>

</template>

<script>
  import { getMenus } from '../../api/menu'
  import { setMenu,getMenu } from '../../utils/auth'
  export default {
    data() {
      return {
        activeName: this.$route.name,
        parentMenu: getMenus()
      }
    },
    methods: {
      goHome(){
        this.$router.push({name:'index'})
      },
      handleClick(menu) {
        this.$router.push({ name: this.getName(menu.menu_url), query: { type: menu.id } })
      },
      getMenus(){
        const menus=JSON.parse(getMenu())
        this.parentMenu=menus
      },
      getName(path)
      {
        return (path.split('/'))[1]
      }
    },
    created() {
      this.getMenus();
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
