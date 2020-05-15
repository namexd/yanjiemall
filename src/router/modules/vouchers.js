import Layout from '@/layout'

const vouchersRouters = {
  path: '/vouchers',
  component: Layout,
  redirect:'/vouchers/sales',
  name: 'vouchers',
  meta: {
    title: '消费券',
    icon: '消费券'
  },
  children: [
    {
      path: 'sales',
      component: () => import('@/views/vouchers/sale/index'),
      name: 'vouchersSale',
      meta: { title: '交易大厅', icon: '缴费大厅' },
    },
    {
      path: 'buy',
      component: () => import('@/views/vouchers/buy/index'),
      name: 'vouchersBuy',
      meta: { title: '交易记录', icon: '交易记录' }
    },
     {
      path: 'stat',
      component: () => import('@/views/vouchers/stat/index'),
      name: 'vouchersStat',
      meta: { title: '消费券价格', icon: '价格' }
    },


  ]
}
export default vouchersRouters
