import { eventNames } from 'cluster'
import $ from 'jquery'

export enum LKeys {
  Modifiers = -65536,
  None = 0,
  LButton = 1,
  RButton = 2,
  Cancel = 3,
  MButton = 4,
  XButton1 = 5,
  XButton2 = 6,
  Back = 8,
  Tab = 9,
  LineFeed = 10,
  Clear = 12,
  Return = 13,
  Enter = 13,
  ShiftKey = 16,
  ControlKey = 17,
  Menu = 18,
  Pause = 19,
  Capital = 20,
  CapsLock = 20,
  KanaMode = 21,
  HanguelMode = 21,
  HangulMode = 21,
  JunjaMode = 23,
  FinalMode = 24,
  HanjaMode = 25,
  KanjiMode = 25,
  Escape = 27,
  IMEConvert = 28,
  IMENonconvert = 29,
  IMEAccept = 30,
  IMEAceept = 30,
  IMEModeChange = 31,
  Space = 32,
  Prior = 33,
  PageUp = 33,
  Next = 34,
  PageDown = 34,
  End = 35,
  Home = 36,
  Left = 37,
  Up = 38,
  Right = 39,
  Down = 40,
  Select = 41,
  Print = 42,
  Execute = 43,
  Snapshot = 44,
  PrintScreen = 44,
  Insert = 45,
  Delete = 46,
  Help = 47,
  D0 = 48,
  D1 = 49,
  D2 = 50,
  D3 = 51,
  D4 = 52,
  D5 = 53,
  D6 = 54,
  D7 = 55,
  D8 = 56,
  D9 = 57,
  A = 65,
  B = 66,
  C = 67,
  D = 68,
  E = 69,
  F = 70,
  G = 71,
  H = 72,
  I = 73,
  J = 74,
  K = 75,
  L = 76,
  M = 77,
  N = 78,
  O = 79,
  P = 80,
  Q = 81,
  R = 82,
  S = 83,
  T = 84,
  U = 85,
  V = 86,
  W = 87,
  X = 88,
  Y = 89,
  Z = 90,
  LWin = 91,
  RWin = 92,
  Apps = 93,
  Sleep = 95,
  NumPad0 = 96,
  NumPad1 = 97,
  NumPad2 = 98,
  NumPad3 = 99,
  NumPad4 = 100,
  NumPad5 = 101,
  NumPad6 = 102,
  NumPad7 = 103,
  NumPad8 = 104,
  NumPad9 = 105,
  Multiply = 106,
  Add = 107,
  Separator = 108,
  Subtract = 109,
  Decimal = 110,
  Divide = 111,
  F1 = 112,
  F2 = 113,
  F3 = 114,
  F4 = 115,
  F5 = 116,
  F6 = 117,
  F7 = 118,
  F8 = 119,
  F9 = 120,
  F10 = 121,
  F11 = 122,
  F12 = 123,
  F13 = 124,
  F14 = 125,
  F15 = 126,
  F16 = 127,
  F17 = 128,
  F18 = 129,
  F19 = 130,
  F20 = 131,
  F21 = 132,
  F22 = 133,
  F23 = 134,
  F24 = 135,
  NumLock = 144,
  Scroll = 145,
  LShiftKey = 160,
  RShiftKey = 161,
  LControlKey = 162,
  RControlKey = 163,
  LMenu = 164,
  RMenu = 165,
  BrowserBack = 166,
  BrowserForward = 167,
  BrowserRefresh = 168,
  BrowserStop = 169,
  BrowserSearch = 170,
  BrowserFavorites = 171,
  BrowserHome = 172,
  VolumeMute = 173,
  VolumeDown = 174,
  VolumeUp = 175,
  MediaNextTrack = 176,
  MediaPreviousTrack = 177,
  MediaStop = 178,
  MediaPlayPause = 179,
  LaunchMail = 180,
  SelectMedia = 181,
  LaunchApplication1 = 182,
  LaunchApplication2 = 183,
  OemSemicolon = 186,
  Oem1 = 186,
  Oemplus = 187,
  Oemcomma = 188,
  OemMinus = 189,
  OemPeriod = 190,
  OemQuestion = 191,
  Oem2 = 191,
  Oemtilde = 192,
  Oem3 = 192,
  OemOpenBrackets = 219,
  Oem4 = 219,
  OemPipe = 220,
  Oem5 = 220,
  OemCloseBrackets = 221,
  Oem6 = 221,
  OemQuotes = 222,
  Oem7 = 222,
  Oem8 = 223,
  OemBackslash = 226,
  Oem102 = 226,
  ProcessKey = 229,
  Packet = 231,
  Attn = 246,
  Crsel = 247,
  Exsel = 248,
  EraseEof = 249,
  Play = 250,
  Zoom = 251,
  NoName = 252,
  Pa1 = 253,
  OemClear = 254,
  KeyCode = 65535,
  Shift = 65536,
  Control = 131072,
  Alt = 262144,
}
export enum LMouseEvents {
  LeftDown = 0x201,
  LeftUp = 0x202,
  LeftDoubleClick = 0x203,
  RightDown = 0x204,
  RightUp = 0x205,
  RightDoubleClick = 0x206,
  MiddleDown = 0x207,
  MiddleUp = 0x208,
  MiddleDoubleClick = 0x209,
  MouseScroll = 0x20a,
  ScrollUp = 7864320,
  ScrollDown = -7864320,
  MouseMove = -1,
}
export enum LKeyBoardAction {
  KEY_DOWN = 'KEY_DOWN',
  KEY_UP = 'KEY_UP',
}
export class LCursorPoint {
  X: number
  Y: number
}

