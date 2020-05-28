import request from '@/utils/request'

export function getMineralsStat(query) {
  return request({
    url: '/stat/mine',
    method: 'get',
    params: query
  })
}
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

export function deleteMineral(id,data) {
  return request({
    url: `/mine/product/${id}`,
    method: 'delete',
    data
  })
}

export function getAppeals(query) {
  return request({
    url: '/mine/appeal',
    method: 'get',
    params: query
  })
}

export function appealDistribute(id,data) {
  return request({
    url: `/mine/appeal/distribute/${id}`,
    method: 'post',
    data
  })
}

export function getAppoints(query) {
  return request({
    url: '/mine/appoint',
    method: 'get',
    params: query
  })
}
export function getTransfers(query) {
  return request({
    url: '/mine/transfer',
    method: 'get',
    params: query
  })
}
export function getPoints(query) {
  return request({
    url: '/mine/point',
    method: 'get',
    params: query
  })
}

export function postPoints(data) {
  return request({
    url: '/mine/point',
    method: 'post',
    data
  })
}

export function getExchanges(query) {
  return request({
    url: '/mine/exchange',
    method: 'get',
    params: query
  })
}

export function getHolds(query) {
  return request({
    url: '/mine/hold',
    method: 'get',
    params: query
  })
}

export function getRollouts(query) {
  return request({
    url: '/mine/rollout',
    method: 'get',
    params: query
  })
}

export function getFissions(query) {
  return request({
    url: '/mine/fission',
    method: 'get',
    params: query
  })
}

