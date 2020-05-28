import request from '@/utils/request'

export function getMenus(query) {
  return request({
    url: '/menu',
    method: 'get',
    params:query
  })
}

