import MyWebSocket from './websocket/webSocket.js';
import { messageCenter } from './websocket/messageCenter.js';
import { SubscribeBarsCallback } from './public/charting_library/datafeed-api.js';
import { parseResolution, query, getChannelUrl, eventBus } from './utils/index';
import { CO_WS_API_KEY, EX_WS_API_KEY, NEW_BAR_CACHE_KEY, WS_TIME_KEY } from './constants';
import { Bar, IBitunixTradingViewCache, OnResetCacheNeededCallback, ResolutionsKey } from './interfaces';

let bitunixSocket: MyWebSocket;

const bitunixTradingViewCache: IBitunixTradingViewCache = {
  wsUrl: '', // 连接地址
  channelToSub: new Map(), // 储存实时订阅对象
  currChannel: '', // 当前正在推送的channel信息，用于在判断preTime的时候判断是否是同一个订阅
  preTime: 0, // 前一个bar时间
  currTime: 0, // 当前bar时间
  onResetCacheNeededCallbackCache: () => null, // 缓存 onResetCacheNeededCallback 函数
  newDataCache: [], // 实时推送缓存
  setTimeout: 0 // 定时器缓存
};

// 事件挂载
messageCenter.on('reconnect', connectWebSocket);
messageCenter.on('onclose', (res: object) => console.log('onclose', res));
messageCenter.on('onmessage', onMessage);
messageCenter.on('onopen', resumingSub);

// WS重连回调函数
function connectWebSocket() {
  //防止多个websocket同时执行
  bitunixSocket && clear(bitunixSocket);

  bitunixSocket = new MyWebSocket(bitunixTradingViewCache.wsUrl);
  bitunixSocket.init(
    {
      time: 10 * 1000, //心跳时间间隔
      timeout: 15 * 1000, // 心跳超时间隔
      reconnect: 5 * 1000 // 断线重连时间
    },
    true
  );

  return bitunixSocket;
}

// 重连时恢复订阅
function resumingSub() {
  const { channelToSub } = bitunixTradingViewCache;
  if (!channelToSub.size) return;

  for (const channelString of channelToSub.keys()) {
    bitunixSocket?.isConnected &&
      bitunixSocket.sendMsg({
        event: 'sub',
        params: {
          channel: channelString
        }
      });
  }
}

function clear(bitunixSocket: MyWebSocket | null) {
  bitunixSocket && bitunixSocket.clear();
  bitunixSocket = null;
}

/*
  处理接收信息
  包含以下几种情况：
    1. 服务端响应的心跳推送
    2. 服务端响应的ping推送
    3. 服务端响应的实时订阅消息
*/
function onMessage(res: any) {
  if (!res) return;

  // 1. 处理服务端响应的心跳，通过差值求出网络状态
  if (res.pong && res.data.ping) {
    localStorage.setItem(WS_TIME_KEY, String(Math.floor(new Date().getTime() - res.data.ping)));
  }

  // 2. 通过服务端的ping推送回发pong消息
  if (res.ping && bitunixSocket) {
    bitunixSocket.sendMsg({ pong: res.ping });
    return;
  }

  if (!res.data && !res?.channel) return;

  // 3. 下面开始处理实时推送的情况
  const subscriptionItem = bitunixTradingViewCache.channelToSub.get(res.channel);
  if (subscriptionItem === undefined) return;

  // 缓存当前最新消息的时间戳 | 后端返回数据为秒 TV 需要毫秒
  bitunixTradingViewCache.currTime = res.data[0].time * 1000;
  // 若前一根bar时间戳为空则缓存
  if (bitunixTradingViewCache.preTime === 0) {
    bitunixTradingViewCache.preTime = bitunixTradingViewCache.currTime;
  }
  // 若前一个WS channel 为空则缓存
  if (!bitunixTradingViewCache.currChannel) {
    bitunixTradingViewCache.currChannel = res.channel;
  }

  const { open, high, low, close, volume } = res.data[0];
  const bar: Bar = {
    time: bitunixTradingViewCache.currTime,
    open: Number(open),
    high: Number(high),
    low: Number(low),
    close: Number(close),
    volume: Number(volume)
  };

  const setTradingViewData = (data: Bar | undefined = undefined) => {
    const result = data || bar || [];
    bitunixTradingViewCache.preTime = Array.isArray(result) ? 0 : result.time;
    subscriptionItem.handlers.forEach((item: { [key in string]: any }) => {
      // Fix RangeError: Maximum call stack size exceeded
      // https://www.tradingview.com/charting-library-docs/latest/connecting_data/Datafeed-API?_highlight=maximum&_highlight=call&_highlight=stack&_highlight=size&_highlight=exceeded#asynchronous-callbacks
      setTimeout(() => item.onRealtimeCallback(result, { noData: result ? false : true }), 0);
      // 缓存最新价格推送，快捷下单时需要使用
      // sessionStorage.setItem(NEW_BAR_CACHE_KEY, JSON.stringify(result));
      eventBus.publish(NEW_BAR_CACHE_KEY, JSON.stringify(result));
    });
    bitunixTradingViewCache.setTimeout = 0;
  };

  // 只有相同分辨率下的请求才执行
  if (bitunixTradingViewCache.currChannel === res.channel) {
    const { currTime, preTime } = bitunixTradingViewCache;

    // 注意：后端推送过来的实时数据里面会存在倒序的时间序列的情况
    // 注意：如果当前实时推送过来的时间序列小于上一条实时推送中的时间序列，则认定为是推送了一条历史数据过来

    // [伪代码]
    /*
      ws: 0 0 0 0 0 1 0 1 1 1 2 1 2 2 2

      if 当前时间 === 上次缓存时间  直接更新
      if 当前时间 > 上次缓存时间
        往数组中推一条数据
        是否有定时器 ? return掉 : 延迟300毫秒取数组排序后第一条渲染（如果渲染了就标记）
      else if 当前时间 < 上次缓存时间
        是否已经存在标记 ? 丢弃 : 执行渲染
    */

    // 如果是相同时间的实时推送则直接更新数据
    if (currTime === preTime) {
      setTradingViewData();
      return;
    }

    // 推了一条新bar
    if (currTime > preTime) {
      bitunixTradingViewCache.newDataCache.push(bar);

      if (bitunixTradingViewCache.setTimeout) return;
      else {
        bitunixTradingViewCache.setTimeout = setTimeout(() => {
          bitunixTradingViewCache.newDataCache.sort((pre: any, next: any) => pre.time - next.time);
          // 先渲染排序后的第一条
          setTradingViewData(bitunixTradingViewCache.newDataCache.pop() as Bar);
          bitunixTradingViewCache.setTimeout = 0;
        }, 300) as any;
      }
    } else {
      if (bitunixTradingViewCache.setTimeout === 0) return;

      setTradingViewData();
    }
  } else {
    // 重置状态标记
    bitunixTradingViewCache.currChannel = '';
    bitunixTradingViewCache.preTime = 0;
    bitunixTradingViewCache.setTimeout = 0;
  }
}

