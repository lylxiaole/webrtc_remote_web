import request from '@/utils/request'
import defaultSettings from '@/settings'

export function getMachaineById(machineId) {
  return request({
    url: defaultSettings.ApiServerAddress + 'api/machine/getMachaineById?machineId=' + machineId,
    method: 'get',
  })
}
