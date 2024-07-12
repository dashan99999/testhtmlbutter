// import { MaybeComputedRef, useWebSocket, UseWebSocketOptions, UseWebSocketReturn } from '@vueuse/core';
// import { UseWebSocketOptions } from '@vueuse/core';
import { provide, Ref } from 'vue';
import { getToken } from '#shared/utils/auth';
import { toLowerString } from '#shared/utils/tools';
// import { Logger } from '#shared/utils/logger';
const DETECT_INTERVAL = 3000;
const DETECT_TIMES = 3000 * 3;
// import dayjs from 'dayjs';
// import { useEffect } from './useEffect';
// type ExposeOptKey = 'onMessage'; //| 'onConnected' | 'onError' | 'onDisconnected';
type TGenerateObject = { [key: string]: any };
// type Mix<T, X> = {
//   [P in keyof (T & X)]: (T & X)[P];
// };
// interface IOtherOpt {
//   other?: (e?: Event) => void;
// }

// type WsOption = Mix<IOtherOpt, Required<Pick<UseWebSocketOptions, ExposeOptKey>>>;
const ts = Math.round(new Date().getTime() / 1000).toString();

class BitUnixSocket {
  protected ws!: WebSocket;
  protected type: 'trad' | 'contract' = 'trad';
  protected channel: Map<string, string> = new Map();
  protected pingTimer: any = null;
  protected lastPongTime = new Date().getTime();
  protected status: 'init' | 'connected' | 'unconnected' = 'init';
  protected sendHistory: any[] = [];
  constructor(protected url: string, protected onMessage: (data: any) => void, protected onConnected: (isReConnect: boolean) => void) {
    this.type = this.url.indexOf('ws-futures') != -1 ? 'contract' : 'trad';
    this.createWs();
    this.detectedConnectStatus();
  }
  protected createWs() {
    if (this.ws) {
      this.ws.close();
    }
    const url = this.url + '?from=' + this.type;
    this.ws = new WebSocket(url);
    this.ws.onerror = () => {
      console.log('error');
    };
    this.ws.onmessage = (ev: any) => {
      this.lastPongTime = new Date().getTime();
      try {
        const received = JSON.parse(ev.data);
        if (received['pong']) {
          return;
        }
        if (received['ping']) {
          this.ws.send(JSON.stringify({ pong: received['ping'] }));
          return;
        }
      } catch (_error) {}

      this.onMessage(ev.data);
    };
    if (this.pingTimer !== null) {
      clearInterval(this.pingTimer);
    }
    this.ws.onopen = () => {
      const channels = Array.from(this.channel.keys()).filter((item) => item !== 'login');
      if (this.channel.has('login')) {
        this.send(this.channel.get('login'));
      }
      for (const channel of channels) {
        const data = this.channel.get(channel) as string;
        this.send(data);
      }
      const originStatus = this.status;
      this.status = 'connected';
      for (const data of this.sendHistory) {
        this.send(data);
      }
      this.sendHistory = [];
      this.onConnected(originStatus === 'connected');
    };
    this.pingTimer = setInterval(() => {
      // if (this.type === 'trad') {
      //   console.debug(this.status, this.ws.readyState);
      // }
      if (this.status === 'connected' && this.ws.readyState == 1) {
        this.ws.send(JSON.stringify({ ping: ts }));
      }
    }, DETECT_INTERVAL);
  }
  protected detectedConnectStatus() {
    setInterval(() => {
      const now = new Date().getTime();
      if (now - this.lastPongTime >= DETECT_TIMES) {
        this.createWs();
        // Logger.warn('WEBSOCKET', `RECONNECTED, ${now}-${this.lastPongTime}=${now - this.lastPongTime}`);
      }
    }, DETECT_INTERVAL);
  }
  public send(data: any) {
    if (this.status === 'init' || this.ws.readyState != 1) {
      this.sendHistory.push(data);
      return;
    }
    this.ws.send(data);
    try {
      const obj = JSON.parse(data) as any;
      if (obj.event) {
        if (obj.event === 'sub') {
          this.channel.set(obj.params.channel, data);
        }
        if (obj.event === 'unsub') {
          this.channel.delete(obj.params.channel);
        }
        if (obj.event === 'logout') {
          this.channel.set(obj.params.channel, data);
        }
        if (obj.event === 'login') {
          this.channel.set(obj.params.channel, data);
        }
      }
    } catch (_error) {}
  }
}

