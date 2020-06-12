import Layout from '@/layout'

const goodsRouters = {
  path: '/goods',
  component: Layout,
  redirect: '/goods/list/selling',
  name:'goods',
  meta: {
    title: '商品',
    icon: '商品'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/goods/index'),
      name: 'goodsList',
      meta: { title: '商品管理', icon: '商品2' },
      children: [
        {
          path: 'selling',
          component: () => import('@/views/goods/selling'),
          name: 'selling',
          meta: { title: '出售中', icon: 'tree' }
        },
        {
          path: 'selled',
          component: () => import('@/views/goods/selled'),
          name: 'selled',
          meta: { title: '已售罄', icon: 'star' }
        },
        {
          path: 'repertory',
          component: () => import('@/views/goods/repertory'),
          name: 'repertory',
          meta: { title: '仓库中', icon: 'shopping' }
        }
      ]
    },
    {
      path: 'category',
      component: () => import('@/views/goods/category'),
      name: '商品分类',
      meta: { title: '商品分类', icon: 'tree' }
    }

  ]
}
export default goodsRouters
