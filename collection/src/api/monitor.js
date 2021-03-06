import fetch from '@/utils/fetch'



export function station(params) {
    return fetch({
      url: '/queueMission/getQueueMission2List',
      method: 'get',
      params: params
    })
}
export function queuetotal(params) {
    return fetch({
      url: '/queueMission/getQueueMissionList',
      method: 'get',
      params: params
    })
}
export function userstation(params) {
    return fetch({
      url: '/userstation',
      method: 'get',
      params: params
    })
}
export function userstotal(params) {
    return fetch({
      url: '/userMoitoring/list',
      method: 'get',
      params: params
    })
}
export function getsupervisor(params) {
    return fetch({
      url: '/queueMission/getQueueMissionListByDate',
      method: 'get',
      params: params
    })
}
export function getMissionListByUser(params){
    return fetch({
        url: '/userMoitoring/getMissionListByUser',
        method: 'get',
        params: params
    })
}
export function getMissionListByCOUser(params){
    return fetch({
        url: '/userMoitoring/getMissionListByCOUser',
        method: 'get',
        params: params
    })
}
export function getstation(params) {
    return fetch({
      url: '/getstation',
      method: 'get',
      params: params
    })
}
export function gethistory(params) {
    return fetch({
      url: '/gethistory',
      method: 'get',
      params: params
    })
}
export function ControlVehicle(params) {
    return fetch({
      url: '/osControlVehicle/list',
      method: 'get',
      params: params
    })
}
export function digitalExport(params) {
    return fetch({
      url: '/userMoitoring/digitalExport',
      method: 'get',
      params: params
    })
}