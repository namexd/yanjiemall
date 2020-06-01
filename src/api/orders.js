import request from '@/utils/request'

export function getOrderStat() {
  return request({
    url: '/stat/order',
    method: 'get',
  })
}
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
export function getOrderPrice(id) {
  return request({
    url: `/order/change/${id}`,
    method: 'get',
  })
}

export function putOrderPrice(id,data) {
  return request({
    url: `/order/change/${id}`,
    method: 'put',
    data
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


export function getExpress() {
  return request({
    url: '/express',
    method: 'get',
  })
}
