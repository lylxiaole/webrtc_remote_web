export default class Peerconnection {
  private offerOptions: RTCOfferOptions = {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true,
  }
  private peerconnection: RTCPeerConnection = new RTCPeerConnection()
  private localstream: MediaStream
  public remotestreams: MediaStream[] = []

  public currentoffer?: RTCSessionDescriptionInit = undefined
  public currentanswer?: RTCSessionDescriptionInit = undefined
  public localIces: RTCIceCandidate[] = []

  public onicecandidate: (ev: RTCIceCandidate) => void = function() {}
  public ontrack: (ev: RTCTrackEvent) => void = function() {}
  public onaddstream: (stream: MediaStreamEvent) => void = function() {}
  public onDataChannel: (channel: RTCDataChannelEvent) => void = function() {}
  public onClosed: (conn: Peerconnection) => void = function() {}

  constructor(configuration?: RTCConfiguration) {
    this.peerconnection = new RTCPeerConnection(configuration)
    this.peerconnection.onicecandidate = (ev: RTCPeerConnectionIceEvent) => {
      if (ev.candidate) {
        this.localIces.push(ev.candidate)
        this.onicecandidate(ev.candidate)
      }
    }
    this.peerconnection.ontrack = (ev: RTCTrackEvent) => {
      this.ontrack(ev)
    }
    ;(this.peerconnection as any).onaddstream = (stream: MediaStreamEvent) => {
      this.remotestreams.push(stream.stream)
      this.onaddstream(stream)
    }
    this.peerconnection.oniceconnectionstatechange = (ev: Event) => {
      // "new" | "checking" | "connected" | "completed" | "disconnected" | "failed" | "closed"
      // window.console.log('****oniceconnectionstatechange', ev)
      var con = ev.target as RTCPeerConnection
      if (con.iceConnectionState == 'disconnected' || con.iceConnectionState == 'failed' || con.iceConnectionState == 'closed') {
        this.onClosed(this)
      }
    }
    this.peerconnection.ondatachannel = (channel: RTCDataChannelEvent) => {
      if (this.onDataChannel) {
        this.onDataChannel(channel)
      }
    }
  }

  public async StartDevice(isVideo: boolean, isAudio: boolean): Promise<MediaStream> {
    if (!isVideo && !isAudio) {
      return null
    }

    let constarct: MediaStreamConstraints = { audio: isAudio, video: isVideo }
    let stream = await navigator.mediaDevices.getUserMedia(constarct)
    this.localstream = stream
    this.localstream.getAudioTracks().forEach((o) => {
      this.peerconnection.addTrack(o, this.localstream)
    })
    this.localstream.getVideoTracks().forEach((o) => {
      this.peerconnection.addTrack(o, this.localstream)
    })
    return stream
  }

  public async CreateOffer(): Promise<RTCSessionDescriptionInit> {
    var offer = await this.peerconnection.createOffer(this.offerOptions)
    this.peerconnection.setLocalDescription(offer)
    this.currentoffer = offer
    return offer
  }

  public async CreateDataChannel(label: string): Promise<RTCDataChannel> {
    var channel = await this.peerconnection.createDataChannel(label)
    return channel
  }

  public async CreateAnswer(): Promise<RTCSessionDescriptionInit> {
    var answer = await this.peerconnection.createAnswer(this.offerOptions)
    this.peerconnection.setLocalDescription(answer)
    this.currentanswer = answer
    return answer
  }

  public async SetRemoteSdp(sdp: RTCSessionDescriptionInit) {
    await this.peerconnection.setRemoteDescription(sdp)
  }
  public async AddIceCandidate(ev: RTCIceCandidate) {
    this.peerconnection.addIceCandidate(ev)
  }

  public async Close() {
    if (this.peerconnection) {
      this.peerconnection.close()
    }
  }
}
