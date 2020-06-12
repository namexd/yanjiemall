
import Layout from '@/layout'

const ordersRouters = {
  path: '/orders',
  component: Layout,
  redirect: '/orders/index',
  meta: {
    title: '订单',
    icon: 'order'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/orders/index'),
      name: 'orders',
      meta: { title: '订单概览',icon: 'order_unread' }
    },
    {
      path: 'list/all',
      component: () => import('@/views/orders/list/all'),
      name: 'orderAll',
      meta: { title: '全部订单',icon: 'list',keepAlive:true }
    },
    {
      path: 'list/waitPay',
      component: () => import('@/views/orders/list/waitPay'),
      name: 'waitPay',
      meta: { title: '待付款',icon: '待付款',keepAlive:true }
    },
    {
      path: 'list/waitSend',
      component: () => import('@/views/orders/list/waitSend'),
      name: 'waitSend',
      meta: { title: '待发货',icon: '待发货',keepAlive:true }
    },
    {
      path: 'list/waitConfirm',
      component: () => import('@/views/orders/list/waitConfirm'),
      name: 'waitConfirm',
      meta: { title: '待收货',icon: '待收货' ,keepAlive:true}
    },
    {
      path: 'list/confirmed',
      component: () => import('@/views/orders/list/confirmed'),
      name: 'confirmed',
      meta: { title: '已完成',icon: 'check surface' ,keepAlive:true}
    },
    {
      path: 'list/closed',
      component: () => import('@/views/orders/list/closed'),
      name: 'closed',
      meta: { title: '已关闭',icon: 'close',keepAlive:true }
    },
    {
      path: 'list/refund',
      component: () => import('@/views/orders/list/refund'),
      name: 'refund',
      meta: { title: '已退款',icon: '退款',keepAlive:true }
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
