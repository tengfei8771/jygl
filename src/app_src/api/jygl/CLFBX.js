import request from '@/frame_src/utils/request'
export function GetInfo(query) {
  return request({
    url: '/TravelExpense/GetInfo',
    method: 'get',
    params: query
  })
}

export function GetCLXCInfo(query) {
  return request({
    url: '/TravelExpense/GetCLXCInfo',
    method: 'get',
    params: query
  })
}

export function CreateInfo(data) {
  return request({
    url: '/TravelExpense/CreateInfo',
    method: 'post',
    data
  })
}

export function UpdateInfo(data) {
  return request({
    url: '/TravelExpense/UpdateInfo',
    method: 'post',
    data
  })
}

export function DeleteInfo(query) {
  return request({
    url: '/TravelExpense/DeleteInfo',
    method: 'get',
    params:query
  })
}
export function DeleteXCInfo(query) {
  return request({
    url: '/TravelExpense/DeleteXCInfo',
    method: 'get',
    params:query
  })
}
