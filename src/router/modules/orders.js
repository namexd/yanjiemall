
import Layout from '@/layout'

const ordersRouters = {
  path: '/orders',
  component: Layout,
  redirect: '/orders/list/selling',
  meta: {
    title: '订单',
    icon: 'order'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/table/dynamic-table/index'),
      name: 'orders',
      meta: { title: '订单概览',icon: 'order_unread' }
    },
    {
      path: 'list',
      component: () => import('@/views/orders/list'),
      name: 'orderList',
      meta: { title: '订单管理',icon: '订单' },
      children:[
        {
          path: 'all',
          component: () => import('@/views/orders/list'),
          name: 'all',
          meta: { title: '全部订单',icon: 'list' }
        },
        {
          path: 'waitPay',
          component: () => import('@/views/orders/list'),
          name: 'waitPay',
          meta: { title: '待付款',icon: '待付款' }
        },
        {
          path: 'waitSend',
          component: () => import('@/views/orders/list'),
          name: 'waitSend',
          meta: { title: '待发货',icon: '待发货' }
        },
        {
          path: 'waitConfirm',
          component: () => import('@/views/orders/list'),
          name: 'waitConfirm',
          meta: { title: '待收货',icon: '待收货' }
        },
        {
          path: 'confirmed',
          component: () => import('@/views/orders/list'),
          name: 'confirmed',
          meta: { title: '已完成',icon: 'check surface' }
        },
        {
          path: 'closed',
          component: () => import('@/views/orders/list'),
          name: 'closed',
          meta: { title: '已关闭',icon: 'close' }
        },
        {
          path: 'refund',
          component: () => import('@/views/orders/list'),
          name: 'refund',
          meta: { title: '已退款',icon: '退款' }
        },

      ]
    },
    {
      path: 'detail',
      component: () => import('@/views/orders/detail'),
      name: 'orderDetail',
      hidden: true,
      meta: { title: '订单详情',icon: '退款' }
    },
    {
      path: 'dispute',
      component: () => import('@/views/orders/dispute'),
      name: 'dispute',
      meta: { title: '维权订单',icon: '消费维权' }
    },

  ]
}
export default ordersRouters