type Listeners = Map<string | symbol, (...data) => void>;

interface ISubscribe {
  subscribe<T = any>(
    name: string,
    listener: (data: T, ...args: any[]) => void | Promise<void>,
    params?: { [key: string]: any },
  ): () => void;
  onConnected(listener: () => void | Promise<void>): void;
  onError(listener: () => void | Promise<void>): void;
  onDisconnected(listener: () => void | Promise<void>): void;
}

interface IReceivedData<T = any> {
  channel: string;
  data: T;
}

const SYSTEM_SUB_NAMES: Set<string> = new Set([]);
class Subscribe implements ISubscribe {
  protected subs: Map<string, Listeners> = new Map();
  protected send: (data: string) => void = (data) => {
    console.error(new Error(data));
  };
  protected lastMsg: Map<string, any> = new Map();
  protected loginStatus = false;
  protected loginChannel = [
    /^position_/,
    /^order_/,
    /^balance_/,
    /^stop_profit_loss_/,
    /^stop_order_/,
    // /^market_/,
    // /^_deals/,
    /^order_all/,
    // /^_depth_/,
  ];
  protected subInfo: Map<string, Map<string, any>> = new Map();
  public loginReqId = '';
  constructor(protected type: 'spot' | 'future') {}
  protected createSymbolId() {
    return Symbol(new Date().getTime().toString());
  }
  protected loginStatusChange(status: boolean, id: string) {
    if (this.loginStatus !== status && status === true && id === this.loginReqId) {
      this.subInfo.forEach((sub) => {
        sub.forEach((param, channel) => {
          let isNeedLoginChannel = false;
          for (const channelReg of this.loginChannel) {
            if (channelReg.test(channel)) {
              isNeedLoginChannel = true;
              break;
            }
          }
          if (!isNeedLoginChannel) return;
          const otherInfo = import.meta.env.PROD ? {} : { afterLogin: true };
          const sendParam = Object.assign({}, param, { __sub_name__: undefined, __unsub_name__: undefined });
          this.send(
            JSON.stringify({
              event: toLowerString(param.__sub_name__),
              params: {
                channel: toLowerString(channel),
                ...sendParam,
                ...otherInfo,
              },
            }),
          );
        });
      });

      this.loginStatus = status;
    }
  }
  public loginOut() {
    this.subInfo.forEach((sub) => {
      sub.forEach((param, channel) => {
        let isNeedLoginChannel = false;
        for (const channelReg of this.loginChannel) {
          if (channelReg.test(channel)) {
            isNeedLoginChannel = true;
            break;
          }
        }
        if (!isNeedLoginChannel) return;
        const otherInfo = import.meta.env.PROD ? {} : { afterLoginOut: true };
        const sendParam = Object.assign({}, param, { __sub_name__: undefined, __unsub_name__: undefined });
        this.send(
          JSON.stringify({
            event: toLowerString(param.__unsub_name__),
            params: {
              channel: toLowerString(channel),
              ...sendParam,
              ...otherInfo,
            },
          }),
        );
      });
    });
    this.loginStatus = false;
    this.subInfo.delete('login');
  }
  public subscribe<T = any>(
    names: string,
    listener: (data: T, ...args: any[]) => void | Promise<void>,
    params: { [key: string]: any } = {},
  ) {
    const nameArr = Array.from(new Set(names.toLocaleLowerCase().split(',')));
    const nameMapId: { [key: string]: string | symbol } = {};
    const subName = params['__sub_name__'] || 'sub';
    const unsubName = params['__unsub_name__'] || 'unsub';
    if (import.meta.env.DEV) {
      if (
        params['__sub_name__'] === '' ||
        params['__sub_name__'] === null ||
        params['__unsub_name__'] === '' ||
        params['__unsub_name__'] === null
      ) {
        throw new Error('订阅或取消订阅名称异常');
      }
    }
    const _param = Object.assign({}, params, { __sub_name__: undefined, __unsub_name__: undefined });
    for (const name of nameArr) {
      if (!this.subs.has(name)) {
        this.subs.set(name, new Map());
        if (!this.subInfo.has(subName)) {
          this.subInfo.set(subName, new Map());
        }
        this.subInfo.get(subName)!.set(name, Object.assign({}, _param, { __sub_name__: subName, __unsub_name__: unsubName }));
        if (!SYSTEM_SUB_NAMES.has(name) || true) {
          this.send(
            JSON.stringify({
              event: toLowerString(subName),
              params: {
                channel: toLowerString(name),
                ..._param,
              },
            }),
          );
        }
      }
      const listeners = this.subs.get(name) as Listeners;
      const listenerId = this.createSymbolId();
      nameMapId[name] = listenerId;
      listeners.set(listenerId, (...args: any[]) => {
        // @ts-ignore
        listener(...args);
      });
      // 后续订阅时如果有最新值就发送最新值
      if (this.lastMsg.has(name)) {
        const args = this.lastMsg.get(name) as any[];
        // @ts-ignore
        listener(...args);
      }
    }
    return () => {
      for (const channel in nameMapId) {
        const listeners = this.subs.get(channel) as Listeners;
        if (listeners) {
          listeners.delete(nameMapId[channel]);
          if (listeners.size === 0) {
            this.subs.delete(channel);
            this.lastMsg.delete(channel);
            this.send(
              JSON.stringify({
                event: toLowerString(unsubName),
                params: {
                  channel: toLowerString(channel),
                },
              }),
            );
          }
        }
      }
    };
  }
  public onConnected(listener: () => void | Promise<void>) {
    this.subscribe('onConnected', listener);
  }
  public onError(listener: () => void | Promise<void>) {
    this.subscribe('onError', listener);
  }
  public onDisconnected(listener: () => void | Promise<void>) {
    this.subscribe('onError', listener);
  }

