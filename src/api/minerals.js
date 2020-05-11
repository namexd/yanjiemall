import request from '@/utils/request'

export function getMinerals(query) {
  return request({
    url: '/mine/product',
    method: 'get',
    params: query
  })
}
export function getMineral(id) {
  return request({
    url: `/mine/product/${id}`,
    method: 'get',
  })
}

export function updateMineral(id,data) {
  return request({
    url: `/mine/product/${id}`,
    method: 'put',
    data
  })
}
export function addMineral(data) {
  return request({
    url: '/mine/product',
    method: 'post',
    data
  })
}

export function deleteMineral(id) {
  return request({
    url: `/mine/product/${id}`,
    method: 'delete'
  })
}

export function getAppeals(query) {
  return request({
    url: '/mine/appeal',
    method: 'get',
    params: query
  })
}
