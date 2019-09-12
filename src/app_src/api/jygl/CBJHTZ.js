import request from '@/frame_src/utils/request'
export function GetTZInfo(query) {
  return request({
    url: '/CBJHTZ/GetInfo',
    method: 'get',
    params: query
  })
}

export function CreateInfo(data) {
  return request({
    url: '/CBJHTZ/CreateInfo',
    method: 'post',
    data
  })
}
export function UpdateInfo(data) {
  return request({
    url: '/CBJHTZ/UpdateInfo',
    method: 'post',
    data
  })
}
// export function DeleteInfo(data) {
//   return request({
//     url: '/FYBX/DeleteInfo',
//     method: 'post',
//     data
//   })
// }
export function GetOpions(query) {
  return request({
    url: '/Dictionary/GetOptions',
    method: 'get',
    params: query
  })
}
