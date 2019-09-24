import request from '@/frame_src/utils/request'
export function GetInfo(query) {
  return request({
    url: '/FYBX/GetInfo',
    method: 'get',
    params: query
  })
}

export function CreateInfo(data) {
  return request({
    url: '/FYBX/CreateInfo',
    method: 'post',
    data
  })
}
export function UpdateInfo(data) {
  return request({
    url: '/FYBX/UpdateInfo',
    method: 'post',
    data
  })
}
export function DeleteInfo(data) {
  return request({
    url: '/FYBX/DeleteInfo',
    method: 'post',
    data
  })
}
export function GetOpions(query) {
  return request({
    url: '/Dictionary/GetOptions',
    method: 'get',
    params: query
  })
}
export function GetFYSPInfo(query) { 
  return request({
    url: '/FYBX/GetFYSPInfo',
    method: 'get',
    params: query
  })
}
export function GetFYYBInfo(query) { 
  return request({
    url: '/FYBX/GetFYYBInfo',
    method: 'get',
    params: query
  })
}
