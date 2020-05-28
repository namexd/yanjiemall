import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}
export function getUsersIndex() {
  return request({
    url: '/stat/user',
    method: 'get',
  })
}
export function getUsers(query) {
  return request({
    url: '/user',
    method: 'get',
    params: query
  })
}
export function getUser(id) {
  return request({
    url: `/user/${id}`,
    method: 'get',
  })
}
export function getUserRelations(id,query) {
  return request({
    url: `/user/${id}/relation`,
    method: 'get',
    params: query
  })
}

export function userBlack(id) {
  return request({
    url: `/user/${id}/black`,
    method: 'put',
  })
}

export function addMine(id,data) {
  return request({
    url:  `/user/${id}/mine`,
    method: 'post',
    data
  })
}
export function addGold(id,data) {
  return request({
    url:  `/user/${id}/goldcoin`,
    method: 'put',
    data
  })
}
export function addVoucher(id,data) {
  return request({
    url:  `/user/${id}/voucher`,
    method: 'put',
    data
  })
}
export function getUserMines(id,query) {
  return request({
    url:  `/user/${id}/mine`,
    method: 'get',
    params: query
  })
}
