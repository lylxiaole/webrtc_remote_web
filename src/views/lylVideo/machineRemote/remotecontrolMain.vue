<template>
  <el-row style="position:absolute;top:0px;bottom:0px;left:0px;right:0px">
    <el-col :span="7" style="padding:8px;">
      <el-row class="flexHorilanLayout">
        <span style="fontSize:28px;fontWeight:bold;">我的设备列表</span>
      </el-row>
      <el-row v-for="machine in remoteMachines" :key="machine.machineId" class="flexHorilanLayout" style="margin-top:20px;">
        <el-col :span="20">
          <div class="flexHorilanLayout"> {{machine.machineName}}</div>
        </el-col>
        <el-col :span="4">
          <el-button @click="connectRemoteMachine(machine.machineId)" type="primary" icon="el-icon-monitor" size="mini" circle></el-button>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="17" class="flexHorilanLayout" style="border-left:1px solid #eee;height:100%">
      <el-card class="flexHorilanLayout" :body-style="{ padding: '0px' }" style="width:250px;height:300px;margin-top:3%;margin-right:18px">
        <div style="padding: 14px;width:100%">
          <span style="fontSize:25px;fontWeight:bold;width:100%" class="flexHorilanLayout">当前设备</span>
          <div class="bottom clearfix" style="margin-top:12px">
            <span>当前是网页端,不能被控制。但是可以控制其它设备。</span>
          </div>
        </div>
      </el-card>
      <el-card class="flexHorilanLayout" :body-style="{ padding: '0px' }" style="width:250px;height:300px;margin-top:3%">
        <div style="padding: 14px;">
          <span style="fontSize:25px;fontWeight:bold;width:100%" class="flexHorilanLayout">远程设备</span>
          <el-row class="bottom clearfix" style="margin-top:12px">
            <el-col :span="24">
              <span>远程设备ID:</span>
            </el-col>
            <el-col :span="24" style="margin-top:12px">
              <el-input placeholder="请输入远程设备ID" clearable size="mini" />
            </el-col>
            <el-col :span="24" style="margin-top:12px" class="flexHorilanLayout">
              <el-button type="primary" size="mini">开始连接</el-button>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>
  </el-row>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import settings from '@/settings'
import websocketChat, { websocketMsgTemp, msgType } from '@/utils/websocketChat'
import Peerconnection from '@/utils/peerconnection'
import { RouterHelper, routePaths } from '@/router'

@Component({ name: 'remotecontrolMain' })
export default class remotecontrolMain extends Vue {
  private get remoteMachines(): any[] {
    //排除web端得设备
    return this.$store.state.user.remoteMachines.filter((o) => o.machineType != 1)
  }
  mounted() {}

  destroyed() {
    window.console.log('*****远程协调页面销毁了')
  }
  private connectRemoteMachine(machineId: string) {
    var machine = this.remoteMachines.find((o) => o.machineId == machineId)
    RouterHelper.pushRouter(routePaths.machineRemote, machine, this)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
