import request from '@/frame_src/utils/request'
export function GetInfo(query) {
  return request({
    url: '/CBWZSP/GetInfo',
    method: 'get',
    params: query
  })
}

export function GetDetailInfo(query) {
  return request({
    url: '/CBWZSP/GetDetailInfo',
    method: 'get',
    params: query
  })
}

export function UpdateSFCW(query) {
  return request({
    url: '/CBWZSP/UpdateSFCW',
    method: 'get',
    params: query
  })
}

