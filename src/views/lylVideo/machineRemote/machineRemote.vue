<template>
  <el-row>
    <el-col :span="4" style="padding:8px 2px">
      <el-row v-for="conn in peerConnections" :key="conn.remoteMachineId" class="flexHorilanLayout">
        <el-tag v-if="isCurrentPeerconnection(conn.remoteMachineId)" @close="closeMachine(conn.remoteMachineId)" closable>{{conn.remoteMachineName}}
        </el-tag>

        <el-tag v-else type="info" @click="chooseMachine(conn.remoteMachineId)" @close="closeMachine(conn.remoteMachineId)" closable>
          {{conn.remoteMachineName}}</el-tag>
      </el-row>
    </el-col>
    <el-col :span="20">
      <video tabindex="1" ref="remotevdeio" width="100%" autoplay></video>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import settings from '@/settings'
import websocketChat, { websocketMsgTemp, msgType } from '@/utils/websocketChat'
import Peerconnection from '@/utils/peerconnection'
import { RouterHelper } from '@/router'
import { ElLoadingComponent } from 'element-ui/types/loading'
import { getMachaineById } from '@/api/machine'
import keyMouseRecord, { Record } from '@/utils/keyMouseRecord'

class machinePeerconnection {
  remoteMachineId: string
  remoteMachineName: string
  peerConnection: Peerconnection
  keyMouseChannel: RTCDataChannel
  fileChannel: RTCDataChannel
}
import { format } from 'url'

