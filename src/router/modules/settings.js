import Layout from '@/layout'

const settingsRouters = {
  path: '/settings',
  component: Layout,
  redirect:'/settings/banners',
  name: 'settings',
  meta: {
    title: '设置',
    icon: '设置'
  },
  children: [
    {
      path: 'banners',
      component: () => import('@/views/settings/banners/list'),
      name: 'banners',
      meta: { title: '轮播图管理', icon: '轮播图管理' },
    },
    {
      path: 'navs',
      component: () => import('@/views/settings/navbars/index'),
      name: 'bannerNav',
      meta: { title: '导航管理', icon: '导航' }
    },
     {
      path: 'notice',
      component: () => import('@/views/settings/notice/list'),
      name: 'notice',
      meta: { title: '公告管理', icon: '公告' }
    },
    {
      path: 'config',
      component: () => import('@/views/settings/config/list'),
      name: 'config',
      meta: { title: '基础设置', icon: '设置' }
    },
    {
      path: 'trade',
      component: () => import('@/views/goods/category'),
      name: 'trade',
      meta: { title: '物流接口', icon: '物流' }
    },
    {
      path: 'pay',
      component: () => import('@/views/settings/pays/list'),
      name: 'pay',
      meta: { title: '支付管理', icon: '支付' }
    },
    {
      path: 'permission',
      component: () => import('@/views/settings/permission/list'),
      name: 'permission',
      meta: { title: '权限管理', icon: '权限' }
    },
    {
      path: 'permissionDetail',
      component: () => import('@/views/settings/permission/role'),
      name: 'permissionDetail',
      hidden:true,
      meta: { title: '编辑权限' }
    },
    {
      path: 'logs',
      component: () => import('@/views/settings/logs/index'),
      name: 'logs',
      meta: { title: '操作日志', icon: 'bug' }
    }

  ]
}
export default settingsRouters
