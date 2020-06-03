import request from '@/utils/request'

export function getBanners(query) {
  return request({
    url: '/slide',
    method: 'get',
    params:query
  })
}
export function updateBanner(id,data) {
  return request({
    url: `/slide/${id}`,
    method: 'put',
    data
  })
}
export function addBanner(data) {
  return request({
    url: '/slide',
    method: 'post',
    data
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
export function getPays(query) {
  return request({
    url: '/config-pay',
    method: 'get',
    params:query
  })
}
export function updatePay(id,data) {
  return request({
    url: `/config-pay/${id}`,
    method: 'put',
    data
  })
}
export function changePay(id) {
  return request({
    url: `/config-pay/${id}/show`,
    method: 'put',
  })
}
export function addPay(data) {
  return request({
    url: '/config-pay',
    method: 'post',
    data
  })
}
export function showPay(id) {
  return request({
    url: `/config-pay/${id}`,
    method: 'get',
  })
}
export function deletePay(id) {
  return request({
    url: `/config-pay/${id}`,
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
export function updateConfigLevel(data) {
  return request({
    url: '/config/level',
    method: 'put',
    data
  })
}
export function updateConfigPromoter(data) {
  return request({
    url: '/config/promoter',
    method: 'put',
    data
  })
}

export function updateConfigSeat(data) {
  return request({
    url: '/config/seat',
    method: 'put',
    data
  })
}

export function getAdminRules(id) {
  return request({
    url: `/admin/${id}/rule`,
    method: 'get',
  })
}
export function updateAdminRules(id,data) {
  return request({
    url: `/admin/${id}/rule`,
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

export function getOptLogs(query) {
  return request({
    url: '/oplog',
    method: 'get',
    params:query
  })
}