  public putMessage(data: IReceivedData) {
    // @ts-ignore
    if (data.eventResp && data.eventResp === 'login') {
      try {
        // @ts-ignore
        this.loginStatusChange(data.data.result, data.reqId);
      } catch (error) {
        console.warn(error);
      }
      return;
    }
    if (this.subs.has(data.channel)) {
      this.lastMsg.set(data.channel, [data.data, data]);
      const listeners = this.subs.get(data.channel) as Listeners;
      listeners.forEach((listener) => {
        try {
          listener(data.data, data);
        } catch (error) {
          console.error(data.channel, data, error);
        }
      });
    } else {
      // console.log(data.channel, this.subs);
    }
  }
  public putConnected() {
    if (this.subs.has('onConnected')) {
      const listeners = this.subs.get('onConnected') as Listeners;
      listeners.forEach((listener) => {
        try {
          listener();
        } catch (error) {
          console.error(error);
        }
      });
    }
  }
  public putError() {
    if (this.subs.has('onError')) {
      const listeners = this.subs.get('onConnected') as Listeners;
      listeners.forEach((listener) => {
        try {
          listener();
        } catch (error) {
          console.error(error);
        }
      });
    }
  }
  public putDisconnected() {
    if (this.subs.has('onDisconnected')) {
      const listeners = this.subs.get('onDisconnected') as Listeners;
      listeners.forEach((listener) => {
        try {
          listener();
        } catch (error) {
          console.error(error);
        }
      });
    }
  }
  public updateSend(send: (val: string) => void) {
    this.send = send;
  }
}

