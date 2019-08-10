function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * websocket heartbeat
 */
export default class WebSocketHeartbeat {
  // ws base url
  // 上次连接时间
  // heart beat data
  // heart beat time
  // heart beat timer id
  // WebSocket object

  /**
   * 0 (CONNECTING) 正在链接中
   * 1 (OPEN) 已经链接并且可以通讯
   * 2 (CLOSING) 连接正在关闭
   * 3 (CLOSED) 连接已关闭或者没有链接成功
   */
  constructor({
    url,
    pingData = "",
    pingTime = 15000,
    pongOutTime = 10000
  }) {
    _defineProperty(this, "baseUrl", void 0);

    _defineProperty(this, "lastConnectTime", 0);

    _defineProperty(this, "pingData", void 0);

    _defineProperty(this, "pingTime", void 0);

    _defineProperty(this, "pingTimeId", void 0);

    _defineProperty(this, "pongOutTime", void 0);

    _defineProperty(this, "pongOutTimeId", void 0);

    _defineProperty(this, "reconnectTimeId", void 0);

    _defineProperty(this, "ws", void 0);

    _defineProperty(this, "readyState", this.ws ? this.ws.readyState : -1);

    this.baseUrl = url;
    this.pingData = pingData;
    this.pingTime = pingTime;
    this.pongOutTime = pongOutTime;
    this.connect();
  }
  /**
   * override hook function
   */


  onclose() {}

  onconnect() {} // custom


  onerror() {}

  onmessage() {}

  onopen() {}
  /**
   * hook function
   */


  close() {
    this.ws.close();
  }

  send(data) {
    if (this.ws.readyState === 1) {
      this.ws.send(data);
    } else {
      console.warn(`[ERROR] send fail, ws readyState: ${ws.readyState}`);
    }
  }
  /**
   * ws connect
   */


  connect() {
    //
    if (this.readyState === 1) {
      return;
    }

    if (+new Date() - this.lastConnectTime < this.pongOutTime) {
      this.reconnectTimeId && clearTimeout(this.reconnectTimeId);
      this.reconnectTimeId = setTimeout(() => {
        this.connect();
      }, 5000);
      return;
    }

    this.lastConnectTime = +new Date();
    this.ws = new WebSocket(this.baseUrl);
    this.registerEvent();
    return this.ws;
  }
  /**
   * register default event function and dispatch user event function
   */


  registerEvent() {
    this.ws.onclose = e => {
      this.heartReset();
      this.onclose(e); // reconnect

      this.connect();
    };

    this.ws.onerror = e => {
      this.heartReset();
      this.onerror(e); // reconnect

      this.connect();
    };
    /**
     * agree on: server close sending "CLOSE"
     */


    this.ws.onmessage = e => {
      this.onmessage(e);

      if (e.data === "CLOSE") {
        this.heartReset();
        this.close(); // reconnect

        this.connect();
        return;
      } // receive message reset heart


      this.heartCheck();
    };

    this.ws.onopen = e => {
      this.onopen(e);
      this.heartCheck();
    };
  }
  /**
   * timed heart beat detection
   * agree on: ping data default ""
   */


  heartCheck() {
    this.heartReset();
    this.pingTimeId = setTimeout(() => {
      this.send(this.pingData);
      /**
       * waiting pongOutTime didn't receive msg.
       * close client connection and reconnect
       */

      this.pongOutTimeId = setTimeout(() => {
        this.heartReset();
        this.close();
      });
    }, this.pingTime);
  }

  heartReset() {
    this.pingTimeId && clearTimeout(this.pingTimeId);
    this.pongOutTimeId && clearTimeout(this.pongOutTimeId);
  }

}
export function initWs({
  url,
  pingTime
}) {
  const ws = new WebSocketHeartbeat({
    url,
    pingTime
  });
  return ws;
}