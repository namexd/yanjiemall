import Layout from '@/layout'

const mineralsRouters = {
  path: '/minerals',
  component: Layout,
  redirect:'/minerals/products',
  name: 'minerals',
  meta: {
    title: '挖矿券',
    icon: '挖矿'
  },
  children: [
    {
      path: 'products',
      component: () => import('@/views/minerals/product/list'),
      name: 'mineralsProducts',
      meta: { title: '挖矿券列表', icon: '挖矿2' },
    },
    {
      path: 'todaySale',
      component: () => import('@/views/minerals/product/list'),
      name: 'mineralsTodaySale',
      meta: { title: '今日出售', icon: '出售' }
    },
     {
      path: 'appoint',
      component: () => import('@/views/minerals/product/list'),
      name: 'mineralsAppoint',
      meta: { title: '预约列表', icon: '预约' }
    },
    {
      path: 'business',
      component: () => import('@/views/minerals/product/list'),
      name: 'mineralsBusiness',
      meta: { title: '交易管理', icon: '交易' }
    },
    {
      path: 'appeal',
      component: () => import('@/views/minerals/appeal/index'),
      name: 'mineralsAppeal',
      meta: { title: '申诉管理', icon: '申诉处理' }
    },
    {
      path: 'users',
      component: () => import('@/views/goods/category'),
      name: 'mineralsUsers',
      meta: { title: '持有中会员列表', icon: 'peoples' }
    },
    {
      path: 'outside',
      component: () => import('@/views/goods/category'),
      name: 'mineralsOutside',
      meta: { title: '转出记录', icon: '转出' }
    },
    {
      path: 'destroy',
      component: () => import('@/views/goods/category'),
      name: 'mineralsDestroy',
      meta: { title: '销毁的券', icon: '销毁' }
    },


  ]
}
export default mineralsRouters
