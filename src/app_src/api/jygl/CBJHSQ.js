import request from '@/frame_src/utils/request'
export function GetInfo(query) { // 查询用户
  return request({
    url: '/CBJHSQ/GetInfo',
    method: 'get',
    params: query
  })
}
export function CreateInfo(data) { // 查询登陆账号对应的用户
  return request({
    url: '/CBJHSQ/CreateInfo',
    method: 'post',
    data
  })
}
export function UpdateInfo(data) { // 查询登陆账号对应的用户
    return request({
      url: '/CBJHSQ/UpdateInfo',
      method: 'post',
      data
    })
  }
  export function DeleteInfo(data) { // 查询登陆账号对应的用户
    return request({
      url: '/CBJHSQ/DeleteInfo',
      method: 'post',
      data
    })
  }
