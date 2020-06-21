export default class defaultSettings {
  // static title: string = 'Vue Element Admin'

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  static showSettings: boolean = true

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  static tagsView: boolean = true

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  static fixedHeader: boolean = false

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  static sidebarLogo: boolean = false

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  static errorLog: string = 'production'

  static ApiServerAddress: string = 'http://212.64.71.83:65002/'
  static WebsocketServerAddress: string = 'ws://212.64.71.83:65002/chat/?token='
  static TurnServerAddress: string = 'turn:212.64.71.83:3478?transport=udp'
  // static ApiServerAddress: string = 'http://192.168.3.222:65002/'
  // static WebsocketServerAddress: string = 'ws://192.168.3.222:65002/chat/?token='
  // static TurnServerAddress: string = 'turn:192.168.3.222:65001?transport=udp'
}