/**
 * VITE_EXCHANGE_WSAPI
 */
export function useProviderExchangeWebSocket() {
  const subRef = ref(new Subscribe('spot'));
  const isLogin = useLoginStatus();
  const isConnected = ref(false);
  const ws = new BitUnixSocket(
    import.meta.env.VITE_EXCHANGE_WSAPI,
    (data) => {
      try {
        const received = JSON.parse(data);
        subRef.value.putMessage(received);
      } catch (error) {
        console.error(error);
      }
    },
    () => {
      if (!isConnected.value) {
        isConnected.value = true;
      }
    },
  );
  subRef.value.updateSend(ws.send.bind(ws));
  watch(
    () => [isLogin.value, isConnected],
    () => {
      if (!isConnected.value) return;
      const token = getToken();
      if (isLogin.value && token) {
        const loginReqId = new Date().getTime().toString() + '_' + Math.random();
        subRef.value.loginReqId = loginReqId;
        subRef.value.subscribe('login', () => {}, {
          __sub_name__: 'login',
          reqId: loginReqId,
          reqParams: {
            exchangeToken: token, // 用户登录令牌
            exchangeClient: 'web', // 客户端类型 web/app
          },
        });
      } else {
        subRef.value.loginOut();
      }
    },
    { immediate: true, deep: true },
  );
  provide('exchange_websocket', subRef);
}

export function useExchangeWebSocket() {
  const sub = inject('exchange_websocket') as Ref<ISubscribe>;
  const subscribeCloseMap = ref<Map<string, Set<() => void>>>(new Map());
  const subRef = ref({
    subscribe: (channel: string, listener: (data: any) => void, params?: TGenerateObject) => {
      const close = sub?.value.subscribe(channel, listener, params);
      if (!subscribeCloseMap.value.has(channel)) {
        subscribeCloseMap.value.set(channel, new Set());
      }
      subscribeCloseMap.value.get(channel)!.add(close);

      return () => {
        const storeSet = subscribeCloseMap.value.get(channel) || new Set();
        close();
        storeSet.delete(close);
        if (storeSet.size === 0) {
          subscribeCloseMap.value.delete(channel);
        }
      };
    },
  });
  onUnmounted(() => {
    subscribeCloseMap.value.forEach((closeSet) => {
      closeSet.forEach((close) => {
        close();
      });
    });
  });
  return subRef;
}
/**
 * @description 合约的websocket, 全局单例
 */
export const FutureWebSocketSubscribe = new Subscribe('future');
export function useProviderFutureWebSocket() {
  const subRef = ref(FutureWebSocketSubscribe);
  const isLogin = useLoginStatus();
  const isConnected = ref(false);
  const ws = new BitUnixSocket(
    import.meta.env.VITE_FUTURE_WSAPI,
    (data) => {
      try {
        const received = JSON.parse(data);
        subRef.value.putMessage(received);
      } catch (error) {
        console.error(error);
      }
    },
    (isReConnect) => {
      if (!isConnected.value) {
        isConnected.value = true;
      }
      if (isReConnect) {
        subRef.value.putMessage({ channel: 'reconnected', data: null });
      }
    },
  );
  subRef.value.updateSend(ws.send.bind(ws));
  watch(
    () => [isLogin.value, isConnected],
    () => {
      if (!isConnected.value) return;
      const token = getToken();
      if (isLogin.value && token) {
        const loginReqId = new Date().getTime().toString() + '_' + Math.random();
        subRef.value.loginReqId = loginReqId;

        subRef.value.subscribe('login', () => {}, {
          __sub_name__: 'login',
          reqId: loginReqId,
          reqParams: {
            exchangeToken: token, // 用户登录令牌
            exchangeClient: 'web', // 客户端类型 web/app
          },
        });
      } else {
        subRef.value.loginOut();
      }
    },
    { immediate: true, deep: true },
  );
  provide('future_websocket', subRef);
}

