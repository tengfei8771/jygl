import request from '@/frame_src/utils/request'
export function GetInfo(query) { 
    return request({
      url: '/CBJHSQ/GetInfo',
      method: 'get',
      params: query
    })
  }

  export function GetDetailInfo(query) { 
    return request({
      url: '/CBJHSQ/GetDetailInfo',
      method: 'get',
      params: query
    })
  }