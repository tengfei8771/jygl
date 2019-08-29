import request from '@/frame_src/utils/request'
export function GetInfo(query) {
  return request({
    url: '/TravelExpense/GetInfo',
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