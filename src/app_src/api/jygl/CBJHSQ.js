import request from '@/frame_src/utils/request'
export function GetInfo(query) {
  return request({
    url: '/CBJHSQ/GetInfo',
    method: 'get',
    params: query
  })
}

export function CreateInfo(data) {
  return request({
    url: '/CBJHSQ/CreateInfo',
    method: 'post',
    data
  })
}
export function UpdateInfo(data) {
  return request({
    url: '/CBJHSQ/UpdateInfo',
    method: 'post',
    data
  })
}
export function DeleteInfo(data) {
  return request({
    url: '/CBJHSQ/DeleteInfo',
    method: 'post',
    data
  })
}
export function GetDetailInfo(query) {
  return request({
    url: '/CBJHSQ/GetDetailInfo',
    method: 'get',
    params: query
  })
}

export function DeleteDetailInfo(query) {
  return request({
    url: '/CBJHSQ/DeleteDetailInfo',
    method: 'get',
    params: query
  })
}

export function GetOptions(query) {
  return request({
    url: '/Dictionary/GetOptions',
    method: 'get',
    params: query
  })
}

export function GetTreeOptions(query) {
  return request({
    url: '/CBJHSQ/GetTreeOptions',
    method: 'get',
    params: query
  })
}

export function GetYearProject(query) {
  return request({
    url: '/CBJHSQ/GetYearProject',
    method: 'get',
    params: query
  })
}

export function UpdateAddCBJHJE(data) {
  return request({
    url: '/CBJHSQ/UpdateAddCBJHJE',
    method: 'post',
    data
  })
}

export function UpdateDesCBJHJE(data) {
  return request({
    url: '/CBJHSQ/UpdateDesCBJHJE',
    method: 'post',
    data
  })
}