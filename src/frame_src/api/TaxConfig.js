import request from '@/frame_src/utils/request'
export function getLeftTree(query) { // 查询用户
  return request({
    url: '/Dictionary/getLeftTree',
    method: 'get',
    params: query
  })
}

export function editNode(data){
    return request({
        url:'/Dictionary/editNode',
        method:'post',
        data
    })
}

export function createNode(data){
  return request({
      url:'/Dictionary/createNode',
      method:'post',
      data
  })
}

export function delNode(data){
  return request({
      url:'/Dictionary/delNode',
      method:'post',
      data
  })
}