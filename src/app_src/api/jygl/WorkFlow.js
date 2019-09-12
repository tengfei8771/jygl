import request from '@/frame_src/utils/request'
// export function GetInfo(query) {
//   return request({
//     url: '/FYBX/GetInfo',
//     method: 'get',
//     params: query
//   })
// }

export function getStep(data) {
  return request({
    url: '/WorkFlow/getStep',
    method: 'post',
    data
  })
}
export function sendTask(data) {
  return request({
    url: '/WorkFlow/sendTask',
    method: 'post',
    data
  })
}
