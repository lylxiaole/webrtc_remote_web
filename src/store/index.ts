import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.(js|ts)$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters,
})

export default store

export class VuexStore {
  public static InitStates(comp: Vue) {
    // comp.$store.dispatch(types.INITSTATES)
  }
  public static setToken(token: any, comp: Vue): void {
    // comp.$store.dispatch(types.SET_TOKEN, token)
  }

  public static getToken(): string {
    return localStorage.getItem('token')
  }

  public static setMachineInfo(machineInfo: any, comp: Vue) {
    // comp.$store.dispatch(types.SET_MACHINEINFO, machineInfo)
  }

  public static getMachineInfo(comp: Vue) {
    return comp.$store.state.machineInfo
  }
}
