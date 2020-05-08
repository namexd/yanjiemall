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
export function closeOrder(id) {
  return request({
    url: `/orders/close/${id}`,
    method: 'post',
  })
}

export function expressOrder(id,data) {
  return request({
    url: `/order/express/${id}`,
    method: 'post',
    data
  })
}
