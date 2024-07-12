/* eslint-disable @typescript-eslint/no-explicit-any */
import { messageCenter } from './messageCenter';
import pako from 'pako';

export default class MyWebSocket extends WebSocket {
  heartBeat: any;
  isReconnect: any;
  reconnectTimer!: any;
  waitingTimer!: any;
  heartTimer!: any;
  isConnected = false;
  constructor(url: string | URL, protocols?: string | string[] | undefined) {
    super(url, protocols);
    return this;
  }

  /*
   * 入口
   * @param heartBeatConfig  time：心跳时间间隔 timeout：心跳超时间隔 reconnect：断线重连时间间隔
   * @param isReconnect 是否断线重连
   */
  init(heartBeatConfig: any, isReconnect: any) {
    this.onopen = this.openHandler; //连接上时回调
    this.onclose = this.closeHandler; //断开连接时回调
    this.onmessage = this.messageHandler; //收到服务端消息
    this.onerror = this.errorHandler; //连接出错
    this.heartBeat = heartBeatConfig;
    this.isReconnect = isReconnect;
    this.reconnectTimer = null; //断线重连时间器
    this.waitingTimer = null; // 超时等待时间器
    this.heartTimer = null; // 心跳时间器
    this.isConnected = false; //socket状态 true为已连接
    if (this.url.indexOf('compress') > 1) {
      this.binaryType = 'arraybuffer';
    }
  }

  openHandler() {
    this.isConnected = true;
    !!this.heartBeat && !!this.heartBeat.time && this.startHeartBeat(this.heartBeat.time);
    messageCenter.emit('onopen');
    console.log('ws onopen');
  }

  messageHandler(e: any) {
    const data = this.getMsg(e);
    messageCenter.emit('onmessage', data);
    if (data) {
      this.isConnected = true;
    }
  }

  closeHandler() {
    this.isConnected = false; //socket状态设置为断线
    messageCenter.emit('onclose', 'close');
  }

  errorHandler() {
    this.isConnected = false;
    messageCenter.emit('onclose', 'errorClose');
    console.log('【 chart_ws】: closed because of connect error ,reconnectWebSocket');
    this.reconnectWebSocket(); //重连
  }

  sendMsg(obj: any) {
    this.send(JSON.stringify(obj));
  }

  getMsg(e: any) {
    let res = e.data;

    // 只有与在压缩模式才处理
    if (this.url.indexOf('compress') > 1) {
      res = pako.inflate(new Uint8Array(e.data), { to: 'string' });
    }

    return JSON.parse(res);
  }

  /*
   * 心跳初始函数
   * @param time：心跳时间间隔
   */
  startHeartBeat(time: number | undefined) {
    this.heartTimer = setTimeout(() => {
      this.sendMsg({
        ping: new Date().getTime()
      });
      this.waitingTimer = this.waitingServer();
    }, time);
  }

  //延时等待服务端响应，通过webSocketState判断是否连线成功
  waitingServer() {
    this.isConnected = false; // 收到pong 信息之后修改连接状态
    return setTimeout(() => {
      if (this.isConnected) return this.startHeartBeat(this.heartBeat.time);
      console.log('【 chart_ws】: heartBeat response error ,reconnectWebSocket');
      this.reconnectTimer = this.reconnectWebSocket();
    }, this.heartBeat.timeout);
  }

  reconnectWebSocket() {
    if (!this.isReconnect) return;
    return setTimeout(() => {
      messageCenter.emit('reconnect');
    }, this.heartBeat.reconnect);
  }
  clearTimer() {
    clearTimeout(this.reconnectTimer);
    clearTimeout(this.heartTimer);
    clearTimeout(this.waitingTimer);
  }
  clear(isReconnect = false) {
    this.isReconnect = isReconnect;
    this.clearTimer();
    (this.readyState == 0 || this.readyState == 1) && this.close();
    console.log('clear call');
  }
}
