import request from '@/utils/request'

export function getOrders(query) {
  return request({
    url: '/order',
    method: 'get',
    params: query
  })
}
export function getOrder(id) {
  return request({
    url: `/order/${id}`,
    method: 'get',
  })
}
export function closeOrder(id,data) {
  return request({
    url: `/order/close/${id}`,
    method: 'put',
    data
  })
}

export function expressOrder(id,data) {
  return request({
    url: `/order/express/${id}`,
    method: 'post',
    data
  })
}
