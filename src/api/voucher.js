import request from '@/utils/request'

export function getVoucherStat() {
  return request({
    url: '/stat/voucher',
    method: 'get',
  })
}
export function getSales(query) {
  return request({
    url: '/voucher/sale',
    method: 'get',
    params: query
  })
}
export function getBuys(query) {
  return request({
    url: '/voucher/buy',
    method: 'get',
    params: query
  })
}
export function getStats(query) {
  return request({
    url: '/voucher/stat',
    method: 'get',
    params: query
  })
}
export function updateStat(data) {
  return request({
    url: '/voucher/stat',
    method: 'put',
    data
  })
}