// 初始化ws入口
export const initSocket = (url: string | URL) => {
  bitunixTradingViewCache.wsUrl = url ? url : query('type') == 'spot' ? EX_WS_API_KEY : CO_WS_API_KEY;

  return connectWebSocket();
};

// 发送订阅sub
export function subscribeOnStream(
  symbolInfo: { name: string },
  resolution: ResolutionsKey,
  onRealtimeCallback: SubscribeBarsCallback,
  subscriberUID: string,
  onResetCacheNeededCallback: OnResetCacheNeededCallback
) {
  if (!symbolInfo) return;

  const { channelToSub } = bitunixTradingViewCache;
  bitunixTradingViewCache.onResetCacheNeededCallbackCache = onResetCacheNeededCallback;

  const msg = {
    event: 'sub',
    params: {
      channel: getChannelUrl(symbolInfo.name, parseResolution(resolution))
    }
  };

  const handler = {
    id: subscriberUID,
    onRealtimeCallback
  };
  const channelString = msg.params.channel;
  let subscriptionItem = channelToSub.get(channelString);

  if (subscriptionItem) {
    subscriptionItem.handlers.push(handler);
    return;
  }

  subscriptionItem = {
    resolution,
    onRealtimeCallback,
    handlers: [handler]
  };

  channelToSub.set(channelString, subscriptionItem);

  // 如果是重连的时候需要手动维护成对的订阅，先取消订阅上一个channel，再订阅当前channel
  // 先发送 unsub 再发送 sub
  if (bitunixSocket?.isConnected) {
    bitunixSocket.sendMsg(msg);
  } else {
    messageCenter.on('onopen', subscribeOnStream);
  }
}

// 取消订阅
export function unsubscribeFromStream(subscriberUID: string) {
  const { channelToSub, currTime, preTime } = bitunixTradingViewCache;

  // 实时推送的时间和上一次缓存时间正好存在，并且当前实时推送的时间小于了上一次缓存的时间
  // 这种情况下tv组件会报错，导致误触发取消订阅操作
  if (currTime && preTime && currTime < preTime) {
    console.warn('The TradingView component reports an error triggering unsubscription and has fallen back to return.');
    return;
  }

  for (const channelString of channelToSub.keys()) {
    const subscriptionItem = channelToSub.get(channelString);
    const handlerIndex = subscriptionItem.handlers.findIndex((handler: { id: string }) => handler.id === subscriberUID);

    if (handlerIndex !== -1) {
      subscriptionItem.handlers.splice(handlerIndex, 1);
      if (subscriptionItem.handlers.length === 0) {
        bitunixSocket.sendMsg({
          event: 'unsub',
          params: {
            channel: channelString
          }
        });
        channelToSub.delete(channelString);
        console.log('tv unsubscribe:', channelString);
        break;
      }
    }
  }
}
