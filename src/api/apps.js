import request from '@/utils/request'

export function getBalances(query) {
  return request({
    url: '/user-balance',
    method: 'get',
    params: query
  })
}

export function balancesAgree(id) {
  return request({
    url: `/user-balance/${id}/agree`,
    method: 'put'
  })
}

export function balancesRefuse(id) {
  return request({
    url: `/user-balance/${id}/refuse`,
    method: 'put'
  })
}

export function getBalance(id) {
  return request({
    url: `/user-balance/${id}`,
    method: 'get'
  })
}

export function getPromoterLevels(query) {
  return request({
    url: '/promoter/level',
    method: 'get',
    params: query
  })
}

export function getPromoterLevel(id) {
  return request({
    url: `/promoter/level/${id}`,
    method: 'get'
  })
}

export function getPromoters(query) {
  return request({
    url: '/promoter/index',
    method: 'get',
    params: query
  })
}

export function getPromoterOrders() {
  return request({
    url: '/promoter/order',
    method: 'get'
  })
}
export function getPromoterOrder(id,query) {
  return request({
    url: `/promoter/${id}/order`,
    method: 'get',
    params:query
  })
}
export function getPromoterConfig(id) {
  return request({
    url: '/config/promoter',
    method: 'get'
  })
}

export function showPromoter(id) {
  return request({
    url: `/promoter/level/show/${id}`,
    method: 'put'
  })
}

export function updatePromoter(id, data) {
  return request({
    url: `/promoter/level/${id}`,
    method: 'put',
    data
  })
}
export function getTeamsStat() {
  return request({
    url: '/stat/team',
    method: 'get',
  })
}export function getDistributionStat() {
  return request({
    url: '/stat/distribution',
    method: 'get',
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
    method: 'get'
  })
}

export function deleteNav(id) {
  return request({
    url: `/goods/index/${id}`,
    method: 'delete'
  })
}

export function getNotices(query) {
  return request({
    url: '/notice',
    method: 'get',
    params: query
  })
}

export function updateNotice(id, data) {
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
    method: 'get'
  })
}

export function deleteNotice(id) {
  return request({
    url: `/notice/${id}`,
    method: 'delete'
  })
}


export function updateConfig(id, data) {
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
    params: query
  })
}

export function updateAdmin(id, data) {
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
    method: 'get'
  })
}

export function deleteAdmin(id) {
  return request({
    url: `/admin/${id}`,
    method: 'delete'
  })
}
