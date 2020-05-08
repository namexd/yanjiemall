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
    url: '/mock/151/user',
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
    url: `/user/black/${id}`,
    method: 'put',
  })
}
export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
