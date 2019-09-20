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
export function sendFlow(data) {
  return request({
    url: '/WorkFlow/sendFlow',
    method: 'post',
    data
  })
}

export function executeFlow(data) {
  return request({
    url: '/WorkFlow/executeFlow',
    method: 'post',
    data
  })
}

export function backFlow(data) {
  return request({
    url: '/WorkFlow/backFlow',
    method: 'post',
    data
  })
}

export function revokeFlow(data) {
  return request({
    url: '/WorkFlow/revokeFlow',
    method: 'post',
    data
  })
}