export function useFutureWebSocket() {
  const sub = (() => {
    const _sub = inject('future_websocket') as Ref<ISubscribe>;
    if (_sub && _sub.value) {
      return _sub;
    }
    return computed(() => FutureWebSocketSubscribe);
  })();
  const subscribeCloseMap = ref<Map<string, Set<() => void>>>(new Map());
  const subRef = ref({
    subscribe: (channel: string, listener: (data: any) => void, params?: TGenerateObject) => {
      const close = sub.value.subscribe(channel, listener, params);
      if (!subscribeCloseMap.value.has(channel)) {
        subscribeCloseMap.value.set(channel, new Set());
      }
      subscribeCloseMap.value.get(channel)!.add(close);
      return () => {
        const storeSet = subscribeCloseMap.value.get(channel) || new Set();
        close();
        storeSet.delete(close);
        if (storeSet.size === 0) {
          subscribeCloseMap.value.delete(channel);
        }
      };
    },
  });
  onUnmounted(() => {
    subscribeCloseMap.value.forEach((closeSet) => {
      closeSet.forEach((close) => {
        close();
      });
    });
  });
  return subRef;
}

export function useMultipleSubFutureWebSocket(subMap: Ref<{ [channel: string]: (...args: any[]) => void }>) {
  const sub = useFutureWebSocket();
  const subCloseMap = ref<Map<string, () => any>>(new Map());
  watch(
    () => [subMap.value],
    () => {
      const newChannels = Object.keys(subMap.value);
      const oldChannels = subCloseMap.value.keys();
      for (const oldChannel of oldChannels) {
        if (newChannels.indexOf(oldChannel) === -1) {
          const close = subCloseMap.value.has(oldChannel) ? subCloseMap.value.get(oldChannel) : () => {};
          close!();
          subCloseMap.value.delete(oldChannel);
        }
      }
      for (const newChannel of newChannels) {
        const newClose = sub.value.subscribe(newChannel, subMap.value[newChannel]);
        // sub.value.subscribe(newChannel, (val: any) => {
        //   console.log(val);
        // });
        subCloseMap.value.set(newChannel, newClose);
      }
    },
    { immediate: true, deep: true },
  );
}

export function useFutureSymbolsSub(
  sourceSymbols: () => (string | null | undefined)[],
  subs: { createChannel: (symbol: string) => string; subName?: string; unSubName?: string; listener: (...val: any[]) => void }[],
  deps: any[],
) {
  const _sub = useFutureWebSocket();
  const subCloseMap = ref<Map<string, (() => any)[]>>(new Map());
  watch(
    () => deps,
    () => {
      const symbols = new Set<string>(
        sourceSymbols()
          .filter((item) => typeof item === 'string')
          .map((item) => item?.toLocaleLowerCase()) as string[],
      );
      const oldSymbols = subCloseMap.value.keys();
      for (const oldSymbol of oldSymbols) {
        if (!symbols.has(oldSymbol)) {
          const closes = subCloseMap.value.get(oldSymbol) as (() => void)[];
          for (const close of closes) {
            close();
          }
          subCloseMap.value.delete(oldSymbol);
        }
      }
      symbols.forEach((symbol) => {
        if (subCloseMap.value.has(symbol)) return;
        const listeners: (() => void)[] = [];
        for (const sub of subs) {
          const channelName = sub.createChannel(symbol).toLocaleLowerCase();
          const _close = _sub.value.subscribe(channelName, (...args: any) => {
            sub.listener(...args);
          });
          listeners.push(_close);
        }
        subCloseMap.value.set(symbol, listeners);
      });
    },
    { immediate: true, deep: true },
  );
  onUnmounted(() => {
    subCloseMap.value.forEach((closes) => {
      closes.forEach((close) => {
        close();
      });
    });
  });
}
