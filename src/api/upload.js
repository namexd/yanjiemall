import request from '@/utils/request'

export function getToken() {
  return request({
    url: '/upload/baidu',
    method: 'post'
  })
}

export function postObject(url,data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}

