import { login, logout, autoLogin } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import websocketChat, { websocketMsgTemp, msgType } from '@/utils/websocketChat'
const websocketclient: websocketChat = new websocketChat()
const state = {
  token: getToken(),
  avatar: 'people',
  machineId: '',
  username: '',
  machineName: '',
  machinePwd: '',
  remoteMachines: [],
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_MachineId: (state, machineId) => {
    state.machineId = machineId
  },
  SET_Username: (state, nusernameame) => {
    state.nusernameame = nusernameame
  },
  SET_MachineName: (state, machineName) => {
    state.machineName = machineName
  },
  SET_MachinePwd: (state, machinePwd) => {
    state.machinePwd = machinePwd
  },
  Add_RemoteMachine: (state, machine) => {
    var index = state.remoteMachines.findIndex((o) => o.machineId == machine.machineId)
    if (index < 0) {
      state.remoteMachines.push(machine)
    }
  },
  Reduce_RemoteMachine: (state, machine) => {
    var index = state.remoteMachines.findIndex((o) => o.machineId == machine.machineId)
    state.remoteMachines.splice(index, 1)
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    var requdata = { username: username.trim(), pwd: password, machineType: 1 }

    return new Promise((resolve, reject) => {
      login(requdata)
        .then((response) => {
          const data = response
          // window.console.log('login成功', data)
          commit('SET_TOKEN', data)
          setToken(data)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    websocketclient.listenOnMessgae((data: websocketMsgTemp<any>) => {
      window.console.info('*******收到websocket消息', data)
      switch (data.msgType) {
        case msgType.system_onMachineOnline:
          commit('Add_RemoteMachine', data.content)
          break
        case msgType.system_onMachineDownline:
          commit('Reduce_RemoteMachine', data.content)
          break
        case msgType.system_onGetMyMachine:
          commit('Add_RemoteMachine', data.content)
          break
        case msgType.system_clientNotOnline:
          this.$message.warning('用户不在线,消息发送失败')
          break
      }
    })

    return new Promise((resolve, reject) => {
      autoLogin()
        .then((response) => {
          const data = response
          window.console.log('自动登录成功:', data)
          if (!data) {
            reject('验证失败,请重新登录.')
          }
          const { machineId, username, machineName, machinePwd } = data
          websocketChat.Initlize(state.token, machineId)

          commit('SET_MachineId', machineId)
          commit('SET_Username', username)
          commit('SET_MachineName', machineName)
          commit('SET_MachinePwd', machinePwd)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          resetRouter()
          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          dispatch('tagsView/delAllViews', null, { root: true })
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async (resolve) => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map basced on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
