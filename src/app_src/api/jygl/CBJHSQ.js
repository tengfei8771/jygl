import request from '@/frame_src/utils/request'
export function GetInfo(query) { // 查询用户
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