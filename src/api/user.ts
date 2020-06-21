import request from '@/utils/request'
import defaultSettings from '@/settings'

/**
 * data:{ username: uname, pwd: pwd, machineId: machineId }
 */
export function login(data) {
  return request({
    url: defaultSettings.ApiServerAddress + 'api/user/login',
    method: 'post',
    data,
  })
}

export function autoLogin() {
  return request({
    url: defaultSettings.ApiServerAddress + 'api/user/autoLogin',
    method: 'post',
  })
}

export function userRegister(data) {
  return request({
    url: defaultSettings.ApiServerAddress + '/api/register',
    method: 'post',
    data,
  })
}

export function getInfo(token) {
  return request({
    url: defaultSettings.ApiServerAddress + '/vue-element-admin/user/info',
    method: 'get',
    params: { token },
  })
}
export async function getAllPlays(): Promise<any[]> {
  return request({
    url: defaultSettings.ApiServerAddress + '/api/videoPlay/getAllPlays',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: defaultSettings.ApiServerAddress + '/vue-element-admin/user/logout',
    method: 'post',
  })
}