@Component({ name: 'machineRemote' })
export default class machineRemote extends Vue {
  private loadingWindow: ElLoadingComponent
  private openLoading() {
    this.closeLoading()
    this.loadingWindow = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })
  }
  private closeLoading() {
    if (this.loadingWindow) {
      this.loadingWindow.close()
      this.loadingWindow.$destroy()
      this.loadingWindow = null
    }
  }

  private keyMouseRecorder: keyMouseRecord

  private pcConfig: RTCConfiguration = {
    iceServers: [
      {
        urls: settings.TurnServerAddress,
        username: '123',
        credential: '123',
      },
    ],
    iceTransportPolicy: 'all',
  }

  private currentPeerConnection: machinePeerconnection
  private peerConnections: machinePeerconnection[] = []
  // private peerConnection: Peerconnection
  private websocket: websocketChat = new websocketChat()
  private get remoteMachines(): any[] {
    return this.$store.state.user.remoteMachines
  }
  mounted() {
    this.websocket.listenOnMessgae(this.onwebsocketMessage)
    this.keyMouseRecorder = new keyMouseRecord(this.$refs.remotevdeio as Element)
    this.keyMouseRecorder.onRecordEvent = this.onKeyBoardRecorded
    this.keyMouseRecorder.startListen()
  }
  destroyed() {
    window.console.log('*****远程控制页面销毁了')
    this.keyMouseRecorder.destroy()
    this.websocket.unListenOnMessgae(this.onwebsocketMessage)
    for (let index = 0; index < this.peerConnections.length; index++) {
      const element = this.peerConnections[index]
      element.peerConnection.Close()
    }
  }

  activated() {
    window.console.log('接收到页面参数', this.$route.params)
    const { machineId, machinePwd, machineName } = this.$route.params
    //
    if (!machineId || !machinePwd) {
      if (this.currentPeerConnection) {
        this.startVideo()
      }
      return
    }
    //
    var alreadyhave = this.peerConnections.find((o) => o.remoteMachineId == machineId)
    if (alreadyhave) {
      this.currentPeerConnection = alreadyhave
      this.startVideo()
      return
    }
    //
    this.openLoading()
    this.connectRemoteMachine(machineId, machinePwd)
  }
  /***********逻辑处理******************************************** */
  private isCurrentPeerconnection(remoteMachineId: string) {
    window.console.log('isCurrentPeerconnection', remoteMachineId, this.currentPeerConnection)
    if (this.currentPeerConnection && this.currentPeerConnection.remoteMachineId == remoteMachineId) {
      return true
    }
    return false
  }

  private connectRemoteMachine(machineId: string, machinePwd: string) {
    this.websocket.sendMessageTo(machineId, machinePwd, msgType.client_onRequestConnect)
  }

  private async initPeerconnection(_remoteMachineId: string) {
    let peerConnection = new Peerconnection(this.pcConfig)
    var machineInfo = (await getMachaineById(_remoteMachineId)) as any
    var keyMouseChannel = await peerConnection.CreateDataChannel('keyMouseChannel')
    var fileChannel = await peerConnection.CreateDataChannel('fileChannel')
    // window.console.log('******initPeerconnection', machineInfo)
    var newpeercon = {
      remoteMachineId: _remoteMachineId,
      peerConnection: peerConnection,
      remoteMachineName: machineInfo.machineName,
      keyMouseChannel: keyMouseChannel,
      fileChannel: fileChannel,
    }

    this.currentPeerConnection = newpeercon
    this.peerConnections.push(newpeercon)
    //
    peerConnection.onicecandidate = (ev: RTCIceCandidate) => {
      this.websocket.sendMessageTo(_remoteMachineId, ev, msgType.client_onCaller_CreateIceCandite)
    }
    peerConnection.onaddstream = (ev: MediaStreamEvent) => {
      this.startVideo()
      this.closeLoading()
    }
    peerConnection.onClosed = (conn: Peerconnection) => {
      this.closeLoading()
      var alreadyhaveIndex = this.peerConnections.findIndex((o) => o.peerConnection == conn)
      if (alreadyhaveIndex < 0) {
        return
      }
      this.peerConnections.splice(alreadyhaveIndex, 1)
      this.currentPeerConnection = this.peerConnections[0]
      this.startVideo()
    }
    await peerConnection.StartDevice(false, false)
    var offer = await peerConnection.CreateOffer()
    this.websocket.sendMessageTo(_remoteMachineId, offer, msgType.client_onCaller_CreateOffer)
  }

  private async startVideo() {
    if (!this.currentPeerConnection) {
      ;(this.$refs.remotevdeio as any).srcObject = null
      return
    }
    window.console.log('******************video', this.$refs.remotevdeio)
    ;(this.$refs.remotevdeio as any).srcObject = this.currentPeerConnection.peerConnection.remotestreams[0]
    ;(this.$refs.remotevdeio as any).play()
  }
  private async chooseMachine(remoteMachineId: string) {
    var find = this.peerConnections.find((o) => o.remoteMachineId == remoteMachineId)
    this.currentPeerConnection = find
    this.startVideo()
  }

  private async closeMachine(remoteMachineId: string) {
    var find = this.peerConnections.find((o) => o.remoteMachineId == remoteMachineId)
    if (!find) {
      return
    }
    find.peerConnection.Close()
  }

  private async onKeyBoardRecorded(rec: Record[]) {
    // window.console.log('onKeyBoardRecorded', rec)
    if (!this.currentPeerConnection) {
      return
    }

    if (this.currentPeerConnection.keyMouseChannel.readyState != 'open') {
      return
    }
    this.currentPeerConnection.keyMouseChannel.send(JSON.stringify(rec))
  }
  /***********消息处理******************************************** */
  private onwebsocketMessage(data: websocketMsgTemp<any>) {
    if (!data) {
      return
    }
    switch (data.msgType) {
      case msgType.client_onRequestConnect:
        this.onRecive_RequestConnect(data.sendMachineId, data.content)
        break
      case msgType.client_onAnswerRequestConnect:
        this.onRecive_AnswerRequestConnect(data.sendMachineId, data.content)
        break
      case msgType.client_onCutPeerConnection:
        this.onRecive_CutPeerConnection(data.sendMachineId)
        break
      case msgType.client_onCallee_CreateAnswer:
        this.onRecive_CreateAnswer(data.sendMachineId, data.content)
        break
      case msgType.client_onCallee_CreateIceCandite:
        this.onRecive_CreateIceCandite(data.sendMachineId, data.content)
        break
      default:
        break
    }
  }
  private async onRecive_RequestConnect(remoteMachineId: string, machinePwd: string) {
    //网页版不允许被控制
    this.websocket.sendMessageTo(remoteMachineId, false, msgType.client_onAnswerRequestConnect)
  }
  private async onRecive_AnswerRequestConnect(remoteMachineId: string, isAgree: boolean) {
    if (isAgree == false) {
      this.$message.warning('对方不同意链接')
      return
    }
    var alreadyhave = this.peerConnections.find((o) => o.remoteMachineId == remoteMachineId)
    if (alreadyhave) {
      this.$message.warning('已经和对方建立了链接,不要重复操作')
      return
    }
    this.initPeerconnection(remoteMachineId)
  }

  private async onRecive_CreateAnswer(remoteMachineId: string, remoteAnswer: any) {
    var alreadyhave = this.peerConnections.find((o) => o.remoteMachineId == remoteMachineId)
    await alreadyhave.peerConnection.SetRemoteSdp(remoteAnswer)
  }
  private async onRecive_CreateIceCandite(remoteMachineId: string, remoteIceCandite: any) {
    var alreadyhave = this.peerConnections.find((o) => o.remoteMachineId == remoteMachineId)
    if (alreadyhave) {
      await alreadyhave.peerConnection.AddIceCandidate(remoteIceCandite)
    }
  }

  private async onRecive_CutPeerConnection(sendmachieId: string) {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
