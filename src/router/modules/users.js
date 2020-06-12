/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const usersRouters = {
  path: '/users',
  component: Layout,
  redirect: '/users/index',
  name: 'users',
  meta: {
    title: '会员',
    icon: 'peoples'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/users/index'),
      name: 'userIndex',
      meta: { title: '会员概览',icon: 'list' }
    },
    {
      path: 'list',
      component: () => import('@/views/users/list'),
      name: 'usersList',
      meta: { title: '会员管理',icon: 'tree',keepAlive:true }
    },
    {
      path: 'level',
      component: () => import('@/views/users/level'),
      name: 'usersLevel',
      meta: { title: '会员等级',icon: 'star' }
    },
    {
      path: 'warning',
      component: () => import('@/views/users/risk'),
      name: 'usersWarning',
      meta: { title: '风险会员',icon: 'lock' }
    },
    {
      path: 'detail',
      component: () => import('@/views/users/detail'),
      name: 'usersDetail',
      hidden:true,
      meta: { title: '用户详情',icon: 'lock' }
    },
    {
      path: 'orders',
      component: () => import('@/views/users/orders'),
      name: 'userOrders',
      hidden:true,
      meta: { title: '用户订单',icon: 'lock' }
    },
    {
      path: 'relations',
      component: () => import('@/views/users/relation'),
      name: 'usersRelations',
      hidden:true,
      meta: { title: '下线列表',icon: 'lock' }

    }
  ]
}
export default usersRouters