export class LMouseEvent {
  Location: LCursorPoint
  Action: LMouseEvents
  Value: number
}
export class LKeyboardEvent {
  Key: LKeys
  Action: LKeyBoardAction
}

export class Record {
  Id: number
  Content: string
  EventMouse: LMouseEvent
  EventKey: LKeyboardEvent
  ElementName: string
  Type: string
  WaitMs: number
}

export default class keyMouseRecord {
  private currentElement: Element
  private mouseMoveTimer: number
  /////////////////////////////////////////
  private mouseMoveEvent: LMouseEvent
  private otherRecords: Record[] = []
  /////////////////////////////////////////
  public onRecordEvent: (recs: Record[]) => void = function() {}

  constructor(ele: Element) {
    this.currentElement = ele
  }
  public startListen() {
    this.currentElement.addEventListener('mousedown', this.onMouseDown)
    this.currentElement.addEventListener('mouseup', this.onMouseUp)
    this.currentElement.addEventListener('mousemove', this.onMouseMove)
    this.currentElement.addEventListener('mousewheel', this.onMouseWheel, { passive: false })
    this.currentElement.addEventListener('keydown', this.onKeyDown)
    this.currentElement.addEventListener('keyup', this.onKeyUp)
    $(this.currentElement).bind('dblclick', this.onMouseDoubleClick as any)
    //
    this.mouseMoveTimer = window.setInterval(() => {
      if (this.mouseMoveEvent) {
        this.onMouseEvent(this.mouseMoveEvent)
        this.mouseMoveEvent = null
      }
      if (this.otherRecords.length > 0) {
        this.onRecordEvent(this.otherRecords)
        this.otherRecords = []
      }
    }, 30)
  }

  destroy() {
    this.currentElement.removeEventListener('mousedown', this.onMouseDown)
    this.currentElement.removeEventListener('mouseup', this.onMouseUp)
    this.currentElement.removeEventListener('mousemove', this.onMouseMove)
    this.currentElement.removeEventListener('mousewheel', this.onMouseWheel)
    this.currentElement.removeEventListener('keydown', this.onKeyDown)
    this.currentElement.removeEventListener('keyup', this.onKeyUp)
    $(this.currentElement).unbind('dblclick', this.onMouseDoubleClick as any)
    window.clearInterval(this.mouseMoveTimer)
  }

