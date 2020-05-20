import Layout from '@/layout'

const appsRouters = {
  path: '/apps',
  component: Layout,
  redirect:'/apps/index',
  meta: {
    title: '应用',
    icon: '应用'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/apps/index'),
      name: 'apps',
      hidden:true,
      meta: { title: '应用',icon: '应用' }
    },
    {
      path: 'teamBonus',
      component: () => import('@/views/settings/banners/list'),
      name: 'teamBonus ',
      meta: { title: '团队分红', icon: '分红' },
      children:[
        {
          path: 'bonus_leader',
          component: () => import('@/views/table/inline-edit-table'),
          name: 'bonusLeaders',
          meta: { title: '队长列表',icon: '列表' }
        },
        {
          path: 'bonus_orders',
          component: () => import('@/views/table/inline-edit-table'),
          name: 'bonusOrders',
          meta: { title: '分红订单',icon: '订单' }
        },
        {
          path: 'bonus_config',
          component: () => import('@/views/table/inline-edit-table'),
          name: 'bonusConfig',
          meta: { title: '分红设置',icon: '设置' }
        },
      ]
    },
    {
      path: 'distribution',
      component: () => import('@/views/apps/distribution/index'),
      name: 'distribution ',
      meta: { title: '分销', icon: '分销' },
      children:[
        {
          path: 'distribution_list',
          component: () => import('@/views/apps/promoter/list'),
          name: 'distributionList',
          meta: { title: '分销商列表',icon: '列表' }
        },
        {
          path: 'distribution_orders',
          component: () => import('@/views/table/inline-edit-table'),
          name: 'distributionOrders',
          meta: { title: '分销订单',icon: '订单' }
        },
        {
          path: 'distribution_level',
          component: () => import('@/views/apps/promoter/level'),
          name: 'distributionLevel',
          meta: { title: '分销商等级',icon: '设置' }
        },
        {
          path: 'balance',
          component: () => import('@/views/apps/balance/list'),
          name: 'balance',
          meta: { title: '提现管理',icon: '提现' },
        },
        {
          path: 'balance_detail',
          component: () => import('@/views/apps/balance/detail'),
          name: 'balanceDetail',
          hidden:true,
          meta: { title: '提现申请详情',icon: '提现' },
        },
        {
          path: 'distribution_config',
          component: () => import('@/views/apps/distribution/config'),
          name: 'distributionConfig',
          meta: { title: '分销设置',icon: '设置' }
        },
      ]
    },

  ]
}
export default appsRouters
