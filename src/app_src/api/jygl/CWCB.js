import request from '@/frame_src/utils/request'
export function GetInfo(query) {
  return request({
    url: '/CWCB/GetInfo',
    method: 'get',
    params: query
  })
}

export function GetDetailInfo(query) {
  return request({
    url: '/CWCB/GetDetailInfo',
    method: 'get',
    params: query
  })
}