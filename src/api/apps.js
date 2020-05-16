import request from '@/utils/request'

export function getBalances(query) {
  return request({
    url: '/user/balance',
    method: 'get',
    params:query
  })
}
export function balancesAgree(id) {
  return request({
    url: `/user/balance/${id}/agree`,
    method: 'put',
  })
}
export function balancesRefuse(id) {
  return request({
    url: `/user/balance/${id}/refuse`,
    method: 'put',
  })
}
export function getBalance(id) {
  return request({
    url: `/user/balance/${id}`,
    method: 'get',
  })
}
export function showBanner(id) {
  return request({
    url: `/slide/${id}`,
    method: 'get',
  })
}
export function deleteBanner(id) {
  return request({
    url: `/slide/${id}`,
    method: 'delete',
  })
}

export function getNav(query) {
  return request({
    url: '/goods/index',
    method: 'get',
    params:query
  })
}
export function updateNav(id,data) {
  return request({
    url: `/goods/index/${id}`,
    method: 'put',
    data
  })
}
export function addNav(data) {
  return request({
    url: '/goods/index',
    method: 'post',
    data
  })
}
export function showNav(id) {
  return request({
    url: `/goods/index/${id}`,
    method: 'get',
  })
}
export function deleteNav(id) {
  return request({
    url: `/goods/index/${id}`,
    method: 'delete',
  })
}

export function getNotices(query) {
  return request({
    url: '/notice',
    method: 'get',
    params:query
  })
}
export function updateNotice(id,data) {
  return request({
    url: `/notice/${id}`,
    method: 'put',
    data
  })
}
export function addNotice(data) {
  return request({
    url: '/notice',
    method: 'post',
    data
  })
}
export function showNotice(id) {
  return request({
    url: `/notice/${id}`,
    method: 'get',
  })
}
export function deleteNotice(id) {
  return request({
    url: `/notice/${id}`,
    method: 'delete',
  })
}
export function getConfigs() {
  return request({
    url: '/config',
    method: 'get',
  })
}
export function updateConfig(id,data) {
  return request({
    url: `/notice/${id}`,
    method: 'put',
    data
  })
}

export function getAdmins(query) {
  return request({
    url: '/admin',
    method: 'get',
    params:query
  })
}
export function updateAdmin(id,data) {
  return request({
    url: `/admin/${id}`,
    method: 'put',
    data
  })
}
export function addAdmin(data) {
  return request({
    url: '/admin',
    method: 'post',
    data
  })
}
export function showAdmin(id) {
  return request({
    url: `/admin/${id}`,
    method: 'get',
  })
}
export function deleteAdmin(id) {
  return request({
    url: `/admin/${id}`,
    method: 'delete',
  })
}
