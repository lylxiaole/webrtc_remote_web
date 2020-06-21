import W3CWebSocket from 'websocket'
import settings from '@/settings'

export enum msgType {
  /// <summary>
  /// 当自己的设备上线
  /// </summary>
  system_onMachineOnline = 0,
  /// <summary>
  /// 当自己的设备下线
  /// </summary>
  system_onMachineDownline = 1,
  /// <summary>
  /// 当获取到自己在线的设备
  /// </summary>
  system_onGetMyMachine = 2,
  /// <summary>
  /// 客户端不在线
  /// </summary>
  system_clientNotOnline = 3,

  /// <summary>
  /// 开始直播
  /// </summary>
  system_startPlay = 50,
  /// <summary>
  /// 直播服务端创建offer成功
  /// </summary>
  system_onPlayServerOfferCreated = 51,
  /// <summary>
  /// 直播端创建answer给服务端
  /// </summary>
  system_setPlayServerAnswer = 52,
  /// <summary>
  /// 直播服务端创建了icecandidate
  /// </summary>
  system_onPlayServerIcecandidate = 53,
  /// <summary>
  /// 直播端创建了icecandidate
  /// </summary>
  system_onPlayerIcecandidate = 54,
  /// <summary>
  /// 观看直播
  /// </summary>
  system_onWatchPlay = 60,
  /// <summary>
  /// 观看者offer创建成功
  /// </summary>
  system_onWatcherOfferCreated = 61,
  /// </summary>
  system_onWatcherIcecandidate = 62,
  /// <summary>
  /// 直播端创建answer给服务端
  /// </summary>
  system_setWatcherAnswer = 63,
  //
  client_onRequestConnect = 1000,
  client_onAnswerRequestConnect = 1001,
  client_onCutPeerConnection = 1002,
  //
  client_onCaller_CreateOffer = 1003,
  client_onCallee_CreateAnswer = 1004,
  client_onCaller_CreateIceCandite = 1005,
  client_onCallee_CreateIceCandite = 1006,
  client_onCaller_SetRemoteSdpCompleted = 1007,
  client_onCallee_SetRemoteSdpCompleted = 1008,
  //
  client_onNameChange = 1050,
}
export class websocketMsgTemp<T> {
  sendMachineId: string = ''
  receiverMachineId: string = ''
  msgType: msgType = msgType.system_clientNotOnline
  content: T | null = null
}

declare type onMessageCallback = (data: websocketMsgTemp<any>) => void

export default class websocketChat {
  private static websocketClient: W3CWebSocket.w3cwebsocket
  private static currentMachineId: string
  private static _onmessageCallbacks: onMessageCallback[] = []

  public static Initlize(token: string, machineId: string) {
    if (!websocketChat.websocketClient) {
      websocketChat.currentMachineId = machineId
      websocketChat.websocketClient = new W3CWebSocket.w3cwebsocket(settings.WebsocketServerAddress + token)
      websocketChat.websocketClient.onmessage = websocketChat.onwebsocketMessage
      websocketChat.websocketClient.onerror = function() {
        window.console.info('Connection Error')
      }
      websocketChat.websocketClient.onopen = function() {
        window.console.info('WebSocket Client Connected')
      }
      websocketChat.websocketClient.onclose = function() {
        window.console.info('echo-protocol Client Closed')
      }
    }
  }

  private static onwebsocketMessage(e: any) {
    if (!e.data) {
      return
    }
    var data = JSON.parse(e.data) as websocketMsgTemp<any>
    // window.console.log('**********消息回调个数:', websocketChat._onmessageCallbacks.length)
    websocketChat._onmessageCallbacks.forEach((o) => o(data))
  }

  // *******实例方法************************************************************************************
  public sendMessageTo(toMachineId: string, content: any, msgType: msgType) {
    var message: any = new websocketMsgTemp<any>()
    message.sendMachineId = websocketChat.currentMachineId
    message.receiverMachineId = toMachineId
    message.content = content
    message.msgType = msgType
    websocketChat.websocketClient.send(JSON.stringify(message))
  }

  public listenOnMessgae(callback: onMessageCallback) {
    websocketChat._onmessageCallbacks.push(callback)
  }

  public unListenOnMessgae(callback: onMessageCallback) {
    var index = websocketChat._onmessageCallbacks.indexOf(callback)
    if (index > -1) {
      websocketChat._onmessageCallbacks.splice(index, 1)
    }
  }
}