  private onMouseDown = (e: MouseEvent) => {
    $(this.currentElement).focus()
    /////////////////////////////////////////
    let actionv = LMouseEvents.LeftDown
    switch (e.button) {
      case 1:
        actionv = LMouseEvents.LeftDown
        break
      case 2:
        actionv = LMouseEvents.RightDown
        break
      case 4:
        actionv = LMouseEvents.MiddleDown
        break
      default:
        break
    }
    //////////////////////////////////////////////
    var lme: LMouseEvent = {
      Action: actionv,
      Location: this.cuteMouseInDomPosition(e),
      Value: 0,
    }
    this.onMouseEvent(lme)
    ////////////////////////////////////////////////
    //window.console.log('onMouseDown', e)
  }
  private onMouseUp = (e: MouseEvent) => {
    /////////////////////////////////////////
    let actionv = LMouseEvents.LeftUp
    switch (e.button) {
      case 1:
        actionv = LMouseEvents.LeftUp
        break
      case 2:
        actionv = LMouseEvents.RightUp
        break
      case 4:
        actionv = LMouseEvents.MiddleUp
        break
      default:
        break
    }
    //////////////////////////////////////////////
    var lme: LMouseEvent = {
      Action: actionv,
      Location: this.cuteMouseInDomPosition(e),
      Value: 0,
    }
    this.onMouseEvent(lme)
    ////////////////////////////////////////////////
    //window.console.log('onMouseUp', e)
  }
  private onMouseWheel = (e: WheelEvent) => {
    /////////////////////////////////////////
    let actionv = LMouseEvents.MouseScroll
    // switch (e.button) {
    //   case 1:
    //     actionv = LMouseEvents.LeftUp
    //     break
    //   case 2:
    //     actionv = LMouseEvents.RightUp
    //     break
    //   case 4:
    //     actionv = LMouseEvents.MiddleUp
    //     break
    //   default:
    //     break
    // }
    //////////////////////////////////////////////
    var wheelvalue = (e as any).wheelDelta || -e.detail
    var lme: LMouseEvent = {
      Action: actionv,
      Location: this.cuteMouseInDomPosition(e),
      Value: wheelvalue,
    }
    this.onMouseEvent(lme)
    //window.console.log('onMouseWheel', e)
  }

  private onMouseMove = (e: MouseEvent) => {
    /////////////////////////////////////////
    let actionv = LMouseEvents.MouseMove
    //////////////////////////////////////////////
    var lme: LMouseEvent = {
      Action: actionv,
      Location: this.cuteMouseInDomPosition(e),
      Value: 0,
    }
    this.mouseMoveEvent = lme
    window.console.log('onMouseMove', lme.Location)
  }
  private onKeyDown = (e: KeyboardEvent) => {
    e.preventDefault()
    var lkb: LKeyboardEvent = {
      Key: e.keyCode as LKeys,
      Action: LKeyBoardAction.KEY_DOWN,
    }
    this.onKeyBoardEvent(lkb)
    //window.console.log('onKeyDown', e)
  }
  private onKeyUp = (e: KeyboardEvent) => {
    var lkb: LKeyboardEvent = {
      Key: e.keyCode as LKeys,
      Action: LKeyBoardAction.KEY_UP,
    }
    this.onKeyBoardEvent(lkb)
    //window.console.log('onKeyUp', e)
  }
  private onMouseDoubleClick = (e: MouseEvent) => {
    /////////////////////////////////////////
    let actionv = LMouseEvents.LeftDoubleClick
    switch (e.button) {
      case 1:
        actionv = LMouseEvents.LeftDoubleClick
        break
      case 2:
        actionv = LMouseEvents.RightDoubleClick
        break
      case 4:
        actionv = LMouseEvents.MiddleDoubleClick
        break
      default:
        break
    }
    //////////////////////////////////////////////
    var lme: LMouseEvent = {
      Action: actionv,
      Location: this.cuteMouseInDomPosition(e),
      Value: 0,
    }
    this.onMouseEvent(lme)
    ////////////////////////////////////////////////
    //window.console.log('onMouseDoubleClick', e)
  }
  // **********************************************************************
  private cuteMouseInDomPosition(e: MouseEvent): LCursorPoint {
    //
    window.console.log('-------', $(this.currentElement).offset().left, $(this.currentElement).offset().top)
    window.console.log('*******', e.clientX, e.clientY)
    let positionX = e.x - $(this.currentElement).offset().left
    let positionY = e.y - $(this.currentElement).offset().top
    if (positionX < 0) {
      positionX = 0
    }
    if (positionY < 0) {
      positionY = 0
    }
    return { X: positionX / $(this.currentElement).width(), Y: positionY / $(this.currentElement).height() }
  }

  private GetTimeStamp(): number {
    return Math.round(new Date().getTime() / 1000)
  }

  private onMouseEvent(eve: LMouseEvent) {
    let record = new Record()
    record.Id = this.GetTimeStamp()
    record.EventMouse = eve
    record.Type = 'Mouse'
    this.otherRecords.push(record)
  }
  private onKeyBoardEvent(eve: LKeyboardEvent) {
    let record = new Record()
    record.Id = this.GetTimeStamp()
    record.EventKey = eve
    record.Type = 'Keyboard'
    this.otherRecords.push(record)
  }
}
