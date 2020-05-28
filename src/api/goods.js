import request from '@/utils/request'

export function getGoods(query) {
  return request({
    url: '/goods',
    method: 'get',
    params: query
  })
}
export function getGood(id) {
  return request({
    url: `/goods/${id}`,
    method: 'get',
  })
}
export function showGoods(id) {
  return request({
    url: `/goods/show/${id}`,
    method: 'put',
  })
}

export function sortGoods(id,data) {
  return request({
    url: `/goods/sort/${id}`,
    method: 'put',
    data
  })
}

export function updateGoods(id,data) {
  return request({
    url: `/goods/${id}`,
    method: 'put',
    data
  })
}
export function addGoods(data) {
  return request({
    url: '/goods',
    method: 'post',
    data
  })
}
export function getGoodsCategory() {
  return request({
    url: '/goods/category',
    method: 'get',
  })
}

export function updateGoodsCategory(id,data) {
  return request({
    url: `/goods/category/${id}`,
    method: 'put',
    data
  })
}

export function showGoodsCategory(id) {
  return request({
    url: `/goods/category/show/${id}`,
    method: 'put',
  })
}

export function categoryUpdown(id,data) {
  return request({
    url: `/goods/category/updown/${id}`,
    method: 'put',
    data
  })
}

export function addGoodsCategory(data) {
  return request({
    url: '/goods/category',
    method: 'post',
    data
  })
}

export function deleteGoodsCategory(id) {
  return request({
    url: `/goods/category/${id}`,
    method: 'delete'
  })
}

export function deleteGoods(id) {
  return request({
    url: `/goods/${id}`,
    method: 'delete'
  })
}
export function getGoodModules() {
  return request({
    url: '/goods/index/modules',
    method: 'get'
  })
}
