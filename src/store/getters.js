const getters = {
  sidebar: (state) => state.app.sidebar,
  size: (state) => state.app.size,
  device: (state) => state.app.device,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  token: (state) => state.user.token,
  machineId: (state) => state.user.machineId,
  username: (state) => state.user.username,
  machineName: (state) => state.user.machineName,
  machinePwd: (state) => state.user.machinePwd,
  remoteMachines: (state) => state.user.remoteMachines,

  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  introduction: (state) => state.user.introduction,
  roles: (state) => state.user.roles,
  permission_routes: (state) => state.permission.routes,
  errorLogs: (state) => state.errorLog.logs,
}
export default getters
