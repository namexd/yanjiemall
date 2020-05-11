<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
        background-color="#000"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import { goodsRouter, ordersRouter, settingsRouter, usersRouter } from '../../../router'
import Layout from '@/layout'

const DefaultRoutes=[
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/dashboard/index'),
        name: 'index',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }]
export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      // 'permission_routes',
      'sidebar'
    ]),

    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data() {
    return{
      routes:[],
      DefaultRoutes
    }
  },
  methods: {
    setNav(val){
      switch (val) {
        case 'index':
          this.routes = DefaultRoutes
          break
          case 'users':
          this.routes = usersRouter
          break
        case 'goods':
          this.routes = goodsRouter
          break
        case 'orders':
          this.routes = ordersRouter
          break
        case 'settings':
          this.routes = settingsRouter
          break
      }
    }
  },
  created(){
    const pathname = window.location.hash
    const route=(pathname.split('/'))[1]
    this.setNav(route);
  },
  watch:{
    $route: {
      handler: function(val, oldVal){
        this.setNav(val.query.type);
      },
      // 深度观察监听
      deep: true
    }
  }
}
</script>
