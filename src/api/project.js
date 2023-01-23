import request from '../utils/request'

// 项目列表
export function getProjectList(data) {
  return request({
    url: '/api/management/listProject',
    method: 'post',
    data
  })
}

// 获取数据集
export function getDataSets() {
  return request({
    url: '/api/management/listDataSets',
    method: 'GET'
  })
}

// 获取可用配置（检索模型）
export function getConfigs() {
  return request({
    url: '/api/management/listManagementConfig',
    method: 'get'
  })
}

// 上传文件
export function upload(data) {
  return request({
    url: '/api/management/file/upload',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 保存项目（草稿&建库）
export function saveProject(data) {
  return request({
    url: '/api/management/project/save',
    method: 'post',
    data
  })
}

// 获取项目详情
export function getProjecDetailById(id) {
  return request({
    url: '/api/management/project/get',
    method: 'post',
    data: {
      project_id: id
    }
  })
}
