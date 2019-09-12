import request from '@/frame_src/utils/request'
export function GetInfo(query) { 
    return request({
      url: '/SCJSCB/GetInfo',
      method: 'get',
      params: query
    })
  }

  export function GetDetailInfo(query) { 
    return request({
      url: '/SCJSCB/GetDetailInfo',
      method: 'get',
      params: query
    })
  }