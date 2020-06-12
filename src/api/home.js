import request from '@/utils/request'

export function getStats() {
  return request({
    url: '/stat/index',
    method: 'get'
  })
}
