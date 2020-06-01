<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse"/>
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
        <sidebar-item v-for="route in routes" :key="route.id" :item="route" :base-path="route.menu_url"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Logo from './Logo'
  import SidebarItem from './SidebarItem'
  import variables from '@/styles/variables.scss'
  import Layout from '@/layout'
  import { getMenu } from '../../../utils/auth'

  const DefaultRoutes = [
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
      return {
        routes: []
      }
    },
    methods: {
      setNav(val) {
        let menus = JSON.parse(getMenu())
        let subMenus = menus.filter(item => item.id == parseInt(val))
        this.routes = subMenus[0].child
      }
    },
    created() {
      this.setNav(this.$route.query.type)
    },
    watch: {
      $route: {
        handler: function(val, oldVal) {
          if (val.query.type) {
            this.setNav(val.query.type)
          }
          if (val.name == 'index') {
            this.routes = []
          }
        },
        // 深度观察监听
        deep: true
      }
    }
  }
</script>
