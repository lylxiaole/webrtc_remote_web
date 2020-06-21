import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import Router from 'vue-router'

export enum routePaths {
  login = 'login',
  register = 'register',
  changePwd = 'changePwd',
  machineRemote = 'machineRemote',
  videoPlay = 'videoPlay',
  joinVideoPlay = 'joinVideoPlay',
  videoMeeting = 'videoMeeting',
}
export class RouterHelper {
  public static pushRouter(routePath: routePaths, params: any = {}, comp: Vue): void {
    comp.$router.push({ name: routePath, params: params })
  }

  public static getRouterParams(comp: Vue): any {
    return comp.$route.params
  }
}
